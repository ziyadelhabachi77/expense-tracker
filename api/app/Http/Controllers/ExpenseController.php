<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Http\Traits\HttpResponses;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{

    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->month;
        $year = $request->year;
        $limit = $request->limit ?? 5;
        $query = Expense::where('user_id', Auth::id());

        if ($month) {
            $query->whereMonth('date', $month);
        }
        if ($year) {
            $query->whereYear('date', $year);
        }
        $expense = $query->paginate($limit);
        return ExpenseResource::collection($expense);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $validated = $request->validated();

        $validated['user_id'] = Auth::id();

        $expense = Expense::create($validated);

        return new ExpenseResource($expense);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        return $this->isNotAuthorized($expense) ? $this->isNotAuthorized($expense) : new ExpenseResource($expense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        if ($this->isNotAuthorized($expense)) {
            return $this->isNotAuthorized($expense);
        }

        $expense->update($request->validated());

        return new ExpenseResource($expense);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        if ($this->isNotAuthorized($expense)) {
            return $this->isNotAuthorized($expense);
        }

        $expense->delete();

        return $this->success([], 'Expense deleted successfully');
    }

    private function isNotAuthorized(Expense $expense)
    {
        if (Auth::id() !== $expense->user_id) {
            return $this->error([], 'Unauthorized', 403);
        }

        return false;
    }
}
