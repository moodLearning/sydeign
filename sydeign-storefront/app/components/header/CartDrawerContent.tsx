import React, { useState } from 'react';
import { useCart } from '../../data/CartContext';
import { DrawerItem } from '../DrawerItem';

interface CartDrawerContentProps {
  closeDrawer: () => void;
}

export function CartDrawerContent({ closeDrawer }: CartDrawerContentProps) {
  const { cartItems, updateCartQuantity, toggleCartSelect, removeFromCart, getCheckoutUrl } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const selectedCartItems = cartItems.filter(item => item.selected);
  const cartSubTotal = selectedCartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity, 
    0
  );

  const handleCheckoutRedirect = async () => {
    setIsRedirecting(true);
    try {
      const checkoutUrl = await getCheckoutUrl();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert('Could not generate checkout session. Please check your items.');
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error(error);
      setIsRedirecting(false);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-500 mt-12 text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Items Area */}
      <div className="flex-1 overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <DrawerItem
            key={item.id}
            image={item.product.image}
            title={item.product.title}
            subtitle={item.product.designerName || 'Designer Collection'}
            price={item.product.price}
            selected={item.selected}
            onToggleSelect={() => toggleCartSelect(item.id)}
            onRemove={() => removeFromCart(item.id)}
            quantity={item.quantity}
            onUpdateQuantity={(delta) => updateCartQuantity(item.id, delta)}
          />
        ))}
      </div>

      {/* Cart Footer Area */}
      <div className="flex flex-col gap-4 w-full pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Selected Items ({selectedCartItems.length}x):</span>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Subtotal</span>
            <span className="text-2xl font-bold text-gray-900">
              ₱ {cartSubTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={closeDrawer} 
            disabled={isRedirecting}
            className="flex-1 py-3 border border-[#BAC3A1] text-[#4B6B40] rounded-xl font-bold bg-white hover:bg-gray-50 transition text-center text-sm disabled:opacity-50"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting || selectedCartItems.length === 0}
            className="flex-1 py-3 bg-[#D36B45] hover:bg-[#b25130] text-white rounded-xl font-bold transition text-center shadow-md text-sm flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRedirecting ? 'Redirecting...' : 'Check Out'}
          </button>
        </div>
      </div>
    </div>
  );
}