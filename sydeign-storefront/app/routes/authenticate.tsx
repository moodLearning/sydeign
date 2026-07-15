import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

export function loader() {
  return { ok: true };
}

export default function AuthenticateCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true; // Guard flag to prevent double-execution in Dev StrictMode

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    const savedVerifier = sessionStorage.getItem('shopify_code_verifier');
    const savedState = sessionStorage.getItem('shopify_auth_state');

    if (!code || state !== savedState || !savedVerifier) {
      console.error("Authentication failed: State mismatch or missing verifier.");
      navigate('/?error=auth_failed');
      return;
    }

    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://shopify.com/authentication/77132071069/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: 'f3b178c7-7dc8-40b7-ad03-1a0dc8be7ab5', // Fixed Client ID typo
            redirect_uri: 'https://crunching-audience-gestate.ngrok-free.dev/authenticate',
            code: code,
            code_verifier: savedVerifier,
          }),
        });

        const data = await response.json();

        // If the hook cleaned up before fetch returned, abort state setting
        if (!active) return;
        
        if (data.access_token) {
          // Save the token so your app knows you are logged in
          localStorage.setItem('shopify_customer_token', data.access_token);
          
          // Clean up the temporary session keys
          sessionStorage.removeItem('shopify_code_verifier');
          sessionStorage.removeItem('shopify_auth_state');

          // Redirect to the homepage
          navigate('/'); 
        } else {
          console.error("No access token returned from Shopify:", data);
          navigate('/?error=no_token');
        }
      } catch (err) {
        if (!active) return;
        console.error("Network error during token exchange:", err);
        navigate('/?error=network_error');
      }
    };

    fetchAccessToken();

    // Clean up to prevent executing twice
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Added a subtle spinner to indicate progress */}
        <div className="w-8 h-8 border-4 border-[#D36B45] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Completing your secure sign-in...</h2>
        <p className="text-sm text-gray-500 mt-2">Please wait a moment while we redirect you.</p>
      </div>
    </div>
  );
}