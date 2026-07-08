import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function SelectedDesignerPage() {
  const { id } = useParams();

  const designer = {
    name: 'Jackie De Glae',
    role: 'Jewelry & Metalsmithing',
    bio: 'A Filipino jewelry designer who weaves emotions into wearable art. Her pieces are more than accessories – they\'re vessels of sentiment, carrying personal stories and hidden meanings. Inspired by nature\'s beauty and historical charm, Jackie\'s creations blend timeless elegance with a contemporary twist. Guided by a passion for craftsmanship, Jackie meticulously sculpts metals and gemstones into captivating forms.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    stats: { designs: '84 Designs', followers: '4k Followers', rating: '5.0 Ratings' }
  };

  const designs = Array(8).fill({ title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' });

  return (
    <div className="bg-orange-50/30 min-h-screen">
      {/* Hero Banner Section */}
      <div className="h-48 bg-emerald-900/80 w-full" />
      
      <div className="max-w-5xl mx-auto px-6 pb-12">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col items-center text-center">
            <img src={designer.avatar} alt={designer.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {designer.name} <span className="text-blue-500">✔</span>
            </h1>
            <div className="flex gap-6 text-sm text-gray-600 mt-2 mb-4">
              <span>{designer.stats.designs}</span>
              <span>{designer.stats.followers}</span>
              <span>{designer.stats.rating}</span>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-1.5 rounded-full text-sm font-semibold mb-6">
              Follow
            </button>
            <p className="text-gray-700 max-w-3xl leading-relaxed text-sm">
              {designer.bio}
            </p>
          </div>
        </div>

        {/* Collections Header */}
        <div className="border-t border-b border-gray-200 py-4 mb-8 flex justify-center text-gray-500 text-xs uppercase tracking-widest font-semibold">
          Collections ↓
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {designs.map((item, idx) => (
            <Link key={idx} to={`/products/${idx}`} className="group bg-white">
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:opacity-90 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
