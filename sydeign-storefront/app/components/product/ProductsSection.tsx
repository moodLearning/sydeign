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

  firstProductCollections:
    allProducts[0]?.collections,

});

  if (!items.length) return null;


  return (
    <section
      className={`
        rounded-b-4xl
        py-12
        px-10
        ${className}
      `}
    >

      <header
        className="
          mb-8
          flex
          items-center
          justify-between
        "
      >

        <h2
          className="
            text-5xl
            font-bold
            text-primary
          "
        >
          {title}
        </h2>


        <button
          type="button"
          className="
            cursor-pointer
            text-xl
            text-primary
            hover:underline
          "
        >
          See All
        </button>

      </header>


      <div
        className="
          grid
          gap-6
          md:grid-cols-3
          lg:grid-cols-4
        "
      >

        {items.map((product)=>(
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>


    </section>
  );
}