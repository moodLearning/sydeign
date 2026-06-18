import {Link} from 'react-router';

export default function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        alignItems: 'center',
      }}
    >
      <Link to="/home">Logo</Link>

      <input
        placeholder="Search..."
        style={{
          flex: 1,
        }}
      />

      <Link to="/products">Products</Link>

      <Link to="/shops">Shops</Link>

      <Link to="/contact">Contact</Link>
    </nav>
  );
}
