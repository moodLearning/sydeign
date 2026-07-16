import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import type { LinksFunction, MetaFunction } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './data/CartContext';
import { AuthProvider } from './data/AuthContext';
import tailwindStyles from './styles/tailwind.css?url';
import { useNonce } from '@shopify/hydrogen';
import Login from './routes/Login';
import Signup from './routes/Signup'; 

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
];

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { title: 'SÝDEIGN | Creative Filipino Marketplace' },
  { description: 'An online marketplace featuring creative Filipino designers, arts, and crafts.' },
];

export const headers = () => {
  return {
    'Content-Security-Policy': 
      "default-src 'self' https://cdn.shopify.com https://shopify.com https://images.unsplash.com https://fonts.googleapis.com https://fonts.gstatic.com data: http://localhost:* 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " + 
      "img-src 'self' https://cdn.shopify.com https://images.unsplash.com data: blob:;",
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useNonce(); 

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <script nonce={nonce}>let FF_FOUC_FIX;</script>
      </head>
      <AuthProvider>
        <CartProvider>
          <body className="font-sans antialiased bg-white text-gray-900 min-h-screen flex flex-col">
            <script nonce={nonce}>0</script> 
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Scripts nonce={nonce} />
            <ScrollRestoration nonce={nonce} />
          </body>
        </CartProvider>
      </AuthProvider>
    </html>
  );
}

// 2. App stays clean since Layout now manages the state wrappers
export default function App() {
  return (
    <>
      <Outlet />
      <Login />
      <Signup />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Layout>
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <h1 className="text-6xl font-serif text-[#4B6B40] font-bold mb-4">
          {isRouteErrorResponse(error) ? error.status : 'Oops!'}
        </h1>
        <p className="text-lg text-gray-600 max-w-md mb-6">
          {isRouteErrorResponse(error)
            ? error.statusText || 'Page not found.'
            : error instanceof Error
            ? error.message
            : 'An unexpected application error occurred.'}
        </p>
        <a
          href="/"
          className="px-6 py-2.5 bg-[#4B6B40] text-white rounded-full font-medium hover:bg-[#3B5432] transition"
        >
          Return Home
        </a>
      </div>
    </Layout>
  );
}