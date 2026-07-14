export const HOMEPAGE_QUERY = `#graphql
query GetHomepageData($count: Int!) {

  products(first: $count) {

    nodes {

      id
      title
      handle

      images(first: 1) {
        nodes {
          url
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