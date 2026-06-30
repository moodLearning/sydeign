import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group border rounded p-4 bg-white shadow-sm hover:shadow transition"
    >
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
  );
}
