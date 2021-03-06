<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255'
        ];
        /*
        return [
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'price' => 'numeric|min:1|max:50',
            'stock' => 'numeric',
            'active' => 'boolean',
        ];
        */
    }
}
