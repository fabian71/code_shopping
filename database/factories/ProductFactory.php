<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->company,
        'description' => $faker->text,
        'price' => rand(100,900),
        'stock' => rand(0,100)
    ];
});
