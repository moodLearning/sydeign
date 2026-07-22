import type { Designer } from '../../data/shopify';

interface DiscoverDesignerCardProps {
  designer: Designer;
  productImage: string;
  isAlternate: boolean;
}

export function DiscoverDesignerCard({
  designer,
  productImage,
  isAlternate,
}: DiscoverDesignerCardProps) {
  return (
    <div
      className={`discover-card group ${
        isAlternate
          ? 'discover-card-reverse'
          : 'discover-card-normal'
      }`}
    >
      {/* Designer Avatar Section */}
      <div className="discover-card-avatar-wrap">
        <img
          src={designer.profileImage || '/placeholder-designer.png'}
          alt={designer.name}
          className="discover-card-avatar-img"
        />
        {/* Subtle dark overlay gradient on the avatar for depth */}
        <div className="discover-card-avatar-overlay" />
      </div>

      {/* Designer Information Section */}
      <div
        className="discover-card-info"
        style={{
          backgroundImage: `radial-gradient(
            circle at bottom ${isAlternate ? 'left' : 'right'},
            rgba(85, 107, 87, 0.08) 0%,
            transparent 65%
          )`,
          backgroundPosition: isAlternate ? 'bottom left' : 'bottom right',
        }}
      >
        {/* Header/Handle with Clean Verified Badge */}
        <div className="discover-card-handle-row">
          <p className="discover-card-handle">
            @{designer.handle}
          </p>
          <span className="discover-card-verified-badge">
            <svg
              className="discover-card-verified-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>

        {/* Designer Name */}
        <h3 className="discover-card-name">
          {designer.name}
        </h3>

        {/* Bio */}
        <p className="discover-card-bio">
          {designer.bio || 'No biography available.'}
        </p>
      </div>

      {/* Featured Product Container */}
      <div
        className={`discover-card-product-wrap ${isAlternate ? 'discover-card-product-border-r' : 'discover-card-product-border-l'}`}
      >
        <div className="discover-card-product-glow" />

        <img
          src={productImage}
          alt="Featured Product"
          className="discover-card-product-img"
        />
      </div>
    </div>
  );
}