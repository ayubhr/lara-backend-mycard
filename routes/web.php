<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view("welcome");
});



//LOGIN
Route::get("till/{key}", "Admin\ContentController@init")->middleware('only.ajax')->where('key', 'tmenu|till-login');
Route::post("till/till-login", "Admin\UserController@login")->middleware('only.ajax');

Route::post("getpostion", "Admin\UserController@getPost")->middleware('only.ajax');

Route::group(["middleware" => ["auth","only.ajax"]], function () {



Route::get("admin/download/app", "Admin\ContentController@getApp");


//GET BALANCE
Route::post("admin/account/balance", "Admin\ContentController@getbalance");
//LOGOUT
Route::post("admin/sign-out", "Admin\UserController@logout");

//SHOPS ROUTES
Route::get("admin/shop/create-shop", "Admin\Shop\ContentController@get_create_shop");
Route::post("admin/shop/create-shop", "Admin\Shop\UserController@post_create_shop");
Route::get("admin/shop/accounts", "Admin\Shop\ContentController@get_accounts_shop");
Route::get("admin/shop/shop/{id}", "Admin\Shop\ContentController@get_shop_actions")->where('id','[0-9]+');
Route::post("admin/shop/shop-payments", "Admin\Shop\UserController@deposit_retrait");
Route::post("admin/shop/shop-activity", "Admin\Shop\UserController@status_change");
Route::post("admin/shop/shop-reset", "Admin\Shop\UserController@reset_password_shop");

//AGENCYS ROUTES
Route::get("admin/agency/create-agency", "Admin\Agency\ContentController@get_create_agency");
Route::post("admin/agency/create-agency", "Admin\Agency\UserController@post_create_agency");
Route::get("admin/agency/accounts", "Admin\Agency\ContentController@get_accounts_agency");
Route::get("admin/agency/agent/{id}", "Admin\Agency\ContentController@get_agency_actions")->where('id','[0-9]+');
Route::post("admin/agency/agency-payments", "Admin\Agency\UserController@deposit_retrait");
Route::post("admin/agency/agency-activity", "Admin\Agency\UserController@status_change");
Route::post("admin/agency/agency-reset", "Admin\Agency\UserController@reset_password_agency");

//Players ROUTES
Route::get("admin/cashier/create-player", "Admin\Player\ContentController@get_create_player");
Route::post("admin/cashier/create-player", "Admin\Player\UserController@post_create_player");
Route::get("admin/cashier/accounts", "Admin\Player\ContentController@get_accounts_player");
Route::get("admin/cashier/player/{id}", "Admin\Player\ContentController@get_player_actions")->where('id','[0-9]+');
Route::post("admin/cashier/player-payments", "Admin\Player\UserController@deposit_retrait");
Route::post("admin/cashier/player-activity", "Admin\Player\UserController@status_change");
Route::post("admin/cashier/player-reset", "Admin\Player\UserController@reset_password_player");

Route::get("admin/finances/overview", "Admin\ContentController@Treeget");

Route::get("admin/tree/data", "Admin\ContentController@TreeGetData");


//SEARCH USER
Route::post("admin/cashier/search", "Admin\ContentController@get_search");
Route::get("admin/partners/transaction-history", "Admin\ContentController@transactions_history");
Route::post("admin/partners/transaction-history", "Admin\ContentController@get_transactions_history");

Route::get("admin/partners/report-betslip", "Admin\ContentController@report_betslip");
Route::post("admin/partners/report-betslip", "Admin\ContentController@post_report_betslip");

Route::get("admin/cashier/transactions", "Admin\ContentController@cashier_transactions");
Route::post("admin/cashier/transactions", "Admin\ContentController@get_cashier_transactions");


});