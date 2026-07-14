import {useRef} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {DesignerCard} from './DesignerCard';

interface TopDesignerSectionProps {
  list: any[];
}

export function TopDesignerSection({ list }: TopDesignerSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel( direction: 'left' | 'right' ) {
    const container = carouselRef.current;
    if (!container) return;

    container.scrollBy({
      left:
        direction === 'left'
          ? -340
          : 340,
      behavior: 'smooth',
    });
  }

  if (!list.length) return null;

  return (
    <div className="relative group w-full py-15 px-20">

      <h2 className="section-header font-cinzel text-center text-[#9c522b] uppercase tracking-widest mb-1">
        Top Designers
      </h2>

      <div className="mb-10 flex items-center justify-center gap-2">
        <div className="h-px w-16 bg-[#9c522b]/30" />
        <span className="text-xs text-[#9c522b]">✦</span>
        <div className="h-px w-16 bg-[#9c522b]/30" />
      </div>

      <button
        type="button"
        onClick={() => scrollCarousel('left')}
        aria-label="Scroll left"
        className="
          absolute
          -left-4
          top-1/2
          -translate-y-1/2
          z-20
          hidden
          md:flex
          items-center
          justify-center
          rounded-full
          border
          border-gray-100
          bg-white
          p-2.5
          shadow-md
          opacity-0
          transition
          group-hover:opacity-100
          hover:text-primary
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="
          flex
          gap-6
          overflow-x-auto
          pb-6
          snap-x
          snap-mandatory
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

      <button
        type="button"
        onClick={() => scrollCarousel('right')}
        aria-label="Scroll right"
        className="
          absolute
          -right-4
          top-1/2
          -translate-y-1/2
          z-20
          hidden
          md:flex
          items-center
          justify-center
          rounded-full
          border
          border-gray-100
          bg-white
          p-2.5
          shadow-md
          opacity-0
          transition
          group-hover:opacity-100
          hover:text-primary
        "
      >
        <ChevronRight size={20} />
      </button>

    </div>
  );
}