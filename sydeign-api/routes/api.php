<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\AuthController;
use App\Models\Merchant;
use App\Models\Product;
use Illuminate\Http\Request;

Route::get('/home', function (Request $request) {
    $search = $request->query('q');

    $productsQuery = Product::with('images')->latest();
    
    if (!empty($search)) {
        $productsQuery->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%");
    }

    return response()->json([
        'products' => $productsQuery->take(10)->get(),
        'merchants' => Merchant::take(3)->get() 
    ]);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']); // Handled cleanly via your controller

Route::get('/merchants', function () {
    return response()->json(Merchant::all());
});

Route::get('/shops', [ShopController::class, 'index']);
Route::get('/shops/{id}', [ShopController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/my', [ProductController::class, 'myProducts']);
});