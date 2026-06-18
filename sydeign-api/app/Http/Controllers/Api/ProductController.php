<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required',
        ]);

        $user = $request->user();

        if (!$user->merchant) {
            return response()->json([
                'message' => 'Only merchants can create products'
            ], 403);
        }

        $product = Product::create([
            'merchant_id' => $user->merchant->id,
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'currency' => $request->currency ?? 'PHP',
        ]);

        return response()->json([
            'message' => 'Product created',
            'product' => $product
        ]);
    }
}
