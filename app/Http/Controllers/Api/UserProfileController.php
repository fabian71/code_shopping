<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\CustomerRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{

    public function update(Request $request)
    {
        $data = $request->all();

        if($request->has('token')){
            $token = $request->token;
            $data['phone_number'] = $this->getPhoneNumber($token);
        }

        if($request->has('remove_photo')){
            $data['photo'] = null;
        }

        $user = \Auth::guard('api')->user();
        $user->updateWithProfile($user);
        return new UserResource($user);

    }

    private function getPhoneNumber($token){
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}
