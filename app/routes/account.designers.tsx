import type {LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {customerAccount, storefront} = context;

  // 1. Check if the user is logged in
  const isLoggedIn = await customerAccount.isLoggedIn();
  if (!isLoggedIn) {
    return customerAccount.login();
  }

  // 2. Fetch the customer's followed designers metafield
  const customerData = await customerAccount.query(`
    query getFollowedDesigners {
      customer {
        metafield(namespace: "custom", key: "followed_designers") {
          value
        }
      }
    }
  `);

  const followedDesigners = JSON.parse(customerData?.customer?.metafield?.value || '[]');

  if (followedDesigners.length === 0) {
    return Response.json({products: [], followedDesigners});
  }

  // 3. Build a search query safely wrapped in quotes to handle names with spaces correctly
  const searchQuery = followedDesigners
    .map((d: string) => `metafields.custom.designer:"${d}"`)
    .join(' OR ');

  const {products} = await storefront.query(PRODUCTS_BY_DESIGNER_QUERY, {
    variables: {query: searchQuery},
  });

  return Response.json({products: products.nodes, followedDesigners});
}

export default function FollowedDesignersPage() {
  const {products, followedDesigners} = useLoaderData<typeof loader>() as {
    products: any[];
    followedDesigners: string[];
  };

  return (
    <div className="designer-feed-container p-8">
      <h1 className="text-3xl font-bold mb-4">Your Designer Feed</h1>
      <p className="text-gray-600 mb-6">
        Showing updates from: {followedDesigners.join(', ')}
      </p>

      {products.length === 0 ? (
        <p>No new products from your designers yet. Try following some more!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <img src={product.featuredImage?.url} alt={product.title} className="w-full h-64 object-cover" />
              <h2 className="font-semibold mt-2">{product.title}</h2>
              <p className="text-sm text-blue-600">By {product.designer?.value}</p>
              <p className="font-bold">{product.variants.nodes[0].price.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PRODUCTS_BY_DESIGNER_QUERY = `#graphql
  query getProductsByDesigner($query: String!) {
    products(first: 20, query: $query) {
      nodes {
        id
        title
        handle
        featuredImage { url }
        variants(first: 1) {
          nodes { price { amount currencyCode } }
        }
        designer: metafield(namespace: "custom", key: "designer") {
          value
        }
      }
    }
  }
` as const;

