<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductCategoryRequest;
use CodeShopping\Http\Resources\ProductCategoryResource;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{

    public function index(Product $product)
    {
        return new ProductCategoryResource($product);
    }

    public function store(ProductCategoryRequest $request, Product $product)
    {
        $changed = $product->categories()->sync($request->categories);
        $categoriesAtachedId = $changed['attached'];
        /** @var Collection $categories */
        $categories = Category::whereIn('id', $categoriesAtachedId)->get();
        //return $categories;
        return $categories->count() ? response()->json(new ProductCategoryResource($product), 201): [];
    }

    public function destroy(Product $product, Category $category)
    {
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
