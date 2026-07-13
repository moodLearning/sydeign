/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

import '@total-typescript/ts-reset';

declare global {
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ACCESS_TOKEN: string;
    PUBLIC_LARAVEL_API_URL: string;
  }
}

export {};