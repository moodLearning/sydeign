import { useLoaderData, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
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

interface Merchant {
  id: number;
  store_name: string;
  store_description: string;
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const apiBase = context.env?.PUBLIC_LARAVEL_API_URL || 'http://localhost:8000';
  const url = new URL(request.url);
  const searchKeyword = url.searchParams.get('q') || '';

  try {
    const response = await fetch(`${apiBase}/api/home?q=${encodeURIComponent(searchKeyword)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`[Laravel Error Status]: ${response.status} for /api/home`);
      return { q: searchKeyword, products: [], merchants: [] }; 
    }

    const data = (await response.json()) as { products?: Product[]; merchants?: Merchant[] };
    return {
      q: searchKeyword,
      products: data.products || [],
      merchants: data.merchants || [],
    };
  } catch (error) {
    console.error('Network failure connecting to Laravel:', error);
    return { q: searchKeyword, products: [], merchants: [] };
  }
}

export default function Home() {
  const { products, merchants, q } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#FAF9F0] min-h-screen flex flex-col">
      <Header q={q} />
      
      <main className="max-w-7xl mx-auto w-full p-8 space-y-12">
        {/* For You / Products Feed Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-[#4B6B40]">
              {q ? `Search Results for "${q}"` : 'For You'}
            </h2>
            <Link to="/products" className="text-[#4B6B40] hover:underline font-medium">See More →</Link>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-[#FFFCEB] rounded-2xl border border-[#EBECE1]">
              No products found matching your lookup catalog parameters.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {products.map((product) => {
                const fallbackImg = 'https://via.placeholder.com/400x400/E3785E/ffffff?text=Sydeign+Art';
                const displayImage = product.images?.[0]?.image_url || fallbackImg;

                return (
                  <Link to={`/products/${product.id}`} key={product.id} className="bg-[#FFFCEB] rounded-2xl overflow-hidden border border-[#EBECE1] shadow-sm hover:shadow-md transition flex flex-col">
                    <div className="relative aspect-square bg-[#ECEFE4] w-full h-56 shrink-0">
                      <img src={displayImage} alt={product.name} className="w-full h-full object-cover" />
                      <button className="absolute top-3 left-3 bg-[#FFFCEB]/80 rounded-full p-1.5 text-xs select-none cursor-not-allowed opacity-60">🛒+</button>
                      <button className="absolute top-3 right-3 bg-[#FFFCEB]/80 rounded-full p-1.5 text-xs select-none cursor-not-allowed opacity-60">❤️</button>
                    </div>
                    <div className="p-4 flex justify-between items-center mt-auto">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h4>
                      </div>
                      <span className="text-xs font-bold bg-[#E6ECDC] text-[#4B6B40] px-2 py-1 rounded shrink-0">
                        {product.currency || 'Php'} {Number(product.price).toLocaleString()}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Featured Merchants Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-[#4B6B40]">Featured Merchants</h2>
            <Link to="/shops" className="text-[#4B6B40] hover:underline font-medium">See More →</Link>
          </div>

          {merchants.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-[#FFFCEB] rounded-2xl border border-[#EBECE1]">
              No dynamic merchants found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {merchants.slice(0, 3).map((merchant, idx) => {
                const initial = merchant.store_name ? merchant.store_name.charAt(0).toUpperCase() : 'M';
                return (
                  <Link 
                    to={`/shops/${merchant.id}`} 
                    key={merchant.id} 
                    className={`bg-[#FFFCEB] rounded-3xl overflow-hidden shadow-md border border-[#E1E4D5] p-6 text-center block hover:scale-[1.01] transition ${
                      idx === 1 ? 'md:scale-105 border-[#BAC3A1] shadow-lg' : ''
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full bg-[#4B6B40] text-[#FFFCEB] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-4 shadow-inner">
                      {initial}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-gray-800 line-clamp-1">{merchant.store_name}</h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 h-8">
                      {merchant.store_description || 'Curated marketplace merchant partner.'}
                    </p>
                    <span className="inline-block mt-4 text-xs font-semibold text-[#4B6B40] bg-[#EAF0E3] px-3 py-1 rounded-full">
                      Visit Showroom
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}