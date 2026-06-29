import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const hero = {
    title: 'Your Story, Your Style',
    ctaText: 'SHOP NOW',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=1200&q=80',
  };

  const topSelling = [
    { id: 'p1', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
    { id: 'p2', title: 'Handmade Water Jug', price: '₱ 200.00', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=500' },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[60vh] flex items-center justify-center bg-gray-200 overflow-hidden px-0">
        <img 
          src="./home-banner.png" 
          alt="Sydeign Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      </section>

      {/* Top Selling Products */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-auto px-50 py-20 bg-background">
      {/*<section className="max-w-7xl mx-auto px-6 py-16 bg-background">*/}
          <h2 className="text-4xl font-sans text-center font-bold text-primary mb-2">
            Masterpieces to Discover
          </h2>
        <h2 className="text-medium font-sans text-center text-primary mb-2">Lorem ipsum viverra pellentesque phasellus auctor volutpat mi placerat lorem vel, mollis feugiat tellus ut quis in rutrum neque feugiat turpis, placerat dapibus.</h2>
        <h3 className="text-2xl text-primary text-left font-bold mb-8 mt-8">Top Selling Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {topSelling.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group border rounded p-4 bg-white shadow-sm hover:shadow transition">
              <div className="aspect-square bg-gray-50 overflow-hidden mb-4 rounded">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h4 className="text-sm font-medium text-gray-900 truncate">{product.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/products" className="inline-block bg-[#b36336] text-white px-8 py-2 rounded hover:bg-[#995229] transition">
            Show more
          </Link>
        </div>
      </section>
    </div>
  );
}
