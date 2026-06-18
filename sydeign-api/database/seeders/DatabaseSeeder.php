<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Merchant;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Setup Base Curated Categories first
        $categories = ['Paintings', 'Weaving', 'Pottery', 'Woodcarving'];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat]);
        }

        // 2. Build 5 distinct merchant stores
        Merchant::factory(5)->create()->each(function ($merchant) {
            
            // 3. Loop and create 4 products for each merchant to prevent missing factory state parameters
            for ($i = 0; $i < 4; $i++) {
                $product = Product::factory()->create([
                    'merchant_id' => $merchant->id,
                    'category_id' => Category::inRandomOrder()->first()->id
                ]);

                // 4. Attach 2 sample images directly to the newly created product
                ProductImage::factory(2)->create([
                    'product_id' => $product->id
                ]);
            }
        });
    }
}