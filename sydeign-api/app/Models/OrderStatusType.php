<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStatusType extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function orders()
    {
        return $this->hasMany(Order::class, 'status_id');
    }
}
