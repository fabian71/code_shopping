<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductFilter;
use CodeShopping\Http\Filters\UserFilter;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        /** @var ProductFilter $filter */
        $filter = app(UserFilter::class);
        $filterQuery = User::filtered($filter);

        //$query = User::query();
        //$query = $this->onlyTrashedIfRequested($request, $query);

        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query)->filtered($filter);
        $users = $query->paginate(10);
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }

    public function restore(User $user){
        $user->restore();
        return response()->json([], 204);
    }


}
