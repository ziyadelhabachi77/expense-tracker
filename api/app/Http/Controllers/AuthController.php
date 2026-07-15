<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Traits\HttpResponses;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    use HttpResponses;


    // register
    public function register(StoreUserRequest $request)
    {

        $validated = $request->validated();

        $user = User::create([
            "name" => $validated['name'],
            "email" => $validated['email'],
            "password" => Hash::make($validated['password'])
        ]);

        $token = $user->createToken('auth_token', ['*'], now()->addMinutes(1440))->plainTextToken;

        return $this->success(['user' => $user, 'token' => $token], 'Registration successful', 201);
    }


    // login 
    public function login(LoginUserRequest $request)
    {
        if (!Auth::attempt($request->validated())) {
            return $this->error([], 'Invalid credentials', 401);
        }

        $user = Auth::user();

        if (!$user) {
            return $this->error([], 'User not found', 401);
        }

        // remove old tokens
        $user->tokens()->delete();

        // Create new token
        $token = $user->createToken('auth_token', ['*'], now()->addMinutes(1440))->plainTextToken;
        return $this->success(['user' => $user, 'token' => $token], 'Login successful');
    }


    // logout
    public function logout(Request $request)
    {
        // Revoke current token 
        $request->user()->currentAccessToken()->delete();
        return $this->success([], 'Logged out successfully', 204);
    }


    // user
    public function user(Request $request)
    {
        return $this->success($request->user(), 'User retrieved successfully');
    }
}
