import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../Button';
import type { Product } from '../../data/shopify';

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  function scroll( direction:'left'|'right'){
    const container = containerRef.current;
    if(!container) return;
    container.scrollBy({
      left:
        direction === 'left'
          ? -340
          : 340,
      behavior:'smooth',
    });
  }

  return (

    <section className="bg-background border-y border-gray-100 py-16">
      <div className="max-w-350 mx-auto px-6">
        <header className="mb-10">
          <h2 className="section-header">
            Masterpieces to Discover
          </h2>

          <p className="section-body">
            Browse through our live collection
            of carefully crafted design
            architectures and products.
          </p>

          <h3 className="section-subheader">
            Top Selling Products
          </h3>

        </header>

        <div className="relative group">
          <CarouselButton direction="left" onClick={() => scroll('left')}/>
          <div ref={containerRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar">

            {products.map(product => (
              <div key={product.id} className="w-[280px] sm:w-[300px] shrink-0 snap-start">
                <ProductCard product={product}/>
              </div>
            ))}

          </div>
          <CarouselButton direction="right" onClick={() => scroll('right')}/>
        </div>

        <div className="mt-6 flex justify-center">
          <Button label="See more products" to="/products"/>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({ direction,onClick }:{ direction:'left'|'right'; onClick:()=>void }) {

  const Icon =
    direction === 'left'
      ? ChevronLeft
      : ChevronRight;

  return (

    <button
      type="button"
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className={`
        hidden
        md:flex
        items-center
        justify-center
        absolute
        top-1/2
        -translate-y-1/2

        ${
          direction === 'left'
            ? '-left-4'
            : '-right-4'
        }

        z-20
        bg-white
        border
        border-gray-100
        rounded-full
        p-2.5
        shadow-md
        opacity-0
        group-hover:opacity-100
        transition
        hover:text-primary
      `}
    >
      <Icon size={20}/>
    </button>

  );
}