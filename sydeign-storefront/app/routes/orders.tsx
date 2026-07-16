import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_ORDERS_QUERY } from '../graphql/customer-account/CustomerOrdersQuery';

// Replace this with your actual Shopify Storefront / Customer Account API endpoint
const SHOPIFY_API_ENDPOINT = 'https://your-shop-name.myshopify.com/api/2024-01/graphql';

export default function MyOrdersPage({ customerAccessToken }) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Placed');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Auth Guard: Redirect if no access token is present
    if (!customerAccessToken) {
      navigate('/?auth=login');
      return;
    }

    // 2. Fetch function using standard fetch API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(SHOPIFY_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Pass the logged-in user's token in the header
            'X-Shopify-Storefront-Customer-Access-Token': customerAccessToken,
          },
          body: JSON.stringify({
            query: CUSTOMER_ORDERS_QUERY,
          }),
        });

        const { data, errors } = await response.json();

        if (errors || !data?.customer) {
          throw new Error(errors?.[0]?.message || 'Failed to retrieve orders');
        }

        setOrders(data.customer.orders.edges || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerAccessToken, navigate]);

  // 3. Filter mapping logic
  const filteredOrders = orders.filter(({ node: order }) => {
    const status = order.fulfillmentStatus;
    const isCancelled = order.cancelReason !== null;

    if (activeTab === 'Cancelled') return isCancelled;
    if (isCancelled) return false; // Don't show cancelled orders in other tabs

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

  if (loading) return <div className="p-12 text-center text-[#4B6B40] font-medium">Loading your order history...</div>;
  if (error) return <div className="p-12 text-center text-red-500">Error: {error}</div>;

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

      {/* Main Panel matching your UI layout */}
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
                        {item.variant?.selectedOptions?.map(opt => (
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