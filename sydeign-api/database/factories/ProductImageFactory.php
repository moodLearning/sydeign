<?php

namespace Database\Factories;

use App\Models\ProductImage; 
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductImage::class; 

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sampleImages = [
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
            'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=500',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500'
        ];

        return [
            'image_url' => $this->faker->randomElement($sampleImages),
        ];
    }
}