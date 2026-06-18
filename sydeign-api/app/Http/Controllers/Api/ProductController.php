<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with([
            'images',
            'merchant',
            'category'
        ])->latest()->get();
    }

    public function show($id)
    {
        return Product::with([
            'images',
            'merchant',
            'category',
            'reviews.customer.user'
        ])->findOrFail($id);
    }
}
