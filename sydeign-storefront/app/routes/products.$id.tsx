import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ProductCard } from '../components/ProductCard';
import * as Data from '../data/data';
import { Heart, Share2, Paperclip, Send, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  const product = Data.products.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1); 
    }
  }, [product]);

  if (!product) {
    return (
      <div className="w-full text-center py-20 bg-[#fcfdfa] min-h-screen">
        <h2 className="text-2xl font-serif text-gray-800 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-primary underline font-medium">Back to All Products</Link>
      </div>
    );
  }

  const similarProducts = Data.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const recentlyViewedProducts = Data.products
    .filter((p) => p.id !== product.id)
    .slice(0, 4); // Fallback mock slice matching structure

  const thumbnailList = [
    product.image,
    'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=200',
    'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=200',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200'
  ];

  return (
    <div className="w-full bg-[#fcfdfa] min-h-screen">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 px-6 md:px-12 py-8">
        
        {/* Left Side Track - Persistent Layout Sidebar */}
        <Sidebar activeCategory={product.category} onFilterChange={(cat) => console.log(cat)} />

        {/* Right Side Track - Complete Product Details Dashboard */}
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {/* Main Product Panel Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-gray-100">
            
            {/* Gallery Track (Columns 1-7) */}
            <div className="lg:col-span-7 flex gap-4 h-[420px]">
              <div className="flex flex-col items-center justify-between h-full py-1">
                <button type="button" className="text-gray-400 hover:text-primary"><ChevronLeft className="rotate-90 w-4 h-4" /></button>
                <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar max-h-[360px]">
                  {thumbnailList.map((thumb, index) => (
                    <button 
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(thumb)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-colors ${selectedImage === thumb ? 'border-primary' : 'border-gray-200'}`}
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button type="button" className="text-gray-400 hover:text-primary"><ChevronRight className="rotate-90 w-4 h-4" /></button>
              </div>

              <div className="flex-1 h-full bg-gray-50 rounded-2xl overflow-hidden shadow-inner relative">
                <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Config & Buy Actions Panel (Columns 8-12) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 text-sm">★★★★★</span>
                    <span className="font-semibold text-gray-700">5.0</span>
                    <span>• 22k sold</span>
                  </div>
                  <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Item Available</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-1 leading-tight">{product.name}</h1>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-medium text-primary underline cursor-pointer">{product.designer}</span>
                  <div className="flex items-center gap-2">
                    <button type="button" className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-50"><Heart size={18} /></button>
                    <button type="button" className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-50"><Share2 size={18} /></button>
                  </div>
                </div>

                <div className="section-subheader">₱ {product.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
                <p className="text-gray-600 text-xs leading-relaxed text-justify mb-6">
                  This fine custom {product.category.toLowerCase()} artwork is crafted exquisitely by {product.designer}, showcasing premium quality materials constructed into organic masterwork aesthetics.
                </p>
              </div>

              {/* Controls Configuration */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <select className="border border-gray-200 rounded-xl px-2 py-2 text-xs text-gray-600 bg-white focus:outline-primary"><option>Size Select</option></select>
                  <select className="border border-gray-200 rounded-xl px-2 py-2 text-xs text-gray-600 bg-white focus:outline-primary"><option>Material Specs</option></select>
                  <select className="border border-gray-200 rounded-xl px-2 py-2 text-xs text-gray-600 bg-white focus:outline-primary"><option>Color Variant</option></select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden text-xs">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 hover:bg-gray-200 font-bold">-</button>
                    <span className="px-4 font-semibold text-gray-700 min-w-[24px] text-center">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 hover:bg-gray-200 font-bold">+</button>
                  </div>
                  <button type="button" className="flex-1 bg-primary text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition shadow-sm uppercase tracking-wider">Add to Cart</button>
                  <button type="button" className="flex-1 bg-[#c36a3e] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#b05c32] transition shadow-sm uppercase tracking-wider">Buy Now</button>
                </div>
              </div>

            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-12">
            <h2 className="section-subheader">Customer Reviews</h2>
            
            <div className="grid grid-cols-1 Lum:grid-cols-12 gap-8 items-start mb-10 lg:grid-cols-12">
              <div className="lg:col-span-4 flex items-center gap-6 border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800 leading-none">5.0</div>
                  <div className="text-xs text-amber-500 my-1.5">★★★★★</div>
                  <div className="text-[11px] text-gray-400 whitespace-nowrap">(22 reviews)</div>
                </div>
                <div className="flex-1 space-y-1">
                  {[22, 0, 0, 0, 0].map((count, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className="text-amber-500 shrink-0">{"★".repeat(5 - i)}{"☆".repeat(i)}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#c36a3e] rounded-full" style={{ width: i === 0 ? '100%' : '0%' }} />
                      </div>
                      <span className="text-gray-400 w-3 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 border border-gray-200 rounded-2xl p-4 relative bg-white shadow-sm">
                <textarea placeholder="Write your review here..." className="w-full min-h-[85px] border-none resize-none focus:outline-none text-sm placeholder-gray-400" />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <div className="text-gray-300 text-sm">☆☆☆☆☆</div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <button type="button"><Paperclip size={16} /></button>
                    <button type="button" className="text-emerald-800"><Send size={16} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Reviews Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { name: 'iamme', date: '01/08/2023', text: 'This item is absolutely stunning! It adds a highly sophisticated touch to any outfit outfit layout. I highly recommend it!' },
                { name: 'Bell4t', date: '01/08/2023', text: 'Absolutely gorgeous piece! Timeless aesthetic classics. The build signature quality is pristine.' },
                { name: 'Ariel Liebert', date: '12/10/2023', text: 'Exceeded all expectations! Shipped carefully protected and stands out wonderfully.' }
              ].map((rev, index) => (
                <div key={index} className="border border-[#e2e8f0] bg-[#fafbf8] rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs uppercase text-primary">{rev.name[0]}</div>
                        <span className="text-xs font-semibold text-gray-800">{rev.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                    </div>
                    <div className="text-amber-500 text-[10px] mb-2">★★★★★</div>
                    <p className="text-gray-600 text-[11px] leading-relaxed text-justify mb-4">{rev.text}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mt-auto">
                    <div className="h-12 bg-gray-200 rounded-lg overflow-hidden"><img src={product.image} className="w-full h-full object-cover" alt="" /></div>
                    <div className="h-12 bg-gray-200 rounded-lg overflow-hidden"><img src={thumbnailList[1]} className="w-full h-full object-cover" alt="" /></div>
                    <div className="h-12 bg-gray-200 rounded-lg overflow-hidden relative"><img src={thumbnailList[2]} className="w-full h-full object-cover opacity-70" alt="" /><div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-[10px] font-bold">▶</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Recommendation Sliders */}
      <div className="w-full bg-background py-16 border-t border-gray-100 rounded-2xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section: Similar Products Slider */}
          {similarProducts.length > 0 && (
            <div>
              <h3 className="section-subheader">Similar Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}

          {/* Section: Recently Viewed Slider */}
          <div>
            <h3 className="section-subheader">Recently Viewed</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



