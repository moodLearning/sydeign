export const HOMEPAGE_QUERY = `#graphql
query GetHomepageData($count: Int!) {

  products(first: $count) {
    nodes {
      id
      title
      description
      handle
      tags

      variants(first: 1) {
        nodes {
          id
        }
      }

      images(first: 10) {
        nodes {
          id
          url
          altText
        }
      }

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }

      collections(first: 10) {
        nodes {
          title
          handle
        }
      }

      designerMetafield: metafield(
        namespace: "custom"
        key: "designer_reference"
      ) {
        reference {
          ... on Metaobject {
            id

            designerNameField: field(key: "name") {
              value
            }
          }
        }
      }
    }
  }

  collections(first: 12) {
    nodes {
      id
      title
      handle
      description

      image {
        url
        altText
      }
    }
  }
}
`;