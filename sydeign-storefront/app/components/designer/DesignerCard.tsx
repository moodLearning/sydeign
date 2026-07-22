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
      className="designer-card group"
    >

      {/* Designer Image */}

      <div className="designer-card-image-wrap">

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFollow();
          }}
          disabled={loading}
          className={`designer-card-follow-btn ${isFollowing
            ? 'designer-card-follow-btn-active'
            : 'designer-card-follow-btn-inactive'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>

        <img
          src={
            designer.profileImage ||
            '/placeholder-designer.png'
          }
          alt={designer.name}
          className="designer-card-image"
        />

      </div>


      {/* Designer Info */}

      <div className="designer-card-info">

        <h3 className="designer-card-name">
          {designer.name}
        </h3>


        <p className="designer-card-handle">
          @{designer.handle}
        </p>


        <div className="designer-card-rating">

          <span>
            ★
          </span>

          <span>
            {designer.averageRating.toFixed(1)}
          </span>

          <span className="designer-card-review-count">
            ({designer.reviewCount})
          </span>

        </div>


      </div>


    </Link>

  );
}