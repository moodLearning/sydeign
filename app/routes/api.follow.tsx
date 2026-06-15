import type {ActionFunctionArgs} from 'react-router';

export async function action({request, context}: ActionFunctionArgs) {
  const {customerAccount} = context;

  if (!(await customerAccount.isLoggedIn())) {
    return Response.json({error: 'Please log in to follow designers.'}, {status: 401});
  }

  const formData = await request.formData();
  const designerName = formData.get('designerName'); // ⚡ Form field name matches hidden input

  // ⚡ FIXED TYPE CHECKS (Uses designerName everywhere cleanly)
  if (!designerName || typeof designerName !== 'string') {
    return Response.json({error: 'Designer name is required.'}, {status: 400}); 
  }

  try {
    const currentData = await customerAccount.query(GET_CUSTOMER_METAFIELES);
    const existingMetafield = currentData?.customer?.metafield?.value;

    let followedList: string[] = [];
    if (existingMetafield) {
      try {
        followedList = JSON.parse(existingMetafield);
      } catch {
        followedList = [existingMetafield];
      }
    }

    if (!followedList.includes(designerName)) {
      followedList.push(designerName);
    }

    const {data, errors} = await customerAccount.mutate(UPDATE_CUSTOMER_METAFIELES, {
      variables: {
        metafields: [
          {
            namespace: 'custom',
            key: 'followed_designers',
            value: JSON.stringify(followedList),
          },
        ],
      },
    });

    if (errors?.length) {
      return Response.json({error: errors[0].message}, {status: 400});
    }

    return Response.json({success: true, followedList});
  } catch (error) {
    return Response.json({error: 'Failed to update followed designers.'}, {status: 500});
  }
}

const GET_CUSTOMER_METAFIELES = `
  query GetCustomerMetafields {
    customer {
      metafield(namespace: "custom", key: "followed_designers") {
        value
      }
    }
  }
`;

const UPDATE_CUSTOMER_METAFIELES = `
  mutation UpdateCustomerMetafields($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;

