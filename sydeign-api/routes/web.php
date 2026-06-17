<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/ping', function () {
    return response()->json(['message' => 'Please talk to me backend!!!']);
});
