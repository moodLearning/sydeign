import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductSection from '../components/ProductsSection';
import * as Data from '../data/data';

export default function ProductsIndex() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const bannerName = activeCategory.toLowerCase().replace(/\s+/g, '-');

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
  };

  return (
    <main
      className="bg-background min-h-screen"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      
    {/* Banner */}
    <header className="relative h-[280px] overflow-hidden shadow-xl">
      <img
        key={bannerName} 
        src={`/${bannerName}-banner.png`}
        alt={`${activeCategory} banner`}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        onError={(e) => {
          e.currentTarget.src = '/default-banner.png';
        }}
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-12 items-center">
          <h1 className="font-cinzel text-8xl text-white drop-shadow-lg text-center">
            {activeCategory}
          </h1>
        </div>
      </div>
    </header>


      {/* Content */}
      <div className="lg:max-w-4/5 sm:max-w-screen mx-auto flex">
        {/* Sidebar */}
        <aside className="w-100 shrink-0 bg-white border-r border-gray-200">
          <Sidebar onFilterChange={handleFilter} />
        </aside>

        {/* Products */}
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
