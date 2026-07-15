<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Traits\HttpResponses;
use App\Http\Resources\BudgetResource;
use App\Models\Budget;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;

class BudgetController extends Controller
{
    use HttpResponses;

    public function index()
    {
        return BudgetResource::collection(
            Budget::with('category')
                ->where('user_id', Auth::id())
                ->get()
        );
    }

    public function store(StoreBudgetRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $budget = Budget::create($data);

        return new BudgetResource($budget->load('category'));
    }

    public function show(Budget $budget)
    {
        if (Auth::id() !== $budget->user_id) {
            return $this->error([], 'Unauthorized', 403);
        }

        return new BudgetResource($budget->load('category'));
    }

    public function update(UpdateBudgetRequest $request, Budget $budget)
    {
        if (Auth::id() !== $budget->user_id) {
            return $this->error([], 'Unauthorized', 403);
        }

        $budget->update($request->validated());

        return new BudgetResource($budget->load('category'));
    }

    public function destroy(Budget $budget)
    {
        if (Auth::id() !== $budget->user_id) {
            return $this->error([], 'Unauthorized', 403);
        }

        $budget->delete();

        return $this->success([], 'Budget deleted successfully');
    }
}
