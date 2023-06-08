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
	return "FRONT ENT REST API FOR WEB CLIENT #up {2}";
});

//LOGIN ROUTE
Route::post("login", "AuthController@login");

//DATA ROUTES
Route::group(["middleware" => ["jwt.verify","is-player"] ], function () {

	/********************AUTH*******************/
    //LOGOUT
	Route::get("logout", "AuthController@logout");
	/********************AUTH*******************/



	/********************DATA*******************/

	//GET USER DATA
    Route::get("get-me", "DataController@getuserinfo");
    //CHANGE PASSWORD
    Route::post("change-password", "DataController@changepassword");
    //SWITCH SOLD 
    //Route::post("funds-transfer", "DataController@transferfunds");
    //SWITCH SOLD 
    //Route::post("funds-transfer", "DataController@transferfunds");

    //SUBMIT BETSLIP
    //Route::post("submit-betslip", "DataController@submit_betslip");

    //SUBMIT BETSLIP NEW TEST
    //Route::post("submit-betslip-new", "DataController@submit_betslipNew");



    //LIST BETSLIPS
    Route::get("list-betslip", "DataController@list_betslip");
    //Route::get("list-betslip-desktop/{state}", "DataController@list_betslipDesktop");

    //LIST BETSLIPS Closed
    Route::get("list-betslipclosed", "DataController@list_betslipClosed");

    //GET SINGLE BETSLIP
    //Route::get("get-betslip/{betslip_id}", "DataController@get_betslip");


    //CASHOUT BETSLIP
    //Route::post("betslip-cashout", "DataController@cashoutBetslip");



    Route::post("account-statement", "DataController@historyPlayer");



	/********************DATA*******************/



    //Slots Game Launcher
    Route::get("casino/fiable/game/{game_uuid?}", "CasinoDataController@launcherFiable");

    //Slots Game Launcher
    Route::get("casino/game/{game_uuid?}", "CasinoDataController@launcherSlots");

    //Slots Game History
    Route::post("gaming-history/casino", "CasinoDataController@historySlots");

    //Live Casino Game Launcher
    //Route::get("casino/live/game/{game_id?}/{page_code?}", "CasinoDataController@launcherLive");

    //Slots Game History
    Route::post("gaming-history/livecasino", "CasinoDataController@historyLiveCasino");

    Route::get("casino/gate/game/start/{game_uuid}/{isSlot?}", "NewCasinoDataController@startGame");


});


    //Route::get("casino/gate/games/flush", "NewCasinoDataController@flushGames");
    //Route::get("casino/gate/validate/{game_uuid}/{test}", "NewCasinoDataController@selfValidate");
    

    //Route::post("wallet/gate/slotegrator/call", "NewCasinoDataController@walleto");


    //Route::post("wallet/fiable/{type}", "CasinoDataController@fiableWallet")->where('type', 'bet|win');


    //RESERVE BETSLIP 
    //Route::post("reserve-betslip", "DataController@reserve_betslip");


    //Route::post("update-whois-go", "DataController@changeWhois");

  //Route::post("delete-admin-circuit", "DataController@deleteCircuit");


  //Route::post("get-admin-circuit", "DataController@getCircuit");



    //GET RESERVED BETSLIP 
    //Route::get("get-reserved-betslip/{code}", "DataController@get_reserved_betslip");    


    //Route::get("set_jackpot", "NewCasinoDataController@set_jackpot");


    //TEster
    //Route::get("upgames", "CasinoDataController@upGames");

    Route::get("casino/games/{type}/{provider?}", "CasinoDataController@getGames")->where('type', 'slots|live|virtual|fiable');





    Route::post("webhook/wolfscorev1/sport/wallet", "DataController@webhookwallet");


    Route::post("webhook/wolfscorev1/sport/v2/wallet", "DataController@webhookwalletSportsbook");




    Route::post("webhook/wolfscorev1/casino/wallet", "CasinoDataController@webhookwallet");

    /*Route::get("casino/live/game/{game_id?}/{page_code?}", "CasinoDataController@launcherLive");

    Route::get("casino/live/categories", "CasinoDataController@get_categories");
    Route::get("casino/live/games", "CasinoDataController@get_games");
    Route::get("casino/live/games/full", "CasinoDataController@get_full_games");
    Route::get("casino/live/games/sort", "CasinoDataController@get_sort_games");


   // DATA SLOTS GAME LIST
    Route::get("casino/list/games/{categorie?}", "CasinoDataController@getSlotsGamesList");*/
