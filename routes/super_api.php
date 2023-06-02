<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/', function () {
	return "superino";
});


//LOGIN ROUTE
Route::post("login", "Super\AuthController@login");

Route::group(["middleware" => "is-superadmin"], function () {


	Route::get("me", "Super\DataController@getSuperinfo");
	Route::get("logout", "Super\AuthController@logout");

	Route::get("admin/{adminID}", "Super\DataController@getAdmin");

	Route::get("admins-list", "Super\DataController@listAdmin");

	Route::get("betslips-list", "Super\DataController@listBetslips");

	Route::post("admin/solde", "Super\DataController@soldeManage");

	Route::post("user/create", "Super\DataController@userCreate");

	Route::post("betslip-deposit", "Super\DataController@depositBetslip");

	Route::get("admin/childs/{adminID}/{childID?}", "Super\DataController@getChilds");

	

});