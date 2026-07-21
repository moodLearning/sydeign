import * as serverBuild from 'virtual:react-router/server-build';
import { createRequestHandler, storefrontRedirect } from '@shopify/hydrogen';
import { createHydrogenRouterContext } from './app/lib/context';

const CUSTOMER_METAFIELD_NAMESPACE = 'custom';
const CUSTOMER_METAFIELD_KEY = 'following_designers';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function adminGraphql(
  storeDomain: string,
  adminToken: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<any> {
  const response = await fetch(`https://${storeDomain}/admin/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

// Resolves the real Shopify customer GID from the customer's own access token,
// so writes are scoped to whoever the token actually belongs to (never trust a
// client-supplied customer id).
async function resolveCustomerId(
  customerAccountApiUrl: string,
  customerToken: string,
): Promise<string | null> {
  try {
    const response = await fetch(`${customerAccountApiUrl}/account/customer/api/2026-07/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; SydeignStorefront/1.0)',
        Authorization: customerToken,
      },
      body: JSON.stringify({ query: 'query { customer { id } }' }),
    });
    const rawBody = await response.text();
    if (!response.ok) {
      console.error('Customer Account API rejected token:', response.status, rawBody);
      return null;
    }
    const json = JSON.parse(rawBody);
    if (json.errors) {
      console.error('Customer Account API returned errors:', JSON.stringify(json.errors));
      return null;
    }
    return json?.data?.customer?.id ?? null;
  } catch (err) {
    console.error('Failed to resolve customer from token:', err);
    return null;
  }
}

async function handleFollowDesigner(request: Request, env: Env): Promise<Response> {
  const storeDomain = env.PUBLIC_STORE_DOMAIN;
  const adminToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const customerAccountApiUrl = env.PUBLIC_CUSTOMER_ACCOUNT_API_URL;

  if (!storeDomain || !adminToken || !customerAccountApiUrl) {
    return jsonResponse({ error: 'Server configuration error: missing API credentials' }, 500);
  }

  let designerMetaobjectId: string | undefined;
  let action: string | undefined;

  if (request.method === 'GET') {
    designerMetaobjectId = new URL(request.url).searchParams.get('designerMetaobjectId') ?? undefined;
  } else {
    try {
      const body = (await request.json()) as { designerMetaobjectId?: string; action?: string };
      designerMetaobjectId = body?.designerMetaobjectId;
      action = body?.action;
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400);
    }
    if (action !== 'follow' && action !== 'unfollow') {
      return jsonResponse({ error: 'action must be "follow" or "unfollow"' }, 400);
    }
  }

  if (!designerMetaobjectId) {
    return jsonResponse({ error: 'Missing designer ID' }, 400);
  }

  const customerToken = request.headers.get('Authorization');
  const customerId = customerToken
    ? await resolveCustomerId(customerAccountApiUrl, customerToken)
    : null;

  if (!customerId) {
    if (request.method === 'GET') {
      const result = await adminGraphql(
        storeDomain,
        adminToken,
        'query GetFollowers($id: ID!) { metaobject(id: $id) { field(key: "followers") { value } } }',
        { id: designerMetaobjectId },
      );
      const followerCount = parseInt(result?.data?.metaobject?.field?.value ?? '0', 10) || 0;
      return jsonResponse({ isFollowing: false, followerCount });
    }
    return jsonResponse({ error: 'Please sign in to follow designers.' }, 401);
  }

  try {
    const state = await adminGraphql(
      storeDomain,
      adminToken,
      `query FollowState($designerId: ID!, $customerId: ID!) {
        metaobject(id: $designerId) {
          field(key: "followers") { value }
        }
        customer(id: $customerId) {
          metafield(namespace: "${CUSTOMER_METAFIELD_NAMESPACE}", key: "${CUSTOMER_METAFIELD_KEY}") { value }
        }
      }`,
      { designerId: designerMetaobjectId, customerId },
    );

    if (state.errors) {
      return jsonResponse({ error: state.errors }, 400);
    }

    const currentFollowers = parseInt(state?.data?.metaobject?.field?.value ?? '0', 10) || 0;
    const rawFollowing = state?.data?.customer?.metafield?.value;
    const currentFollowing: string[] = rawFollowing ? (JSON.parse(rawFollowing) as string[]) : [];
    const isCurrentlyFollowing = currentFollowing.includes(designerMetaobjectId);

    if (request.method === 'GET') {
      return jsonResponse({ isFollowing: isCurrentlyFollowing, followerCount: currentFollowers });
    }

    const willFollow = action === 'follow';
    if (willFollow === isCurrentlyFollowing) {
      return jsonResponse({ isFollowing: isCurrentlyFollowing, followerCount: currentFollowers });
    }

    const newFollowing = willFollow
      ? [...currentFollowing, designerMetaobjectId]
      : currentFollowing.filter((id) => id !== designerMetaobjectId);
    const newFollowerCount = willFollow ? currentFollowers + 1 : Math.max(0, currentFollowers - 1);

    const updateResult = await adminGraphql(
      storeDomain,
      adminToken,
      `mutation UpdateFollow(
        $designerId: ID!
        $designerFields: [MetaobjectFieldInput!]!
        $customerMetafields: [MetafieldsSetInput!]!
      ) {
        metaobjectUpdate(id: $designerId, metaobject: { fields: $designerFields }) {
          userErrors { field message }
        }
        metafieldsSet(metafields: $customerMetafields) {
          userErrors { field message }
        }
      }`,
      {
        designerId: designerMetaobjectId,
        designerFields: [{ key: 'followers', value: String(newFollowerCount) }],
        customerMetafields: [
          {
            ownerId: customerId,
            namespace: CUSTOMER_METAFIELD_NAMESPACE,
            key: CUSTOMER_METAFIELD_KEY,
            type: 'list.single_line_text_field',
            value: JSON.stringify(newFollowing),
          },
        ],
      },
    );

    const userErrors = [
      ...(updateResult?.data?.metaobjectUpdate?.userErrors ?? []),
      ...(updateResult?.data?.metafieldsSet?.userErrors ?? []),
    ];

    if (updateResult.errors || userErrors.length) {
      return jsonResponse({ error: updateResult.errors ?? userErrors }, 400);
    }

    return jsonResponse({ isFollowing: willFollow, followerCount: newFollowerCount });
  } catch (err: any) {
    console.error('Follow designer error:', err);
    return jsonResponse({ error: err.message ?? 'Internal Server Error' }, 500);
  }
}

const PRODUCT_REVIEW_NAMESPACE = 'custom';

function formatRatingValue(rating: number): string {
  return JSON.stringify({
    value: rating.toFixed(1),
    scale_min: '1.0',
    scale_max: '5.0',
  });
}

// Parses Shopify's "rating" field JSON shape, e.g. {"value":"4.0","scale_min":"1.0","scale_max":"5.0"}
function parseRatingValue(raw?: string | null): number {
  if (!raw) return 0;
  try {
    return Number((JSON.parse(raw) as { value?: string })?.value ?? 0) || 0;
  } catch {
    return 0;
  }
}

async function handleProductReview(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const storeDomain = env.PUBLIC_STORE_DOMAIN;
  const adminToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const customerAccountApiUrl = env.PUBLIC_CUSTOMER_ACCOUNT_API_URL;

  if (!storeDomain || !adminToken || !customerAccountApiUrl) {
    return jsonResponse({ error: 'Server configuration error: missing API credentials' }, 500);
  }

  let productId: string | undefined;
  let rating: number | undefined;
  let body: string | undefined;

  try {
    const parsed = (await request.json()) as { productId?: string; rating?: number; body?: string };
    productId = parsed?.productId;
    rating = parsed?.rating;
    body = parsed?.body?.trim();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!productId) {
    return jsonResponse({ error: 'Missing product ID' }, 400);
  }
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return jsonResponse({ error: 'rating must be an integer between 1 and 5' }, 400);
  }
  if (!body) {
    return jsonResponse({ error: 'Review body is required' }, 400);
  }
  if (body.length > 2000) {
    return jsonResponse({ error: 'Review body is too long (max 2000 characters)' }, 400);
  }

  const customerToken = request.headers.get('Authorization');
  const customerId = customerToken
    ? await resolveCustomerId(customerAccountApiUrl, customerToken)
    : null;

  if (!customerId) {
    return jsonResponse({ error: 'Please sign in to leave a review.' }, 401);
  }

  try {
    const state = await adminGraphql(
      storeDomain,
      adminToken,
      `query ReviewState($productId: ID!, $customerId: ID!) {
        product(id: $productId) {
          rating: metafield(namespace: "${PRODUCT_REVIEW_NAMESPACE}", key: "rating") { value }
          ratingCount: metafield(namespace: "${PRODUCT_REVIEW_NAMESPACE}", key: "rating_count") { value }
          reviewsList: metafield(namespace: "${PRODUCT_REVIEW_NAMESPACE}", key: "reviews_list") { value }
        }
        customer(id: $customerId) { firstName lastName }
      }`,
      { productId, customerId },
    );

    if (state.errors) {
      return jsonResponse({ error: state.errors }, 400);
    }

    const currentAvg = parseRatingValue(state?.data?.product?.rating?.value);
    const currentCount = parseInt(state?.data?.product?.ratingCount?.value ?? '0', 10) || 0;
    const currentReviewIds: string[] = state?.data?.product?.reviewsList?.value
      ? (JSON.parse(state.data.product.reviewsList.value) as string[])
      : [];

    const firstName = state?.data?.customer?.firstName ?? '';
    const lastName = state?.data?.customer?.lastName ?? '';
    const author = `${firstName} ${lastName}`.trim() || 'Anonymous';
    const date = new Date().toISOString();

    const createResult = await adminGraphql(
      storeDomain,
      adminToken,
      `mutation CreateReview($review: MetaobjectCreateInput!) {
        metaobjectCreate(metaobject: $review) {
          metaobject { id }
          userErrors { field message }
        }
      }`,
      {
        review: {
          type: 'customer_review',
          capabilities: { publishable: { status: 'ACTIVE' } },
          fields: [
            { key: 'author', value: author },
            { key: 'rating', value: formatRatingValue(rating) },
            { key: 'date', value: date },
            { key: 'body', value: body },
          ],
        },
      },
    );

    const createErrors = createResult?.data?.metaobjectCreate?.userErrors ?? [];
    if (createResult.errors || createErrors.length) {
      return jsonResponse({ error: createResult.errors ?? createErrors }, 400);
    }

    const newReviewId = createResult?.data?.metaobjectCreate?.metaobject?.id;
    if (!newReviewId) {
      return jsonResponse({ error: 'Failed to create review' }, 500);
    }

    const newCount = currentCount + 1;
    const newAvg = (currentAvg * currentCount + rating) / newCount;
    const newReviewIds = [...currentReviewIds, newReviewId];

    const updateResult = await adminGraphql(
      storeDomain,
      adminToken,
      `mutation UpdateProductReviews($productFields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $productFields) {
          userErrors { field message }
        }
      }`,
      {
        productFields: [
          {
            ownerId: productId,
            namespace: PRODUCT_REVIEW_NAMESPACE,
            key: 'rating',
            type: 'rating',
            value: formatRatingValue(newAvg),
          },
          {
            ownerId: productId,
            namespace: PRODUCT_REVIEW_NAMESPACE,
            key: 'rating_count',
            type: 'number_integer',
            value: String(newCount),
          },
          {
            ownerId: productId,
            namespace: PRODUCT_REVIEW_NAMESPACE,
            key: 'reviews_list',
            type: 'list.metaobject_reference',
            value: JSON.stringify(newReviewIds),
          },
        ],
      },
    );

    const updateErrors = updateResult?.data?.metafieldsSet?.userErrors ?? [];
    if (updateResult.errors || updateErrors.length) {
      return jsonResponse({ error: updateResult.errors ?? updateErrors }, 400);
    }

    return jsonResponse({
      success: true,
      review: { id: newReviewId, author, rating, date, body, images: [] },
      averageRating: newAvg,
      reviewCount: newCount,
    });
  } catch (err: any) {
    console.error('Product review error:', err);
    return jsonResponse({ error: err.message ?? 'Internal Server Error' }, 500);
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/follow-designer' && (request.method === 'POST' || request.method === 'GET')) {
      return handleFollowDesigner(request, env);
    }

    if (url.pathname === '/api/product-review' && request.method === 'POST') {
      return handleProductReview(request, env);
    }

    try {
      const hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext,
      );

      const handleRequest = createRequestHandler({
        build: serverBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      // --- UPDATED 404 & REDIRECT HANDLING ---
      if (response.status === 404) {
        const url = new URL(request.url);
        const excludedPaths = ['/favicon.ico', '/robots.txt', '/sitemap.xml'];

        // 1. Skip Shopify API redirect checks for static resource assets
        if (excludedPaths.includes(url.pathname) || url.pathname.startsWith('/build/')) {
          return response;
        }

        // 2. Prevent server crash if the connection to Shopify fails/times out
        try {
          return await storefrontRedirect({
            request,
            response,
            storefront: hydrogenContext.storefront,
          });
        } catch (redirectError) {
          console.error("Failed to fetch redirects from Shopify Storefront API:", redirectError);
          return response; // Gracefully fall back to standard 404 response
        }
      }

      return response;
    } catch (error: any) {
      console.error("SERVER RUNTIME CRASH:", error);
      return new Response(
        `Server Error: ${error?.message || 'Check terminal logs'}`, 
        { status: 500 }
      );
    }
  },
};