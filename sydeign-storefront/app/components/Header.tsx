import React from 'react';
import { Form, Link, useSubmit } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Settings } from 'lucide-react';

export default function Header({ q }: { q?: string }) {
  const submit = useSubmit();

  return (
    <header className="relative z-50 bg-[#FFFCEB] px-8 py-4 flex items-center justify-between border-b border-[#D4D9C1] shadow-md">
      
      {/* LEFT: Logo + Search */}
      <div className="flex items-center gap-12 flex-1">
        <Link to="/home" className="hover:opacity-80 transition flex items-center">
          <img
            src="/logo-small.png"
            alt="SÝDEIGN"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <Form action="/" method="get" className="relative w-full max-w-xl">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search products, shops..."
            onChange={(e) => submit(e.currentTarget.form)}
            className="w-full bg-[#FAFAF2] border border-[#BAC3A1] rounded-full px-6 py-2 text-[#4B6B40] focus:outline-none focus:ring-1 focus:ring-[#4B6B40] placeholder-[#A3AF8A]"
          />
          <span className="absolute right-4 top-2.5 text-[#4B6B40] pointer-events-none">
            <Search className="w-5 h-5 stroke-[2.5]" />
          </span>
        </Form>
      </div>

      {/* RIGHT: Navigation */}
      <nav className="flex items-center gap-8 text-[#4B6B40] font-medium ml-8 relative">
        <Link to="/" className="hover:text-[#2C4124]">Home</Link>
        <Link to="/products" className="hover:text-[#2C4124]">Products</Link>
        <Link to="/designers" className="hover:text-[#2C4124]">Designers</Link>
        <Link to="/about" className="hover:text-[#2C4124]">About Us</Link>
        <Link to="/contact" className="hover:text-[#2C4124]">Contact Us</Link>

        {/* ICONS */}
        <div className="flex items-center gap-4 ml-4 text-[#4B6B40]">
          <span className="cursor-not-allowed opacity-60 hover:text-[#2C4124] transition-colors">
            <ShoppingCart className="w-6 h-6" />
          </span>
          <span className="cursor-not-allowed opacity-60 hover:text-[#2C4124] transition-colors">
            <Heart className="w-6 h-6" />
          </span>
          <span className="cursor-not-allowed opacity-60 hover:text-[#2C4124] transition-colors">
            <Settings className="w-6 h-6" />
          </span>
        </div>
      </nav>
    </header>
  );
}   
