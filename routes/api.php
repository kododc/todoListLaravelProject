<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



// create a user route
Route::post('/user-create',function(request $request) {
    App\Models\User::create([
        'name' => 'User'.$request->input('id'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
    ]);
});

// login a user route
Route::post('/login',function() {
    $credentials = request()->only(['email','password']);
    $token = auth('api')->attempt($credentials);
    $data = array('token' => $token);
    return json_encode($data);
});

// Get authenticated user
Route::middleware('auth:api')->get('/me',function(){
    return auth('api')->user();
});



// List Todos
Route::get('todos',[TodoController::class, 'index']);


// List Single Todo
Route::get('todo/{id}',[TodoController::class, 'show']);

// Create new Todo
Route::post('todo',[TodoController::class, 'store']);

// Update Todo
Route::put('todo/',[TodoController::class, 'store']);

// Delete Todo
Route::delete('todo/{id}',[TodoController::class, 'destroy']);


