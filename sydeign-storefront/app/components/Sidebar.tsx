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
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-heading">
          <Filter size={24} />
          Categories
        </h2>

        <ul className="sidebar-list">
          {/* All Products Option */}
          <li>
            <button
              type="button"
              onClick={() => onFilterChange('All Products')}
              className={`sidebar-link ${
                activeCategory === 'All Products'
                  ? 'sidebar-link-active'
                  : 'sidebar-link-inactive'
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
                className={`sidebar-link ${
                  activeCategory.toLowerCase() === collection.title.toLowerCase()
                    ? 'sidebar-link-active'
                    : 'sidebar-link-inactive'
                }`}
              >
                {collection.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr className="sidebar-divider" />

      {/* Price Range Section */}
      <div>
        <h2 className="sidebar-subheading">
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
          className="sidebar-range-input"
        />

        {/* Price Indicators display dynamically */}
        <div className="sidebar-price-row">
          <span className="sidebar-price-min">
            ₱{PRICE_FILTER_CONFIG.MIN_LIMIT.toLocaleString()}
          </span>
          <span className="sidebar-price-max">
            ₱{currentMaxPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
}