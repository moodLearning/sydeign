import {useEffect, useState} from 'react';
import {useParams} from 'react-router';

export default function ShopDetail() {
  const {id} = useParams();

  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/shops/${id}`)
      .then((r) => r.json())
      .then(setShop);
  }, [id]);

  if (!shop) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{shop.store_name}</h1>

      <p>{shop.store_description}</p>

      <div>
        {shop.products.map((product: any) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </div>
  );
}
