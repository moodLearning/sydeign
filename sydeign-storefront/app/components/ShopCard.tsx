import {Link} from 'react-router';

export default function ShopCard({shop}: any) {
  return (
    <Link to={`/shops/${shop.id}`}>
      <div
        style={{
          width: '180px',
          border: '1px solid #ddd',
          borderRadius: '12px',
        }}
      >
        <img
          src={shop.image}
          alt={shop.store_name}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
          }}
        />

        <p>{shop.store_name}</p>
      </div>
    </Link>
  );
}
