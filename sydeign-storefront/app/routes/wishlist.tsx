import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      title: 'Organic Freshwater Pearl Earring',
      color: 'Off White',
      material: 'Gold Fill',
      size: '8-9 mm',
      price: 1200,
      image: '/earring-sample.png',
      selected: true,
    },
    {
      id: '2',
      title: 'Organic Freshwater Pearl Earring',
      color: 'Off White',
      material: 'Gold Fill',
      size: '8-9 mm',
      price: 1200,
      image: '/necklace-sample.png',
      selected: false,
    }
  ]);

  const toggleSelect = (id: string) => {
    setWishlistItems(items =>
      items.map(item => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedItem = wishlistItems.find(item => item.selected);

  return (
    <main className="min-h-screen bg-[#FFFDF5] pb-24 font-sans text-gray-800">
      
      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-[#FFFCEB] border border-[#D4D9C1] rounded-2xl p-6 flex gap-8 items-center shadow-sm">
            <input 
              type="checkbox" 
              checked={item.selected} 
              onChange={() => toggleSelect(item.id)}
              className="w-5 h-5 accent-[#4B6B40] cursor-pointer"
            />
            
            <img src={item.image} alt={item.title} className="w-36 h-36 rounded-xl object-cover border border-[#D4D9C1]" />

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#4B6B40] mb-1">{item.title}</h2>
              <div className="text-yellow-500 mb-3">★★★★☆</div>
              
              <div className="text-sm text-gray-600 grid grid-cols-2 max-w-sm gap-y-1">
                <span>Flex Hoop Color: <strong className="text-gray-800">{item.material}</strong></span>
                <span>Flex Hoop Size: <strong className="text-gray-800">{item.size}</strong></span>
                <span>Pearl Color: <strong className="text-gray-800">{item.color}</strong></span>
              </div>
            </div>

            <div className="text-right ml-12 min-w-[120px] flex flex-col items-end">
              <span className="text-sm text-gray-500 mb-1">Price</span>
              <span className="text-2xl font-bold text-gray-900 mb-3">₱ {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <button className="text-[#C1C9A1] hover:text-red-500 transition-colors" title="Delete">
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Wishlist Actions Footer */}
      <div className="sticky bottom-0 bg-[#FFFCEB] border-t border-[#D4D9C1] py-6 shadow-xl">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h3 className="text-3xl font-cinzel uppercase font-bold text-[#4B6B40]">My Wishlist</h3>
            {selectedItem && (
              <>
                <img src={selectedItem.image} className="w-12 h-12 rounded-lg border border-gray-200 object-cover" />
                <span className="text-sm text-gray-500">Items: 1x</span>
              </>
            )}
          </div>

          <button className="bg-[#D36B45] hover:bg-[#b25130] text-white px-8 py-3 rounded-xl font-bold transition">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}