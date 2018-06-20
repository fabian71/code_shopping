<?php
//declare(strint_types=1);

namespace CodeShopping\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * CodeShopping\Models\Category
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category findSimilarSlugs($attribute, $config, $slug)
 * @mixin \Eloquent
 */
class Category extends Model
{
    use Sluggable;
    protected $fillable = ['name', 'active'];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
