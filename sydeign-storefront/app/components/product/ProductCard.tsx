import { Link } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../../data/shopify';
import { useCart } from '../../data/CartContext'; // Adjust path accordingly

interface ProductCardProps {
  product: Product;
}

function formatCurrency(price: number, currency: string) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, wishlistItems } = useCart();

  const formattedPrice = formatCurrency(product.price, product.currency);
  const designer = product.designerName ?? 'Designer Collection';
  
  // Visual state check: see if item is already wishlisted
  const isWishlisted = wishlistItems.some((item) => item.product.handle === product.handle);

  const handleWishlistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToWishlist(product);
  };

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <article>
      <Link
        to={`/products/${product.handle}`}
        className="
          group block
          overflow-hidden
          rounded-2xl
          border border-stone-100
          bg-[#f0f7f6]
          shadow-lg
          transition-transform
          hover:scale-[1.02]
        "
      >
        {/* Image */}
        <div className="aspect-3/4 w-full overflow-hidden bg-stone-200">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-4">
          <span className="text-lg font-bold text-stone-900">
            {formattedPrice}
          </span>

          <h4
            className="
              mt-1
              line-clamp-1
              font-semibold
              text-stone-800
            "
            title={product.title}
          >
            {product.title}
          </h4>

          <div
            className="
              mt-2
              flex
              items-end
              justify-between
              gap-3
            "
          >
            <p
              className="
                max-w-[120px]
                truncate
                text-sm
                text-stone-500
              "
              title={designer}
            >
              {designer}
            </p>

            <div
              className="
                flex
                gap-3
                text-stone-600
              "
            >
              <button
                type="button"
                onClick={handleWishlistClick}
                className={`
                  cursor-pointer
                  transition
                  hover:text-emerald-700
                  ${isWishlisted ? 'text-red-500 hover:text-red-600' : ''}
                `}
                aria-label={`Add ${product.title} to wishlist`}
                title="Add to wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={handleCartClick}
                className="
                  cursor-pointer
                  transition
                  hover:text-emerald-700
                "
                aria-label={`Add ${product.title} to cart`}
                title="Add to cart"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}