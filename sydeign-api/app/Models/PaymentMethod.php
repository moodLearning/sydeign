<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function customerMethods()
    {
        return $this->hasMany(CustomerPaymentMethod::class);
    }
}
