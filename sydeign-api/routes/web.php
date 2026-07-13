<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

Route::middleware(['verify.shopify'])->group(function () {

    Route::get('/{any?}', function (Request $request, $any = '') {
        $hydrogenUrl = 'http://localhost:3000/' . $any;

        try {
            $response = Http::get($hydrogenUrl, $request->query());
            
            return response($response->body(), $response->status())
                ->header('Content-Type', $response->header('Content-Type'));
                
        } catch (\Exception $e) {
            return response("Hydrogen server not running at " . $hydrogenUrl, 500);
        }
    })->where('any', '.*');

});