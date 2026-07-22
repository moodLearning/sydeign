import React, { useState } from 'react';
import { Form, Link, useSubmit, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Bell, Menu } from 'lucide-react';
import { useCart } from '../data/CartContext';
import { useAuth } from '../data/AuthContext';
import { useCustomerProfile } from '../hooks/useCustomerProfile';
import { Drawer } from './Drawer';
import { CartDrawerContent } from './header/CartDrawerContent';
import { WishlistDrawerContent } from './header/WishlistDrawerContent';
import { ProfileDrawerContent } from './header/ProfileDrawerContent';

export default function Header({ q }: { q?: string }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const { cartItems, wishlistItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const { name: customerName } = useCustomerProfile();
  
  const [activeDrawer, setActiveDrawer] = useState<'profile' | 'wishlist' | 'cart' | null>(null);

  const closeDrawer = () => setActiveDrawer(null);

  const handleLogout = () => {
    logout(); 
    closeDrawer();
    navigate('/');
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header-left">
          <Link to="/" className="site-header-logo-link">
            <img src="/logo-small.png" alt="SÝDEIGN" className="site-header-logo" />
          </Link>

          <Form action="/search" method="get" className="site-header-search-form">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search products, designers..."
              onChange={(e) => submit(e.currentTarget.form)}
              className="site-header-search-input"
            />
            <span className="site-header-search-icon">
              <Search className="site-header-search-icon-glyph" />
            </span>
          </Form>
        </div>

        <nav className="site-header-nav">
          <Link to="/" className="site-header-nav-link">Home</Link>
          <Link to="/products" className="site-header-nav-link">Products</Link>
          <Link to="/designers" className="site-header-nav-link">Designers</Link>
          <Link to="/about" className="site-header-nav-link">About Us</Link>
          <Link to="/contact" className="site-header-nav-link">Contact Us</Link>

          {/* Action Trigger Buttons */}
          <div className="site-header-actions">
            <Link to="/notifications" className="site-header-action-link" title="Notifications">
              <Bell className="site-header-icon" />
              <span className="site-header-notif-dot" />
            </Link>

            <button onClick={() => setActiveDrawer('wishlist')} className="site-header-action-link" title="Wishlist">
              <Heart className="site-header-icon" />
              {wishlistItems.length > 0 && (
                <span className="site-header-badge">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button onClick={() => setActiveDrawer('cart')} className="site-header-action-link" title="Shopping Cart">
              <ShoppingCart className="site-header-icon" />
              {cartItems.length > 0 && (
                <span className="site-header-badge-cart">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button onClick={() => setActiveDrawer('profile')} className="site-header-menu-btn" title="Menu">
              <Menu className="site-header-icon" />
            </button>
          </div>
        </nav>
      </header>

      {/* Profile/Menu Sidebar */}
      <Drawer isOpen={activeDrawer === 'profile'} onClose={closeDrawer} title="Menu">
        <ProfileDrawerContent
          isLoggedIn={isLoggedIn}
          customerName={customerName}
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