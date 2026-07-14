export const DESIGNERS_PAGE_QUERY = `#graphql
query GetDesignersPage {

  metaobjects(type: "designer", first: 20) {
    nodes {
      id
      handle

      name: field(key: "name") {
        value
      }

      bio: field(key: "bio") {
        value
      }

      profilePicture: field(key: "profile_picture") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }

      bannerImage: field(key: "banner_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }

      cardPicture: field(key: "card_picture") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }

      style: field(key: "style") {
        value
      }

      averageRating: field(key: "average_rating") {
        value
      }

      reviewCount: field(key: "review_count") {
        value
      }

      isFeatured: field(key: "is_featured") {
        value
      }

      socialLinks: field(key: "social_links") {
        value
      }

      followers: field(key: "followers") {
        value
      }

      products: field(key: "products") {
        value
      }

      featuredProduct: field(key: "featured_product") {
        reference {
          ... on Product {
            id
            handle
            title
          }
        }
      }
    }
  }

  products(first: 100) {
    nodes {
      id
      title
      handle

      images(first: 1) {
        nodes {
          url
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
}
`;