import { Link } from 'react-router'; 
import { ProductCard } from './ProductCard';
import type { Product } from '../../data/shopify';
import { getProductsForSection } from '../../lib/products';

interface ProductSectionProps {
  title: string;
  sectionKey: string;
  allProducts: Product[];
  activeCategory: string;
  className?: string;
}

export default function ProductSection({
  title,
  sectionKey,
  allProducts,
  activeCategory,
  className = '',
}: ProductSectionProps) {

  const items = getProductsForSection(
    allProducts,
    sectionKey,
    activeCategory,
  );

  console.log('ProductSection Debug', {
    title,
    sectionKey,
    activeCategory,
    productCount: allProducts.length,
    firstProductCollections: allProducts[0]?.collections,
  });

  if (!items.length) return null;

  const searchUrl = `/search?category=${encodeURIComponent(title)}`;

  return (
    <section
      className={`product-section ${className}`}
    >
      <header className="product-section-header">
        <h2 className="product-section-title">
          {title}
        </h2>

        <Link
          to={searchUrl}
          className="product-section-see-all"
        >
          See All
        </Link>
      </header>

      <div className="product-section-grid">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}