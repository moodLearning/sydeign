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
      <div className="designer-collection-empty">
        No products found for this designer.
      </div>
    );
  }

  return (
    <div className="designer-collection-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}