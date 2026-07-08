import React, { useRef } from 'react';
import '../styles/tailwind.css';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { DesignerSection } from '../components/DesignerSection'
import { ProductCategoriesSection } from '../components/ProductCategories'
import { FaqSection } from '../components/FAQ'
import { Button, ButtonAlt } from '../components/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/data';

export default function HomePage() {
const topSellingProducts = products.filter(product => 
    product.sections.includes('topSelling')
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const offset = direction === 'left' ? -340 : 340;
      
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      <section 
        className="shadow-md relative h-[60vh] lg:h-screen flex items-center justify-center bg-gray-200 z-4">
        <img
          src="./home-banner.png"
          alt="Sydeign Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          style={{ objectPosition: 'top center' }} 
        />  
        
        <div className="absolute z-10 text-center bottom-20 lg:bottom-35 left-1/2 transform -translate-x-1/2 text-primary">
          <h2 className="hero-title">
            Your story, your style
          </h2>
        </div>

        <div className="absolute bottom-10 lg:bottom-25 z-20">
          <ButtonAlt label="Explore Now" to="/products" />
        </div>
      </section> 
      <section className="relative py-16 bg-background border-y border-gray-100 w-full overflow-hidden z-20">
      <div className="max-w-360 mx-auto px-6 md:px-12 relative group">
        
        {/* Section Typography Headers */}
        <div className="mb-10">
          <h2 className="section-header">
            Masterpieces to Discover
          </h2>
          <p className="section-body">
            Lorem ipsum viverra pellentesque phasellus auctor volutpat mi placerat lorem vel, mollis feugiat tellus ut quis in rutrum neque feugiat turpis, placerat dapibus.
          </p>
          <h3 className="section-subheader">
            Top Selling Products
          </h3>
        </div>

        <div className="relative w-full">
          
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-40 bg-white border border-gray-100 text-gray-600 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary hover:bg-gray-50 cursor-pointer hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Core Horizontal Scroll Strip Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }} // Smooth fluid momentum native touch swipe for mobile
          >
            {topSellingProducts.map((product) => (
              // shrink-0 holds widths solid inside the flex layout row without squishing
              <div 
                key={product.id} 
                className="w-[280px] sm:w-[300px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-40 bg-white border border-gray-100 text-gray-600 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary hover:bg-gray-50 cursor-pointer hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
          
        </div>

        {/* Action Bottom Footer */}
        <div className="mt-6 flex justify-center">
          <Button label="See more products" to="/products" className="mt-4" />
        </div>

      </div>
    </section>

      <div className="shadow-md relative w-full bg-white z-20 pb-4">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8"><DesignerSection /></div>
        </section>
      </div>
          
      <div className="shadow-md relative w-full bg-background z-10 pb-4">
        <section className="w-full py-20">
          <div className="max-w-[1800px] mx-auto px-8"><ProductCategoriesSection /></div>
        </section>
      </div>
          
      <div className="shadow-xl relative w-full bg-white z-0">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8 z-50"><FaqSection /></div>
        </section>
      </div>
    </div>  
  );
}
