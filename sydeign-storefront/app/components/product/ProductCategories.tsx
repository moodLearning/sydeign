import React from 'react';
import { Link } from 'react-router';

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
}

interface ProductCategoriesSectionProps {
  collections: ShopifyCollection[];
}

export function ProductCategoriesSection({ collections }: ProductCategoriesSectionProps) {
  return (
    <section
      className="product-categories-section"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 75%, #ffffff 100%), url('/desbg1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional: Simple fallback solid base in case the image fails to load */}
      <div className="product-categories-fallback-bg" />

      {/* Premium Header */}
      <div className="product-categories-header">
        <div className="product-categories-header-row">
          {/* Left Diamond */}
          <span className="product-categories-diamond" />

          <h2 className="product-categories-title">
            Product Categories
          </h2>

          {/* Right Diamond */}
          <span className="product-categories-diamond" />
        </div>
      </div>

      {/* Grid Container */}
      <div className="product-categories-grid">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/products?category=${encodeURIComponent(collection.handle)}`}
            className="product-categories-item group"
          >
            {/* Elegant Circle Frame */}
            <div className="product-categories-circle-frame">

              {/* Inner container to clip the circle cleanly */}
              <div className="product-categories-circle-inner">
                {collection.image?.url ? (
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    className="product-categories-image"
                  />
                ) : (
                  <div className="product-categories-no-image">
                    No Image
                  </div>
                )}

                {/* Subtle overlay that fades out on hover to let the image reveal fully */}
                <div className="product-categories-image-overlay" />
              </div>
            </div>

            {/* High-Readability Label Container */}
            <div className="product-categories-label">
              <span className="product-categories-label-text">
                {collection.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}