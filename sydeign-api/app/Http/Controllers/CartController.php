<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller
{
    // ADD TO CART
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = $request->user();

        $cart = Cart::firstOrCreate([
            'customer_id' => $user->customer->id
        ]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $item = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json([
            'message' => 'Added to cart',
            'item' => $item
        ]);
    }

    // VIEW CART
    public function index(Request $request)
    {
        $user = $request->user();

        $cart = Cart::with('items.product')
            ->where('customer_id', $user->customer->id)
            ->first();

        return response()->json([
            'cart' => $cart
        ]);
    }

    // UPDATE QUANTITY
    public function update(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required',
            'quantity' => 'required|integer|min:1'
        ]);

        $item = CartItem::findOrFail($request->cart_item_id);
        $item->quantity = $request->quantity;
        $item->save();

        return response()->json([
            'message' => 'Updated',
            'item' => $item
        ]);
    }

    // REMOVE ITEM
    public function remove(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required'
        ]);

        CartItem::findOrFail($request->cart_item_id)->delete();

        return response()->json([
            'message' => 'Removed from cart'
        ]);
    }
}