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

    reviewScore: metafield(namespace: "custom", key: "review_score") {
      value
    }

    reviewCount: metafield(namespace: "custom", key: "review_count") {
      value
    }

    reviewsList: metafield(namespace: "custom", key: "customer_reviews") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            id
            # Retrieve fields defined in your Customer Review Metaobject
            author: field(key: "author") {
              value
            }
            date: field(key: "date") {
              value
            }
            rating: field(key: "rating") {
              value
            }
            body: field(key: "body") {
              value
            }
            # Handles files/images attached to the customer review cards
            reviewImages: field(key: "review_images") {
              references(first: 3) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;