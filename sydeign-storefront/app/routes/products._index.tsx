import { useLoaderData, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ProductImage {
  id: number;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  images?: ProductImage[];
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const apiBase = context.env?.PUBLIC_LARAVEL_API_URL || 'http://localhost:8000';
  
  try {
    const response = await fetch(`${apiBase}/api/products`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to retrieve catalog metadata');
    
    const rawData = await response.json();
    
    const rawDataObject = rawData as { data?: unknown[] };

    const arrayData = Array.isArray(rawData) 
      ? rawData 
      : (rawDataObject.data || []);

    const sanitizedProducts = arrayData.map((item: any) => ({
      id: Number(item?.id || 0),
      name: String(item?.name || 'Unnamed Item'),
      price: Number(item?.price || 0),
      currency: String(item?.currency || 'Php'),
      images: Array.isArray(item?.images) 
        ? item.images.map((img: any) => ({
            id: Number(img?.id || 0),
            image_url: String(img?.image_url || ''),
          }))
        : [],
    }));

    return { products: sanitizedProducts };

  } catch (error) {
    console.error('Laravel Data Fetch Error:', error);
    return { products: [] };
  }
}

export default function ProductsList() {
  const { products } = useLoaderData<typeof loader>();
  console.log("- - Loaded Products Array - -", products); 

  const [visibleCount, setVisibleCount] = useState(10);
  const visibleProducts = products.slice(0, visibleCount);
  const loadMoreBtnRef = useRef<HTMLButtonElement>(null);

  const loadMore = () => {
  setVisibleCount((prevCount) => {
    const nextCount = prevCount + 10;
    return Math.min(nextCount, products.length);
    });
  };

  useEffect(() => {
    const btn = loadMoreBtnRef.current;
    if (btn) {
      const handler = () => {
        console.log('Raw DOM listener triggered!');
        loadMore();
      };
      
      btn.addEventListener('click', handler);
      return () => btn.removeEventListener('click', handler);
    }
  }, [visibleCount, products]);

  return (
    <div className="bg-[#FAF9F0] min-h-screen flex flex-col">
      <Header />
      
      <div className="w-full h-48 bg-[#ECEEE3] relative overflow-hidden flex items-center justify-center">
        <div className="opacity-40 text-center font-serif tracking-widest text-lg">
          MODERN CURATED CRAFTS & ARTWORKS BANNER
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full p-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4B6B40]">Products</h1>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 text-sm font-mono">
          Total Products: <span className="text-blue-600 font-bold">{products.length}</span> | 
          Currently Showing: <span className="text-green-600 font-bold">{visibleProducts.length}</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No dynamic items inside your database catalog layout yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {visibleProducts.map((product) => {
                const fallbackImg = 'https://via.placeholder.com/400x400/E3785E/ffffff?text=Sydeign+Art';
                const displayImage = product.images?.[0]?.image_url || fallbackImg;

                return (
                  <Link 
                    to={`/products/${product.id}`} 
                    key={product.id} 
                    className="bg-[#FFFCEB] rounded-2xl overflow-hidden border border-[#EBECE1] shadow-sm hover:shadow-md transition flex flex-col"
                  >
                    <div className="relative aspect-square">
                      <img src={displayImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex justify-between items-center mt-auto">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                      </div>
                      <span className="text-xs font-bold bg-[#E7ECDC] text-[#4B6B40] px-2 py-1 rounded shrink-0">
                        {product.currency || 'Php'} {Number(product.price).toLocaleString()}
                      </span>
                    </div>
                  </Link>
                ); 
              })}
            </div>

            {visibleCount < products.length && (
              <div className="flex justify-center mt-12 mb-8">
                <button 
                  type="button"
                  ref={loadMoreBtnRef}
                  onClick={loadMore}
                  className="bg-emerald-800 text-white px-6 py-3 rounded-md hover:bg-emerald-900 transition shadow-md font-medium"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}