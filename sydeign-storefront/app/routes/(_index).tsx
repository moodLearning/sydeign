import {useNavigate} from 'react-router';

export default function Landing() {
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate('/home');
  }

  return (
    <div
      style={{
        height: '100vh',
        background: '#7f956c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSearch}>
        <h1
          style={{
            color: 'white',
            fontSize: '5rem',
            textAlign: 'center',
          }}
        >
          SYDEIGN
        </h1>

        <input
          placeholder="What are you looking to buy?"
          style={{
            width: '400px',
            padding: '10px',
          }}
        />
      </form>
    </div>
  );
}
