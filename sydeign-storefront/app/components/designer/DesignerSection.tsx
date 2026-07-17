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
    <section className="relative w-full pb-14 md:pb-20">
      <div
        className="
          p-12
          relative
          mx-auto
          max-w-[1800px]
          overflow-hidden
          rounded-[42px]
          shadow-[0_40px_90px_rgba(43,36,27,0.12)]
          bg-white
        "
      >

        {/* Decorative Corners */}
        <img
          src="/corner-frame.png"
          alt=""
          className="absolute top-0 left-0 w-56 md:w-72 -rotate-90 opacity-75 pointer-events-none"
        />
        <img
          src="/corner-frame.png"
          alt=""
          className="absolute top-0 right-0 w-56 md:w-72 opacity-75 pointer-events-none"
        />
        <img
          src="/corner-frame.png"
          alt=""
          className="absolute bottom-0 left-0 w-56 md:w-72 rotate-180 opacity-75 pointer-events-none"
        />
        <img
          src="/corner-frame.png"
          alt=""
          className="absolute bottom-0 right-0 w-56 md:w-72 rotate-90 opacity-75 pointer-events-none"
        />

        {/* Content wrapper */}
        <div className="relative z-10 px-8 py-20 md:px-16 xl:px-28">
          {/* Main Grid Container wrapping all three layout columns */}
          <div className="grid lg:grid-cols-[260px_1fr_340px] gap-12 xl:gap-18 items-center">
            
            {/* Column 1: Portrait */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-[240px] md:w-[270px] xl:w-[295px] shrink-0">
                {/* subtle glow */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-[38px]
                    bg-[#eadbcf]
                    blur-2xl
                    opacity-25
                    scale-105
                  "
                />

                {/* frame */}
                <div
                  className="
                    relative
                    rounded-[36px]
                    bg-[#faf7f3]
                    p-2
                    border
                    border-[#ece2d7]
                    shadow-[0_28px_60px_rgba(0,0,0,.10)]
                  "
                >
                  <img
                    src={data.profileImage}
                    alt={data.name}
                    className="
                      aspect-[3/4]
                      w-full
                      rounded-[30px]
                      object-cover
                    "
                  />
                </div>

                {/* floating badge */}
                <div
                  className="
                    absolute
                    -bottom-5
                    left-1/2
                    -translate-x-1/2
                    rounded-full
                    bg-white/95
                    backdrop-blur
                    border
                    border-[#ece2d7]
                    shadow-lg
                    px-5
                    py-2
                  "
                >
                  <div className="flex items-center gap-2">
                    <Star
                      size={16}
                      className="fill-[#b88746] text-[#b88746]"
                    />
                    <span className="text-sm font-semibold text-[#7b5a45]">
                      {data.averageRating.toFixed(1)}
                    </span>
                    <span className="text-[#c8b8aa]">•</span>
                    <span className="text-sm text-gray-500">
                      {data.reviewCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Bio & Metadata */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              {/* Designer of the Month Badge */}
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/logo-small.png"
                  alt="Designer"
                  className="w-14 h-14 xl:w-16 xl:h-16 shrink-0"
                />
                <div>
                  <p
                    className="
                      text-4xl
                      font-sans
                      text-primary
                      font-bold
                    "
                  >
                    esigner of the Month
                  </p>
                  <div
                    className="
                      mt-1
                      h-px
                      w-20
                      bg-[#d7cabd]
                    "
                  />
                </div>
              </div>

              {/* Name */}
              <h1
                className="
                  font-serif
                  text-[#2e2b29]
                  text-5xl
                  md:text-6xl
                  xl:text-7xl
                  leading-none
                  tracking-tight
                "
              >
                {data.name}
              </h1>

              {/* Handle + Follow */}
              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  md:justify-start
                  gap-4
                "
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg text-[#666]">
                    @{data.handle}
                  </span>
                  <svg
                    className="w-4 h-4 text-[#5B8266]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9" />
                  </svg>
                </div>

                <button
                  type="button"
                  className="
                    rounded-full
                    border
                    border-[#d9c9b8]
                    bg-white/85
                    backdrop-blur
                    px-5
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#7b5a45]
                    transition-all
                    duration-300
                    hover:bg-[#7b5a45]
                    hover:text-white
                  "
                >
                  Follow
                </button>
              </div>

              {/* Bio */}
              <p
                className="
                  mt-10
                  max-w-[620px]
                  text-[17px]
                  leading-8
                  text-[#585858]
                "
              >
                {data.bio || 'No biography has been provided yet.'}
              </p>

              {/* CTA */}
              <div className="mt-10">
                <ButtonCard
                  label="VIEW COLLECTION"
                  to={`/designers/${data.handle}`}
                />
              </div>
            </div>

            {/* Column 3: Featured Artwork */}
            <div
              className="
                hidden
                lg:flex
                items-end
                justify-center
                h-full
              "
            >
              <div className="relative w-full max-w-[360px]">
                {/* background glow */}
                <div
                  className="
                    absolute
                    inset-x-8
                    top-20
                    h-56
                    rounded-full
                    bg-[#e8d7c8]
                    blur-3xl
                    opacity-40
                  "
                />

                {/* artwork */}
                <img
                  src={artwork}
                  alt={
                    featuredProduct
                      ? featuredProduct.title
                      : `${data.name}'s featured work`
                  }
                  className="
                    relative
                    z-10
                    mx-auto
                    max-h-[520px]
                    object-contain
                    drop-shadow-[0_35px_55px_rgba(0,0,0,.18)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:scale-[1.03]
                  "
                />

                {/* caption */}
                {featuredProduct && (
                  <div
                    className="
                      mt-8
                      text-center
                    "
                  >
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        text-[#9c8a78]
                      "
                    >
                      Featured Work
                    </p>
                    <h3
                      className="
                        mt-2
                        text-xl
                        font-serif
                        text-[#3a342f]
                      "
                    >
                      {featuredProduct.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>

          </div> {/* Closes main grid */}
        </div> {/* Closes padding container */}
      </div>
    </section>
  );
}