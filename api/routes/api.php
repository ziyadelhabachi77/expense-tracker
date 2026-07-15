<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::apiResources([
        'expenses' => ExpenseController::class,
        'categories' => CategoryController::class,
        'budgets' => BudgetController::class,
    ]);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/categories-summary', [DashboardController::class, 'categoriesSummary']);
    Route::get('/weekly-activity', [DashboardController::class, 'weeklyActivity']);
});
