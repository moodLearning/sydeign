import { useLoaderData, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Type safety contract matching your Merchant schema definitions
interface Merchant {
  id: number;
  user_id: number;
  store_name: string;
  store_description: string;
  created_at?: string;
}

export async function loader({ context }: LoaderFunctionArgs) {
  const apiBase = context.env?.PUBLIC_LARAVEL_API_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${apiBase}/api/merchants`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to retrieve merchants directory');

    const data = await response.json() as unknown;
    // Supporting both wrapped pagination datasets or direct array responses
    const merchantData = (typeof data === 'object' && data !== null && 'data' in data) ? (data as Record<string, unknown>).data : data;
    return { merchants: merchantData as Merchant[] };
  } catch (error) {
    console.error('Laravel Merchant Fetch Error:', error);
    return { merchants: [] }; // Fallback boundary array
  }
}

export default function ShopsList() {
  const { merchants } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#FAF9F0] min-h-screen flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto w-full p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4B6B40]">Merchants</h1>
        </div>

        {merchants.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No dynamic merchants found in your database table yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {merchants.map((merchant) => {
              // Creating a clean initials fallback avatar since your schema doesn't have a direct merchant avatar URL column
              const initial = merchant.store_name ? merchant.store_name.charAt(0).toUpperCase() : 'M';
              
              return (
                <Link 
                  to={`/shops/${merchant.id}`} 
                  key={merchant.id} 
                  className="bg-[#FFFCEB] rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition p-5 block flex flex-col items-center group"
                >
                  {/* Dynamic placeholder vector representing the artisan shop profile */}
                  <div className="w-24 h-24 rounded-full bg-[#4B6B40] text-[#FFFCEB] flex items-center justify-center font-serif text-3xl font-bold mb-4 shadow-inner group-hover:scale-105 transition">
                    {initial}
                  </div>
                  
                  <h4 className="font-serif font-bold text-lg text-gray-800 line-clamp-1">
                    {merchant.store_name || 'Unnamed Shop'}
                  </h4>
                  
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 text-center h-8 px-2">
                    {merchant.store_description || 'No description available.'}
                  </p>
                  
                  <span className="text-[11px] mt-4 font-semibold text-[#4B6B40] uppercase tracking-wider bg-[#EAF0E3] px-3 py-1 rounded-full">
                    View Shop
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}