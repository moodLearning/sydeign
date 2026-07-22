import type { Designer } from '../../data/shopify';
import { useDesignerFollow } from '../../hooks/useDesignerFollow';
/*import {SocialLinks} from './SocialLinks';*/

// --- React Components ---

interface DesignerHeroProps {
  designer: Designer;
}

export function DesignerHero({ designer }: DesignerHeroProps) {
  return (
    <section className="designer-hero">
      <DesignerBanner designer={designer} />
      <DesignerProfile designer={designer} />
    </section>
  );
}

interface DesignerBannerProps {
  designer: Designer;
}

function DesignerBanner({ designer }: DesignerBannerProps) {
  return (
    <div className="designer-hero-banner">
      <img
        src={
          designer.bannerImage ??
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600'
        }
        alt="Designer Workspace Background"
        className="designer-hero-banner-img"
      />
      <div className="designer-hero-banner-overlay" />
      <div className="designer-hero-avatar-wrap">
        <div className="designer-hero-avatar-frame">
          <div className="designer-hero-avatar-ring" />
          <img
            src={designer.profileImage ?? '/placeholder-designer.png'}
            alt={designer.name}
            className="designer-hero-avatar-img"
          />
          {/*<div className="absolute -right-4 bottom-2 z-40 rounded-sm border border-[#d1a153]/30 bg-[#445c49] px-2.5 py-1 font-sans text-md uppercase tracking-widest text-white shadow-md">
            Designer
          </div>*/}
        </div>
      </div>
    </div>
  );
}

interface DesignerProfileProps {
  designer: Designer;
}

function DesignerProfile({ designer }: DesignerProfileProps) {
  const initialCount = typeof designer.followers === 'number' ? designer.followers : 0;
  const { isFollowing, followerCount, loading, toggleFollow } = useDesignerFollow(
    designer.id,
    initialCount,
  );

  return (
    <div className="designer-hero-profile">

      <div className="designer-hero-follow-wrap">
        <button
          onClick={toggleFollow}
          disabled={loading}
          type="button"
          className={`designer-hero-follow-btn ${isFollowing
            ? 'designer-hero-follow-btn-active'
            : 'designer-hero-follow-btn-inactive'
          }`}
        >
          {loading ? 'Processing...' : isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      <h1 className="section-header font-cinzel">
        {designer.name}
      </h1>

      <DesignerRating designer={designer} />

      <DesignerMetrics designer={designer} followerCount={followerCount} />

      <p className="section-body">
        {designer.bio}
      </p>
    </div>
  );
}

interface DesignerInfoProps {
  designer: Designer;
}

function DesignerRating({ designer }: DesignerInfoProps) {
  return (
    <div className="designer-hero-rating">
      <span className="designer-hero-rating-stars">
        ★★★★★
      </span>
      <span className="designer-hero-rating-handle">
        {designer.handle || '@designer'}
      </span>
      <span className="designer-hero-rating-verified">
        ✔
      </span>
    </div>
  );
}

interface DesignerMetricsProps extends DesignerInfoProps {
  followerCount: number;
}

function DesignerMetrics({ designer, followerCount }: DesignerMetricsProps) {
  return (
    <div className="designer-hero-metrics">
      <span>
        {designer.products || '84 Designs'}
      </span>
      <span className="designer-hero-metrics-dot">
        ✦
      </span>
      <span>
        {followerCount.toLocaleString()} Followers
      </span>
    </div>
  );
}