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
        className="inline-block bg-[#b36336] text-white px-8 py-2 rounded hover:bg-[#995229] transition"
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
        className="inline-block rounded-full border-4 border-rust text-rust text-2xl font-sans px-8 py-2 pb-3 hover:bg-rust hover:text-white hover:font-bold transition"
      >
        {label}
      </Link>
    </div>
  );
}
