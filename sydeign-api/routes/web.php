<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');

Route::get('/api/ping', function () {
    return response()->json(['message' => 'Please talk to me backend!!!']);
});

Route::get('/your-app-dashboard', function () {
    return view('app-dashboard');
})->middleware(['auth.shopify', 'verify.shopify']);

Route::get('/authenticate', [\Osiset\ShopifyApp\Http\Controllers\AuthController::class, 'authenticate'])->name('authenticate');

Route::get('/test-route', function() {
    return 'Laravel routing is working!';
});
