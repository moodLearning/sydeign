import React, { useState, useEffect } from 'react';
import { Form, Link, useSubmit, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Bell, Menu } from 'lucide-react';
import { useCart } from '../data/CartContext';
import { Drawer } from './Drawer';
import { CartDrawerContent } from './header/CartDrawerContent';
import { WishlistDrawerContent } from './header/WishlistDrawerContent';
import { ProfileDrawerContent } from './header/ProfileDrawerContent';

export default function Header({ q }: { q?: string }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { cartItems, wishlistItems } = useCart();
  
  const [activeDrawer, setActiveDrawer] = useState<'profile' | 'wishlist' | 'cart' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('shopify_customer_token');
    setIsLoggedIn(!!token);
  }, [activeDrawer]); 

  const closeDrawer = () => setActiveDrawer(null);

  const handleLogout = () => {
    localStorage.removeItem('shopify_customer_token');
    setIsLoggedIn(false);
    closeDrawer();
    navigate('/');
  };

  return (
    <>
      <header className="relative z-50 bg-[#FFFCEB] px-8 py-4 flex items-center justify-between border-b border-[#D4D9C1] shadow-md">
        <div className="flex items-center gap-12 flex-1">
          <Link to="/" className="hover:opacity-80 transition flex items-center">
            <img src="/logo-small.png" alt="SÝDEIGN" className="h-10 w-auto object-contain" />
          </Link>

          <Form action="/search" method="get" className="relative w-full max-w-xl">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search products, shops..."
              onChange={(e) => submit(e.currentTarget.form)}
              className="w-full bg-[#FAFAF2] border border-[#BAC3A1] rounded-full px-6 py-2 text-[#4B6B40] focus:outline-none focus:ring-1 focus:ring-[#4B6B40] placeholder-[#A3AF8A] text-xl font-sans"
            />
            <span className="absolute right-4 top-2.5 text-[#4B6B40]">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </span>
          </Form>
        </div>

        <nav className="flex items-center gap-8 text-[#4B6B40] font-sans text-2xl ml-8 relative">
          <Link to="/" className="hover:text-[#2C4124]">Home</Link>
          <Link to="/products" className="hover:text-[#2C4124]">Products</Link>
          <Link to="/designers" className="hover:text-[#2C4124]">Designers</Link>
          <Link to="/about" className="hover:text-[#2C4124]">About Us</Link>
          <Link to="/contact" className="hover:text-[#2C4124]">Contact Us</Link>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-4 ml-4 text-[#4B6B40]">
            <Link to="/notifications" className="hover:text-[#2C4124] transition-colors relative" title="Notifications">
              <Bell className="w-6 h-6 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 bg-red-500 h-2.5 w-2.5 rounded-full" />
            </Link>
            
            <button onClick={() => setActiveDrawer('wishlist')} className="hover:text-[#2C4124] transition-colors relative" title="Wishlist">
              <Heart className="w-6 h-6 stroke-[2.2]" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#4B6B40] text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button onClick={() => setActiveDrawer('cart')} className="hover:text-[#2C4124] transition-colors relative" title="Shopping Cart">
              <ShoppingCart className="w-6 h-6 stroke-[2.2]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#D36B45] text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button onClick={() => setActiveDrawer('profile')} className="hover:text-[#2C4124] transition-colors focus:outline-none" title="Menu">
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Profile/Menu Sidebar */}
      <Drawer isOpen={activeDrawer === 'profile'} onClose={closeDrawer} title="Menu">
        <ProfileDrawerContent 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout} 
          closeDrawer={closeDrawer} 
        />
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer isOpen={activeDrawer === 'wishlist'} onClose={closeDrawer} title="My Wishlist">
        <WishlistDrawerContent closeDrawer={closeDrawer} />
      </Drawer>

      {/* Cart Drawer */}
      <Drawer isOpen={activeDrawer === 'cart'} onClose={closeDrawer} title="Shopping Cart">
        <CartDrawerContent closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}