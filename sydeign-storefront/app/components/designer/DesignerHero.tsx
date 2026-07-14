import type {Designer} from '../../data/shopify';
/*import {SocialLinks} from './SocialLinks';*/

interface DesignerHeroProps {
  designer: Designer;
}

export function DesignerHero({
  designer,
}: DesignerHeroProps) {
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

function DesignerBanner({
  designer,
}: DesignerBannerProps) {
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
            src={
              designer.profileImage ??
              '/placeholder-designer.png'
            }
            alt={designer.name}
            className="relative z-30 h-full w-full rounded-full object-cover"
          />

          <div className="absolute -right-4 bottom-2 z-40 rounded-sm border border-[#d1a153]/30 bg-[#445c49] px-2.5 py-1 font-serif text-[9px] uppercase tracking-widest text-white shadow-md">
            Designer
          </div>

        </div>

      </div>

    </div>
  );
}

interface DesignerProfileProps {
  designer: Designer;
}

function DesignerProfile({
  designer,
}: DesignerProfileProps) {
  return (
    <div className="relative z-20 mx-auto mt-20 max-w-5xl px-6 text-center">

      <FollowButton />

      <h1 className="section-header font-cinzel">
        {designer.name}
      </h1>

      <DesignerRating designer={designer} />

      <DesignerMetrics designer={designer} />

      {/*<SocialLinks designer={designer} />*/}

      <p className="section-body">
        {designer.bio}
      </p>

    </div>
  );
}

function FollowButton() {
  return (
    <div className="mb-4">

      <button
        type="button"
        className="
          cursor-pointer
          rounded-full
          border
          border-[#c36a3e]
          px-6
          py-1.5
          font-serif
          text-xs
          font-semibold
          uppercase
          tracking-widest
          text-[#c36a3e]
          transition-all
          hover:bg-[#c36a3e]
          hover:text-white
        "
      >
        Follow
      </button>

    </div>
  );
}

interface DesignerInfoProps {
  designer: Designer;
}

function DesignerRating({
  designer,
}: DesignerInfoProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-1.5 text-[#c36a3e]">

      <span className="text-sm">
        ★★★★★
      </span>

      <span className="ml-1 font-sans text-xs font-semibold tracking-wider text-stone-500">
        {designer.handle || '@designer'}
      </span>

      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-[2px] text-[10px] text-emerald-700">
        ✔
      </span>

    </div>
  );
}

function DesignerMetrics({
  designer,
}: DesignerInfoProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-4 font-serif text-xs font-medium uppercase tracking-wider text-stone-600">

      <span>
        {designer.products || '84 Designs'}
      </span>

      <span className="text-[10px] text-[#9c522b]/50">
        ✦
      </span>

      <span>
        {designer.followers || '4k Followers'}
      </span>

    </div>
  );
}