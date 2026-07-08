import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react'; 

interface Product {
  id: string;
  title: string;
  price: string;
  designer: string; 
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="w-70 group block rounded-3xl overflow-hidden bg-[#f0f7f6] shadow-md border border-stone-100 transition-transform hover:scale-[1.02]"
    >
      {/* Product Image */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-stone-200">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col">
        {/* Price */}
        <span className="font-bold text-lg text-stone-900">₱ {product.price}</span>
        
        {/* Title */}
        <h4 className="font-semibold text-stone-800 mt-1">{product.name}</h4>
        
        {/* Designer & Actions */}
        <div className="flex justify-between items-end mt-2">
          <p className="text-sm text-stone-500">{product.designer}</p>
          
          <div className="flex gap-3 text-stone-600">
            <button className="hover:text-emerald-700 transition"><Heart size={20} /></button>
            <button className="hover:text-emerald-700 transition"><ShoppingCart size={20} /></button>
          </div>
        </div>
      </div>
    </Link>
  );
}
