import * as oauth from 'oauth4webapi';

const CLIENT_ID = 'f3b178c7-7dc8-40b7-ad03-1a0dc8e7ab5'; 
const REDIRECT_URI = 'https://crunching-audience-gestate.ngrok-free.dev/authenticate';

const client: oauth.Client = {
  client_id: CLIENT_ID,
  token_endpoint_auth_method: 'none', 
};

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAuthorizationServer() {
  const discoveryUrl = new URL("https://sydeign-ypslvqn7.myshopify.com/.well-known/openid-configuration");
  const response = await fetch(discoveryUrl);
  const expectedIssuer = new URL("https://shopify.com/authentication/77132071069");

  const as = await oauth.processDiscoveryResponse(expectedIssuer, response);

  return as;
}

export async function redirectToShopifyLogin() {
  const as = await getAuthorizationServer();
  
  if (!as.authorization_endpoint) {
    throw new Error('Authorization endpoint is missing from server configuration.');
  }

  const state = oauth.generateRandomState();
  const code_verifier = oauth.generateRandomCodeVerifier();
  const code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier);

  localStorage.setItem('auth_state', state);
  localStorage.setItem('auth_code_verifier', code_verifier);

  const authorizationUrl = new URL(as.authorization_endpoint);
  authorizationUrl.searchParams.set('client_id', CLIENT_ID);
  authorizationUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authorizationUrl.searchParams.set('response_type', 'code');
  authorizationUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authorizationUrl.searchParams.set('state', state);
  authorizationUrl.searchParams.set('code_challenge', code_challenge);
  authorizationUrl.searchParams.set('code_challenge_method', 'S256');

  window.location.href = authorizationUrl.toString();
}

export async function handleAuthCallback(code: string, returnedState: string) {
  const savedState = localStorage.getItem('auth_state');
  const codeVerifier = localStorage.getItem('auth_code_verifier');

  if (!savedState || !codeVerifier || returnedState !== savedState) {
    cleanupAuthStorage();
    throw new Error('Security validation failed: State or Verifier mismatch.');
  }

  const as = await getAuthorizationServer();

  const params = new URLSearchParams();
  params.set('code', code);

  const response = await oauth.authorizationCodeGrantRequest(
    as,
    client,
    undefined as any, 
    params,           
    REDIRECT_URI,
    codeVerifier
  );

  const result = await oauth.processAuthorizationCodeResponse(
    as, 
    client, 
    response
  );
  
  if (result && 'error' in result) {
    cleanupAuthStorage();
    console.error('OAuth token exchange error details:', result);
    throw new Error(`OAuth Server Error: ${result.error}`);
  }

  const { access_token } = result;
  if (access_token) {
    localStorage.setItem('customer_access_token', access_token);
  }

  cleanupAuthStorage();
  return result;
}

function cleanupAuthStorage() {
  localStorage.removeItem('auth_state');
  localStorage.removeItem('auth_code_verifier');
}