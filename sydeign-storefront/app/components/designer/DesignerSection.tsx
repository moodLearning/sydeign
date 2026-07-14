import React from 'react';
import {Button} from '../Button';

interface ShopifyDesigner {
  id: string;
  handle: string;

  name?: {
    value: string;
  };

  bio?: {
    value: string;
  };

  avatar?: {
    reference?: {
      image?: {
        url: string;
        altText?: string | null;
      };
    };
  };
}

interface Product {
  id: string;
  images?: {
    nodes: {
      url: string;
    }[];
  };
}

interface DesignerSectionProps {
  data: ShopifyDesigner;
  featuredProduct?: Product;
}

export function DesignerSection({
  data,
  featuredProduct,
}: DesignerSectionProps) {
  const name = data.name?.value ?? 'Unknown Designer';

  const bio =
    data.bio?.value ??
    'No biography has been provided for this designer.';

  const avatar =
    data.avatar?.reference?.image?.url ??
    '/placeholder-designer.png';

  const avatarAlt =
    data.avatar?.reference?.image?.altText ??
    name;

  const artwork =
    featuredProduct?.images?.nodes?.[0]?.url ??
    '/artwork.png';

  return (
    <div className="bg-[#fcfdfa] border border-[#f0f4ee] rounded-3xl relative overflow-hidden isolate">

      {/* Decorative Corners */}

      <img
        src="/corner-frame.png"
        alt=""
        className="absolute top-0 left-0 w-60 h-60 object-contain -rotate-90 pointer-events-none"
      />

      <img
        src="/corner-frame.png"
        alt=""
        className="absolute top-0 right-0 w-60 h-60 object-contain pointer-events-none"
      />

      <img
        src="/corner-frame.png"
        alt=""
        className="absolute bottom-0 left-0 w-60 h-60 object-contain rotate-180 pointer-events-none"
      />

      <img
        src="/corner-frame.png"
        alt=""
        className="absolute bottom-0 right-0 w-60 h-60 object-contain rotate-90 pointer-events-none"
      />

      <div className="p-12 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">

        {/* Portrait */}

        <div className="md:w-[300px] shrink-0 aspect-[4/5] rounded-[32px] overflow-hidden shadow-md z-10">

          <img
            src={avatar}
            alt={avatarAlt}
            className="w-full h-full object-cover"
          />

        </div>

        {/* Information */}

        <div className="flex-1 flex flex-col justify-center py-2 z-10">

          <div className="flex items-center gap-1.5 mb-4 max-w-md select-none">

            <img
              src="/logo-small.png"
              alt="D"
              className="w-14 h-14 object-contain shrink-0"
            />

            <div className="flex flex-col uppercase text-[#5B8266] font-serif tracking-[0.18em] leading-none justify-center mt-1">

              <span className="text-3xl font-light tracking-[0.22em]">
                esigner
              </span>

              <span className="text-[11px] font-semibold tracking-[0.15em] text-[#7a9d83] mt-1">
                of the month
              </span>

            </div>

          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            {name}
          </h1>

          <div className="flex items-center gap-3 mt-1 mb-5">

            <span className="text-sm font-medium text-gray-600 font-mono flex items-center gap-1">

              @{data.handle}

              <svg
                className="w-4 h-4 text-[#2e7d32]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>

            </span>

            <button
              type="button"
              className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 border border-gray-300 px-3 py-0.5 rounded-full hover:bg-gray-50 transition"
            >
              Follow
            </button>

          </div>

          <p className="section-body text-justify mb-6 text-gray-600 text-sm leading-relaxed max-w-xl">
            {bio}
          </p>

          <Button
            label="View Collection"
            to={`/designers/${data.handle}`}
            className="w-fit"
          />

        </div>

        {/* Featured Product Placeholder */}

        <div className="hidden lg:flex w-[260px] shrink-0 h-[300px] items-center justify-center z-10">

          <img
            src={artwork}
            alt={`${name}'s featured work`}
            className="max-w-full max-h-full object-contain drop-shadow-xl"
          />

        </div>

      </div>

    </div>
  );
}