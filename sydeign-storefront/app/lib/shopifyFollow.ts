export async function getCustomerFollowing(): Promise<string[]> {
  const query = `
    query GetFollowing {
      customer {
        metafield(namespace: "custom", key: "following_designers") {
          value
        }
      }
    }
  `;
  const response = await fetch('https://shopify.com/77132071069/account/api/2026-07/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'Authorization': localStorage.getItem('shopify_customer_token') || '',
    },
    body: query,
  });
  
  const result = (await response.json()) as {
    data?: {
      customer?: {
        metafield?: {
          value?: string | null;
        } | null;
      } | null;
    };
  };
  const rawValue = result.data?.customer?.metafield?.value;
  return rawValue ? (JSON.parse(rawValue) as string[]) : []; // Parses ["gid://..."]
}

export async function updateCustomerFollowing(followingList: string[]) {
  const customerId = localStorage.getItem('shopify_customer_id'); // Ensure you saved this on login
  
  const query = `
    mutation UpdateFollowing {
      metafieldsSet(metafields: [
        {
          ownerId: "${customerId}"
          namespace: "custom"
          key: "following_designers"
          value: "${JSON.stringify(followingList).replace(/"/g, '\\"')}"
          type: "list.single_line_text_field"
        }
      ]) {
        metafields {
          key
          value
        }
        userErrors {
          message
        }
      }
    }
  `;

  const response = await fetch('https://shopify.com/77132071069/account/api/2026-07/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'Authorization': localStorage.getItem('shopify_customer_token') || '',
    },
    body: query,
  });

  return response.json();
}