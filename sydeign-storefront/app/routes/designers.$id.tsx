import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import * as Data from '../data/data';

// Declare a local interface that extends whatever your base Designer type is, 
// ensuring TypeScript knows these extra fields are completely fine.
interface ExtendedDesigner {
  id: string;
  name: string;
  handle?: string;
  image: string;
  bio: string;
  designsCount?: string;
  followersCount?: string;
}

export default function SelectedDesignerPage() {
  const { id } = useParams();
  
  const ITEMS_PER_PAGE = 8;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Find target designer data and explicitly cast it to our extended helper type
  const foundDesigner = Data.designers.find((d) => d.id === id);
  
  const designer = (foundDesigner || {
    id: 'ann-ong',
    name: 'Ann Ong',
    handle: '@ann_ong_',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    designsCount: '143 Designs',
    followersCount: '333k Followers'
  }) as ExtendedDesigner;

  const filteredProducts = Data.products?.filter(
    (p) => p.designer === designer.name || p.designer === designer.id
  ) || [];

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [id]);

  const currentPagedProducts = filteredProducts.slice(0, visibleCount);
  const totalPagesCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const activePageIndex = Math.min(Math.floor((visibleCount - 1) / ITEMS_PER_PAGE), totalPagesCount - 1);

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-gray-900 font-sans pb-24 relative z-10 shadow-lg rounded-2xl">
      
      {/* WRAPPER: TOP SECTION */}
      <div className="border-b border-stone-200/40 pb-12 bg-background">
        {/* Hero Landscape Banner Section */}
        <div className="w-full relative h-[240px] md:h-[300px] bg-stone-900 z-10">
          <img 
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600" 
            alt="Designer Workspace Background" 
            className="w-full h-full object-cover opacity-60 filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50/20" />

          {/* Portrait Overlap */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-2 bg-[#fcfdfa] shadow-xl relative">
              <div className="absolute inset-0 rounded-full border-4 border-[#d1a153] opacity-90 pointer-events-none z-40" />
              <img 
                src={designer.image} 
                alt={designer.name} 
                className="w-full h-full object-cover rounded-full relative z-30"
              />
              <div className="absolute -right-4 bottom-2 bg-[#445c49] text-white text-[9px] font-serif uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md border border-[#d1a153]/30 z-40">
                Designer
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Metadata */}
        <div className="max-w-5xl mx-auto px-6 mt-20 text-center relative z-20">
          <div className="mb-4">
            <button type="button" className="border border-[#c36a3e] text-[#c36a3e] hover:bg-[#c36a3e] hover:text-white font-serif text-xs uppercase font-semibold tracking-widest px-6 py-1.5 rounded-full transition-all cursor-pointer">
              Follow
            </button>
          </div>

          <h1 className="section-header font-cinzel">
            {designer.name}
          </h1>
          
          <div className="flex items-center justify-center gap-1.5 text-[#c36a3e] mb-4">
            <span className="text-sm">★★★★★</span>
            <span className="text-xs font-semibold tracking-wider text-stone-500 font-sans ml-1">
              {designer.handle || '@designer'}
            </span>
            <span className="text-emerald-700 text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-100">✔</span>
          </div>

          {/* Performance Metrics Rows */}
          <div className="flex justify-center items-center gap-4 text-xs font-medium text-stone-600 mb-4 font-serif uppercase tracking-wider">
            <span>{designer.designsCount || '84 Designs'}</span>
            <span className="text-[#9c522b]/50 text-[10px]">✦</span>
            <span>{designer.followersCount || '4k Followers'}</span>
          </div>

          {/* Pure SVG Social Media Link Icons Row */}
          <div className="flex items-center justify-center gap-4 text-stone-500 mb-8">
            <a href="#facebook" className="hover:text-[#c36a3e] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="#instagram" className="hover:text-[#c36a3e] transition-colors">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" w="20" h="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#twitter" className="hover:text-[#c36a3e] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#youtube" className="hover:text-[#c36a3e] transition-colors">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>

          <p className="section-body">
            {designer.bio}
          </p>
        </div>
      </div>

      {/* LOWER CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="mt-20 mb-12">
          <h2 className="section-subheader">
            The Designer's Collection
          </h2>
          <div className="flex justify-start">
            <button type="button" className="bg-[#c36a3e] hover:bg-[#b05c32] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 tracking-wide uppercase cursor-pointer">
              <ArrowUpDown size={14} />
              Sort By
            </button>
          </div>
        </div>

        {currentPagedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {currentPagedProducts.map((product, idx) => {
              const isLargeBanner = idx === 0;
              return (
                <Link 
                  key={product.id || idx} 
                  to={`/products/${product.id || idx}`} 
                  className={`group bg-white border border-stone-200/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all p-2 flex flex-col ${
                    isLargeBanner ? 'row-span-2 col-span-2 md:col-span-1 md:row-span-2' : ''
                  }`}
                >
                  <div className="w-full flex-1 bg-stone-50 rounded-xl overflow-hidden relative aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name || 'Collection Item'} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-stone-400 text-sm font-medium border-2 border-dashed border-stone-200 rounded-2xl">
            No collection assets published yet.
          </div>
        )}

        {totalPagesCount > 1 && (
          <div className="flex flex-col items-center gap-6 mt-20">
            <div className="flex justify-center items-center gap-4 text-sm select-none w-full">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#9c522b]/30 flex-1 max-w-[100px]" />
              
              {Array.from({ length: totalPagesCount }).map((_, pageIdx) => {
                const isActive = pageIdx <= activePageIndex;
                return (
                  <button
                    key={pageIdx}
                    type="button"
                    onClick={() => setVisibleCount((pageIdx + 1) * ITEMS_PER_PAGE)}
                    className={`transition-all duration-300 transform hover:scale-135 cursor-pointer outline-none focus:outline-none ${
                      isActive 
                        ? 'text-[#9c522b] scale-125 font-bold drop-shadow-[0_0_3px_rgba(156,82,43,0.4)]' 
                        : 'text-[#9c522b]/30 hover:text-[#9c522b]/60'
                    }`}
                    title={`Page ${pageIdx + 1}`}
                  >
                    ✦
                  </button>
                );
              })}

              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#9c522b]/30 flex-1 max-w-[100px]" />
            </div>

            {visibleCount < filteredProducts.length && (
              <button
                type="button"
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="text-xs font-serif uppercase tracking-widest text-[#9c522b] hover:text-[#b05c32] border-b border-[#9c522b]/40 pb-1 font-semibold transition-all cursor-pointer"
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}