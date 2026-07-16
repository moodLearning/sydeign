import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
// Import the same PKCE helpers your signup uses
import { generateCodeVerifier, generateCodeChallenge } from '../auth'; 

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);

  const isOpen = searchParams.get('auth') === 'login';

  if (!isOpen) return null;

  const handleClose = () => {
    searchParams.delete('auth');
    setSearchParams(searchParams);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  // Replace the broken redirectToShopifyLogin with your working Signup logic!
  const triggerShopifyAuth = async () => {
    try {
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);

      sessionStorage.setItem('shopify_code_verifier', verifier);

      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('shopify_auth_state', state);

      const shopifyAuthUrl = new URL('https://shopify.com/authentication/77132071069/oauth/authorize');
      
      // Kept identical to your working signup parameters
      shopifyAuthUrl.searchParams.append('client_id', 'f3b178c7-7dc8-40b7-ad03-1a0dc8be7ab5');
      shopifyAuthUrl.searchParams.append('redirect_uri', 'https://quality-education-exhaust-formal.trycloudflare.com/authenticate');
      shopifyAuthUrl.searchParams.append('response_type', 'code');
      shopifyAuthUrl.searchParams.append('scope', 'openid email customer-account-api:full');
      shopifyAuthUrl.searchParams.append('state', state);
      shopifyAuthUrl.searchParams.append('code_challenge', challenge);
      shopifyAuthUrl.searchParams.append('code_challenge_method', 'S256');

      window.location.href = shopifyAuthUrl.toString();
    } catch (error) {
      console.error("Failed to generate PKCE challenge or redirect:", error);
    }
  };

  const handleShopifyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerShopifyAuth();
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f110c]/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-[32px] overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row relative animate-scaleUp"
      >
        
        {/* Close Button Top Right */}
        <button 
          type="button"
          onClick={handleClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition z-50 text-xl font-bold"
        >
          ✕
        </button>

        {/* Left Interactive Form Column */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left flex flex-col items-center md:items-start">
            <img src="/logo-small.png" alt="SÝDEIGN" className="h-12 w-auto mb-6" />
            <h1 className="text-3xl font-bold font-sans text-gray-900">Login Account</h1>
            <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
              Log in safely using Shopify's secure, passwordless email codes. No password to remember!
            </p>
          </div>

          <form onSubmit={handleShopifyLogin} className="space-y-4">
            <button
              type="submit"
              className="w-full py-4 bg-[#D36B45] hover:bg-[#b25130] text-white font-bold rounded-xl transition shadow-md tracking-wide flex items-center justify-center"
            >
              CONTINUE TO SECURE LOGIN
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 mb-4">or login with</p>
            <div className="flex justify-center gap-4">
              {/* Facebook Button */}
              <button 
                onClick={handleShopifyLogin}
                className="w-12 h-12 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-gray-200 transition"
                title="Login with Facebook"
              >
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* Google Button */}
              <button 
                onClick={handleShopifyLogin}
                className="w-12 h-12 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-gray-200 transition"
                title="Login with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.125C18.29 1.964 15.485.8 12.24.8 6.01.8 1 5.81 1 12s5.01 11.2 11.24 11.2c6.5 0 10.822-4.571 10.822-11.015 0-.74-.08-1.3-.177-1.9H12.24z"/>
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => {
                  searchParams.set('auth', 'signup');
                  setSearchParams(searchParams);
                }} 
                className="text-[#D36B45] font-bold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Right Graphical Marketing Panel */}
        <div className="hidden md:flex md:w-1/2 bg-[#B78453] p-12 flex-col justify-between items-center text-center text-white relative">
          <div className="w-full max-w-xs mt-8">
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600" 
              alt="Jewelry Showcase" 
              className="w-full h-80 object-cover rounded-2xl shadow-lg border-4 border-white/20"
            />
          </div>
          <p className="font-sans text-lg font-medium tracking-wide max-w-sm mt-6">
            "Unlock a World of Wonders: Dive into our Creative Marketplace!"
          </p>
        </div>

      </div>
    </div>
  );
}