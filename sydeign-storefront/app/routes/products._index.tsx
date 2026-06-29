import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductsIndex() {
  const categories = [
    'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Brooches', 
    'Toe Rings', 'Cufflinks', 'Anklets', 'Body Jewelry', 'Hair Jewelry', 'Armlets'
  ];

  const popularProducts = [
    { id: 'p1', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e6d661?w=500' },
    { id: 'p2', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=500' },
  ];

  return (
    <div>
    <section className="relative w-screen py-12 md:py-32 flex items-center justify-center bg-gray-100 overflow-hidden">
      <img 
        src={"/hero.png"} 
        alt="Sydeign Banner" 
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
    </section>

    <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">
      {/* Sidebar Filters */}
      <aside className="w-64 hidden md:block shrink-0">
        <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          <span className="text-amber-600">▼</span> Categories
        </h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-black">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                {cat}
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t pt-6">
          <h3 className="font-bold text-gray-700 mb-4">Price Range</h3>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>₱1,000</span>
            <span>₱10,000</span>
          </div>
          <input type="range" min="1000" max="10000" className="w-full accent-amber-600" />
          <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded text-sm font-medium border border-gray-300">
            APPLY
          </button>
        </div>
      </aside>

      {/* Main Catalog View */}
      <div className="flex-1">
        {/* Header Banner */}
        <div className="relative h-48 bg-emerald-950 rounded-lg overflow-hidden mb-12 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=80" 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <h1 className="relative z-10 text-5xl font-serif text-white tracking-wide">RINGS</h1>
        </div>

        {/* Section: Popular Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular Products</h2>
            <Link to="#" className="text-sm text-gray-600 hover:underline">See All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularProducts.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="border rounded-lg p-3 bg-white shadow-sm hover:shadow transition">
                <div className="aspect-square bg-gray-50 overflow-hidden rounded mb-3">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-sm font-medium text-gray-800 truncate">{p.title}</h3>
                <p className="text-gray-500 text-xs mt-1">Nida Bacaling</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-sm">{p.price}</span>
                  <div className="flex gap-2 text-gray-400">
                    <button>♡</button>
                    <button>🛒</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
