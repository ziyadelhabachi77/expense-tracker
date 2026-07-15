<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
           'category_id' => 'sometimes|nullable|exists:categories,id',
            'amount' => 'sometimes|numeric|min:0',
            'date' => 'sometimes|date',
            'description' => 'required|string|max:255'
        ];
    }
}
