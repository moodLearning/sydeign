import React from "react";
import { Filter } from "lucide-react"; 
import { useSearchParams } from "react-router";

export const PRICE_FILTER_CONFIG = {
  MIN_LIMIT: 0,      
  MAX_LIMIT: 1000,    
  STEP: 100,          
};

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
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read current max price from URL, falling back dynamically to our configured max limit
  const currentMaxPrice = Number(searchParams.get('maxPrice') ?? PRICE_FILTER_CONFIG.MAX_LIMIT);

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

  // Instantly update search params as the slider moves
  const handleSliderChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    
    // If the slider is dragged to the absolute maximum limit, clean up the URL parameter
    if (value < PRICE_FILTER_CONFIG.MAX_LIMIT) {
      params.set('maxPrice', value.toString());
    } else {
      params.delete('maxPrice');
    }
    
    setSearchParams(params, { replace: true, preventScrollReset: true });
  };

  return (
    <aside className="mb-80 w-full md:w-80 shrink-0 bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-6 shadow-sm z-50 pointer-events-auto isolate">
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

        {/* Input elements are now fully configured from your config variables */}
        <input
          type="range"
          min={PRICE_FILTER_CONFIG.MIN_LIMIT}
          max={PRICE_FILTER_CONFIG.MAX_LIMIT}
          step={PRICE_FILTER_CONFIG.STEP}
          value={currentMaxPrice}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />

        {/* Price Indicators display dynamically */}
        <div className="flex justify-between mt-2">
          <span className="text-base font-medium text-gray-500">
            ₱{PRICE_FILTER_CONFIG.MIN_LIMIT.toLocaleString()}
          </span>
          <span className="text-base font-bold text-primary">
            ₱{currentMaxPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
}