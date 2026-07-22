import { Trash2 } from 'lucide-react';

interface DrawerItemProps {
  image?: string;
  title: string;
  subtitle: string;
  price: number;
  selected: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  // Optional cart props - when present, renders cart-specific features
  quantity?: number;
  onUpdateQuantity?: (delta: number) => void;
}

export function DrawerItem({
  image,
  title,
  subtitle,
  price,
  selected,
  onToggleSelect,
  onRemove,
  quantity,
  onUpdateQuantity,
}: DrawerItemProps) {
  const isCartMode = quantity !== undefined && onUpdateQuantity !== undefined;

  return (
    <div className="drawer-item">
      {/* Checkbox Selector */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggleSelect}
        className="drawer-item-checkbox"
      />

      {/* Product Image */}
      <img
        src={image || '/placeholder.png'}
        alt={title}
        className="drawer-item-image"
      />

      {/* Main Info */}
      <div className="drawer-item-info">
        <h4 className="drawer-item-title" title={title}>
          {title}
        </h4>
        <p className="drawer-item-subtitle">{subtitle}</p>

        <div className="drawer-item-row">
          {/* Cart Quantity Adjusters */}
          {isCartMode && (
            <div className="drawer-item-qty">
              <button
                onClick={() => onUpdateQuantity(-1)}
                className="drawer-item-qty-btn"
              >
                -
              </button>
              <span className="drawer-item-qty-value">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(1)}
                className="drawer-item-qty-btn"
              >
                +
              </button>
            </div>
          )}

          {/* Dynamic Row Price Calculation */}
          <span className="drawer-item-price">
            ₱ {((price) * (quantity ?? 1)).toLocaleString()}
          </span>

          {/* Cart Delete Action Icon */}
          {isCartMode && (
            <button
              onClick={onRemove}
              className="drawer-item-remove-btn"
              title="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Delete Action Icon */}
      {!isCartMode && (
        <button
          onClick={onRemove}
          className="drawer-item-remove-btn-wishlist"
          title="Remove from wishlist"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}