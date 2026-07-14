import {PRODUCTS_CATALOG_QUERY} from '../graphql/products';
import {normalizeProduct} from '../data/shopify';


export async function getProductsCatalog(
  storefront:any,
) {

  const data =
    await storefront.query(
      PRODUCTS_CATALOG_QUERY,
    );


  return {

    products:
      (data.products?.nodes ?? [])
        .map(normalizeProduct),


    collections:
      data.collections?.nodes ?? [],

  };

}