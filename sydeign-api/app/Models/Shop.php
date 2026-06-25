<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Osiset\ShopifyApp\Contracts\ShopModel as IShopModel;
use Osiset\ShopifyApp\Traits\ShopModel as ShopifyShopModel;

class Shop extends Authenticatable implements IShopModel
{
    use SoftDeletes;
    use ShopifyShopModel;

    protected $fillable = [
        'name',
        'email',
        'password',
        'plan_id',
        'shopify_grandfathered',
        'shopify_namespace',
        'shopify_freemium',
        'password_updated_at',
        'theme_support_level',
        'shopify_offline_refresh_token',
        'shopify_offline_access_token_expires_at',
        'shopify_offline_refresh_token_expires_at',
    ];

    protected $casts = [
        'shopify_grandfathered' => 'boolean',
        'shopify_freemium' => 'boolean',
        'password_updated_at' => 'datetime',
        'shopify_offline_access_token_expires_at' => 'datetime',
        'shopify_offline_refresh_token_expires_at' => 'datetime',
    ];
}