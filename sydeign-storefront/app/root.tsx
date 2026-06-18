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
import tailwindStyles from './styles/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
  },
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
      "default-src 'self' https://cdn.shopify.com https://shopify.com https://images.unsplash.com https://fonts.googleapis.com data: http://localhost:* 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' https://cdn.shopify.com https://images.unsplash.com data: blob:;",
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
<<<<<<< HEAD
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased bg-[#FAF9F0] text-gray-900 min-h-screen flex flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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
          href="/home"
          className="px-6 py-2.5 bg-[#4B6B40] text-white rounded-full font-medium hover:bg-[#3B5432] transition"
        >
          Return Home
        </a>
      </div>
    </Layout>
  );
=======
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sydeign</title>
      </head>
      <body>
        {/* Hydrogen injects routes automatically */}
      </body>
    </html>
  );
>>>>>>> main
}