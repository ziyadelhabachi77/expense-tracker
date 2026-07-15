<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'month',
        'year',
    ];

    protected $appends = ['total_expenses'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get total expenses for this budget's category/month/year.
     */
    public function getTotalExpensesAttribute()
    {
        return Expense::where('user_id', $this->user_id)
            ->when($this->category_id, function ($query) {
                $query->where('category_id', $this->category_id);
            })
            ->whereYear('date', $this->year)
            ->whereMonth('date', $this->month)
            ->sum('amount');
    }
}
