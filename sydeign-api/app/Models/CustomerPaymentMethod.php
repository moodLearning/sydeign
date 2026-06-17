<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerPaymentMethod extends Model
{
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
