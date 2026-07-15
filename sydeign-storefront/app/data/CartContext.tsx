import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from './shopify'; 

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface WishlistItem {
  id: string;
  product: Product;
  selected: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  toggleCartSelect: (id: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlistSelect: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.handle === product.handle);
      if (exists) {
        return prev.map((item) =>
          item.product.handle === product.handle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.handle, product, quantity: 1, selected: true }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const toggleCartSelect = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.product.handle === product.handle);
      if (exists) return prev; // Avoid duplicates
      return [...prev, { id: product.handle, product, selected: true }];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlistSelect = (id: string) => {
    setWishlistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartSelect,
        addToWishlist,
        removeFromWishlist,
        toggleWishlistSelect,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}