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
    <div className="bg-[#FFFCEB] border border-[#D4D9C1] rounded-xl p-4 flex gap-4 items-center shadow-sm">
      {/* Checkbox Selector */}
      <input 
        type="checkbox" 
        checked={selected} 
        onChange={onToggleSelect} 
        className="w-5 h-5 accent-[#4B6B40] cursor-pointer shrink-0" 
      />

      {/* Product Image */}
      <img 
        src={image || '/placeholder.png'} 
        alt={title} 
        className="w-24 h-24 rounded-lg object-cover border border-[#D4D9C1] shrink-0" 
      />

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-bold text-[#4B6B40] truncate" title={title}>
          {title}
        </h4>
        <p className="text-xs text-gray-500 mb-2">{subtitle}</p>

        <div className="flex items-center justify-between">
          {/* Cart Quantity Adjusters */}
          {isCartMode && (
            <div className="flex items-center border border-[#BAC3A1] rounded bg-white text-sm">
              <button 
                onClick={() => onUpdateQuantity(-1)} 
                className="px-2 py-0.5 font-bold hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="px-2 py-0.5 font-medium border-x border-[#BAC3A1]">{quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(1)} 
                className="px-2 py-0.5 font-bold hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          )}

          {/* Dynamic Row Price Calculation */}
          <span className="text-lg font-bold text-gray-900 ml-auto">
            ₱ {((price) * (quantity ?? 1)).toLocaleString()}
          </span>

          {/* Cart Delete Action Icon */}
          {isCartMode && (
            <button 
              onClick={onRemove} 
              className="text-[#C1C9A1] hover:text-red-500 transition-colors p-1 ml-2 shrink-0"
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
          className="text-[#C1C9A1] hover:text-red-500 transition-colors self-start p-1 shrink-0"
          title="Remove from wishlist"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}