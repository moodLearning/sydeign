import { useLoaderData, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ProductImage {
  id: number;
  image_url: string;
}

interface Merchant {
  id: number;
  store_name: string;
  store_description: string;
}

interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  images?: ProductImage[]; 
  merchant?: Merchant;
}

export async function loader({ params, context }: LoaderFunctionArgs) {
  const apiBase = context.env?.PUBLIC_LARAVEL_API_URL || 'http://localhost:8000';
  const productId = params.id;

  // Eager load using your native clean relation names: 'images' and 'merchant'
  const response = await fetch(`${apiBase}/api/products/${productId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Response('Item profile could not be verified or located', { status: 404 });
  }

  const data = (await response.json()) as { data?: ProductDetails } | ProductDetails;
  return { product: ('data' in data && data.data ? data.data : data) as ProductDetails };
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  
  const fallbackImg = 'https://via.placeholder.com/500x500/E3785E/ffffff?text=Sydeign+Art';
  
  const images = product.images && product.images.length > 0 
    ? product.images.map(img => img.image_url) 
    : [fallbackImg];

  return (
    <div className="bg-[#FAF9F0] min-h-screen flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto w-full p-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-7 grid grid-cols-12 gap-4">
            {/* Main Featured Image (First Image array index) */}
            <div className="col-span-12 md:col-span-10">
              <img src={images[0]} alt={product.name} className="w-full aspect-square object-cover rounded-3xl border border-gray-200" />
            </div>
            
            {images.length > 1 && (
              <div className="col-span-12 md:col-span-2 flex md:flex-col gap-3">
                {images.slice(1).map((img, i) => (
                  <img key={i} src={img} className="w-20 md:w-full aspect-square object-cover rounded-xl border border-gray-200 cursor-pointer" alt="" />
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-5 space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-800">{product.name}</h1>
              {product.merchant && (
                <Link to={`/shops/${product.merchant.id}`} className="text-sm text-[#4B6B40] font-medium hover:underline mt-1 block">
                  By {product.merchant.store_name}
                </Link>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500 block">Price</span>
              <span className="text-3xl font-bold text-gray-800">
                {product.currency || 'Php'} {Number(product.price).toLocaleString()}
              </span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 rounded-xl border border-red-400 text-red-500 font-medium hover:bg-red-50 transition text-center select-none cursor-not-allowed opacity-60">
                ❤️ Add to Likes
              </button>
              <button className="flex-1 py-3 rounded-xl bg-[#4B6B40] text-white font-medium hover:bg-[#3B5432] transition text-center select-none cursor-not-allowed opacity-60">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs / Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
          <div>
            <h3 className="text-xl font-serif font-bold mb-3 text-[#4B6B40]">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description || 'No description asset documentation saved for this selection.'}
            </p>
          </div>

          {product.merchant && (
            <div className="bg-[#F0F2E6] p-6 rounded-3xl flex gap-4 items-start">
              <div className="w-16 h-16 rounded-full bg-[#4B6B40] text-white flex items-center justify-center font-bold font-serif shrink-0 text-xl">
                {product.merchant.store_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-800">{product.merchant.store_name}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                  {product.merchant.store_description || 'Cooperative craft merchant.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}