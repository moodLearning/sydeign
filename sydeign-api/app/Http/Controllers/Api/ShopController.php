<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Merchant;

class ShopController extends Controller
{
    public function index()
    {
        return Merchant::withCount('products')
            ->latest()
            ->get();
    }

    public function show($id)
    {
        return Merchant::with([
            'products.images',
            'products.category'
        ])->findOrFail($id);
    }
}
