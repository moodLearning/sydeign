import * as serverBuild from 'virtual:react-router/server-build';
import { createRequestHandler, storefrontRedirect } from '@shopify/hydrogen';
import { createHydrogenRouterContext } from './app/lib/context';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/follow-designer' && request.method === 'POST') {
      try {
        const { designerMetaobjectId, action } = await request.json() as any;
        
        if (!designerMetaobjectId) {
          return new Response('Missing designer ID', { status: 400 });
        }

        const storeDomain = env.PUBLIC_STORE_DOMAIN;
        const adminToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

        if (!storeDomain || !adminToken) {
          return new Response('Server configuration error: Missing API tokens', { status: 500 });
        }

        const getQuery = `
          query GetDesignerFollowers($id: ID!) {
            metaobject(id: $id) {
              field(key: "followers") {
                value
              }
            }
          }
        `;

        const getResponse = await fetch(`https://${storeDomain}/admin/api/2026-07/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminToken,
          },
          body: JSON.stringify({ query: getQuery, variables: { id: designerMetaobjectId } }),
        });

        const getJson: any = await getResponse.json();
        const rawFollowers = getJson?.data?.metaobject?.field?.value || '0';
        const currentFollowers = parseInt(rawFollowers.replace(/[^0-9]/g, ''), 10) || 0;

        const newCount = action === 'follow' ? currentFollowers + 1 : Math.max(0, currentFollowers - 1);
        const newFollowersStr = `${newCount.toLocaleString()} Followers`;

        const mutation = `
          mutation UpdateDesignerFollowers($id: ID!, $metaobject: MetaobjectUpdateInput!) {
            metaobjectUpdate(id: $id, metaobject: $metaobject) {
              metaobject {
                id
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const variables = {
          id: designerMetaobjectId,
          metaobject: {
            capabilities: {
              publishable: {
                status: "ACTIVE"
              }
            },
            fields: [
              {
                key: "followers",
                value: newFollowersStr
              }
            ]
          }
        };

        const mutationResponse = await fetch(`https://${storeDomain}/admin/api/2026-07/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminToken,
          },
          body: JSON.stringify({ query: mutation, variables }),
        });

        const mutationResult: any = await mutationResponse.json();

        if (mutationResult.errors || mutationResult.data?.metaobjectUpdate?.userErrors?.length) {
          const errors = mutationResult.errors || mutationResult.data.metaobjectUpdate.userErrors;
          return new Response(JSON.stringify({ error: errors }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true, followers: newFollowersStr }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });

      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
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