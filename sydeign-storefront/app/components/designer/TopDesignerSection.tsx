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
    <section className="relative overflow-hidden py-24">

      {/* White Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Wallpaper Fade */}
      <div
        className="absolute inset-0 opacity-100"
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
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[900px]
          h-[500px]
          rounded-full
          bg-[#ead8ca]/30
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative z-10 max-w-[1700px] mx-auto px-6">

        <header className="mb-12">

          <h2 className="section-header text-[#9c522b] uppercase">
            Top Designers
          </h2>

          <p className="section-body max-w-2xl mx-auto">
            Meet the artists whose work continues to inspire our community
            through craftsmanship, creativity, and timeless design.
          </p>

          <div className="mt-8 mb-12 flex items-center justify-center gap-4">

            <div className="h-px w-20 bg-[#c79a7d]/40" />

            <div className="h-3 w-3 rotate-45 border border-[#9c522b]/60 bg-white" />

            <div className="h-px w-20 bg-[#c79a7d]/40" />

          </div>

        </header>

        <div className="relative group lg:px-40">

          <CarouselButton
            direction="left"
            onClick={() => scroll('left')}
          />

          <div
            ref={containerRef}
            className="
              flex
              gap-6
              overflow-x-auto
              pb-6
              snap-x
              snap-mandatory
              scroll-smooth
              no-scrollbar
            "
          >
            {list.map((designer) => (
              <div
                key={designer.id}
                className="
                  w-[280px]
                  sm:w-[300px]
                  shrink-0
                  snap-start
                "
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
        h-12
        w-12
        rounded-full
        border
        border-[#d6b49b]
        bg-white/90
        backdrop-blur-sm
        text-[#9c522b]
        shadow-lg
        opacity-0
        transition-all
        duration-300
        group-hover:opacity-100
        hover:bg-[#9c522b]
        hover:text-white
        hover:scale-105
      `}
    >
      <Icon size={20} />
    </button>
  );
}