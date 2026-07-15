<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'category_id' => Category::inRandomOrder()->first()->id,
            'amount' => fake()->randomFloat(2, 10, 1000),
            'date' => now(),
        ];
    }
}
