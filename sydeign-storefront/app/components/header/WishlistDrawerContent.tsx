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
    return <p className="text-center text-gray-500 mt-12 text-lg">Your wishlist is empty.</p>;
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Items Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1">
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
      <div className="flex flex-col gap-4 w-full pt-4 border-t border-gray-100">
        {activeWishlistItem && (
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-[#D4D9C1]">
            <img 
              src={activeWishlistItem.product.image || '/placeholder.png'} 
              className="w-10 h-10 rounded object-cover" 
              alt=""
            />
            <span className="text-sm text-gray-600 font-medium truncate">
              Ready to move: {activeWishlistItem.product.title}
            </span>
          </div>
        )}

        <div className="flex gap-3">
          <button 
            onClick={closeDrawer} 
            className="flex-1 py-3 border border-[#BAC3A1] text-[#4B6B40] rounded-xl font-bold bg-white hover:bg-gray-50 transition text-center text-sm"
          >
            Keep Browsing
          </button>
          <button className="flex-1 py-3 bg-[#D36B45] hover:bg-[#b25130] text-white rounded-xl font-bold transition text-center shadow-md text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}