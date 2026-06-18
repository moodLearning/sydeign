<?php

namespace Database\Factories;

use App\Models\Product; 
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class; 

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $crafts = ['Handwoven Abel Blanket', 'Traditional Banig Mat', 'Capiz Shell Lamp', 'Barong Tagalog Embroidery', 'Clay Pottery Vase', 'Rattan Basket Set'];
        
        return [
            'name' => $this->faker->randomElement($crafts) . ' #' . $this->faker->numberBetween(10, 99),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 500, 7500), 
            'currency' => 'PHP',
        ];
    }
}