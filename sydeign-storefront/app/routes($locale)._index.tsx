import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function LocaleIndex() {
  const { locale } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const productCategories = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300' },
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=300' },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' },
    { name: 'Hair Jewelry', image: 'https://images.unsplash.com/photo-1630799649561-c8112c295c52?w=300' },
    { name: 'Anklets', image: 'https://images.unsplash.com/photo-1617038260896-2b4742a17400?w=300' },
    { name: 'Brooches', image: 'https://images.unsplash.com/photo-1574236592233-0f508a2f4c9c?w=300' },
    { name: 'Toe Rings', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300' },
    { name: 'Cufflinks', image: 'https://images.unsplash.com/photo-1619551734325-8e9389e49186?w=300' },
    { name: 'Body Jewelry', image: 'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=300' },
    { name: 'Armlets', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
  ];

  const topSelling = [
    { id: 'p1', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e6d661?w=400' },
    { id: 'p2', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=400' },
    { id: 'p3', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=400' },
    { id: 'p4', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=400' },
    { id: 'p5', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
  ];

  const faqs = [
    'Does Sydeign offer international shipping?',
    'How to track my order?',
    'Is there a physical Sydeign store I can visit?',
    'How to start selling products in Sydeign?',
    'How to start selling products in Sydeign?'
  ];

  return (
    <div className="bg-[#FCF7ED] text-gray-900 font-sans">
      {/* Dynamic Locale Debug Indicator */}
      {locale && (
        <div className="bg-amber-950 text-white text-xs text-center py-1">
          Viewing Storefront for Locale: {locale.toUpperCase()}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506631086300-2059345711cc?w=1600&q=80" 
          alt="Sydeign Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center max-w-xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif text-[#3f5e43] font-light tracking-wide mb-6">
            YOUR STORY<br />YOUR STYLE
          </h1>
          <Link 
            to="/products" 
            className="inline-block bg-white text-emerald-950 border border-emerald-800 px-10 py-3 rounded font-medium uppercase tracking-wider text-sm hover:bg-emerald-50 transition shadow"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-serif text-center text-[#587a5f] font-light tracking-wide mb-2">
          Masterpieces to Discover
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto text-sm mb-12">
          Lorem ipsum viverra pellentesque phasellus auctor volutpat placerat lorem vel, mollis feugiat tellus ut quis in rutrum neque feugiat turpis, placerat dapibus.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mb-6">Top Selling Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {topSelling.map((p) => (
            <div key={p.id} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 truncate">{p.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">Nida Bacaling</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <span className="text-sm font-bold">{p.price}</span>
                <div className="flex gap-2 text-gray-400">
                  <button className="hover:text-amber-600">♡</button>
                  <button className="hover:text-amber-600">🛒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="inline-block bg-[#b66638] text-white px-12 py-3 rounded text-sm font-bold shadow hover:bg-[#964e26] transition">
            Show more
          </Link>
        </div>
      </section>

      {/* Designer of the Month */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border-[6px] border-[#3f5e43] bg-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="w-64 h-[380px] shrink-0 border-4 border-[#b66638] rounded-2xl overflow-hidden p-2 bg-[#FCF7ED]">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600" 
              alt="Designer of the Month" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex-1">
            <span className="text-xs uppercase tracking-widest text-[#b66638] font-extrabold bg-orange-50 px-3 py-1 rounded-full">
              Featured Creator
            </span>
            <h2 className="text-4xl font-serif text-[#3f5e43] font-light mt-2 mb-1">Designer of the Month</h2>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Jackie De Glae ✓</h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm">
              Miss Universe 2018 Catriona Gray has been a staunch supporter of local weaves. Among her best ensembles are the looks made with the Pisyabit textile, one of which featured the weaving of Julmina Sawadi Juri. Hailed from the Tausug Livelihood community in Parang, Sulu Jolo, the 24-year-old has been weaving Pisyabit for over 15 years, starting as an apprentice to her mother...
            </p>
            <Link to="/designers/jackie-de-glae" className="bg-[#b66638] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow hover:bg-[#964e26] transition inline-block">
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories (Circular Icons) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-4xl font-serif text-[#3f5e43] text-center font-light tracking-wide mb-12">Product Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-10 gap-x-4 justify-items-center">
          {productCategories.map((cat, idx) => (
            <Link key={idx} to="/products" className="flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm group-hover:border-[#3f5e43] transition">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <span className="text-xs font-bold text-gray-700 mt-3 group-hover:underline text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (Accordion) */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                <span className="text-sm">{faq}</span>
                <span className="text-gray-400">{openFaq === index ? '▲' : '▼'}</span>
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-600 text-xs border-t border-gray-100 animate-fadeIn">
                  Yes, Sydeign supports independent artisans globally with fully integrated shipping and tracking metrics directly connected to our partner couriers.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
