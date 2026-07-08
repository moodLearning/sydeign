<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Enforce cookie properties for Laravel 13 cross-domain storage tracking
        $middleware->encryptCookies(except: [
            'shopify_user_state',
            'shopify_signature',
        ]);

        $middleware->validateCsrfTokens(except: [
            'authenticate',
            'authenticate/*',
            'webhook/*',
        ]);

        $middleware->alias([
            'auth.shopify'    => \Osiset\ShopifyApp\Http\Middleware\VerifyShopify::class,   // Add this
            'billable'          => \Osiset\ShopifyApp\Http\Middleware\Billable::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
