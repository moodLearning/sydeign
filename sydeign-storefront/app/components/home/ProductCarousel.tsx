import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { Button, ButtonAlt, ButtonCard } from '../Button';
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

    <section 
  className="relative bg-background border-y border-gray-100 py-16 shadow-inner"
  style={{
    backgroundImage: "linear-gradient(to bottom, transparent 0%, var(--background, #fff5e1) 80%, var(--background, #fff5e1) 100%), url('/textured-wallpaper.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
      <div className="max-w-350 mx-auto px-6">
        <div className="relative inline-flex items-center">

  <div
    className="
      absolute
      inset-0

      scale-[1.8]

      rounded-full

      bg-[#fcfbf8]

      blur-3xl

      opacity-80
    "
  />

  <div className="relative flex items-center gap-6">
    ...
  </div>

</div>

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
          <ButtonCard label="See more products" to="/products"/>
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