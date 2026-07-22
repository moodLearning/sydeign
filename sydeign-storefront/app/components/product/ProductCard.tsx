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
        className="product-card group"
      >
        {/* Image */}
        <div className="product-card-image-wrap">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.title}
            loading="lazy"
            className="product-card-image"
          />
        </div>

        {/* Content */}
        <div className="product-card-content">
          <span className="product-card-price">
            {formattedPrice}
          </span>

          <h4
            className="product-card-title"
            title={product.title}
          >
            {product.title}
          </h4>

          <div className="product-card-meta-row">
            <p
              className="product-card-designer"
              title={designer}
            >
              {designer}
            </p>

            <div className="product-card-actions">
              <button
                type="button"
                onClick={handleWishlistClick}
                className={`product-card-action-btn ${isWishlisted ? 'product-card-wishlist-active' : ''}`}
                aria-label={`Add ${product.title} to wishlist`}
                title="Add to wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={handleCartClick}
                className="product-card-action-btn"
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