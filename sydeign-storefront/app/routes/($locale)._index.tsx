import React from 'react';
import { Link } from 'react-router-dom';

export function loader() {
  return {
    hero: {
      title: 'Curated Elegance & Independent Design',
      subtitle: 'Discover unique pieces crafted by visionary independent designers.',
      ctaText: 'Shop the Collection',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687eec?w=1200&q=80',
    },
    featuredProducts: [
      { id: 'p1', title: 'Organic Freshwater Pearl Earring', price: '$125.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
      { id: 'p2', title: 'Sculptural Brass Cuff', price: '$180.00', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=500' },
    ],
  };
}

export default function LandingPage() {
  // If using React Router v6.4+ data routers, you can use useLoaderData(). 
  // Alternatively, just keep the mock data directly in the component state.
  const data = loader();

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-100 overflow-hidden">
        <img 
          src={data.hero.image} 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4">{data.hero.title}</h1>
          <p className="text-lg mb-8 text-gray-700">{data.hero.subtitle}</p>
          <Link 
            to="/products" 
            className="inline-block bg-black text-white px-8 py-3 rounded-none uppercase tracking-wider text-sm hover:bg-gray-800 transition"
          >
            {data.hero.ctaText}
          </Link>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-serif font-light text-center mb-12">Featured Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group block">
              <div className="aspect-square bg-gray-50 overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-gray-500 mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/products" className="border-b border-black pb-1 hover:text-gray-600 transition">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
