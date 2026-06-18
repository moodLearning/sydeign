import {useEffect, useState} from 'react';

export default function TestPage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000/api/ping')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage(err.message));
  }, []);

  return (
    <div>
      <h1>Laravel Test</h1>
      <p>{message}</p>
    </div>
  );
}
