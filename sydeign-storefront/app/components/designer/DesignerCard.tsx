import {Link} from 'react-router';
import type {Designer} from '../../data/shopify';


interface DesignerCardProps {
  designer: Designer;
}


export function DesignerCard({
  designer,
}: DesignerCardProps) {

  return (

    <Link
      to={`/designers/${designer.handle}`}
      className="
        group
        block
        w-[220px]
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-stone-200
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* Designer Image */}

      <div
        className="
          h-[180px]
          w-full
          overflow-hidden
          bg-stone-100
        "
      >

        <img
          src={
            designer.profileImage ||
            '/placeholder-designer.png'
          }
          alt={designer.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

      </div>


      {/* Designer Info */}

      <div
        className="
          flex
          flex-col
          items-center
          p-4
          text-center
        "
      >

        <h3
          className="
            text-lg
            font-semibold
            text-stone-800
            line-clamp-1
          "
        >
          {designer.name}
        </h3>


        <p
          className="
            text-xs
            text-stone-500
            mt-1
          "
        >
          @{designer.handle}
        </p>


        <div
          className="
            mt-3
            flex
            items-center
            gap-1
            text-sm
            text-[#9c522b]
          "
        >

          <span>
            ★
          </span>

          <span>
            {designer.averageRating.toFixed(1)}
          </span>

          <span
            className="
              text-stone-400
            "
          >
            ({designer.reviewCount})
          </span>

        </div>


      </div>


    </Link>

  );
}