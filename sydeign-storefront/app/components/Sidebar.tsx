import React from "react";
import { Filter } from "lucide-react"; 

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

interface SidebarProps {
  activeCategory: string;
  onFilterChange: (cat: string) => void;
  collections: ShopifyCollection[];
}

export default function Sidebar({ activeCategory, onFilterChange, collections }: SidebarProps) {
  const excludedCategories = [
    "home page",
    "daily discovery",
    "new arrivals",
    "best sellers",
    "on sale"
  ];

  const filteredCollections = collections.filter(
    (col) => !excludedCategories.includes(col.title.toLowerCase())
  );

  return (
    <aside className="w-full md:w-80 shrink-0 bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-6 shadow-sm z-50 pointer-events-auto isolate">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-primary mb-4 pb-2 border-b border-gray-100">
          <Filter size={24} />
          Categories
        </h2>
        
        <ul className="space-y-1">
          {/* All Products Option */}
          <li>
            <button 
              type="button"
              onClick={() => onFilterChange('All Products')}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-lg transition-all cursor-pointer block ${
                activeCategory === 'All Products' 
                  ? 'bg-primary/10 text-primary font-bold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              All Products
            </button>
          </li>

          {/* Cleaned Dynamic Sidebar Menu List */}
          {filteredCollections.map((collection) => (
            <li key={collection.id}>
              <button 
                type="button"
                onClick={() => onFilterChange(collection.title)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-lg transition-all cursor-pointer block ${
                  activeCategory.toLowerCase() === collection.title.toLowerCase()
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {collection.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-8 border-gray-100" />

      {/* Price Range Section */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Price Range
        </h2>

        <input
          type="range"
          min="1000"
          max="10000"
          className="w-full accent-primary cursor-pointer"
        />

        <div className="flex justify-between mt-2 mb-6">
          <span className="text-base font-medium text-gray-500">₱1,000</span>
          <span className="text-base font-medium text-gray-500">₱10,000</span>
        </div>

        <button 
          type="button"
          className="w-full border-2 border-primary text-primary text-xl font-semibold rounded-xl py-2.5 hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          APPLY
        </button>
      </div>
    </aside>
  );
}