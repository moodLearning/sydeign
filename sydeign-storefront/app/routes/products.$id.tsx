import {useParams} from 'react-router';
import {useEffect, useState} from 'react';

export default function ProductDetail() {
  const {id} = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={product.images?.[0]?.image_url} />

      <h1>{product.name}</h1>

      <h2>₱{product.price}</h2>

      <p>{product.description}</p>

      <button>Add To Cart</button>
    </div>
  );
}
