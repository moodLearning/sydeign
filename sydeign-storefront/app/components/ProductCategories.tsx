import React from 'react';
import { Link } from 'react-router-dom';
import { productCategories } from '../data/data'; 

export function ProductCategoriesSection() {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-bold text-primary font-sans text-center mb-12">
        Product Categories
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 justify-items-center">
        {productCategories.map((cat, idx) => (
          <Link key={idx} to={`/products?category=${cat.name}`} className="flex flex-col items-center group w-full">
            <div className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border border-stone-200 shadow-md transition-all duration-300">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300" />
            </div>            
            <span className="text-lg font-bold font-sans text-primary mt-4 text-center">
              {cat.name}
            </span>
          </Link>        
        ))}
      </div>
    </div>  
  );
}
