import React from 'react';
import tailwindStyles from '../styles/tailwind.css';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { DesignerSection } from '../components/DesignerSection'
import { ProductCategoriesSection } from '../components/ProductCategories'
import { FaqSection } from '../components/FAQ'
import { Button, ButtonAlt } from '../components/Button'

export default function HomePage() {
  const topSelling = [
    { id: 'p1', name: 'Handmade Water Jug', price: '200.00', image: '/top1.png' },
    { id: 'p2', name: 'Handmade Water Jug', price: '200.00', image: '/top2.png' },
    { id: 'p3', name: 'Handmade Water Jug', price: '200.00', image: '/top4.png' },
    { id: 'p4', name: 'Handmade Water Jug', price: '200.00', image: '/top5.png' },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <section 
        className="shadow-md relative h-[60vh] lg:h-[100vh] flex items-center justify-center bg-gray-200 z-40"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
      >
        <img
          src="./home-banner.png"
          alt="Sydeign Banner"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          style={{ objectPosition: 'top center' }} 
        />  
        <div className="relative z-10 flex flex-col items-center justify-center pt-130 lg:pt-220 text-center">
          <h2 className="text-5xl lg:text-7xl font-cinzel text-primary mb-2 lg:mb-8">
            Your story, your style
          </h2>
          <ButtonAlt label="Explore Now" to="/products" className="mt-4" />
        </div>
      </section>  
      <section 
        className="shadow-md relative py-20 bg-background z-30 pb-8"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
      >
        <div className="max-w-[1400px] mx-auto px-12 md:px-5 pb-8">
          <h2 className="text-4xl font-sans text-center font-bold text-primary mb-2 pb-4">
            Masterpieces to Discover
          </h2>
          <h2 className="text-medium font-sans text-center text-primary mb-2 max-w-4xl mx-auto">
            Lorem ipsum viverra pellentesque phasellus auctor volutpat mi placerat lorem vel, mollis feugiat tellus ut quis in rutrum neque feugiat turpis, placerat dapibus.
          </h2>
            
          <h3 className="text-2xl text-primary text-left font-bold mb-8 mt-16">
            Top Selling Products
          </h3>
            
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-40 items-center">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>        
            
          <Button label="See more products" to="/products" className="mt-12" />
         </div>
      </section>

      <div className="shadow-md relative w-full bg-white z-20 pb-4">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8"><DesignerSection /></div>
        </section>
      </div>
          
      <div className="shadow-md relative w-full bg-background z-10 pb-4">
        <section className="w-full py-20">
          <div className="max-w-[1800px] mx-auto px-8"><ProductCategoriesSection /></div>
        </section>
      </div>
          
      <div className="shadow-xl relative w-full bg-white z-0">
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8 z-50"><FaqSection /></div>
        </section>
      </div>
    </div>  
  );
}
