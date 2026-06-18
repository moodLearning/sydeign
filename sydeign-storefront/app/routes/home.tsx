import {useEffect, useState} from 'react';

import Navbar from '~/components/Navbar';
import ProductCard from '~/components/ProductCard';
import ShopCard from '~/components/ShopCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then((r) => r.json())
      .then(setProducts);

    fetch('http://127.0.0.1:8000/api/shops')
      .then((r) => r.json())
      .then(setShops);
  }, []);

  return (
    <>
      <Navbar />

      <section>
        <h2>For You</h2>

        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          {products.slice(0, 5).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2>Featured Artists</h2>

        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          {shops.slice(0, 5).map((shop: any) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </section>
    </>
  );
}
