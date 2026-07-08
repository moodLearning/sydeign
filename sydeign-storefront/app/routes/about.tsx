import React from 'react';

export default function AboutPage() {
  return (
<div>
    <section className="relative w-screen py-12 md:py-32 flex items-center justify-center bg-gray-100 overflow-hidden">
      <img 
        src={"./about-banner.png"} 
        alt="About Us" 
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
    </section>
    <div className="max-w-4xl mx-auto px-6 py-16 font-sans">
    
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
            src={"./image-1.png"}
            alt="Artisanal craft" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
