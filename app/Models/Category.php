<?php
//declare(strint_types=1);

namespace CodeShopping\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

/**
 * CodeShopping\Models\Category
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category findSimilarSlugs($attribute, $config, $slug)
 * @mixin \Eloquent
 */
class Category extends Model
{
    use Sluggable, Filterable;
    protected $fillable = ['name', 'active'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function products(){
        return $this->belongsToMany(Product::class);
    }
}

//
