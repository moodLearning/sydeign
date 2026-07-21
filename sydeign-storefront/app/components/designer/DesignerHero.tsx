import type { Designer } from '../../data/shopify';
import { useDesignerFollow } from '../../hooks/useDesignerFollow';
/*import {SocialLinks} from './SocialLinks';*/

// --- React Components ---

interface DesignerHeroProps {
  designer: Designer;
}

export function DesignerHero({ designer }: DesignerHeroProps) {
  return (
    <section className="border-b border-stone-200/40 bg-background pb-12">
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
    <div className="relative z-10 h-[240px] w-full bg-stone-900 md:h-[300px]">
      <img
        src={
          designer.bannerImage ??
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600'
        }
        alt="Designer Workspace Background"
        className="h-full w-full object-cover opacity-60 blur-[0.5px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50/20" />
      <div className="absolute -bottom-16 left-1/2 z-30 -translate-x-1/2">
        <div className="relative h-36 w-36 rounded-full bg-[#fcfdfa] p-2 shadow-xl md:h-44 md:w-44">
          <div className="pointer-events-none absolute inset-0 z-40 rounded-full border-4 border-[#d1a153] opacity-90" />
          <img
            src={designer.profileImage ?? '/placeholder-designer.png'}
            alt={designer.name}
            className="relative z-30 h-full w-full rounded-full object-cover"
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
    <div className="relative z-20 mx-auto mt-20 max-w-5xl px-6 text-center">

      <div className="mb-4">
        <button
          onClick={toggleFollow}
          disabled={loading}
          type="button"
          className={`
            cursor-pointer
            rounded-full
            border
            px-6
            py-1.5
            font-sans
            text-lg
            font-semibold
            uppercase
            tracking-widest
            transition-all
            ${isFollowing
              ? 'bg-[#c36a3e] border-[#c36a3e] text-white hover:opacity-90'
              : 'border-[#c36a3e] text-[#c36a3e] hover:bg-[#c36a3e] hover:text-white'
            }
            disabled:opacity-50
          `}
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
    <div className="mb-4 flex items-center justify-center gap-1.5 text-[#c36a3e]">
      <span className="text-xl">
        ★★★★★
      </span>
      <span className="ml-1 font-sans text-lg font-semibold tracking-wider text-stone-500">
        {designer.handle || '@designer'}
      </span>
      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-[2px] text-[10px] text-emerald-700">
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
    <div className="mb-4 flex items-center justify-center gap-4 font-sans text-lg font-semibold uppercase tracking-wider text-stone-600">
      <span>
        {designer.products || '84 Designs'}
      </span>
      <span className="text-[10px] text-[#9c522b]/50">
        ✦
      </span>
      <span>
        {followerCount.toLocaleString()} Followers
      </span>
    </div>
  );
}