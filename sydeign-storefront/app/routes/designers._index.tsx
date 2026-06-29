import React from 'react';
import { Link } from 'react-router-dom';

export default function DesignersIndex() {
  const spotlight = {
    name: 'Jackie De Glae',
    slug: 'jackie-de-glae',
    role: 'Jewelry & Metalsmithing',
    bio: 'Miss Universe 2018 Catriona Gray has been a staunch supporter of local weaves. Among her best ensembles are the looks made with the Pisyabit textile...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  };

  const topRated = [
    { id: '1', name: 'Nida Bacaling', rating: '5.0', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
    { id: '2', name: 'Nelia Adinale', rating: '4.0', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
  ];

  const discoverList = [
    'Ariosto Dale Ballero', 'Lymuel Baustista', 'Kathleen Dagus', 'Murdhir Laza'
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
      {/* Featured / Spotlight Designer */}
      <div className="bg-amber-50 rounded-2xl p-8 shadow-sm border border-amber-100 flex flex-col md:flex-row items-center gap-10 mb-16">
        <img src={spotlight.image} alt={spotlight.name} className="w-64 h-64 object-cover rounded-xl shadow" />
        <div className="flex-1">
          <span className="bg-amber-200 text-amber-900 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">Designer of the Month</span>
          <h1 className="text-3xl font-bold mt-3 mb-2">{spotlight.name}</h1>
          <p className="text-sm text-amber-700 font-medium mb-4">{spotlight.role}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{spotlight.bio}</p>
          <Link to={`/designers/${spotlight.slug}`} className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-sm transition inline-block">
            View Collections
          </Link>
        </div>
      </div>

      {/* Top Rated Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-light mb-8">Top Rated</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topRated.map((designer) => (
            <div key={designer.id} className="border rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm">
              <img src={designer.image} alt={designer.name} className="w-24 h-24 object-cover rounded-full mb-4 border" />
              <h3 className="font-bold text-gray-800">{designer.name}</h3>
              <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
                <span>★</span> {designer.rating} Rating
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Designers Directory */}
      <section>
        <h2 className="text-2xl font-serif font-light mb-6">Discover Designers</h2>
        <input type="text" placeholder="Search..." className="border rounded-lg px-4 py-2 w-full max-w-md mb-8 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {discoverList.map((name, index) => (
            <Link to="#" key={index} className="group border rounded-xl overflow-hidden shadow-sm hover:shadow transition bg-white">
              <div className="aspect-square bg-gray-50">
                <img src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=300`} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-center text-sm font-semibold text-gray-800 group-hover:underline">
                {name}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
