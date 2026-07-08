import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductSection from '../components/ProductsSection';
import * as Data from '../data/data';

export default function ProductsIndex() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const bannerName = activeCategory
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const handleFilter = (cat: string) => {
    console.log("Category clicked:", cat); // Add this to trace events in your F12 console
    setActiveCategory(cat);
  };

  return (
    // Overflow hidden prevents full-width breakouts from triggering horizontal scrollbars
    <main className="bg-background min-h-screen w-full overflow-x-hidden">
      
      {/* Banner - Full screen breakout using robust positioning instead of negative margin tricks */}
      <header className="relative h-[280px] w-screen left-1/2 right-1/2 transform -translate-x-1/2 overflow-hidden shadow-xl z-10">
        <img
          key={activeCategory} 
          src={`/${bannerName}-banner.png`}
          alt={`${activeCategory} banner`}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/default-banner.png';
          }}
        />

        {/* Dimmer tint overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Centered Heading Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[1400px] w-full px-12 text-center">
            <h1 className="font-cinzel text-6xl md:text-8xl text-white drop-shadow-lg uppercase tracking-wide">
              {activeCategory}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Grid Content - Separates layout tracks so elements cannot overlay each other */}
      <div className="max-w-screen mx-auto flex flex-col md:flex-row gap-8 px-6 md:px-12 mt-12 relative z-20">
        
        {/* Sidebar Track */}
        <Sidebar activeCategory={activeCategory} onFilterChange={handleFilter} />

        {/* Products Section Track */}
        <section className="flex-1 bg-background pb-20">
          {Data.sections.map((section, index) => (
            <ProductSection
              key={section.key}
              title={section.title}
              sectionKey={section.key}
              allProducts={Data.products}
              activeCategory={activeCategory}
              className={index % 2 !== 0 ? "bg-background" : "bg-white"}
            />
          ))}
        </section>

      </div>
    </main>
  );
}