import React from 'react';
import { useCart } from '../../data/CartContext';
import { DrawerItem } from '../DrawerItem';

interface WishlistDrawerContentProps {
  closeDrawer: () => void;
}

export function WishlistDrawerContent({ closeDrawer }: WishlistDrawerContentProps) {
  const { wishlistItems, toggleWishlistSelect, removeFromWishlist } = useCart();
  const activeWishlistItem = wishlistItems.find(item => item.selected);

  if (wishlistItems.length === 0) {
    return <p className="drawer-empty-text">Your wishlist is empty.</p>;
  }

  return (
    <div className="drawer-content">
      {/* Items Scroll Area */}
      <div className="drawer-items-scroll">
        {wishlistItems.map((item) => (
          <DrawerItem
            key={item.id}
            image={item.product.image}
            title={item.product.title}
            subtitle={item.product.designerName || 'Designer Collection'}
            price={item.product.price}
            selected={item.selected}
            onToggleSelect={() => toggleWishlistSelect(item.id)}
            onRemove={() => removeFromWishlist(item.id)}
          />
        ))}
      </div>

      {/* Wishlist Actions Area */}
      <div className="drawer-actions-footer">
        {activeWishlistItem && (
          <div className="wishlist-move-preview">
            <img
              src={activeWishlistItem.product.image || '/placeholder.png'}
              className="wishlist-move-preview-img"
              alt=""
            />
            <span className="wishlist-move-preview-text">
              Ready to move: {activeWishlistItem.product.title}
            </span>
          </div>
        )}

        <div className="drawer-actions-row">
          <button
            onClick={closeDrawer}
            className="drawer-btn-secondary"
          >
            Keep Browsing
          </button>
          <button className="drawer-btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}