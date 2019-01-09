<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\UserProfile;
use CodeShopping\Rules\FirebaseTokenVerification;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function login(Request $request)
    {
        $this->validateLogin($request);

        $credencials = $this->credentials($request);

        $token = JWTAuth::attempt($credencials);

        return $this->responseToken($token);
    }

    public function loginFirebase(Request $request)
    {
        $this->validate($request,[
            'token' => [
                'required',
                new FirebaseTokenVerification()
            ]
        ]);

        /** @var FirebaseAuth $firebaseAuth */
        $firebaseAuth = app(FirebaseAuth::class);
        $user = $firebaseAuth->user($request->token);
        $profile = UserProfile::where('phone_number', $user->phoneNumber)->first();
        $token = null;
        if($profile){
            $token = \Auth::guard('api')->login($profile->user);
        }
        return $this->responseToken($token);
    }

    private function responseToken($token)
    {
        return $token ?
            ['token' => $token] :
            response()->json([
                'error' => Lang::get('auth.failed')
            ], 400);
    }

    public function logout()
    {
        \Auth::guard('api')->logout();
        return response()->json([], 204);
    }

    public function me()
    {
        $user = \Auth::guard('api')->user();
        return new UserResource($user);
    }

    public function refresh()
    {
        $token = \Auth::guard('api')->refresh();
        return ['token' => $token];
    }
}
