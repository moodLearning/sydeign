import React from 'react';
import { Link } from 'react-router-dom';

export interface Designer {
  id: string;
  name: string;
  rating: string;
  reviewCount: string; 
  image: string;
}

export interface DesignerCardProps {
  designer: Designer;
}

export function DesignerCard({ designer }: DesignerCardProps) {
  return (
    <Link 
      to={`/designers/${designer.id}`} 
      className="w-70 group block rounded-3xl overflow-hidden bg-white shadow-lg border border-stone-100 transition-transform hover:scale-[1.02]"
    >
      {/* Full-width Image Container */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-stone-200">
        <img 
          src={designer.image} 
          alt={designer.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Info Section */}
      <div className="p-5 flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-stone-800">{designer.name}</h3>
        
        <div className="flex items-center gap-2 mt-2">
          {/* Stars */}
          <div className="flex text-amber-600">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          {/* Rating & Review Count */}
          <span className="text-stone-600 font-medium">
            {designer.rating} <span className="text-stone-400">({designer.reviewCount})</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
