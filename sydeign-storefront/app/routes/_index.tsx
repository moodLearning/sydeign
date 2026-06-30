import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { DesignerSection } from '../components/DesignerSection'
import { ProductCategoriesSection } from '../components/ProductCategories'
import { FaqSection } from '../components/FAQ'

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
    <div className="bg-white text-gray-900 font-sans isolation-isolate">
      {/* Hero Banner */}
      <section 
        className="relative h-[60vh] flex items-center justify-center bg-gray-200 overflow-hidden px-0 z-0"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}
      >
        <img 
          src="./home-banner.png" 
          alt="Sydeign Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      </section>

      {/* Top Selling Products */}
      <section 
        className="relative h-auto py-20 bg-background overflow-hidden z-10"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}
      >
        <div className="max-w-[1400px] mx-auto px-12 md:px-24">
          <h2 className="text-4xl font-sans text-center font-bold text-primary mb-2">
            Masterpieces to Discover
          </h2>
          <h2 className="text-medium font-sans text-center text-primary mb-2 max-w-4xl mx-auto">
            Lorem ipsum viverra pellentesque phasellus auctor volutpat mi placerat lorem vel, mollis feugiat tellus ut quis in rutrum neque feugiat turpis, placerat dapibus.
          </h2>
        
          <h3 className="text-2xl text-primary text-left font-bold mb-8 mt-16">
            Top Selling Products
          </h3>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>        
        
          <div className="text-center mt-12">
            <Link to="/products" className="inline-block bg-[#b36336] text-white px-8 py-2 rounded hover:bg-[#995229] transition">
              Show more
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Designer */}
      <div className="relative w-full bg-white z-0">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8">          
            <DesignerSection />
          </div>
        </section>
      </div>
      
      {/* Categories */}
      <div className="relative w-full bg-background z-0">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8">          
            <ProductCategoriesSection />
          </div>
        </section>
      </div>
      
      {/* FAQ Accordion */}
      <div className="relative w-full bg-white z-30">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8">          
            <FaqSection />
          </div>
        </section>
      </div>

    </div>
  );

}
