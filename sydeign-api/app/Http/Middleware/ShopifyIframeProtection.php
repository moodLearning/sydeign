<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShopifyIframeProtection extends \Osiset\ShopifyApp\Http\Middleware\IframeProtection
{
    public function handle(Request $request, Closure $next)
    {
        // Skip the original caching logic that crashes with PHP 8.4 + Laravel 13
        $response = $next($request);

        // Minimal CSP header - safe fallback
        $response->headers->set(
            'Content-Security-Policy',
            "frame-ancestors https://test-a2hbabxt.myshopify.com https://admin.shopify.com"
        );

        return $response;
    }
}