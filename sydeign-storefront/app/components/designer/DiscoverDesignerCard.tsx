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
      className={`
        w-full
        bg-[#faf9f6]
        border
        border-stone-200/60
        rounded-[2rem]
        overflow-hidden
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        hover:-translate-y-1
        flex
        flex-col
        items-center
        relative
        min-h-[220px]
        group

        ${
          isAlternate
            ? 'sm:flex-row-reverse'
            : 'sm:flex-row'
        }
      `}
    >
      {/* Designer Avatar Section */}
      <div
        className="
          w-full
          sm:w-[220px]
          h-[240px]
          sm:h-[220px]
          shrink-0
          bg-stone-100
          relative
          overflow-hidden
        "
      >
        <img
          src={designer.profileImage || '/placeholder-designer.png'}
          alt={designer.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
        {/* Subtle dark overlay gradient on the avatar for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Designer Information Section */}
      <div
        className="
          flex-1
          p-8
          md:p-10
          text-left
          bg-no-repeat
          relative
          z-10
        "
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
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-lg font-mono tracking-wider text-[#556b57] font-semibold">
            @{designer.handle}
          </p>
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#556b57]/10 text-[#556b57]">
            <svg
              className="w-2 h-2"
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
        <h3
          className="
            text-2xl
            md:text-3xl
            font-serif
            font-bold
            text-[#143e32]
            tracking-tight
            mb-3
          "
        >
          {designer.name}
        </h3>

        {/* Bio */}
        <p
          className="
            text-lg
            text-black
            leading-relaxed
            max-w-3xl
            line-clamp-3
          "
        >
          {designer.bio || 'No biography available.'}
        </p>
      </div>

      {/* Featured Product Container */}
      <div
        className={`
          w-[180px]
          h-[220px]
          shrink-0
          p-6
          hidden
          md:flex
          items-center
          justify-center
          relative
          ${isAlternate ? 'border-r border-stone-100/50' : 'border-l border-stone-100/50'}
        `}
      >
        {/* Soft, circular backing pod for the product */}
        <div 
          className="
            absolute 
            w-28 
            h-28 
            rounded-full 
            bg-stone-200/40 
            blur-xl 
            transition-all 
            duration-300 
            group-hover:scale-125 
            group-hover:bg-[#556b57]/5
          " 
        />

        <img
          src={productImage}
          alt="Featured Product"
          className="
            relative
            z-10
            max-w-[120px]
            max-h-[120px]
            object-contain
            drop-shadow-[0_10px_15px_rgba(0,0,0,0.08)]
            transition-transform
            duration-300
            group-hover:scale-110
            group-hover:-rotate-2
          "
        />
      </div>
    </div>
  );
}