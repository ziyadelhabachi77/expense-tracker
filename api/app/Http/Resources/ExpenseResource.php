<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'amount' => $this->amount,
                'date' => $this->date,
                'description' => $this->description
            ],
            'relationships' => [
                'user' => [
                    'id' => (string)$this->user->id,
                    'user_name' => $this->user->name,
                    'user_email' => $this->user->email
                ],
                'category' => $this->category ? [
                    'id' => (string) $this->category->id,
                    'name' => $this->category->name,
                ] : null,
            ]
        ];
    }
}
