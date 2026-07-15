interface ActionArgs {
  request: Request;
  context: {
    admin: {
      query: (query: string, variables?: any) => Promise<any>;
    };
  };
}

export async function action({ request, context }: ActionArgs) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { admin } = context;
  const { designerMetaobjectId, action: followAction } = await request.json() as {
    designerMetaobjectId?: string;
    action?: string;
  };

  if (!designerMetaobjectId) {
    return new Response(
      JSON.stringify({ error: 'Missing designer ID' }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // 1. Fetch current follower count first using the Admin Client
    const fetchQuery = `
      query GetFollowerCount($id: ID!) {
        metaobject(id: $id) {
          field(key: "follower_count") {
            value
          }
        }
      }
    `;
    
    const fetchRes = await admin.query(fetchQuery, { id: designerMetaobjectId });
    const currentCount = parseInt(fetchRes?.metaobject?.field?.value || '0', 10);
    
    // 2. Calculate the updated count
    const newCount = followAction === 'follow' ? currentCount + 1 : Math.max(0, currentCount - 1);

    // 3. Write back the updated value to the Metaobject
    const updateMutation = `
      mutation UpdateFollowerCount($id: ID!, $fields: [MetaobjectFieldInput!]!) {
        metaobjectUpdate(id: $id, metaobject: { fields: $fields }) {
          metaobject {
            id
          }
          userErrors {
            message
          }
        }
      }
    `;

    const updateRes = await admin.query(updateMutation, {
      id: designerMetaobjectId,
      fields: [{ key: 'follower_count', value: String(newCount) }]
    });

    if (updateRes.metaobjectUpdate?.userErrors?.length) {
      throw new Error(updateRes.metaobjectUpdate.userErrors[0].message);
    }

    // Return a standard Web Response
    return new Response(
      JSON.stringify({ success: true, count: newCount }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error("Admin API Error inside Hydrogen:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}