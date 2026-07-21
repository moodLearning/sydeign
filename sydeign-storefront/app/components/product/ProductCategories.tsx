import React from 'react';
import { Link } from 'react-router';

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
}

interface ProductCategoriesSectionProps {
  collections: ShopifyCollection[];
}

export function ProductCategoriesSection({ collections }: ProductCategoriesSectionProps) {
  return (
    <section 
      className="relative pb-16 px-4 w-full rounded-3xl border-background"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 75%, #ffffff 100%), url('/desbg1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional: Simple fallback solid base in case the image fails to load */}
      <div className="absolute inset-0 bg-[#fcfbf8] -z-10" />

      {/* Premium Header */}
      <div className="pt-20 relative z-10 flex flex-col items-center py-12 select-none">
        <div className="flex items-center gap-6">
          {/* Left Diamond */}
          <span className="w-2.5 h-2.5 rotate-45 border border-[#7b5a45] bg-[#7b5a45]/10 shrink-0" />
          
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-primary text-center whitespace-nowrap">
            Product Categories
          </h2>
          
          {/* Right Diamond */}
          <span className="w-2.5 h-2.5 rotate-45 border border-[#7b5a45] bg-[#7b5a45]/10 shrink-0" />
        </div>
      </div>
      
      {/* Grid Container */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 justify-items-center max-w-8xl mx-auto pb-12 px-2 md:px-8 xl:px-16">
        {collections.map((collection) => (
          <Link 
            key={collection.id} 
            to={`/products?category=${encodeURIComponent(collection.handle)}`} 
            className="flex flex-col items-center group w-full"
          >
            {/* Elegant Circle Frame */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border border-[#e7ddd2] bg-white p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_15px_35px_rgba(123,90,69,0.12)] group-hover:border-[#7b5a45]/40">
              
              {/* Inner container to clip the circle cleanly */}
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {collection.image?.url ? (
                  <img 
                    src={collection.image.url} 
                    alt={collection.image.altText || collection.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#fbfaf8] flex items-center justify-center text-[10px] text-[#7b5a45] uppercase tracking-wider font-semibold text-center p-2">
                    No Image
                  </div>
                )}
                
                {/* Subtle overlay that fades out on hover to let the image reveal fully */}
                <div className="absolute inset-0 bg-[#7b5a45]/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>            
            
            {/* Typography */}
            <span className="mt-5 text-sm md:text-base font-serif font-medium text-[#2d2b29] tracking-wide text-center line-clamp-2 px-2 group-hover:text-[#7b5a45] transition-colors duration-300">
              {collection.title}
            </span>
          </Link>        
        ))}
      </div>
    </section>  
  );
}