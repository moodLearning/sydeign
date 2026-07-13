import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { DiscoverDesignerCard } from './DiscoverDesignerCard';
import * as Data from '../data/data';

const ITEMS_PER_PAGE = 3;

export function DiscoverDesignerSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredList = useMemo(() => {
    return Data.designers.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const currentPagedList = filteredList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-12 text-center">
        <h2 className="section-subheader text-center">
          Meet The <span className="text-[#556b57]">Designers</span>
        </h2>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-16 px-4">
        <div className="flex items-center bg-white border border-stone-300 rounded-lg px-4 py-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#556b57]/20">
          <Search size={18} className="text-stone-400 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search designers..."
            className="w-full bg-transparent text-sm focus:outline-none text-stone-800"
          />
        </div>
      </div>

      {/* Designer List */}
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-10 min-h-[600px]">
        {currentPagedList.length > 0 ? (
          currentPagedList.map((designer, idx) => {
            const matchedProduct = Data.products.find(
              (p) => p.designer === designer.name || p.designer === designer.id
            );
            const image = matchedProduct?.image || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300';

            return (
              <DiscoverDesignerCard
                key={designer.id}
                designer={designer}
                productImage={image}
                isAlternate={idx % 2 !== 0}
              />
            );
          })
        ) : (
          <div className="text-center py-16 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-3xl">
            No matching designers found.
          </div>
        )}
      </div>

      {/* Diamond Pagination */}
      {totalPages > 1 && (
      <div className="absolute left-0 right-0 bottom-8 z-[100] flex justify-center items-center gap-4 select-none pointer-events-none">
        {Array.from({ length: totalPages }).map((_, pageIdx) => (
          <button
            key={pageIdx}
            type="button"
            className="pointer-events-auto text-2xl transition-all duration-300 transform hover:scale-125 ..."
            onClick={() => {
              setCurrentPage(pageIdx);
              console.log("Clicked page:", pageIdx);
            }}
          >
            ✦
          </button>
        ))}
      </div>      )}
    </div>
  );
}
