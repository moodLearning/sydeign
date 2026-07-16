import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleAuthCallback } from '../auth';

export function AuthorizePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      handleAuthCallback(code, state)
        .then(() => {
          navigate('/account/profile');
        })
        .catch((err) => {
          console.error('Authentication failed', err);
          navigate('/');
        });
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Verifying secure session, please wait...</p>
    </div>
  );
}