import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from './shopify';
import { useAuth } from './AuthContext'; 

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
  getCheckoutUrl: () => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'a31c4c2226ad99d901220ac433acc15c';
const SHOPIFY_STORE_DOMAIN = 'sydeign-ypslvqn7.myshopify.com'; 

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { token: customerAccessToken } = useAuth();

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
      console.log("Adding to cart:", {
        title: product.title,
        productId: product.id,
        variantId: product.variantId,
      });
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

  const getCheckoutUrl = async (): Promise<string | null> => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) return null;

    const lines = selectedItems.map((item) => ({
      merchandiseId: item.product.variantId,
      quantity: item.quantity,
    }));

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            code
            field
            message
          }
        }
      }
    `;

    const input: any = { lines };
    if (customerAccessToken) {
      input.buyerIdentity = {
        customerAccessToken: customerAccessToken,
      };
    }

    try {
      const response = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query,
            variables: { input },
          }),
        }
      );

      const json = await response.json();
      
      if (json.errors?.length > 0) {
        console.error('GraphQL API errors:', json.errors);
        return null;
      }

      const { cart, userErrors } = json.data.cartCreate;

      if (userErrors?.length > 0) {
        console.error('Cart mutation errors:', userErrors);
        return null;
      }

      return cart?.checkoutUrl ?? null;
    } catch (err) {
      console.error('Network or parsing error during checkout creation:', err);
      return null;
    }
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
        getCheckoutUrl,
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