<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        $user = $request->user();

        // MUST have merchant profile
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

    public function myProducts(Request $request){
        $user = $request->user();

        if (!$user->merchant) {
            return response()->json([
                'message' => 'Only merchants allowed'
            ], 403);
        }

        $products = Product::where('merchant_id', $user->merchant->id)->get();

        return response()->json([
            'products' => $products
        ]);
    }
}
