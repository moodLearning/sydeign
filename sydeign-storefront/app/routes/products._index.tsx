import {useEffect, useState} from 'react';
import ProductCard from '~/components/ProductCard';
import Navbar from '~/components/Navbar';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <>
      <Navbar />

      <h1>Products</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,1fr)',
          gap: '20px',
        }}
      >
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
