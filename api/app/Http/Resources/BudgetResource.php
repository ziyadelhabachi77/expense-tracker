<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BudgetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,

            'attributes' => [
                'amount' => $this->amount,
                'month' => $this->month,
                'year' => $this->year,
                'total_expenses' => $this->total_expenses,
            ],

            'relationships' => [
                'category' => $this->whenLoaded('category', function () {
                    if (!$this->category) {
                        return null;
                    }
                    return [
                        'id' => (string) $this->category->id,
                        'name' => $this->category->name,
                        'icon' => $this->category->icon,
                    ];
                }),
            ],
        ];
    }
}
