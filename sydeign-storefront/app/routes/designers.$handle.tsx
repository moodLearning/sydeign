import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { getProductsCatalog } from '../lib/products.server'; 
import { getDesignersPage } from '../lib/designers.server';
import { DesignerHero } from '../components/designer/DesignerHero';
import { DesignerCollection } from '../components/designer/DesignerCollection';

const ITEMS_PER_PAGE = 8;

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;

  if (!handle) {
    throw new Response('Designer not found', { status: 404 });
  }

  try {
    const [catalogData, designerData] = await Promise.all([
      getProductsCatalog(context.storefront),
      getDesignersPage(context.storefront)
    ]);

    const designer = designerData.designers.find((d) => d.handle === handle);

    if (!designer) {
      throw new Response('Designer not found', { status: 404 });
    }

    const designerProducts = catalogData.products.filter(
      (product) => product.designerId === designer.id
    );

    return {
      designer,
      products: designerProducts, 
    };
  } catch (error) {
    console.error('Designer page error:', error);
    throw new Response('Unable to load designer.', { status: 500 });
  }
}

export default function SelectedDesignerPage() {
  const { designer, products } = useLoaderData<typeof loader>();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [designer.id]);

  const currentProducts = products.slice(0, visibleCount);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const activePage = Math.min(
    Math.floor((visibleCount - 1) / ITEMS_PER_PAGE),
    Math.max(totalPages - 1, 0)
  );

  return (
    <main className="relative z-10 min-h-screen rounded-2xl bg-[#fcfdfa] pb-24 font-sans text-gray-900 shadow-lg">
      <DesignerHero designer={designer} />

      <DesignerCollection
        products={currentProducts}
        totalProducts={products.length}
        visibleCount={visibleCount}
        totalPages={totalPages}
        activePage={activePage}
        onPageClick={(page) => setVisibleCount((page + 1) * ITEMS_PER_PAGE)}
        onLoadMore={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
      />
    </main>
  );
}