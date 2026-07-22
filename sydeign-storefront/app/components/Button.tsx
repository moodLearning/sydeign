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
        className="btn-primary"
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
        className="btn-outline"
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
      className="btn-card group"
    >
      {label}
      {/* If your ButtonCard has that little right arrow from the original screenshot, add this: */}
      <span className="btn-card-arrow">
        →
      </span>
    </Link>
  );
}