import type { Product } from '../data/shopify';

export function getProductsForSection(
  products: Product[],
  section: string,
  activeCategory: string,
) {

  const normalize = (value:string) =>
    value
      .toLowerCase()
      .trim();


  const sectionName =
    normalize(section);


  const categoryName =
    normalize(activeCategory);


  return products.filter((product)=>{

    const collections =
      product.collections ?? [];


    const names =
      collections.map(
        (collection)=>
          normalize(collection.title),
      );


    const inSection =
      names.includes(sectionName);


    const inCategory =
      activeCategory === 'All Products' ||
      names.includes(categoryName);


    return inSection && inCategory;

  });

}