import {ArrowUpDown} from 'lucide-react';
import type {Product} from '../../data/shopify';
import { DesignerCollectionGrid } from './DesignerCollectionGrid';
import { DesignerPagination } from './DesignerPagination';

interface DesignerCollectionProps {
  products: Product[];

  totalProducts: number;

  visibleCount: number;

  totalPages: number;
  activePage: number;

  onPageClick: (page: number) => void;
  onLoadMore: () => void;
}

export function DesignerCollection({
  products,

  totalProducts,

  visibleCount,

  totalPages,
  activePage,

  onPageClick,
  onLoadMore,
}: DesignerCollectionProps) {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <header className="mb-12 flex items-center justify-between">

        <div>
            <h2 className="section-subheader">
            The Designer&apos;s Collection
            </h2>

            <p className="mt-2 text-sm text-stone-500">
            {totalProducts} products
            </p>
        </div>

        <button
            type="button"
            className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#c36a3e]
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-white
            transition
            hover:bg-[#b05c32]
            "
        >
            <ArrowUpDown size={14} />
            Sort By
        </button>

    </header>

    <DesignerCollectionGrid
      products={products}
    />

    <DesignerPagination
      totalProducts={totalProducts}
      visibleCount={visibleCount}
      totalPages={totalPages}
      activePage={activePage}
      onPageClick={onPageClick}
      onLoadMore={onLoadMore}
    />

    </section>
  );
}