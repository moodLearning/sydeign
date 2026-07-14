export const PRODUCTS_CATALOG_QUERY = `#graphql
  query GetProductsCatalog {
    collections(first: 25) {
      nodes {
        id
        title
        handle
      }
    }
    products(first: 100) {
      nodes {
        id
        title
        handle
        images(first: 5) {
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
        designerMetafield: metafield(namespace: "custom", key: "designer_reference") {
          reference {
            ... on Metaobject {
              id

              designerNameField: field(key: "name") {
                value
              }
            }
          }
        }
        collections(first: 25) {
          nodes {
            title
            handle
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
query Product($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    description

    images(first: 5) {
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

    designerMetafield: metafield(
      namespace: "custom"
      key: "designer_reference"
    ) {
      reference {
        ... on Metaobject {
          designerNameField: field(key: "name") {
            value
          }
        }
      }
    }
  }
}
`;