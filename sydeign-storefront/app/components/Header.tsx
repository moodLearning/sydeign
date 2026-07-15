import React, { useState, useEffect } from 'react';
import { Form, Link, useSubmit, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, Bell, Menu, LogIn,
  User, UserCheck, Package, Trophy, Compass, LogOut 
} from 'lucide-react';
import { useCart } from '../data/CartContext';
import { Drawer } from './Drawer';
import { DrawerItem } from './DrawerItem';

export default function Header({ q }: { q?: string }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const {
    cartItems,
    wishlistItems,
    updateCartQuantity,
    toggleCartSelect,
    toggleWishlistSelect,
    removeFromCart,
    removeFromWishlist,
  } = useCart();
  
  // Active drawer identifier
  const [activeDrawer, setActiveDrawer] = useState<'profile' | 'wishlist' | 'cart' | null>(null);
  
  // Controls dynamic login views
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync state cleanly with the storage token (using shopify_customer_token)
  useEffect(() => {
    const token = localStorage.getItem('shopify_customer_token');
    setIsLoggedIn(!!token);
  }, [activeDrawer]); 

  // Derivations
  const selectedCartItems = cartItems.filter(item => item.selected);
  const cartSubTotal = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const activeWishlistItem = wishlistItems.find(item => item.selected);

  const closeDrawer = () => setActiveDrawer(null);

  // Updated to clear the correct storage key on logout
  const handleLogout = () => {
    localStorage.removeItem('shopify_customer_token');
    setIsLoggedIn(false);
    closeDrawer();
    navigate('/');
  };

  // --- RENDERS DYNAMIC ACTION FOOTERS ---
  const renderFooter = (type: 'cart' | 'wishlist') => {
    const isCart = type === 'cart';
    return (
      <div className="flex flex-col gap-4 w-full">
        {isCart ? (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Selected Items ({selectedCartItems.length}x):</span>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                ₱ {cartSubTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ) : activeWishlistItem && (
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
            {isCart ? 'Continue Shopping' : 'Keep Browsing'}
          </button>
          <button className="flex-1 py-3 bg-[#D36B45] hover:bg-[#b25130] text-white rounded-xl font-bold transition text-center shadow-md text-sm">
            {isCart ? 'Check Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
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

          {/* ACTIVE TRIGGER BUTTONS */}
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

      {/* --- MENU DRAWER POPUP --- */}
      <Drawer isOpen={activeDrawer === 'profile'} onClose={closeDrawer} title="Menu">
        <div className="flex flex-col h-full bg-[#F2F2F2] -m-6 p-6 justify-center">
          {isLoggedIn ? (
            /* --- LOGGED IN WINDOW VIEW --- */
            <>
              <div className="p-4 pt-6 flex flex-col items-center border-b border-gray-200">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#4B6B40] shadow-md mb-4">
                  <img 
                    src="/profile-avatar.png" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256"; }} 
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">Authenticated User</h3>
              </div>
              <nav className="flex-1 py-8 flex flex-col gap-4 text-xl text-gray-800">
                <Link to="/account" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition"><User className="w-6 h-6 text-gray-600" /><span>My account</span></Link>
                <Link to="/following" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition"><UserCheck className="w-6 h-6 text-gray-600" /><span>Following</span></Link>
                <Link to="/orders" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition"><Package className="w-6 h-6 text-gray-600" /><span>View Orders</span></Link>
                <Link to="/rewards" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition"><Trophy className="w-6 h-6 text-gray-600" /><span>My Rewards</span></Link>
                <Link to="/track-orders" onClick={closeDrawer} className="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-white transition"><Compass className="w-6 h-6 text-gray-600" /><span>Track Orders</span></Link>
                
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-5 px-4 py-3 mt-auto rounded-lg text-red-600 hover:bg-red-50 transition font-medium border border-dashed border-red-200"
                >
                  <LogOut className="w-6 h-6" />
                  <span>Log Out</span>
                </button>
              </nav>
            </>
          ) : (
            /* --- SIGNED OUT WINDOW VIEW --- */
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#D4D9C1] shadow-sm">
              <div className="p-4 bg-[#F2F4E1] rounded-full text-[#4B6B40] mb-4">
                <LogIn className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-cinzel font-bold text-[#4B6B40] mb-2">Welcome to SÝDEIGN</h4>
              <p className="text-sm text-[#7D8B62] mb-6 max-w-[240px] text-center">
                Create an account or login to unlock orders, tracking, and rewards.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <Link 
                  to="?auth=login" 
                  onClick={closeDrawer}
                  className="w-full py-3 bg-[#D36B45] hover:bg-[#b25130] text-white font-bold rounded-xl transition shadow-sm text-center text-sm"
                >
                  Login Account
                </Link>
                <Link 
                  to="?auth=signup" 
                  onClick={closeDrawer}
                  className="w-full py-3 border border-[#BAC3A1] text-[#4B6B40] font-bold rounded-xl bg-[#FFFCEB] hover:bg-[#F2F4E1] transition text-center text-sm"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer 
        isOpen={activeDrawer === 'wishlist'} 
        onClose={closeDrawer} 
        title="My Wishlist"
        footer={wishlistItems.length > 0 ? renderFooter('wishlist') : undefined}
      >
        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-lg">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
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
          ))
        )}
      </Drawer>

      {/* Cart Drawer */}
      <Drawer 
        isOpen={activeDrawer === 'cart'} 
        onClose={closeDrawer} 
        title="Shopping Cart"
        footer={cartItems.length > 0 ? renderFooter('cart') : undefined}
      >
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
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
          ))
        )}
      </Drawer>
    </>
  );
}