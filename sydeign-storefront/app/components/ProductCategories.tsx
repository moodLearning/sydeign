import React from 'react';
import { Link } from 'react-router-dom';

export function ProductCategoriesSection() {
  const productCategories = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300' },
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=300' },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' },
    { name: 'Hair Jewelry', image: 'https://images.unsplash.com/photo-1630799649561-c8112c295c52?w=300' },
    { name: 'Anklets', image: 'https://images.unsplash.com/photo-1617038260896-2b4742a17400?w=300' },
    { name: 'Brooches', image: 'https://images.unsplash.com/photo-1574236592233-0f508a2f4c9c?w=300' },
    { name: 'Toe Rings', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300' },
    { name: 'Cufflinks', image: 'https://images.unsplash.com/photo-1619551734325-8e9389e49186?w=300' },
    { name: 'Body Jewelry', image: 'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=300' },
    { name: 'Armlets', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
  ];

  return (
    <div>
      <h2 className="text-4xl font-sans text-center font-bold text-primary mb-8">
        Product Categories
      </h2>
      {/* 2-Row Grid for 11 Items */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-10 gap-x-4 justify-items-center relative z-10">
        {productCategories.map((cat, idx) => (
          <Link key={idx} to="/products" className="flex flex-col items-center group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm group-hover:border-[#3f5e43] transition relative">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              {/* Optional dark scrim gradient overlay like in your screenshot */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <span className="text-xs font-bold text-gray-700 mt-3 group-hover:underline text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
