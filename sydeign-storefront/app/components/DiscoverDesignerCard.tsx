import React from 'react';
import { designers, type Designer } from '../data/data';

interface DiscoverDesignerCardProps {
  designer: Designer;
  productImage: string;
  isAlternate: boolean;
}

export function DiscoverDesignerCard({ designer, productImage, isAlternate }: DiscoverDesignerCardProps) {
  return (
    <div 
      className={`w-full bg-[#f4f8f5] border border-stone-200/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col items-center relative min-h-[200px] ${
        isAlternate ? 'sm:flex-row-reverse' : 'sm:flex-row'
      }`}
    >
      <div className="w-full sm:w-[220px] h-[220px] shrink-0 bg-stone-100">
        <img 
          src={designer.image} 
          alt={designer.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div 
        className="flex-1 p-6 md:p-8 text-left bg-no-repeat" 
        style={{ 
          backgroundImage: `radial-gradient(circle at bottom ${isAlternate ? 'left' : 'right'}, rgba(212,228,216,0.3) 0%, transparent 60%)`,
          backgroundPosition: isAlternate ? 'bottom left' : 'bottom right'
        }}
      >
        <h3 className="text-2xl font-serif font-bold text-[#143e32]">{designer.name}</h3>
        <p className="text-xs text-emerald-800 font-medium mb-2">{designer.handle} ✔</p>
        <p className="text-xs text-stone-500 leading-relaxed max-w-md line-clamp-3">
          {designer.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
      </div>

      <div className="w-[180px] h-[180px] shrink-0 p-4 hidden md:flex items-center justify-center">
        <img 
          src={productImage} 
          alt="Signature Craft Work" 
          className="max-w-full max-h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105" 
        />
      </div>
    </div>
  );
}

