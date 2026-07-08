import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DiscoverDesignerCard } from './DiscoverDesignerCard'; // Adjust path as needed
import * as Data from '../data/data';

export function DiscoverDesignerSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  
  // 1. Items per page configuration (Matches the 3 rows in your screenshot example)
  const ITEMS_PER_PAGE = 3;

  const filteredList = Data.designers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Paginate the list based on the active diamond page index
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentPagedList = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 0 if the user types a new search query that shrinks results
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div className="w-full">
      {/* Title styling */}
      <div className="flex flex-col items-center justify-center mb-2">
        <h2 className="section-subheader text-center">
          Meet The <span className="text-[#556b57]">Designers</span>
        </h2>
      </div>
      
      {/* Search Input Bar Utility */}
      <div className="max-w-xl mx-auto mb-16 relative">
        <div className="flex items-center bg-white border border-stone-300 rounded-lg px-4 py-2 shadow-sm">
          <Search size={18} className="text-stone-400 mr-2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..." 
            className="w-full bg-transparent text-sm focus:outline-none text-stone-800"
          />
        </div>
      </div>

      {/* Render the extracted Card Components */}
      {currentPagedList.length > 0 ? (
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {currentPagedList.map((designer, idx) => {
            const matchedProduct = Data.products.find(
              (p) => p.designer === designer.name || p.designer === designer.id
            );
            
            const showcaseProductImage = matchedProduct?.image || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300';
            
            return (
              <DiscoverDesignerCard 
                key={designer.id}
                designer={designer}
                productImage={showcaseProductImage}
                isAlternate={idx % 2 !== 0}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-stone-400 text-sm font-medium border-2 border-dashed border-stone-200 rounded-3xl max-w-xl mx-auto">
          No matching designers found.
        </div>
      )}

      {/* Dynamic Diamond Pagination Bar Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12 select-none">
          {Array.from({ length: totalPages }).map((_, pageIdx) => {
            const isActive = pageIdx === currentPage;
            return (
              <button
                key={pageIdx}
                type="button"
                onClick={() => setCurrentPage(pageIdx)}
                className={`text-base font-serif transition-all duration-300 transform hover:scale-125 cursor-pointer outline-none focus:outline-none ${
                  isActive 
                    ? 'text-[#9c522b] font-bold drop-shadow-[0_0_3px_rgba(156,82,43,0.4)]' 
                    : 'text-[#9c522b]/30 hover:text-[#9c522b]/60'
                }`}
                title={`Go to page ${pageIdx + 1}`}
              >
                ✦
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}