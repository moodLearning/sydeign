import {DESIGNERS_PAGE_QUERY} from '../graphql/designers';
import {
  normalizeDesigner,
  normalizeProduct,
} from '../data/shopify';


export async function getDesignersPage(
  storefront:any,
) {

  const data =
    await storefront.query(
      DESIGNERS_PAGE_QUERY,
    );


  const designers =
    (data.metaobjects?.nodes ?? [])
      .map(normalizeDesigner);


  const products =
    (data.products?.nodes ?? [])
      .map(normalizeProduct);


  const designerOfTheMonth =
    designers.find(
      (designer)=>
        designer.isFeatured,
    )
    ??
    designers[0]
    ??
    null;


  const topRatedDesigners =
  designers
    .sort(
      (a, b) =>
        b.averageRating - a.averageRating,
    )
    .slice(0, 5);


  const featuredProduct =
    products.find(
      (product) =>
        product.handle === designerOfTheMonth?.featuredProductHandle,
    ) ??
    products.find(
      (product) =>
        product.designerId === designerOfTheMonth?.id,
    ) ??
    null;

  return {
    designers,
    products,
    designerOfTheMonth,
    topRatedDesigners,
    featuredProduct,
  };

}