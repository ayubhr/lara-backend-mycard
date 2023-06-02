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
	return "**** mycardv2";
});


//LOGIN ROUTE
Route::post("login", "Mycard\AuthController@login");

Route::group(["middleware" => ["jwt.verify","is-mycard"] ], function () {


	Route::get("get-me", "Mycard\DataController@getMycardinfo");
	Route::get("logout", "Mycard\AuthController@logout");


	Route::get("users-list/{role}", "Mycard\DataController@getUsers")->where('role', 'agent|shop|player');
	Route::get("user/{id}", "Mycard\DataController@getSingleUser")->where('id','[0-9]+');
	Route::get("transaction-history", "Mycard\DataController@get_transactions");
	Route::get("cashier-history", "Mycard\DataController@get_cashier");
	Route::get("get-reported-betslips", "Mycard\DataController@get_reported_betslips");

	Route::post("create-user", "Mycard\DataController@createUser");
	Route::post("user-solde", "Mycard\DataController@soldeManage");
	Route::post("user-status", "Mycard\DataController@statusChange");
	Route::post("change-password", "Mycard\DataController@passwordChange");
	Route::post("transaction-history", "Mycard\DataController@post_transactions");
	Route::post("cashier-history", "Mycard\DataController@post_cashier");
	Route::post("post-location", "Mycard\DataController@getPost");
	Route::post("report-betslip", "Mycard\DataController@report_betslip");

});