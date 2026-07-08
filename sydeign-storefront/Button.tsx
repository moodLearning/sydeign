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
