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
    <section className="designer-collection-section">
      <header className="designer-collection-header">

        <div>
            <h2 className="section-subheader">
            The Designer&apos;s Collection
            </h2>

            <p className="designer-collection-count">
            {totalProducts} products
            </p>
        </div>

        <button
            type="button"
            className="designer-collection-sort-btn"
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