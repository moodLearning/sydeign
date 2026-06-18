import {useEffect, useState} from 'react';
import ShopCard from '~/components/ShopCard';

export default function ShopsPage() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/shops')
      .then((r) => r.json())
      .then(setShops);
  }, []);

  return (
    <div>
      <h1>Shops</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '20px',
        }}
      >
        {shops.map((shop: any) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
