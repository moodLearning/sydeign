import React from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children, footer }: DrawerProps) {
  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <aside 
        className={`absolute right-0 top-0 h-full w-[500px] sm:w-[550px] md:w-[650px] max-w-[90vw] bg-[#FFFDF5] shadow-2xl flex flex-col font-sans transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Keeps inner clicks from closing drawer
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D4D9C1] flex justify-between items-center bg-[#FFFCEB]">
          <h3 className="text-3xl font-cinzel uppercase font-bold text-[#4B6B40]">
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Dynamic Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFFDF5]">
          {children}
        </div>

        {/* Drawer Footer (Sticky Actions) */}
        {footer && (
          <div className="p-6 bg-[#FFFCEB] border-t border-[#D4D9C1]">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}