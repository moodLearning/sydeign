<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $guarded = [];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function status()
    {
        return $this->belongsTo(InvoiceStatusType::class, 'status_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
