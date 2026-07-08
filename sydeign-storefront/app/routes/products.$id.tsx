import React, { useState } from 'react';

const ProductPage = () => {
  const product = {
    title: 'Organic Freshwater Pearl Earring',
    price: '1,200.00',
    description: 'Organic pearl earrings are exquisite pieces of jewelry that showcase the natural beauty and elegance of pearls. These earrings feature pearls that are cultivated in oysters or mollusks, created through a process known as pearl farming.',
    rating: '5.0',
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    designerName: 'Jeanne Jeanner',
    thumbnailList: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100',
      'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=100',
      'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=100',
    ]
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {product.thumbnailList.map((thumb, index) => (
              <img 
                key={index} 
                src={thumb} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer hover:border-green-800"
              />
            ))}
          </div>
          <div className="flex-1">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-lg">★★★★★</span>
            <span className="text-gray-600 font-medium">{product.rating} | {product.reviewsCount} reviews</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <button className="text-green-800 font-semibold hover:underline w-fit mb-6">
            {product.designerName}
          </button>

          <div className="text-3xl font-bold text-gray-800 mb-6">₱ {product.price}</div>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Selection & Actions */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  className="px-4 py-2 hover:bg-gray-100" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >-</button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                <button 
                  className="px-4 py-2 hover:bg-gray-100" 
                  onClick={() => setQuantity(quantity + 1)}
                >+</button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-green-800 text-white py-3 rounded hover:bg-green-900 transition">
                Add to Cart
              </button>
              <button className="flex-1 bg-orange-700 text-white py-3 rounded hover:bg-orange-800 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
