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
    <div className="py-15">
      <h2 className="text-4xl font-bold text-primary font-sans text-center mb-12">
        Product Categories
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 justify-items-center">
        {collections.map((collection) => (
          <Link 
            key={collection.id} 
            to={`/collections/${collection.handle}`} 
            className="flex flex-col items-center group w-full"
          >
            <div className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border border-stone-200 shadow-md transition-all duration-300">
              {collection.image?.url ? (
                <img 
                  src={collection.image.url} 
                  alt={collection.image.altText || collection.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-xs text-stone-400 font-sans font-medium text-center p-2">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300" />
            </div>            
            
            <span className="text-lg font-bold font-sans text-primary mt-4 text-center line-clamp-2 px-2">
              {collection.title}
            </span>
          </Link>        
        ))}
      </div>
    </div>  
  );
}