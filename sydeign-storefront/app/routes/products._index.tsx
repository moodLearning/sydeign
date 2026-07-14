import { type LoaderFunctionArgs, useLoaderData, useSearchParams } from 'react-router';
import Sidebar from '../components/Sidebar';
import ProductSection from '../components/product/ProductsSection';
import {getProductsCatalog} from '../lib/products.server';
import type { Product } from '../data/shopify';

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    return await getProductsCatalog(context.storefront);
  } catch(error) {
    console.error('Products catalog error:', error);
    return {products: [], collections: []};
  }
}

export default function ProductsIndex() {

  const { products, collections } = useLoaderData<{
    products: Product[];
    collections: ShopifyCollection[];
  }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'All Products';

  const bannerName =
    activeCategory
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

  function handleFilter(category:string){

    const params = new URLSearchParams(searchParams);

    if(category === 'All Products'){
      params.delete('category');
    }
    else {
      params.set('category',category);
    }

    setSearchParams(params);

  }

  const visibleCollections =
    collections
      .filter((collection: ShopifyCollection)=>
        [
          'daily discovery',
          'new arrivals',
          'best sellers',
          'on sale',
        ].includes(
          collection.title.toLowerCase(),
        ),
      )
      .filter((collection: ShopifyCollection)=>
        activeCategory === 'All Products' ||
        collection.title === activeCategory,
      );

  return (

    <main className="min-h-screen w-full overflow-x-hidden bg-background">

      <CategoryBanner category={activeCategory} imageName={bannerName}/>

      <div
        className="
          mx-auto
          mt-12
          flex
          max-w-screen
          flex-col
          gap-8
          px-6
          md:grid
          md:grid-cols-[20rem_minmax(0,1fr)]
          md:px-12
          relative
          z-10
        "
      >
        <Sidebar
          activeCategory={activeCategory}
          onFilterChange={handleFilter}
          collections={collections}
          
        />
        
        <section
          className="
            pb-20
            bg-background
            relative
            z-0
            min-w-0
          "
        >

          {visibleCollections.map(
            (collection: ShopifyCollection, index: number)=> (

              <ProductSection
                key={collection.id}
                title={collection.title}
                sectionKey={collection.title}
                allProducts={products}
                activeCategory={activeCategory}
                className={
                  index % 2 !== 0
                    ? 'bg-background'
                    : 'bg-white'
                }
              />

            ),
          )}

        </section>

      </div>

    </main>

  );
}

function CategoryBanner({ category, imageName }:{ category:string; imageName:string }) {

  return (
    <header className="relative h-70 w-full overflow-hidden shadow-xl">
      <img
        key={category}
        src={`/${imageName}-banner.png`}
        alt={`${category} banner`}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        onError={(event)=>{
          event.currentTarget.src =
            '/default-banner.png';
        }}
      />

      <div className="absolute inset-0 bg-black/20"/>

      <div className="absolute inset-0 flex items-center">

        <div className="w-full px-8 md:px-30">

          <h1
            className="
              font-cinzel
              text-6xl
              uppercase
              tracking-wide
              text-white
              drop-shadow-lg
              md:text-8xl
            "
          >
            {category}
          </h1>

        </div>

      </div>

    </header>

  );
}