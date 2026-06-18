<?php

namespace Database\Factories;

use App\Models\User; 
use App\Models\Merchant;
use Illuminate\Database\Eloquent\Factories\Factory;
class MerchantFactory extends Factory
{
    public function definition(): array
    {
        $shops = ['Likha Crafts', 'Vinta Textiles', 'Hababi Weaves', 'Sining Studio', 'Pintados Art'];
        return [
            'user_id' => User::factory(), // Automatically creates a user wrapper account
            'store_name' => $this->faker->unique()->randomElement($shops) . ' ' . $this->faker->numberBetween(1, 100),
            'store_description' => 'Authentic Filipino handmade crafts, traditional artworks, and customized items proudly made in the Philippines.',
        ];
    }
}