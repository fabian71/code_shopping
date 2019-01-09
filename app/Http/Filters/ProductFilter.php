<?php
namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    //protected $simpleFilters = ['id', 'name'];
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id', 'name', 'price', 'created_at'];

    protected function applySearch($value){
        $this->query
            ->where('name', 'LIKE', "%$value%")
            ->orWhere('description', 'like', "%$value%");
    }

    public function hasFilterParameter(){

        $contains = $this->parser->getFilters()->contains(function ($filter){
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });

        return $contains;
    }
}