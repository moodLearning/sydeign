import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_ORDERS_QUERY } from '../graphql/customer-account/CustomerOrdersQuery';
import { useAuth } from '../data/AuthContext';

const SHOPIFY_API_ENDPOINT = 'https://sydeign-ypslvqn7.myshopify.com/api/2024-01/graphql';

const PUBLIC_STOREFRONT_ACCESS_TOKEN = 'a31c4c2226ad99d901220ac433acc15c';

interface ShopifyOrdersResponse {
  data?: {
    customer?: {
      orders: {
        edges: Array<{
          node: {
            id: string;
            name: string;
            processedAt: string;
            fulfillmentStatus: string;
            cancelReason: string | null;
            lineItems: {
              edges: Array<{
                node: {
                  title: string;
                  quantity: number;
                  variant?: {
                    price?: {
                      amount: string;
                    };
                    image?: {
                      url: string;
                    };
                    selectedOptions?: Array<{
                      name: string;
                      value: string;
                    }>;
                  };
                };
              }>;
            };
          };
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export default function MyOrdersPage() {
  const { token: customerAccessToken, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Placed');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!customerAccessToken) {
      navigate('/?auth=login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(SHOPIFY_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // MUST use the standard allowed storefront access header:
            'X-Shopify-Storefront-Access-Token': PUBLIC_STOREFRONT_ACCESS_TOKEN, 
          },
          body: JSON.stringify({
            query: CUSTOMER_ORDERS_QUERY,
            // Pass the logged-in customer's access token via query variables
            variables: {
              customerAccessToken: customerAccessToken,
            },
          }),
        });

        const jsonResult = (await response.json()) as ShopifyOrdersResponse;
        const { data, errors } = jsonResult;

        if (errors || !data?.customer) {
          throw new Error(errors?.[0]?.message || 'Failed to retrieve orders');
        }

        setOrders(data.customer.orders.edges || []);
      } catch (err) {
        const errorObj = err as Error;
        setError(errorObj.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerAccessToken, authLoading, navigate]);

  // Filter mapping logic
  const filteredOrders = orders.filter(({ node: order }) => {
    const status = order.fulfillmentStatus;
    const isCancelled = order.cancelReason !== null;

    if (activeTab === 'Cancelled') return isCancelled;
    if (isCancelled) return false;

    switch (activeTab) {
      case 'Placed':
        return status === 'UNFULFILLED' || !status;
      case 'Shipped':
        return status === 'PARTIALLY_FULFILLED';
      case 'Received':
        return status === 'FULFILLED';
      default:
        return true;
    }
  });

  if (authLoading) {
    return <div className="p-12 text-center text-[#4B6B40] font-medium">Verifying session...</div>;
  }

  if (loading) {
    return <div className="p-12 text-center text-[#4B6B40] font-medium">Loading your order history...</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">My Orders</h2>
        <nav className="flex flex-col gap-3">
          {['Placed', 'Packed', 'Shipped', 'Cancelled', 'Received'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-2.5 rounded-lg transition-all font-medium text-sm ${
                activeTab === tab
                  ? 'bg-[#4B6B40] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8 max-w-4xl">
        <div className="flex flex-col gap-8">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No orders found in this category.</div>
          ) : (
            filteredOrders.map(({ node: order }) => (
              <div key={order.id} className="border-b border-gray-100 pb-8">
                {order.lineItems.edges.map(({ node: item }) => (
                  <div key={item.title} className="flex gap-8 items-start mt-4">
                    {/* Product Image */}
                    <img 
                      src={item.variant?.image?.url || "/placeholder-image.png"} 
                      alt={item.title} 
                      className="w-48 h-48 object-cover rounded-xl shadow-sm bg-gray-50"
                    />
                    
                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-cinzel font-bold text-[#4B6B40]">{item.title}</h3>
                      <p className="text-gray-500 mb-1">Jeanne Jeanner</p>
                      <p className="text-xl font-bold text-gray-900 mb-3">
                        ₱ {parseFloat(item.variant?.price?.amount || '0').toLocaleString()}
                      </p>
                      
                      <div className="text-sm text-gray-500 space-y-1 mb-4">
                        <p>Order No: <span className="font-mono text-gray-800 font-bold">{order.name}</span></p>
                        <p>Date: {new Date(order.processedAt).toLocaleDateString()}</p>
                        {item.variant?.selectedOptions?.map((opt: any) => (
                          <p key={opt.name}>{opt.name}: <span className="text-gray-800 font-medium">{opt.value}</span></p>
                        ))}
                        <p>Quantity: <span className="text-gray-800 font-medium">{item.quantity}x</span></p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {activeTab === 'Placed' && (
                          <button className="px-5 py-2 bg-[#D36B45] text-white text-xs font-bold rounded-md hover:bg-[#b25130] transition">
                            CANCEL ORDER
                          </button>
                        )}
                        <button 
                          onClick={() => navigate(`/track-orders?id=${order.id}`)}
                          className="px-5 py-2 bg-[#D36B45] text-white text-xs font-bold rounded-md hover:bg-[#b25130] transition"
                        >
                          TRACK ORDER
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}