import {ProductCard} from '../product/ProductCard';
import type {Product} from '../../data/shopify';

interface DesignerCollectionGridProps {
  products: Product[];
}

export function DesignerCollectionGrid({
  products,
}: DesignerCollectionGridProps) {
  if (products.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border-2
          border-dashed
          border-stone-200
          py-16
          text-center
          text-sm
          font-medium
          text-stone-400
        "
      >
        No products found for this designer.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-6
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}