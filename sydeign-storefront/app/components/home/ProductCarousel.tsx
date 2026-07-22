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
  className="home-carousel-section"
  style={{
    backgroundImage: "linear-gradient(to bottom, transparent 0%, var(--background, #fff5e1) 80%, var(--background, #fff5e1) 100%), url('/textured-wallpaper.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
      <div className="home-carousel-container">
        <header className="home-carousel-header">
          <div className="home-carousel-title-row">
            <div className="home-carousel-title-inner">
              {/* Left Diamond */}
              <span className="product-categories-diamond" />

              <h2 className="product-categories-title">
                  Bestselling Products

              </h2>

              {/* Right Diamond */}
              <span className="product-categories-diamond" />
            </div>
          </div>

          <p className="section-body">
            Browse through our live collection
            of carefully crafted design
            architectures and products.
          </p>

        </header>

        <div className="home-carousel-track-wrap group">
          <CarouselButton direction="left" onClick={() => scroll('left')}/>
          <div ref={containerRef} className="home-carousel-track">

            {products.map(product => (
              <div key={product.id} className="top-designers-carousel-item">
                <ProductCard product={product}/>
              </div>
            ))}

          </div>
          <CarouselButton direction="right" onClick={() => scroll('right')}/>
        </div>

        <div className="home-carousel-cta-wrap">
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
      className={`home-carousel-btn ${
        direction === 'left'
          ? 'home-carousel-btn-left'
          : 'home-carousel-btn-right'
      }`}
    >
      <Icon size={20}/>
    </button>

  );
}