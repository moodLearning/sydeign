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
    return <p className="drawer-empty-text">Your cart is empty.</p>;
  }

  return (
    <div className="drawer-content">
      {/* Items Area */}
      <div className="drawer-items-scroll">
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
      <div className="drawer-actions-footer">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Selected Items ({selectedCartItems.length}x):</span>
          <div className="text-right">
            <span className="cart-subtotal-label">Subtotal</span>
            <span className="cart-subtotal-value">
              ₱ {cartSubTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="drawer-actions-row">
          <button
            onClick={closeDrawer}
            disabled={isRedirecting}
            className="drawer-btn-secondary-fade"
          >
            Continue Shopping
          </button>

          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting || selectedCartItems.length === 0}
            className="drawer-btn-checkout"
          >
            {isRedirecting ? 'Redirecting...' : 'Check Out'}
          </button>
        </div>
      </div>
    </div>
  );
}