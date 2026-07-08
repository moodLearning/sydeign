import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DesignerCard } from './DesignerCard'; // Adjust path if needed
import * as Data from '../data/data';

export function TopDesignerSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const topRatedList = Data.designers.filter(d => d.isTopRated);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const offset = direction === 'left' ? -280 : 280;
      carouselRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/section w-full py-4">
      {/* Ornate Heading Styling */}
      <h2 className="section-header font-cinzel text-center text-[#9c522b] uppercase tracking-widest mb-1">
        Top Designers
      </h2>
      <div className="flex justify-center items-center gap-2 mb-10">
        <div className="h-[1px] bg-[#9c522b]/30 w-16" />
        <span className="text-[#9c522b] text-xs">✦</span>
        <div className="h-[1px] bg-[#9c522b]/30 w-16" />
      </div>

      {/* Navigation Controls */}
      <button 
        type="button"
        onClick={() => scrollCarousel('left')}
        className="absolute -left-4 top-[60%] -translate-y-1/2 z-20 bg-white border border-stone-200 p-2.5 rounded-full shadow-md text-stone-600 opacity-0 group-hover/section:opacity-100 transition-opacity hover:text-[#9c522b] hidden md:block cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Slider Viewport Track utilizing your custom component */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {topRatedList.map((designer) => (
          <div key={designer.id} className="shrink-0 snap-start">
            <DesignerCard designer={designer} />
          </div>
        ))}
      </div>

      <button 
        type="button"
        onClick={() => scrollCarousel('right')}
        className="absolute -right-4 top-[60%] -translate-y-1/2 z-20 bg-white border border-stone-200 p-2.5 rounded-full shadow-md text-stone-600 opacity-0 group-hover/section:opacity-100 transition-opacity hover:text-[#9c522b] hidden md:block cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}