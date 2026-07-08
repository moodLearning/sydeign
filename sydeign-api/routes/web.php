<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Osiset\ShopifyApp\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Log;

// \Osiset\ShopifyApp\Services\ShopifyApp::routes();

//dd(class_exists('\App\Models\Shop'));

/* Route::middleware('verify.shopify')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->name('home');

    Route::get('/your-app-dashboard', function () {
        return view('app-dashboard');
    })->middleware(['auth.shopify']);
}); */

Route::middleware(['verify.shopify', 'auth.shopify'])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->name('home');
});


Route::get('/api/ping', function () {
    return response()->json(['message' => 'Please talk to me backend!!!']);
});

Route::get('/your-app-dashboard', function () {
    return view('app-dashboard');
})->middleware(['auth.shopify', 'verify.shopify']);

Route::get('/test-route', function() {
    return 'Laravel routing is working!';
});

Route::get('/debug-namespace', function () {
    $path = base_path('vendor/kyon147/laravel-shopify/src/Services/ShopifyApp.php');
    
    if (!file_exists($path)) {
        return "Package file not found at: $path";
    }

    $content = file_get_contents($path);
    preg_match('/namespace\s+(.+);/', $content, $matches);
    
    return [
        'namespace_found' => $matches[1] ?? 'Not found',
        'file_path' => $path
    ];
});