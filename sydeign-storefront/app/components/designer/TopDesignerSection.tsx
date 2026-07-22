import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DesignerCard } from './DesignerCard';
import type { Designer } from '../../data/shopify';

interface TopDesignerSectionProps {
  list: Designer[];
}

export function TopDesignerSection({
  list,
}: TopDesignerSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    const container = containerRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  }

  if (!list.length) return null;

  return (
    <section className="top-designers-section">

      {/* White Background */}
      <div className="top-designers-bg-white" />

      {/* Wallpaper Fade */}
      <div
        className="top-designers-wallpaper"
        style={{
          backgroundImage: "url('/textured-wallpaper.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.98) 100%, black 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.98) 100%, black 100%)',
        }}
      />

      {/* Soft Glow */}
      <div className="top-designers-glow" />

      <div className="top-designers-container">

        <header className="top-designers-header">

          <h2 className="section-header text-[#9c522b] uppercase">
            Top Designers
          </h2>

          <p className="section-body max-w-2xl mx-auto">
            Meet the artists whose work continues to inspire our community
            through craftsmanship, creativity, and timeless design.
          </p>

          <div className="top-designers-divider-row">

            <div className="top-designers-divider-line" />

            <div className="top-designers-divider-diamond" />

            <div className="top-designers-divider-line" />

          </div>

        </header>

        <div className="top-designers-carousel-wrap group">

          <CarouselButton
            direction="left"
            onClick={() => scroll('left')}
          />

          <div
            ref={containerRef}
            className="top-designers-carousel-track"
          >
            {list.map((designer) => (
              <div
                key={designer.id}
                className="top-designers-carousel-item"
              >
                <DesignerCard designer={designer} />
              </div>
            ))}
          </div>

          <CarouselButton
            direction="right"
            onClick={() => scroll('right')}
          />

        </div>

      </div>

    </section>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const Icon =
    direction === 'left'
      ? ChevronLeft
      : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className={`top-designers-carousel-btn ${
        direction === 'left'
          ? 'top-designers-carousel-btn-left'
          : 'top-designers-carousel-btn-right'
      }`}
    >
      <Icon size={20} />
    </button>
  );
}