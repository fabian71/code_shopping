<?php

namespace CodeShopping\Http\Requests;

use CodeShopping\Rules\FirebaseTokenVerification;
use CodeShopping\Rules\PhoneNumberUnique;
use Illuminate\Foundation\Http\FormRequest;

class UserProfileUpdateRequest extends FormRequest
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
        $uderId = \Auth::guard('id')->user()->id;
        return [
            'name' => 'max:255',
            'email' => "max:255|email|unique:users,email,{$uderId}",
            'password' => 'min:4|max:16',
            'photo' => 'image|max:'. (3 * 1024),
            'token' => [
                new FirebaseTokenVerification(),
                new PhoneNumberUnique($uderId)
            ]
        ];
    }
}
