import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: any,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  const customCspHeader = 
    `${header}; ` + 
    `img-src 'self' https://cdn.shopify.com https://images.unsplash.com data: blob:; ` +
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` +
    `font-src 'self' https://fonts.gstatic.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com 'nonce-${nonce}';`;

  const fixedCspHeader = 
    `${header}; ` + 
    `img-src 'self' https://cdn.shopify.com https://images.unsplash.com data: blob:; ` +
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` +
    `font-src 'self' https://fonts.gstatic.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com 'nonce-${nonce}';`;

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  // Pass the properly concatenated CSP string
  responseHeaders.set('Content-Security-Policy', customCspHeader);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}