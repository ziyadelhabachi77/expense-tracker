<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $month = $request->month ?? now()->month;
        $year = $request->year ?? now()->year;

        $totalBudget = Budget::where('user_id', $userId)
            ->whereNull('category_id')
            ->where('month', $month)
            ->where('year', $year)
            ->sum('amount');

        $allocated = Budget::where('user_id', $userId)
            ->whereNotNull('category_id')
            ->where('month', $month)
            ->where('year', $year)
            ->sum('amount');

        $totalSpent = Expense::where('user_id', $userId)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->sum('amount');

        $topCategories = Expense::where('expenses.user_id', $userId)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->select('categories.id', 'categories.name', 'categories.description', 'categories.icon', DB::raw('SUM(expenses.amount) as total_spent'))
            ->groupBy('categories.id', 'categories.name', 'categories.description', 'categories.icon')
            ->orderByDesc('total_spent')
            ->limit(4)
            ->get()
            ->map(function ($category) use ($userId, $month, $year) {
                $category->total_budget = Budget::where('user_id', $userId)
                    ->where('category_id', $category->id)
                    ->where('month', $month)
                    ->where('year', $year)
                    ->sum('amount');

                return $category;
            });

        $recentExpenses = Expense::with('category')
            ->where('user_id', $userId)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->latest('date')
            ->limit(5)
            ->get();

        return response()->json([
            'month' => $month,
            'year' => $year,
            'total_budget' => $totalBudget,
            'allocated' => $allocated,
            'total_spent' => $totalSpent,
            'remaining' => $totalBudget - $totalSpent,
            'top_categories' => $topCategories,
            'recent_expenses' => $recentExpenses,
        ]);
    }

    public function categoriesSummary(Request $request)
    {
        $userId = Auth::id();
        $month = $request->month ?? now()->month;
        $year = $request->year ?? now()->year;

        $categories = Category::where('user_id', $userId)->get();

        $categories = $categories->map(function ($category) use ($userId, $month, $year) {
            $category->total_budget = Budget::where('user_id', $userId)
                ->where('category_id', $category->id)
                ->where('month', $month)
                ->where('year', $year)
                ->sum('amount');

            $category->total_spent = Expense::where('user_id', $userId)
                ->where('category_id', $category->id)
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->sum('amount');

            return $category;
        });

        return response()->json([
            'month' => $month,
            'year' => $year,
            'categories' => $categories,
        ]);
    }

    public function weeklyActivity()
    {
        $startDate = now()->subDays(6)->startOfDay();
        $endDate = now()->endOfDay();

        $expenses = Expense::where('user_id', Auth::id())
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw('DATE(date) as date, DAYNAME(date) as day, SUM(amount) as total')
            ->groupByRaw('DATE(date), DAYNAME(date)')
            ->orderByRaw('DATE(date)')
            ->get()
            ->keyBy('date');

        $data = collect();
        $date = $startDate->copy();
        while ($date->lte($endDate)) {
            $key = $date->format('Y-m-d');
            $dayName = $date->format('l');
            if ($expenses->has($key)) {
                $data->push([
                    'day' => $expenses[$key]->day,
                    'total' => (float) $expenses[$key]->total,
                ]);
            } else {
                $data->push([
                    'day' => $dayName,
                    'total' => 0,
                ]);
            }
            $date->addDay();
        }

        return response()->json(['data' => $data]);
    }
}
