<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\Gratortransaction;
use App\Consommation;
use App\Jackpots;
use App\Classes\ConfigCasino;
use App\Classes\Encrypter;
use Illuminate\Http\Request;
use Exception; 
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class NewCasinoDataController extends Controller{


    public $api_base_url =  "https://app.kong-gateway.com/ns"; //"https://nestjs.mysuper77.com";

    public $organization_id = "23d040dc-bee0-4049-a4cb-7a90b488564a";



public function formatSolde($sold){

    return (float) $sold;
}

public function formatGapiSlode($sold){

    return (float) (floatval($sold) / 100.00);

}

public function getPercentOfNumber($number, $percent){

        return ($percent / 100) * $number;
}


public function isTakwira($whois){

   return (preg_match("/takwira/i", $whois)) ? true : false;

}

/*public function set_jackpot(Request $request){

    $data = User::where([['status', '=', 'active'], ['whois', 'LIKE', '%takwira%'], ['role', '=', 'player'], ['updated_at', '>=', Carbon::now()->subDays(3)->toDateTimeString()]])->inRandomOrder()->first();

    $response = array('data' => $data);
    return response()->json($response, 200);

}*/


public function updateJackpot($betAmount){

    $currentJackpot  = Jackpots::whereNull('winner')->first();

    if( empty($currentJackpot) ){

        $newJackpot = new Jackpots();
        $newJackpot->amount = 0.8;
        $newJackpot->save();

    }else{


        if($currentJackpot->amount >= 500 && $currentJackpot->amount < $currentJackpot->max_limit ){

            $randomWonPlayer = User::where([['status', '=', 'active'],['whois', 'LIKE', '%takwira%'],['role', '=', 'player'], ['updated_at', '>=', Carbon::now()->subDays(3)->toDateTimeString()]])->inRandomOrder()->first();

            if($randomWonPlayer){

                $randomWonPlayer->increment('sold_sport', $currentJackpot->amount);
                $randomWonPlayer->update();

                $currentJackpot->winner = $randomWonPlayer->username;
                $currentJackpot->shop   = $randomWonPlayer->parent;
                $currentJackpot->update();
                
            }

        }else{


                if($betAmount < 10){

                    $rate = $currentJackpot->rate;

                }elseif($betAmount > 10 && $betAmount < 100){

                    $rate = ($currentJackpot->rate - 1);

                }else{

                    $rate = ($currentJackpot->rate - 2);
                }



                $new_amount = $this->getPercentOfNumber($betAmount, $rate);
                $currentJackpot->increment('amount', $new_amount);
                $currentJackpot->update();
        }

    }

}


public function getSuperConfig($username){
    

    $superConfig = array();


    $first  = User::where('username','=',$username)->first();
    if(!$first){

        return $superConfig;

    }else{

    
            $parent = User::where('id','=',$first->parent)->first();
            if(!$parent){

                    return $superConfig;
            }else{

                    $isHead = false;
                    while(!$isHead){

                        $parent = User::where('id','=',$parent->parent)->first();
                        if(!$parent){

                            return $superConfig;
                        }else{

                                if($parent->parent === 0){

                                    $superConfig = ["super" => $parent->username, "role" => $parent->role, "org" => trim($parent->is_org)];
                                    $isHead = true;
                                    break;
                                }

                        }

                    }

            }

    }

   
    return $superConfig;

}

public function whoSuper($username){
            
    $first  = User::where('username','=',$username)->first();
    if(!$first) return "a";
    $parent = User::where('id','=',$first->parent)->first();
    if(!$parent) return "b";

    $super = "";
    $isHead = false;
    while(!$isHead){

        $parent = User::where('id','=',$parent->parent)->first();
        if(!$parent) return "c";
        if($parent->parent === 0){

            $super = $parent->username;
            $isHead = true;
            break;
        }

    }

    return [
            "super"  => $super,
            "child"  => $username,
            "period" => Carbon::now()->format('F#Y')
            ];


}


public function handleConsommation($username,$type,$amount){
    
    $data = $this->whoSuper($username);

    if( !(in_array($data, ["a","b","c"])) ){

        $super  = $data["super"];
        $period = $data["period"];

        $consumtionExist = Consommation::where([['super','=',$super],['period','=',$period]])->first();

        if($consumtionExist){

            if($type === "bets"){

                $consumtionExist->increment('bets', $amount);
                $consumtionExist->update();

            }elseif($type === "wins"){

                $consumtionExist->increment('wins', $amount);
                $consumtionExist->update();

            }elseif($type === "refund"){

                $consumtionExist->decrement('bets', $amount);
                $consumtionExist->update();

            }

        }else{

            $newCons = new Consommation();
            $newCons->period = $period;
            $newCons->super  = $super;

            if($type === "bets"){
                $newCons->bets   = $amount;
                $newCons->wins   = 0;
            }elseif($type === "wins"){
                $newCons->wins   = $amount;
                $newCons->bets   = 0;
            }

            $newCons->save();
        }

    }

}

public function walleto(Request $request){

    //$xx = json_encode($_POST)."\r\n";

    //Storage::disk('public')->append('slotogator.txt', $xx, null);

    $validator = Validator($request->only("action", "player_id", "currency" /*, "session_id"*/), [
        "action" => "required",
        "player_id" => "required",
        "currency" => "required",
        //"session_id" => "required",
    ]);

    if( $validator->fails() ){

        $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => $validator->errors()->first());
        return response()->json($response, 200);
    }

    /*** REQUEST POSTED DATA *****/
    $action       = $request->action;
    $player_id    = $request->player_id;
    $currency     = $request->currency;
    $session_id   = $request->session_id;
    /******************************/

    /*** REQUEST HEADERS DATA *****/
    $headers = [
        'X-Merchant-Id' => $request->header('X-Merchant-Id'),
        'X-Timestamp' => $request->header('X-Timestamp'),
        'X-Nonce' => $request->header('X-Nonce'),
    ];
    $h_xsign      = $request->header('X-Sign');
    /******************************/

    //Init Config CLass   
    $initConfig = new ConfigCasino();

    $playerInfo = explode('#', $player_id);

    $playerID       = $playerInfo[0];
    $playerUsername = $playerInfo[1];
    $caso           = $playerInfo[2];

    //Check X SIGN
    $postData = $_POST;

    if($caso === "validate"){

        $checker  = $initConfig->verifyXsignTest($postData,$headers,$h_xsign);

    }else{

        $checker  = $initConfig->verifyXsign($postData,$headers,$h_xsign);
    }
    if($checker != "OK"){

        $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => $checker);
        return response()->json($response, 200);

    }

    //143#fganonplayer#slot


    /*if($playerID != 8725 || $playerID != "8725"){

        $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => $checker);
        return response()->json($response, 200);

    }*/


    switch ($action) {

      case "balance":
        

        $user = User::where([['id','=',$playerID],['username','=',$playerUsername]])->first();

        if(empty($user)){

            $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => 'user not found');
            return response()->json($response, 200);

        }

                $response = array('balance' => $user->sold_sport);
                return response()->json($response, 200);




        break;

      case "bet":
        
        $amount         = (float) $request->amount;
        $game_uuid      = $request->game_uuid;
        $transaction_id = $request->transaction_id;
        $type           = $request->type;

        $user = User::where([['id','=',$playerID],['username','=',$playerUsername]])->first();

        if(empty($user)){

            $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => 'user not found');
            return response()->json($response, 200);

        }

        $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->exists();

        if($transaction_exit){


                    $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
                    return response()->json($response, 200);


        }

        if($amount === 0){

            /*** NEW TRANSACTiON MADE ***/
            $newTransaction = new Gratortransaction();
            $newTransaction->type            = $type;
            $newTransaction->user            = $playerID;
            $newTransaction->amount          = $amount;
            $newTransaction->transaction_id  = $transaction_id;
            $newTransaction->game_uuid       = $game_uuid;
            $newTransaction->save();



            $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
            return response()->json($response, 200);


        }

        $workBalance = $user->sold_sport;


        if( $workBalance < $amount ){

            $response = array('error_code' => 'INSUFFICIENT_FUNDS', 'error_description' => 'user balance low');
            return response()->json($response, 200);
        }


        if($user->username != "fganonplayer"){
            $Black_roles = ["admin","agent"];
            $parent = User::where([['id','=',$user->parent]])->first();
            if( (in_array($parent->role, $Black_roles)) && ($amount > 80) ){

                $response = array('error_code' => 'INSUFFICIENT_FUNDS', 'error_description' => 'user balance low');
                return response()->json($response, 200);

            }
        }



        $workBalance = $user->sold_sport;

        if($amount === 0){

            /*** NEW TRANSACTiON MADE ***/
            $newTransaction = new Gratortransaction();
            $newTransaction->type            = $type;
            $newTransaction->user            = $playerID;
            $newTransaction->amount          = $amount;
            $newTransaction->transaction_id  = $transaction_id;
            $newTransaction->game_uuid       = $game_uuid;
            $newTransaction->save();



            $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
            return response()->json($response, 200);


        }


        /*** UPDATED USER BALANCE ***/
        //$user->sold_sport = (float) ($workBalance - $amount);

        $elo_query = $user->decrement('sold_sport', (float) $amount);
        $user->update();

        if($elo_query){
            /*** NEW TRANSACTiON MADE ***/
            $newTransaction = new Gratortransaction();
            $newTransaction->type            = $type;
            $newTransaction->user            = $playerID;
            $newTransaction->amount          = $amount;
            $newTransaction->transaction_id  = $transaction_id;
            $newTransaction->game_uuid       = $game_uuid;
            $newTransaction->save();

            $this->handleConsommation($user->username, "bets", $amount);


            $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);

            if($this->isTakwira($user->whois)){
                $this->updateJackpot($amount);
            }

        }else{

            $response = array('balance' => $user->sold_sport);

        }

        return response()->json($response, 200);

        break;

      case "win":


        $amount         = (float) $request->amount;
        $game_uuid      = $request->game_uuid;
        $transaction_id = $request->transaction_id;
        $type           = $request->type;

        $user = User::where([['id','=',$playerID],['username','=',$playerUsername]])->first();

        if(empty($user)){

            $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => 'user not found');
            return response()->json($response, 200);

        }

        $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->exists();

        if($transaction_exit){


                    $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
                    return response()->json($response, 200);


        }


        $workBalance = $user->sold_sport;
        /*** UPDATED USER BALANCE ***/
        //$user->sold_sport = (float) ($workBalance + $amount);
        //$user->save();
        $elo_query = $user->increment('sold_sport', (float) $amount);
        $user->update();


        if($elo_query){
            /*** NEW TRANSACTiON MADE ***/
            $newTransaction = new Gratortransaction();
            $newTransaction->type            = $type;
            $newTransaction->user            = $playerID;
            $newTransaction->amount          = $amount;
            $newTransaction->transaction_id  = $transaction_id;
            $newTransaction->game_uuid       = $game_uuid;
            $newTransaction->save();

            $this->handleConsommation($user->username, "wins", $amount);

            $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);

        }else{

            $response = array('balance' => $user->sold_sport);


        }

            return response()->json($response, 200);

        break;


      case "refund":

            $amount             = (float) $request->amount;
            $game_uuid          = $request->game_uuid;
            $transaction_id     = $request->transaction_id;
            $refType            = $request->type;
            $type               = "refund";
            $bet_transaction_id = $request->bet_transaction_id;

            $user = User::where([['id','=',$playerID],['username','=',$playerUsername]])->first();

            if( empty($user) || $user === null ){

                $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => 'user not found');
                return response()->json($response, 200);

            }

            $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id],['type','=',$type]])->first();

            if( !empty($transaction_exit) || $transaction_exit != null ){



            

                        $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
                        return response()->json($response, 200);



            }

            $bet_transaction_exit = Gratortransaction::where([['transaction_id','=',$bet_transaction_id]])->first();

            if( !empty($bet_transaction_exit) ){


                $typeTransaction   = $bet_transaction_exit->type;
                $amountTransaction = (float) $bet_transaction_exit->amount;

                /*** UPDATED USER BALANCE ***/

                if($typeTransaction === "bet"){


                    $workBalance = $user->sold_sport;
                    /*** UPDATED USER BALANCE ***/
                    //$user->sold_sport = (float) ($workBalance + $amount);
                    //$user->save();
                    $user->increment('sold_sport', (float) $amount);
                    $user->update();


                    /*** NEW TRANSACTiON MADE ***/
                    $newTransaction = new Gratortransaction();
                    $newTransaction->type            = $type;
                    $newTransaction->user            = $playerID;
                    $newTransaction->amount          = $amount;
                    $newTransaction->transaction_id  = $bet_transaction_id;
                    $newTransaction->game_uuid       = $game_uuid;
                    $newTransaction->save();    


                    $this->handleConsommation($user->username, "refund", $amount);


                }


                        $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
                        return response()->json($response, 200);

                


            }else{



                        $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
                        return response()->json($response, 200);




            }



                        $response = array('balance' => $user->sold_sport, 'transaction_id' => $transaction_id);
                        return response()->json($response, 200);




        break;

      case 'rollback':

            $amount             = (float) $request->amount;
            $game_uuid          = $request->game_uuid;
            $transaction_id     = $request->transaction_id;
            $type               = $request->type;
            $bet_transaction_id = $request->bet_transaction_id;
            $rollback_transactions = $request->rollback_transactions;

            $user = User::where([['id','=',$playerID],['username','=',$playerUsername]])->first();

            if( empty($user) || $user === null ){

                $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => 'user not found');
                return response()->json($response, 200);

            }

            $rolled_transactions = array();

            $isFound = false;
            foreach ($rollback_transactions as $roll_tr) {

                $roll_action = $roll_tr['action'];
                $roll_amount = $roll_tr['amount'];
                $roll_trID   = $roll_tr['transaction_id'];
                $roll_type   = $roll_tr['type'];

                $roll_exist = Gratortransaction::where([['transaction_id','=',$roll_trID],['type','=',$roll_type]])->first();

                if( !empty($roll_exist) ){

                    $isFound = true;

                    $typeTransaction   = $roll_exist->type;
                    $amountTransaction = (float) $roll_exist->amount;

                    /*** UPDATED USER BALANCE ***/

                    $checkRoll = Gratortransaction::where([['transaction_id','=',$roll_trID],['type','=',"rollbacked"]])->first();

                    if( empty($checkRoll) ){

                        if($typeTransaction === "bet"){

                          

                                    $workBalance = $user->sold_sport;
                                    //$user->sold_sport = (float) ($workBalance + $amountTransaction);
                                    //$user->save();
                                    $user->increment('sold_sport', (float) $amountTransaction);
                                    $user->update();

                                    $this->handleConsommation($user->username, "refund", $amountTransaction);

                            


                        }elseif($typeTransaction === "win"){


                                    $workBalance = $user->sold_sport;
                                    //$user->sold_sport = (float) ($workBalance - $amountTransaction);
                                    //$user->save();
                                    $user->decrement('sold_sport', (float) $amountTransaction);
                                    $user->update();

                                    $this->handleConsommation($user->username, "bets", $amountTransaction);

                        }


                        /*** NEW TRANSACTiON MADE ***/
                        $newTransaction = new Gratortransaction();
                        $newTransaction->type            = "rollbacked";
                        $newTransaction->user            = $playerID;
                        $newTransaction->amount          = $roll_amount;
                        $newTransaction->transaction_id  = $roll_trID;
                        $newTransaction->game_uuid       = $game_uuid;
                        $newTransaction->save();


                    }

                    array_push($rolled_transactions,$roll_trID);


                }


            }

            if($isFound){


             

                        $response = array('balance' => $user->sold_sport, 
                                  'transaction_id' => $transaction_id,
                                  'rollback_transactions' => $rolled_transactions
                                    );

                        return response()->json($response, 200);


            }else{

                        $response = array('balance' => $user->sold_sport, 
                                  'transaction_id' => $transaction_id,
                                  'rollback_transactions' => $rollback_transactions
                                    );

                        return response()->json($response, 200);

                


            }




        break;
      default:


            $response = array('error_code' => 'INTERNAL_ERROR', 'error_description' => 'action mismatch');
            return response()->json($response, 200);


    }




}


    public function getExistUrl($origin,$isLiveRef=false){


        $isDesktop = !(preg_match("/m./i", $origin))  ? true : false;

        $exitURL = $isLiveRef ? $origin.'/'.$isLiveRef : $origin.'/casino-games'; 


        if($isDesktop){

            $exitURL .= '?isDesktop=true';
        }


        return $exitURL;



    }





    public function flushGames(Request $request){


    $response  = $initConfig->axiosSecond("/games/init", $postData);

    return response()->json($response['decode'], 200);




    }



                /*if(preg_match("/(xbet|takwira.it|forzza.it|.shop)/i", $origin)){

                    return response()->json([
                        "status" => 200,
                        "error" => 'balance low'
                    ], 200);

                }*/

                /*if($game_uuid === "cd0128cf16a2fd94d1b7546657f64d94080956be"){

                    if(preg_match("/(xbet|.shop|liver1x2)/i", $origin)){

                        return response()->json([
                            "status" => 200,
                            "error" => 'ERROR UNKOWN'
                        ], 200);

                    }

                }*/

    public function startGame($game_uuid, $isSlot=false, Request $request){


        if(empty($game_uuid)){

                return response()->json([
                    "status" => 200,
                    "error" => 'game required'
                ], 200);


        }

        try{


            $configCasino = new ConfigCasino();

            $user = JWTAuth::parseToken()->authenticate();

            $origin = $request->headers->get('origin');


            $organizationID = $this->organization_id;

            $superConfig = $this->getSuperConfig($user->username);

            if(!empty($superConfig)){


                if($superConfig["role"] === "super"){

                    $organizationID = $superConfig["org"];

                }

            }



            if($isSlot === "slot"){

                $exiturl = $this->getExistUrl($origin);

            }else{

                $exiturl  = $this->getExistUrl($origin,'live-casino');
            }

            $post_data = [];


            //$game_uuid_v2 = $game_uuid;

            /*if($game_uuid === "904ca5d5330548ba81350e052941d4a7"){


                $game_uuid_v2 = "466c8100d33e91dc553a2476ba3ecf7a";
            }*/



            $post_data['game_uuid']   = $game_uuid;
            $post_data['player_id']   = $user->username;
            $post_data['parent_id']   = $user->parent;
            $post_data['balance']     = (float) $user->sold_sport;
            $post_data['exit_url']    = $exiturl;

            $headers = array(
                        'organization-id: '.$organizationID,
                        'Content-Type: application/json',
                    );


            $uri = $this->api_base_url.'/casino/establish/open-game';

            $resp = $configCasino->initCurl($uri, $post_data, $headers);

            $json = $resp['decode'];

            if($json["status"] === true){

                return response()->json([
                    "status" => 200,
                    "url" => $json['game_url'],
                ], 200);


            }else{


                return response()->json([
                    "status" => 200,
                    "error" => $json['error']
                ], 200);

            }


        } catch (JWTException $e) {

                return response()->json([
                    "status" => 200,
                    "error" => 'ERROR Auth'
                ], 200);
        }



    }


    public function selfValidate(Request $request, $game_uuid,$test){
        //Init Config CLass   
            $initConfig = new ConfigCasino();

            $username  = "fganonplayer";
            $user_hash = sha1("FORZZA#".$username."");
            $user_id = "143#".$username."#slot";


            $postData = [
                'game_uuid' => $game_uuid,
                'player_id' => $user_id,
                'player_name' => $username,
                'currency' => 'EUR',
                'session_id' => $user_hash,
                'return_url' => 'http://127.0.0.1/',
            ];

        // LAUNCH GAME FIRST
        if( $test === "game" ){
            //Init Config LIVE CASINO
            $response  = $initConfig->axiosStag("/games/init", $postData);

            return $response['data'];


        /// EXECUTING SELF VALIDATE REQUEST
        }else{

            $postData = [

            ];
            
            $responseSecond  = $initConfig->axiosStag("/self-validate", $postData, true);

            return $responseSecond['decode'];

        }


    }

}
