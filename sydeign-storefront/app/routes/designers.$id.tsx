import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function SelectedDesignerPage() {
  const { id } = useParams();

  const designer = {
    name: 'Jackie De Glae',
    role: 'Jewelry & Metalsmithing',
    bio: 'A Filipino jewelry designer who weaves emotions into wearable art. Her pieces are more than accessories – they\'re vessels of sentiment, carrying personal stories...',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  };

  const designs = [
    { id: '1', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
    { id: '2', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16 border-b pb-12">
        <img src={designer.avatar} alt={designer.name} className="w-32 h-32 rounded-full object-cover shadow border" />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-serif font-light text-gray-900 mb-1">{designer.name}</h1>
          <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-4">{designer.role}</p>
          <p className="text-gray-600 max-w-2xl leading-relaxed text-sm">{designer.bio}</p>
        </div>
      </div>

      {/* Grid of items by designer */}
      <h2 className="text-2xl font-serif font-light mb-6">Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {designs.map((item) => (
          <Link key={item.id} to={`/products/${item.id}`} className="group border rounded-lg p-3 bg-white shadow-sm">
            <div className="aspect-square bg-gray-50 overflow-hidden rounded mb-3">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <h3 className="text-sm font-medium truncate">{item.title}</h3>
            <p className="font-bold text-sm mt-1">{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
