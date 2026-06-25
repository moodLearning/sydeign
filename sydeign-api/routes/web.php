<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');

Route::get('/api/ping', function () {
    return response()->json(['message' => 'Please talk to me backend!!!']);
});

/*Route::get('/debug-shopify', function (\Illuminate\Http\Request $request) {
    dd($request->all());
});*/