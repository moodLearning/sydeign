import {Link} from 'react-router';

export default function ProductCard({product}: any) {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}
    >
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          overflow: 'hidden',
          width: '180px',
        }}
      >
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
          }}
        />

        <div style={{padding: '10px'}}>
          <p>{product.name}</p>
          <p>₱{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
