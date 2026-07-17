import React, { useState } from 'react';
import { useLoaderData, Link, useSearchParams } from 'react-router-dom';
import { Heart, ShoppingCart, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { getProductsCatalog } from '../lib/products.server';
import { ProductCard } from '../components/product/ProductCard';
import type { Product } from '../data/shopify';

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

// 🟢 Lifted utility outside so both Loader and UI can cleanly access it
const normalizeString = (str: string) => 
  decodeURIComponent(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

export async function loader({ request, context }: any) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q')?.trim().toLowerCase() || '';
  const categoryFilter = url.searchParams.get('category')?.trim() || '';
  const normalizedFilter = normalizeString(categoryFilter);

  try {
    const { products, collections } = await getProductsCatalog(context.storefront);

    const filteredProducts = products.filter((product: Product) => {
      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          (product as any).designerName?.toLowerCase().includes(searchTerm)
        : true;

      const matchesCategory = normalizedFilter
        ? (product.collections as any)?.some((col: any) => {
            const normalizedTitle = normalizeString(col.title);
            const normalizedHandle = normalizeString(col.handle);
            return (
                normalizedTitle === normalizedFilter || 
                normalizedHandle === normalizedFilter
            );
            }) || 
            product.collections?.some((col: any) => {
            const normalizedTitle = normalizeString(col.title);
            const normalizedHandle = normalizeString(col.handle);
            return (
                normalizedTitle === normalizedFilter || 
                normalizedHandle === normalizedFilter
            );
            })
        : true;

      return matchesSearch && matchesCategory;
    });

    return {
      products: filteredProducts,
      collections: collections || [],
      searchTerm,
    };
  } catch (error) {
    console.error('Search page loader error:', error);
    return { products: [], collections: [], searchTerm: '' };
  }
}

export default function SearchResultsPage() {
  const { products, collections, searchTerm } = useLoaderData() as {
    products: Product[];
    collections: CollectionNode[];
    searchTerm: string;
  };
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('Best Match');

  const activeCategory = searchParams.get('category') || '';

  const handleCategoryClick = (categoryTitle: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (normalizeString(activeCategory) === normalizeString(categoryTitle)) {
      params.delete('category'); 
    } else {
      params.set('category', categoryTitle);
    }
    
    setSearchParams(params, { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] pb-24 font-sans text-gray-800">
      
      <section className="text-center py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-cinzel text-[#4B6B40] mb-8 font-semibold tracking-wide">
          What are you looking for?
        </h1>
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {collections.map((col: CollectionNode) => {
            const isSelected = normalizeString(activeCategory) === normalizeString(col.title);
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => handleCategoryClick(col.title)}
                className={`px-6 py-2 rounded-lg border text-lg font-medium transition duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4B6B40] text-white border-[#4B6B40]'
                    : 'bg-[#FFFCEB] text-[#4B6B40] border-[#BAC3A1] hover:bg-[#F2F4E1]'
                }`}
              >
                {col.title}
              </button>
            );
          })}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4D9C1] pb-4 mb-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-md text-[#7D8B62]">
            <Link to="/" className="flex items-center gap-1 hover:text-[#4B6B40]">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#4B6B40]">Search Results</span>
          </div>

          {/* Quick tags */}
          <div className="flex items-center gap-4 text-md text-[#7D8B62]">
            <span className="flex items-center gap-1 font-semibold text-[#4B6B40]">
              <SlidersHorizontal className="w-4 h-4" /> Popular Searches:
            </span>
            <span className="cursor-pointer hover:underline">Filipino Made</span>
            <span>|</span>
            <span className="cursor-pointer hover:underline">For Women</span>
            <span>|</span>
            <span className="cursor-pointer hover:underline">On Sale</span>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-lg">
            <span className="text-[#7D8B62]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FFFCEB] border border-[#BAC3A1] rounded px-3 py-1 text-lg text-[#4B6B40] focus:outline-none"
            >
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Search Feedback message */}
        {(searchTerm || activeCategory) && (
          <div className="mb-8 text-[#4B6B40]">
            Showing results 
            {searchTerm && <span> for "<span className="font-bold">{searchTerm}</span>"</span>}
            {activeCategory && <span> under category <span className="font-bold">{activeCategory}</span></span>}
            <span className="text-[#7D8B62] ml-2">({products.length} products found)</span>
          </div>
        )}

        {/* Filtered Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-dashed border-[#D4D9C1] rounded-3xl">
            <p className="text-[#7D8B62] text-lg font-medium">No jewelry items found matching your filters.</p>
            <p className="text-lg text-gray-400 mt-1">Try adjusting your keywords or clearing selected category pills.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}