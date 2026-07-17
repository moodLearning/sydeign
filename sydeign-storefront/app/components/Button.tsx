import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  label: string;
  to: string;
  className?: string; 
}

export function Button({ label, to, className = "" }: ButtonProps) {
  return (
    <div className={`text-center ${className}`}>
      <Link 
        to={to} 
        className="text-xl font-bold inline-block bg-[#b36336] text-white px-8 py-2 rounded-2xl hover:bg-[#995229] transition"
      >
        {label}
      </Link>
    </div>
  );
}

export function ButtonAlt({ label, to, className = "" }: ButtonProps) {
  return (
    <div className={`text-center ${className}`}>
      <Link 
        to={to} 
        className="inline-block rounded-full border-4 border-rust text-rust text-m lg:text-2xl font-sans px-4 py-0 pb-0.5 lg:px-8 lg:py-1 lg:pb-2 hover:bg-rust hover:text-white hover:font-bold transition"
      >
        {label}
      </Link>
    </div>
  );
}

export function ButtonCard({ label, to }: ButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-[18px] border border-[#e2d5c5] bg-white px-6 py-3.5 text-md font-bold uppercase tracking-[0.15em] text-[#7b5a45] shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:bg-[#7b5a45] hover:text-white hover:border-[#7b5a45] hover:shadow-[0_8px_20px_rgba(123,90,69,0.15)] hover:-translate-y-0.5 active:translate-y-0 shrink-0 group"
    >
      {label}
      {/* If your ButtonCard has that little right arrow from the original screenshot, add this: */}
      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}