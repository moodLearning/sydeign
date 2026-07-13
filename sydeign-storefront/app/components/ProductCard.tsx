import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react'; 

interface Product {
  id: string;
  name: string;
  price: number | string;
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
      className="shadow-lg w-70 group block rounded-2xl overflow-hidden bg-[#f0f7f6] shadow-md border border-stone-100 transition-transform hover:scale-[1.02]"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-stone-200">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col">
        <span className="font-bold text-lg text-stone-900">₱ {product.price}</span>
        
        <h4 className="font-semibold text-stone-800 mt-1">{product.name}</h4>
        
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

{/* export function ProductCard({ product }: ProductCardProps) {
  // Handle click interception so clicking heart/cart doesn't navigate to details page
  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Ensure price is cleanly formatted
  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : product.price;

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group block transition-all duration-300 hover:shadow-md"
    >
      <div className="h-48 bg-gray-50 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="text-sm font-semibold text-gray-800 font-mono">₱ {formattedPrice}</div>
        <h4 className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">{product.name}</h4>
        
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
          <span className="text-[10px] text-gray-400 truncate max-w-[120px]">
            {product.designer}
          </span>
          <div className="flex gap-2 text-gray-400">
            <button 
              type="button"
              onClick={handleAction} 
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              <Heart size={14} />
            </button>
            <button 
              type="button"
              onClick={handleAction} 
              className="hover:text-primary transition-colors cursor-pointer"
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}*/}
