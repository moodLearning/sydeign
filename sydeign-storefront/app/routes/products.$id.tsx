import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function SelectedProductPage() {
  const { id } = useParams();

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="relative w-screen py-12 md:py-32 flex items-center justify-center bg-gray-100 overflow-hidden">
          <img 
            src={"/hero.png"} 
            alt="Sydeign Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery Column */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.thumbnailList.map((thumb, idx) => (
              <img key={idx} src={thumb} alt="Thumbnail" className="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-80" />
            ))}
          </div>
          <div className="flex-1 aspect-square bg-gray-50 rounded-lg overflow-hidden border">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details Column */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-500">
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <span className="text-sm font-semibold ml-0.5">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewsCount} reviews)</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">By <Link to="#" className="text-amber-700 hover:underline font-medium">{product.designerName}</Link></p>
          <div className="text-2xl font-bold text-amber-800 mb-6">{"\u20B1"}{product.price}</div>
            {}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Options/Variants Mock */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 w-28">Flex Hoop Size</label>
              <select className="border rounded px-3 py-2 text-sm w-48">
                <option>Select size</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 w-28">Pearl Color</label>
              <select className="border rounded px-3 py-2 text-sm w-48">
                <option>Select color</option>
              </select>
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">-</button>
              <span className="px-4 py-2 text-sm font-medium border-x">1</span>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">+</button>
            </div>
            <button className="flex-1 bg-amber-700 text-white py-3 rounded text-sm font-bold hover:bg-amber-800 transition">Add to Cart</button>
            <button className="flex-1 bg-amber-950 text-white py-3 rounded text-sm font-bold hover:bg-black transition">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
