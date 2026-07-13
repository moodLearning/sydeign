<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Osiset\ShopifyApp\Http\Middleware\IframeProtection;
use App\Http\Middleware\ShopifyIframeProtection;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Swap the package's IframeProtection with our safe override
        $this->app->bind(IframeProtection::class, ShopifyIframeProtection::class);
    }

    public function boot(): void
    {
        //
    }
}