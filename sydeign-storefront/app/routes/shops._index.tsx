import { useLoaderData, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    const merchantData = (typeof data === 'object' && data !== null && 'data' in data) ? (data as Record<string, unknown>).data : data;
    return { merchants: merchantData as Merchant[] };
  } catch (error) {
    console.error('Laravel Merchant Fetch Error:', error);
    return { merchants: [] };
  }
}

export default function ShopsList() {
  const { merchants } = useLoaderData<typeof loader>();
  
  // Internal Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Filter merchants based on search query
  const filteredMerchants = merchants.filter((merchant) =>
    merchant.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAF9F0] min-h-screen flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto w-full p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-bold text-[#4B6B40]">Merchants</h1>
          
          {/* Local Search Bar */}
          <div className="w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search local shops..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B6B40] bg-white shadow-sm text-sm"
            />
          </div>
        </div>

        {filteredMerchants.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No merchants found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredMerchants.map((merchant) => {
              const initial = merchant.store_name ? merchant.store_name.charAt(0).toUpperCase() : 'M';
              
              return (
                <Link 
                  to={`/shops/${merchant.id}`} 
                  key={merchant.id} 
                  // Strict card sizing with flex layout and bounded height boundaries
                  className="bg-[#FFFCEB] rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition p-5 flex flex-col items-center group h-[250px]"
                >
                  <div className="w-20 h-20 shrink-0 rounded-full bg-[#4B6B40] text-[#FFFCEB] flex items-center justify-center font-serif text-3xl font-bold mb-4 shadow-inner group-hover:scale-105 transition">
                    {initial}
                  </div>
                  
                  <h4 className="font-serif font-bold text-lg text-gray-800 line-clamp-1 w-full text-center">
                    {merchant.store_name || 'Unnamed Shop'}
                  </h4>
                  
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 text-center h-8 px-2 flex items-center justify-center">
                    {merchant.store_description || 'No description available.'}
                  </p>
                  
                  <span className="text-[11px] mt-auto font-semibold text-[#4B6B40] uppercase tracking-wider bg-[#EAF0E3] px-3 py-1 rounded-full">
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