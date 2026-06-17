<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceStatusType extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'status_id');
    }
}
