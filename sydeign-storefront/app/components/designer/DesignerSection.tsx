import { Star } from 'lucide-react';
import { ButtonCard } from '../Button';
import type { Designer, Product } from '../../data/shopify';

interface DesignerSectionProps {
  data: Designer;
  featuredProduct?: Product | null;
}

export function DesignerSection({
  data,
  featuredProduct,
}: DesignerSectionProps) {
  const artwork = featuredProduct?.image || '/artwork.png';

  return (
    <section className="designer-feature-section">
      <img
        src="/corner-frame.png"
        alt=""
        className="designer-feature-corner-tl"
      />
      <img
        src="/corner-frame.png"
        alt=""
        className="designer-feature-corner-tr"
      />
      <img
        src="/corner-frame.png"
        alt=""
        className="designer-feature-corner-bl"
      />
      <img
        src="/corner-frame.png"
        alt=""
        className="designer-feature-corner-br"
      />

      {/* Content Container spanning the page width */}
      <div className="designer-feature-container">
        <div className="designer-feature-grid">

          {/* Column 1: Portrait */}
          <div className="designer-feature-portrait-col">
            <div className="designer-feature-portrait-wrap">
              {/* Subtle glow */}
              <div className="designer-feature-portrait-glow" />

              {/* Frame */}
              <div className="designer-feature-portrait-frame">
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="designer-feature-portrait-img"
                />
              </div>

              {/* Floating badge */}
              <div className="designer-feature-rating-badge">
                <div className="designer-feature-rating-row">
                  <Star
                    size={16}
                    className="fill-[#b88746] text-[#b88746]"
                  />
                  <span className="designer-feature-rating-score">
                    {data.averageRating.toFixed(1)}
                  </span>
                  <span className="designer-feature-rating-sep">•</span>
                  <span className="designer-feature-rating-count">
                    {data.reviewCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Bio & Metadata */}
          <div className="designer-feature-bio-col">
            {/* Designer of the Month Badge */}
            <div className="designer-feature-badge-row">
              <img
                src="/logo-small.png"
                alt="Designer"
                className="designer-feature-badge-logo"
              />
              <div>
                <p className="designer-feature-badge-label">
                  Designer of the Month
                </p>
                <div className="designer-feature-badge-underline" />
              </div>
            </div>

            {/* Name */}
            <h1 className="designer-feature-name">
              {data.name}
            </h1>

            {/* Handle + Follow */}
            <div className="designer-feature-handle-row">
              <div className="designer-feature-handle-inner">
                <span className="designer-feature-handle-text">
                  @{data.handle}
                </span>
                <svg
                  className="designer-feature-handle-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9" />
                </svg>
              </div>

              <button
                type="button"
                className="designer-feature-follow-btn"
              >
                Follow
              </button>
            </div>

            {/* Bio */}
            <p className="designer-feature-bio">
              {data.bio || 'No biography has been provided yet.'}
            </p>

            <div className="designer-feature-cta">
              <ButtonCard
                label="VIEW COLLECTION"
                to={`/designers/${data.handle}`}
              />
            </div>
          </div>

          {/* Column 3: Featured Artwork */}
          <div className="designer-feature-artwork-col">
            <div className="designer-feature-artwork-wrap">
              {/* Background glow */}
              <div className="designer-feature-artwork-glow" />

              {/* Artwork */}
              <img
                src={artwork}
                alt={
                  featuredProduct
                    ? featuredProduct.title
                    : `${data.name}'s featured work`
                }
                className="designer-feature-artwork-img"
              />

              {/* Caption */}
              {featuredProduct && (
                <div className="designer-feature-caption-wrap">
                  <p className="designer-feature-caption-label">
                    Featured Work
                  </p>
                  <h3 className="designer-feature-caption-title">
                    {featuredProduct.title}
                  </h3>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}