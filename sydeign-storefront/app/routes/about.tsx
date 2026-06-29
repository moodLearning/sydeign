import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 font-sans">
      <div className="relative h-64 rounded-2xl overflow-hidden mb-16 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1582533561731-8b2f7b88162e?w=1400" 
          alt="About Us Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <h1 className="relative z-10 text-6xl font-serif text-emerald-950 font-light tracking-wide">ABOUT US</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg">
            <strong>Sydeign</strong> is a global e-commerce platform that empowers independent designers by providing them with a platform to showcase their creativity, culture, and craftsmanship.
          </p>
          <p>
            We curate authentic, locally inspired works — ranging from jewelry and weavings to paintings and home pieces — connecting artists directly with a conscious audience.
          </p>
          <p>
            Every design tells a story of cultural heritage and individual artistic execution.
          </p>
        </div>
        <div className="w-full md:w-80 aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=800" 
            alt="Artisanal craft" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
