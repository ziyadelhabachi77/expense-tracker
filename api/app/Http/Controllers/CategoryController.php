<?php

namespace App\Http\Controllers;

use App\Http\Traits\HttpResponses;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{

    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryResource::collection(
            Category::where('user_id', Auth::id())->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest  $request)
    {
        $validated = $request->validated();

        $validated['user_id'] = Auth::id();

        $category = Category::create($validated);

        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        if ($this->isNotAuthorized($category)) {
            return $this->isNotAuthorized($category);
        }

        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        if ($this->isNotAuthorized($category)) {
            return $this->isNotAuthorized($category);
        }

        $category->update($request->validated());

        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($this->isNotAuthorized($category)) {
            return $this->isNotAuthorized($category);
        }

        $category->delete();

        return $this->success([], 'Category deleted successfully');
    }

    private function isNotAuthorized(Category $category)
    {
        if (Auth::id() !== $category->user_id) {
            return $this->error([], 'Unauthorized', 403);
        }

        return false;
    }
}
