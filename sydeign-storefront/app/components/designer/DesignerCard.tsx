import {Link} from 'react-router';
import type {Designer} from '../../data/shopify';
import {useDesignerFollow} from '../../hooks/useDesignerFollow';


interface DesignerCardProps {
  designer: Designer;
}


export function DesignerCard({
  designer,
}: DesignerCardProps) {

  const initialFollowerCount =
    typeof designer.followers === 'number' ? designer.followers : 0;
  const {isFollowing, loading, toggleFollow} = useDesignerFollow(
    designer.id,
    initialFollowerCount,
  );

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
          relative
          h-[180px]
          w-full
          overflow-hidden
          bg-stone-100
        "
      >

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFollow();
          }}
          disabled={loading}
          className={`
            absolute
            right-2
            top-2
            z-10
            rounded-full
            border
            px-3
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-widest
            transition-all
            disabled:opacity-50
            ${isFollowing
              ? 'bg-[#7b5a45] text-white border-[#7b5a45]'
              : 'bg-white/85 text-[#7b5a45] border-[#d9c9b8] hover:bg-[#7b5a45] hover:text-white'
            }
          `}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>

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