import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

export default function CartPage() {
  // Placeholder cart items
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Organic Freshwater Pearl Earring',
      color: 'Off White',
      material: 'Gold Fill',
      size: '8-9 mm',
      price: 1200,
      quantity: 1,
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
      quantity: 1,
      image: '/necklace-sample.png',
      selected: true,
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const toggleSelect = (id: string) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subTotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#FFFDF5] pb-24 font-sans text-gray-800">
      
      {/* 1. Item Rows */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-6">
        {cartItems.map((item) => (
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

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Quantity</span>
              <div className="flex items-center border border-[#BAC3A1] rounded-md bg-white">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 font-bold">-</button>
                <span className="px-3 py-1 font-medium border-x border-[#BAC3A1]">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 font-bold">+</button>
              </div>
            </div>

            <div className="text-right ml-12 min-w-[120px]">
              <span className="text-sm text-gray-500 block mb-1">Price</span>
              <span className="text-2xl font-bold text-gray-900">₱ {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="flex gap-2 ml-6">
              <button className="bg-[#D36B45] hover:bg-[#b25130] text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                EDIT
              </button>
              <button className="bg-[#C1C9A1] hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition">
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Floating Action Bar (Matches Cart Page Layout) */}
      <div className="sticky bottom-0 bg-[#FFFCEB] border-t border-[#D4D9C1] py-6 shadow-xl">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h3 className="text-3xl font-cinzel uppercase font-bold text-[#4B6B40]">Shopping Cart</h3>
            <div className="flex -space-x-4">
              {selectedItems.map((item, i) => (
                <img key={i} src={item.image} className="w-12 h-12 rounded-full border-2 border-[#FFFCEB] object-cover" />
              ))}
            </div>
            <span className="text-sm text-gray-500">Items: {selectedItems.length}x</span>
            <span className="text-xl font-medium ml-4">Sub Total: <strong className="text-2xl font-bold text-gray-900">₱ {subTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
          </div>

          <div className="flex gap-4">
            <button className="bg-[#D36B45] hover:bg-[#b25130] text-white px-8 py-3 rounded-xl font-bold transition">
              Continue Shopping
            </button>
            <button className="bg-[#D36B45] hover:bg-[#b25130] text-white px-8 py-3 rounded-xl font-bold transition">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}