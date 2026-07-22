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
      className={`drawer-overlay ${
        isOpen ? 'drawer-overlay-open' : 'drawer-overlay-closed'
      }`}
      onClick={onClose}
    >
      <aside
        className={`drawer-panel ${
          isOpen ? 'drawer-panel-open' : 'drawer-panel-closed'
        }`}
        onClick={(e) => e.stopPropagation()} // Keeps inner clicks from closing drawer
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3 className="drawer-title">
            {title}
          </h3>
          <button onClick={onClose} className="drawer-close-btn">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Dynamic Drawer Content */}
        <div className="drawer-body">
          {children}
        </div>

        {/* Drawer Footer (Sticky Actions) */}
        {footer && (
          <div className="drawer-footer">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}