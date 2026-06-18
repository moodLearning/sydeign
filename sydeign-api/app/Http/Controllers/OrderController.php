<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\OrderStatusType;

class OrderController extends Controller
{
    // CHECKOUT CART → ORDER
    public function checkout(Request $request)
    {
        $user = $request->user();

        $cart = Cart::with('items.product')
            ->where('customer_id', $user->customer->id)
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty'
            ], 400);
        }

        // create order
        $order = Order::create([
            'customer_id' => $user->customer->id,
            'status_id' => 1, // assuming 1 = pending
            'total_amount' => 0
        ]);

        $total = 0;

        // move cart items → order items
        foreach ($cart->items as $item) {

            $price = $item->product->price;
            $subtotal = $price * $item->quantity;
            $total += $subtotal;

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_purchase' => $price
            ]);
        }

        // update total
        $order->update([
            'total_amount' => $total
        ]);

        // clear cart
        $cart->items()->delete();

        return response()->json([
            'message' => 'Order placed successfully',
            'order_id' => $order->id,
            'total' => $total
        ]);
    }

    // GET ALL ORDERS (USER)
    public function index(Request $request)
    {
        $orders = Order::with('items.product')
            ->where('customer_id', $request->user()->customer->id)
            ->get();

        return response()->json($orders);
    }

    // GET SINGLE ORDER
    public function show($id, Request $request)
    {
        $order = Order::with('items.product')
            ->where('customer_id', $request->user()->customer->id)
            ->findOrFail($id);

        return response()->json($order);
    }
}
