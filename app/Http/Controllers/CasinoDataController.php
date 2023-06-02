<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\GasinoSlots;
use App\UsersBets;
use App\Consommation;
use App\Jackpots;
use App\Gratortransaction;
use App\Classes\ConfigCasino;
use App\Classes\ApiClient;
use App\Classes\Encrypter;
use Illuminate\Http\Request;
use Exception; 
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;


class CasinoDataController extends Controller{


    public $api_base_url =  "https://app.kong-gateway.com/ns"; //"https://nestjs.mysuper77.com";

    public $organization_id = "23d040dc-bee0-4049-a4cb-7a90b488564a";


    public function isTakwira($whois){

       return (preg_match("/takwira/i", $whois)) ? true : false;

    }

    public function getPercentOfNumber($number, $percent){

            return ($percent / 100) * $number;
    }


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
    public function formatFiableSlode($sold){

        //return floor($sold *100);
        return (int)floor($sold * 100 + 0.00001);

    }

    public function paginate($items, $perPage = 10, $page = null, $options = []){

        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);

        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);

    }


    public function isNotUs($origin){


        return !(preg_match("/.win|.top|.vip|takwira.com|localhost|goldbet|liver1x2/i", $origin)) ? true : false;


    }


    public function getExistUrl($origin,$isLiveRef=false){


        $isDesktop = !(preg_match("/m./i", $origin)) ? true : false;

        $exitURL = $isLiveRef ? $origin.'/'.$isLiveRef : $origin.'/casino-games'; 


        if($isDesktop){

            $exitURL .= '?isDesktop=true';
        }


        return $exitURL;



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


    public function verifySignature($postData, $signature, $organizationID){


        $queyData     = http_build_query($postData);

        $expectedSignature = hash_hmac('sha1', $queyData, $organizationID);


        return $expectedSignature === $signature;

    }


    public function webhookwallet(Request $request){

        $validator = Validator($request->only("action", "player_id"), [
            "action" => "required",
            "player_id" => "required",
        ]);

        if( $validator->fails() ){

            $response = array('status' => false, 'error' => $validator->errors()->first());
            return response()->json($response, 200);
        }


        $signature      = $request->headers->get('x-signature');

        $action = $request->action;

        $player = $request->player_id;

        if($player === "fganonplayer" || $player === "testbuger"){


            $data = [];


            //$data['sig'] = $signature;
            $data['post'] = $request->all();

            $xx = json_encode($data)."\r\n";

            Storage::disk('public')->append('hasura.txt', $xx, null);



        }

        //get user data
        $user = User::where([['username','=',$player]])->first();


        if(empty($user)){

                return response()->json([
                    "status" => false,
                    "error" => "USER_NOT_FOUND"
                ], 200);

        }


        $organizationID = $this->organization_id;

        $superConfig = $this->getSuperConfig($user->username);

        if(!empty($superConfig)){


            if($superConfig["role"] === "super"){

                $organizationID = $superConfig["org"];

            }

        }


        if( $this->verifySignature($request->all(), $signature, $organizationID) === false  ){



            $response = array('status' => false, 'error' => "error signature");
            return response()->json($response, 200);


        }




        if($action === "balance"){


                return response()->json([
                    "status" => true,
                    "player_id" => $player,
                    "balance" => $user->sold_sport,
                ], 200);


        }elseif($action === "bet"){

                $transaction_id  = $request->transaction_id;
                $type            = $request->type;
                $game            = $request->game;

                $amount  =  $request->amount;

                if( $user->sold_sport < $amount ){

                    $response = array('status' => false, 'error' => "INSUFFICIENT_FUNDS");
                    return response()->json($response, 200);
                }


                if($amount <= 0 ){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }

                /*$transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->exists();

                if($transaction_exit){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }*/


                try {


                    DB::transaction(function () use ($player,$type,$amount,$transaction_id,$game) {
                        // Lock the row for update
                        $userToUpdate = User::where([['username','=',$player]])->lockForUpdate()->first();

                        $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->first();

                        if(!$transaction_exit){

                                $this->handleConsommation($userToUpdate->username, "bets", $amount);

                                // Insert a new row
                                DB::table('slotegrator_tr')->insert([
                                    'type' => $type,
                                    'user' => $userToUpdate->username,
                                    'amount' => $amount,
                                    'transaction_id' => $transaction_id,
                                    'game_uuid' => $game,
                                    'created_at' => Carbon::now()
                                ]);

                                // Make changes to the locked row
                                $userToUpdate->decrement('sold_sport', $amount);
                                $userToUpdate->update();

                        }
                    });


                    $user->refresh();

                    return response()->json([
                        "status" => true,
                        "player_id" => $player,
                        "balance" => $user->sold_sport,
                        "transaction_id" => $transaction_id
                    ], 200);


                } catch (Exception $e) {

                                return response()->json([
                                    "status" => false,
                                    "error" => "INTERNAL_ERROR_69"
                                ], 200);


                }





        }elseif($action === "win"){

                $transaction_id  = $request->transaction_id;
                $type            = $request->type;
                $game            = $request->game;

                $amount  = $request->amount;

                if($amount <= 0 ){


                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);


                }

                /*$transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->exists();

                if($transaction_exit){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }*/



                try {



                    DB::transaction(function () use ($player,$type,$amount,$transaction_id,$game) {
                        // Lock the row for update
                        $userToUpdate = User::where([['username','=',$player]])->lockForUpdate()->first();

                        $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->first();

                        if(!$transaction_exit){

                                $this->handleConsommation($userToUpdate->username, "wins", $amount);

                                // Insert a new row
                                DB::table('slotegrator_tr')->insert([
                                    'type' => $type,
                                    'user' => $userToUpdate->username,
                                    'amount' => $amount,
                                    'transaction_id' => $transaction_id,
                                    'game_uuid' => $game,
                                    'created_at' => Carbon::now()
                                ]);

                                // Make changes to the locked row
                                $userToUpdate->increment('sold_sport', $amount);
                                $userToUpdate->update();

                        }
                    });


                    //$this->handleConsommation($user->username, "wins", $amount);

                    $user->refresh();

                    return response()->json([
                        "status" => true,
                        "player_id" => $player,
                        "balance" => $user->sold_sport,
                        "transaction_id" => $transaction_id
                    ], 200);


                } catch (Exception $e) {

                                return response()->json([
                                    "status" => false,
                                    "error" => "INTERNAL_ERROR_69"
                                ], 200);


                }


        }elseif($action === "refund"){



                $transaction_id  = $request->transaction_id;
                $type            = $request->type;
                $bet_transaction_id  = $request->bet_transaction_id;
                $game            = $request->game;

                $amount  = (float) $request->amount;


                $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->exists();

                if($transaction_exit){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }

                $dup_refund_transaction_exit = Gratortransaction::where([['transaction_id','=',$bet_transaction_id],['type','=',$action]])->exists();

                if($dup_refund_transaction_exit){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }


                if($amount <= 0 ){


                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);


                }


                $refund_transaction_exit = Gratortransaction::where([['transaction_id','=',$bet_transaction_id],['type','=',$type]])->exists();


                if($refund_transaction_exit){


                    if($type === "bet"){


                        $elo_query = $user->increment('sold_sport', $amount);
                        $user->update();

                        if($elo_query){
                            /*** NEW TRANSACTiON MADE ***/
                            $newTransaction = new Gratortransaction();
                            $newTransaction->type            = $action;
                            $newTransaction->user            = $user->username;
                            $newTransaction->amount          = $amount;
                            $newTransaction->transaction_id  = $bet_transaction_id;
                            $newTransaction->game_uuid       = $game;
                            $newTransaction->save();


                         }


                        $this->handleConsommation($user->username, "refund", $amount); 


                        /*** NEW TRANSACTiON MADE ***/
                        $newTransaction = new Gratortransaction();
                        $newTransaction->type            = $action;
                        $newTransaction->user            = $user->username;
                        $newTransaction->amount          = $amount;
                        $newTransaction->transaction_id  = $transaction_id;
                        $newTransaction->game_uuid       = $game;
                        $newTransaction->save();


                    }


                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);


                }else{


                        /*** NEW TRANSACTiON MADE ***/
                        $newTransaction = new Gratortransaction();
                        $newTransaction->type            = $action;
                        $newTransaction->user            = $user->username;
                        $newTransaction->amount          = $amount;
                        $newTransaction->transaction_id  = $transaction_id;
                        $newTransaction->game_uuid       = $game;
                        $newTransaction->save();

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }



        }elseif($action === "rollback"){

                $transaction_id  = $request->transaction_id;
                $type            = $request->type;
                $game            = $request->game;
                $rollback_transactions = $request->rollback_transactions;


                $transaction_exit = Gratortransaction::where([['transaction_id','=',$transaction_id]])->exists();


                $total_rollback_amount = 0;


                if($transaction_exit){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }


                $rolledbacked_tr = array();

                foreach ($rollback_transactions as $tr) {


                    $roll_action = $tr['action'];
                    $roll_amount = (float) $tr['amount'];
                    $roll_trID   = $tr['transaction_id'];
                    $roll_type   = $tr['type'];

                    $roll_tr_exist = Gratortransaction::where([['transaction_id','=',$roll_trID],['type','=',$roll_type]])->exists();


                    if(!empty($roll_tr_exist)){


                        if($roll_type === "bet"){

                                
                                $total_rollback_amount = $total_rollback_amount + $roll_amount;
                                $user->increment('sold_sport', $roll_amount);
                                $user->update();

                                $this->handleConsommation($user->username, "refund", $roll_amount);


                        }elseif($roll_type === "win"){

                                $total_rollback_amount = $total_rollback_amount + $roll_amount;
                                $user->decrement('sold_sport', $roll_amount);
                                $user->update();

                                $this->handleConsommation($user->username, "bets", $roll_amount);

                        }



                        array_push($rolledbacked_tr, $roll_trID);

                    }


                }


                /*** NEW TRANSACTiON MADE ***/
                $newTransaction = new Gratortransaction();
                $newTransaction->type            = $type;
                $newTransaction->user            = $user->username;
                $newTransaction->amount          = $total_rollback_amount;
                $newTransaction->transaction_id  = $transaction_id;
                $newTransaction->game_uuid       = $game;
                $newTransaction->save();


                return response()->json([
                    "status" => true,
                    "player_id" => $player,
                    "balance" => $user->sold_sport,
                    "transaction_id" => $transaction_id,
                    "rollback_transactions" => $rolledbacked_tr
                ], 200);



        }


    }


    public function launcherSlots($game_uuid = "", Request $request){

        if(empty($game_uuid)){

                return response()->json([
                    "status" => 200,
                    "error" => 'game required'
                ], 200);


        }

        try{

            $configCasino = new ConfigCasino();

            $user = JWTAuth::parseToken()->authenticate();


            $organizationID = $this->organization_id;

            $superConfig = $this->getSuperConfig($user->username);

            if(!empty($superConfig)){


                if($superConfig["role"] === "super"){

                    $organizationID = $superConfig["org"];

                }

            }


            $origin = $request->headers->get('origin');

            $exiturl = $this->getExistUrl($origin);

            $post_data = [];

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

        /*if(empty($game_uuid)){

                return response()->json([
                    "status" => 200,
                    "error" => 'game required'
                ], 200);


        }

        try {



                //$response = array('status' => 200, 'error' => true, 'msg' => "casino unavailable, party night");
                //return response()->json($response, 200);



            $user = JWTAuth::parseToken()->authenticate();



            if($user->username === "fganonplayer" || $user->username === "testbuger"){

                    $configCasino = new ConfigCasino();

                    $origin = $request->headers->get('origin');


                    $exiturl = $this->getExistUrl($origin);


                    $post_data = [];

                    $post_data['game_uuid']   = $game_uuid;
                    $post_data['player_id']   = $user->username;
                    $post_data['parent_id']   = $user->parent;
                    $post_data['balance']     = (float) $user->sold_sport;
                    $post_data['exit_url']    = $exiturl;

                    $headers = array(
                                'organization-id: '.$this->organization_id,
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



            }


               //$user = User::where([['username','=','111222']])->first();

            //Init Config Slots   
            $configCasino = new ConfigCasino();
            $slotsConfig  = $configCasino->SlotsConfig();
            //Init Config Slots 

            //API VARIABLES
            $API_URL      = $slotsConfig['API_URL'];
            $API_ID       = $slotsConfig['API_ID'];
            $API_KEY      = $slotsConfig['API_KEY'];
            $GAME_URL     = $slotsConfig['GAME_URL'];
            $CALLBACK_URL = $slotsConfig['WALLET_URL'];
            $CALLBACK_KEY = $slotsConfig['CALLBACK_KEY'];
            //$exiturl      = $slotsConfig['EXIT_URL'];
            $lang         = $slotsConfig['LANG'];
            $cur          = $slotsConfig['CUR'];


            $origin = $request->headers->get('origin');
            $referer = $request->headers->get('referer');


            $exiturl = $this->getExistUrl($origin);

            $user->callback_key  = $CALLBACK_KEY;
            $user->callback_hash = strtoupper(sha1($user->id.'_'.$user->username));
            $user->save();


            $params = array(
                'action'      => 'inituser',
                'api_id'      => $API_ID,
                'hash'        => $user->callback_hash,
                'cur'         => $cur,
                'parenthash'  => $user->parent,
                'callbackurl' => $CALLBACK_URL,
                'callbackkey' => $CALLBACK_KEY
            );

            $Player = new ApiClient($API_URL,$API_KEY);

            $response_json  = $Player->SendData($params);

            if($response_json===false){


                return response()->json([
                    "status" => 200,
                    "error" => "ERROR ".$Player->lasterror
                ], 200);

            }else{


                $response = json_decode($response_json,true);

                if($response['success']=='true'){

                    $url = $GAME_URL.'?game='.$game_uuid.'&hash='.$user->callback_hash.'&api_id='.$API_ID.'&lang='.$lang.'&exit='.$exiturl;

                    $iframe = '<iframe src="'.$url.'" style="border: 0; position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%" allowfullscreen><iframe>';


                    return response()->json([
                        "status" => 200,
                        "url" => $url,
                        "iframe" => $iframe
                    ], 200);

                }else{

                    return response()->json([
                        "status" => 200,
                        "error" => 'ERROR occured:'.$response['error']
                    ], 200);

                }





            }


        } catch (JWTException $e) {

                return response()->json([
                    "status" => 200,
                    "error" => 'ERROR Auth:'.$e
                ], 200);
        }*/

        


    }


    public function verifyFiableSignature($request, $comming_signature){

        $configCasino   = new ConfigCasino();
        
        $user_data = [];

        $user_data['user_id']    = $request->user_id;
        $user_data['value']      = $request->value;
        $user_data['bet_id']     = $request->bet_id;
        $user_data['game_name']  = $request->game_name;

        $generated_sig = $configCasino->fiableSignature($user_data);

        return $generated_sig === $comming_signature;

    }


    public function fiableWallet($type, Request $request){



        $req_signature = $request->headers->get('Message-Signature');

        $validator = Validator($request->only("user_id", "value", "bet_id", "game_name"), [
            "user_id" => "required",
            "value" => "required",
            "bet_id" => "required",
            "game_name" => "required",
        ]);

        if( $validator->fails() ){

            $response = array('code' => 1, 'message' => $validator->errors()->first());
            return response()->json($response, 200);
        }

        if(empty($req_signature) || $this->verifyFiableSignature($request,$req_signature) === false ){

            $response = array('code' => 1, 'message' => "Signature mismatch");
            return response()->json($response, 200);

        }


        //Storage::disk('public')->append('fiable.txt', $req_signature."\n".$request, null);

        /*** REQUEST POSTED DATA *****/
        $user_id       = $request->user_id;
        $amount        = ($request->value/100);
        $bet_id        = $request->bet_id;
        $game_name     = $request->game_name;
        /******************************/


        /*if($user_id != 143 ){

            $response = array('code' => 1, 'message' => "Signature mismatch");
            return response()->json($response, 200);


        }*/


        $user = User::where([['id','=',$user_id]])->first();

        if(empty($user)){

            $response = array('code' => 1, 'message' => "user not found");
            return response()->json($response, 200);

        }


        if($type === "bet"){

                if( $user->sold_sport < $amount ){

                    $response = array('code' => 1, 'message' => "INSUFFICIENT_FUNDS");
                    return response()->json($response, 200);
                }


                $elo_query = $user->decrement('sold_sport', (float) $amount);
                $user->update();

                if($elo_query){
                    /*** NEW TRANSACTiON MADE ***/
                    $newTransaction = new Gratortransaction();
                    $newTransaction->type            = $type;
                    $newTransaction->user            = $user_id;
                    $newTransaction->amount          = $amount;
                    $newTransaction->transaction_id  = "fiable_".$bet_id;
                    $newTransaction->game_uuid       = $game_name;
                    $newTransaction->save();

                    $this->handleConsommation($user->username, "bets", $amount);


                    $response = array('code' => 0, 'balance' => $this->formatFiableSlode($user->sold_sport), 'message' => "");
                    return response()->json($response, 200);


                }else{

                    $response = array('code' => 0, 'balance' => $this->formatFiableSlode($user->sold_sport), 'message' => "could not update user balance");
                    return response()->json($response, 200);

                }

        }

        if($type === "win"){



                $elo_query = $user->increment('sold_sport', (float) $amount);
                $user->update();

                if($elo_query){
                    /*** NEW TRANSACTiON MADE ***/
                    $newTransaction = new Gratortransaction();
                    $newTransaction->type            = $type;
                    $newTransaction->user            = $user_id;
                    $newTransaction->amount          = $amount;
                    $newTransaction->transaction_id  = "fiable_".$bet_id;
                    $newTransaction->game_uuid       = $game_name;
                    $newTransaction->save();

                    $this->handleConsommation($user->username, "wins", $amount);


                    $response = array('code' => 0, 'balance' => $this->formatFiableSlode($user->sold_sport), 'message' => "");
                    return response()->json($response, 200);


                }else{

                    $response = array('code' => 0, 'balance' => $this->formatFiableSlode($user->sold_sport), 'message' => "could not update user balance");
                    return response()->json($response, 200);

                }

        }

        return $type;



    }




    public function launcherFiable($game_uuid = "", Request $request){


        if(empty($game_uuid)){

                return response()->json([
                    "status" => 200,
                    "error" => 'game required'
                ], 200);


        }

        try{

            $configCasino = new ConfigCasino();

            $user = JWTAuth::parseToken()->authenticate();


            $organizationID = $this->organization_id;

            $superConfig = $this->getSuperConfig($user->username);

            if(!empty($superConfig)){


                if($superConfig["role"] === "super"){

                    $organizationID = $superConfig["org"];

                }

            }


            $origin = $request->headers->get('origin');

            $exiturl = $this->getExistUrl($origin);

            $post_data = [];

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
        /*if(empty($game_uuid)){

                return response()->json(["status" => 200,"error" => 'game required'], 200);
        }

        try {

            $fiable_game = GasinoSlots::where([["uuid", "=", $game_uuid]])->first();

            if(empty($fiable_game)){

                return response()->json(["status" => 200,"error" => 'game required'], 200);
            }

            $user = JWTAuth::parseToken()->authenticate();


            $user_data = [];

            $user_data['user_id']  = $user->id;
            $user_data['currency'] = 'TND';
            $user_data['balance']  = $this->formatFiableSlode($user->sold_sport);


            $configCasino   = new ConfigCasino();

            $fiable_session = $configCasino->openFiableSession($user_data)['decode'];
            
            $origin = $request->headers->get('origin');
            $exiturl = $this->getExistUrl($origin);


            if($fiable_session['status'] === 0){

                $session_token = $fiable_session['result']['session_token'];

                $fiable_game_url = $fiable_game->fiable_url.'/?token='.$session_token.'&lang=en&homeUrl='.$exiturl;


                return response()->json([
                    "status" => 200,
                    "url" => $fiable_game_url
                ], 200);


            }else{


                return response()->json([
                    "status" => 200,
                    "error" => $fiable_session['error_message']
                ], 200);

            }



        } catch (JWTException $e) {

                return response()->json([
                    "status" => 200,
                    "error" => 'ERROR Auth:'.$e
                ], 200);
        }*/




    }


    public function get_categories(Request $request){

        //Init Config CLass   
        $initConfig = new ConfigCasino();

        //Init Config LIVE CASINO
        $casinoConfig  = $initConfig->LiveCasinoConfig();

        //Init PARAMS 
        $API_URL      = $casinoConfig['API_URL'];
        $API_KEY      = $casinoConfig['API_KEY'];
        $API_PWD      = $casinoConfig['API_PWD'];        
        $API_HMAC     = $casinoConfig['API_HMAC'];
        $VPS_IP       = $casinoConfig['VPS_IP'];


        $UUID         = $initConfig->guidv4();


        //Create Hash
        $HASH = 'Game/Categories/'.$VPS_IP.'/'.$UUID.'/'.$API_KEY.'/'.$API_PWD;
        $HASH = md5($HASH);


        //REQUEST
        $uri      = $API_URL.'/System/Api/'.$API_KEY.'/Game/Categories/?&TID='.$UUID.'&Hash='.$HASH;
        $response = $initConfig->axios($uri)['data'];


        return $response;


    }

    public function get_games(Request $request){

        //Init Config CLass   
        $initConfig = new ConfigCasino();

        //Init Config LIVE CASINO
        $casinoConfig  = $initConfig->LiveCasinoConfig();

        //Init PARAMS 
        $API_URL      = $casinoConfig['API_URL'];
        $API_KEY      = $casinoConfig['API_KEY'];
        $API_PWD      = $casinoConfig['API_PWD'];        
        $API_HMAC     = $casinoConfig['API_HMAC'];
        $VPS_IP       = $casinoConfig['VPS_IP'];

        
        $UUID         = $initConfig->guidv4();

        //Create Hash
        $HASH = 'Game/List/'.$VPS_IP.'/'.$UUID.'/'.$API_KEY.'/'.$API_PWD;
        $HASH = md5($HASH);


        //REQUEST
        $uri      = $API_URL.'/System/Api/'.$API_KEY.'/Game/List/?&TID='.$UUID.'&Hash='.$HASH;
        $response = $initConfig->axios($uri)['data'];


        return $response;


    }



    public function get_full_games(Request $request){

        //Init Config CLass   
        $initConfig = new ConfigCasino();

        //Init Config LIVE CASINO
        $casinoConfig  = $initConfig->LiveCasinoConfig();

        //Init PARAMS 
        $API_URL      = $casinoConfig['API_URL'];
        $API_KEY      = $casinoConfig['API_KEY'];
        $API_PWD      = $casinoConfig['API_PWD'];        
        $API_HMAC     = $casinoConfig['API_HMAC'];
        $VPS_IP       = $casinoConfig['VPS_IP'];

        
        $UUID         = $initConfig->guidv4();

        //Create Hash
        $HASH = 'Game/FullList/'.$VPS_IP.'/'.$UUID.'/'.$API_KEY.'/'.$API_PWD;
        $HASH = md5($HASH);


        //REQUEST
        $uri      = $API_URL.'/System/Api/'.$API_KEY.'/Game/FullList/?&TID='.$UUID.'&Hash='.$HASH;
        $response = $initConfig->axios($uri)['data'];


        return $response;


    }



    public function get_sort_games(Request $request){

        //Init Config CLass   
        $initConfig = new ConfigCasino();

        //Init Config LIVE CASINO
        $casinoConfig  = $initConfig->LiveCasinoConfig();

        //Init PARAMS 
        $API_URL      = $casinoConfig['API_URL'];
        $API_KEY      = $casinoConfig['API_KEY'];
        $API_PWD      = $casinoConfig['API_PWD'];        
        $API_HMAC     = $casinoConfig['API_HMAC'];
        $VPS_IP       = $casinoConfig['VPS_IP'];

        
        $UUID         = $initConfig->guidv4();

        //Create Hash
        $HASH = 'Game/Sorting/'.$VPS_IP.'/'.$UUID.'/'.$API_KEY.'/'.$API_PWD;
        $HASH = md5($HASH);


        //REQUEST
        $uri      = $API_URL.'/System/Api/'.$API_KEY.'/Game/Sorting/?&TID='.$UUID.'&Hash='.$HASH.'&Type=popular';
        $response = $initConfig->axios($uri)['data'];


        return $response;


    }


    public function launcherLive($game_id = "",$pageCode = "", Request $request){


        $query = array('game_id' => $game_id, 'page_code' => $pageCode);

        $error_msgs = array(
            'required' => ':attribute is required',
            'numeric' => ":attribute must be digits only"
        );

        $validator = Validator($query, [
            "game_id"   => "required|numeric",
            "page_code" => "required",
        ],$error_msgs);


        if( $validator->fails() ){

                $response = array('status' => 200, 'error' => $validator->errors()->first());
                return response()->json($response, 200);
        }



        try {

            $user = JWTAuth::parseToken()->authenticate();

            /*$origin_check = $request->headers->get('origin');

            if(preg_match("/forzza.shop/",$origin_check)){
                
                $response = array('status' => 200, 'error' => true, 'msg' => "live casino unavailable, low balance credits");
                return response()->json($response, 200);
                
            }*/

            /*if( $user->username != "fganonplayer" ){

                $response = array('status' => 200, 'error' => true, 'msg' => "carps not allowed");
                return response()->json($response, 200);

            }*/

            //Init User
            $user_login = $user->username;
            $user_pass_fake  = substr($user->password, -8);//str_shuffle(substr($user->password, -8));
            $user_ip = $user->ip;


            //Init Config CLass   
            $initConfig = new ConfigCasino();

            //Init Config LIVE CASINO
            $casinoConfig  = $initConfig->LiveCasinoConfig();

            //Init PARAMS 
            $API_URL      = $casinoConfig['API_URL'];
            $API_KEY      = $casinoConfig['API_KEY'];
            $API_PWD      = $casinoConfig['API_PWD'];        
            $API_HMAC     = $casinoConfig['API_HMAC'];
            $VPS_IP       = $casinoConfig['VPS_IP'];
            $LANG         = $casinoConfig['LANG'];
            $CUR          = $casinoConfig['CUR'];

            
            /*$UUID         = $initConfig->guidv4();
            
            $HASH = 'User/Add/'.$VPS_IP.'/'.$UUID.'/'.$API_KEY.'/'.$user_login.'/'.$user_pass_fake.'/'.$CUR.'/'.$API_PWD;
            $HASH = md5($HASH);
            // #1 REQUEST
            $uri      = $API_URL.'/System/Api/'.$API_KEY.'/User/Add/?&Login='.$user_login.'&Password='.$user_pass_fake.'&TID='.$UUID.'&Hash='.$HASH.'&Currency='.$CUR.'&Language='.$LANG.'&RegistrationIP='.$user_ip;
            $response = $initConfig->axios($uri)['data'];*/

            $UUID         = $initConfig->guidv4();


            /** REUEST #2 ***/
            //Create Hash
            $HASH = 'User/DirectAuth/'.$VPS_IP.'/'.$UUID.'/'.$API_KEY.'/'.$user_login.'/'.$user_pass_fake.'/'.$game_id.'/'.$API_PWD;
            $HASH = md5($HASH);


            $slotsID = ['940','943','960','987'];
            $origin = $request->headers->get('origin');

            if (in_array($game_id, $slotsID)){

                  $extParms = "SlotsIW";
                  $referer  = $this->getExistUrl($origin,'auto-live-games');
 
                    
            }else{


                  $extParms = "LiveIW";
                  $referer  = $this->getExistUrl($origin,'live-casino');
            }

            // #2 REQUEST
            $uri      = $API_URL.'/System/Api/'.$API_KEY.'/User/DirectAuth/?&Login='.$user_login.'&Password='.$user_pass_fake.'&System='.$game_id.'&UserAutoCreate=1&ExtParam='.$extParms.'&Nick='.$user_login.'&Referer='.$referer.'&Currency='.$CUR.'&TID='.$UUID.'&Hash='.$HASH.'&Page='.$pageCode.'&UserIP='.$user_ip;

            $response = $initConfig->axios($uri)['data'];

            if(strpos($response, '1,') !== false){

                $link_lobby = trim(str_replace('1,', '', $response));

                return response()->json([
                    "status" => 200,
                    "lobby" => $link_lobby
                ], 200);

            }else{


                return response()->json([
                    "status" => 200,
                    "error" => true,
                    "message" => $response
                ], 200);

            }
            /** REUEST #2 ***/



        } catch (JWTException $e) {

                return response()->json([
                    "status" => 200,
                    "error" => true,
                    "message" => "Token mismatch"
                ], 200);
        }


    }

    
    public function upGames(Request $request){


        /*$json = Storage::disk('public')->get("games.json");

        $json_decode = json_decode($json,true);

        $cat  = array_keys($json_decode);

        $count = count($cat);

        $ok = 0;
        for($i=0;$i<$count;$i++){

           $cato =  $cat[$i];
            foreach ($json_decode[$cato] as $game) {

                $gamoup = GasinoSlots::where([["uuid", "=", strtolower($game['menu_title'])]])->first();

                if($gamoup){

                    $gamoup->game_id = $game['id'];
                    $gamoup->update();

                }


            }   


        }

        return "ok";*/
        $json = Storage::disk('public')->get("newgames.json");

        $json_decode = json_decode($json,true);


        $ok = 0;
        foreach ($json_decode as $game) {

            $game_new = new GasinoSlots();

            $game_new->name          = $game['name'];
            $game_new->uuid          = strtolower($game['uuid']);
            $game_new->provider      = strtolower($game['provider']);
            $game_new->type          = "slots";
            $game_new->image         = $game['image'];
            $game_new->status        = "active";

            $game_new->save();
            $ok++;


        }   



        return response()->json([
            "status" => 200,
            "count" => count($json_decode),
            "insrted" => $ok." games insterted successfully",
            "games" => $json_decode
        ], 200);


    }


    public function getGames($type, $provider = null, Request $request){

        /*$expire = Carbon::now()->addMinutes(10);

        $books = Cache::remember('games', $expire, function()  use($type){

            return GasinoSlots::where([['status','=','active'],['type','=',$type]])->get(['name','uuid','image','provider']);
        });

        return response()->json([
            "status" => 200,
            "data" => $books
        ], 200);*/

        $origin = $request->headers->get('origin');

        if($this->isNotUs($origin)){

            $shop_providers = ['amatic', 'playson', 'evoplay', 'pragmaticplay', 'bgaming', 'tomhorn', 'dlv', 'kagaming', 'netent', 'endorphina', 'novomatic', 'bomba', 'egt', 'wazdan', 'aristocrat', 'platipus', 'igrosoft', 'thunderkick', 'blueprint', 'booongo', 'quickspin', 'casinotechnology', 'onetouch', 'belatra games', 'triplecherry', 'caleta', 'yggdrasil', 'revolvergaming', 'charismatic', 'betsolutions','evolution', 'ezugi', 'vivogaming', 'xprogaming', 'liw'];

            if($provider){

                $data = GasinoSlots::where([['status','=','active'],['type','=',$type],['provider','=',$provider]])->get(['name','uuid','image','provider']);

            }else{

                $data = GasinoSlots::where([['status','=','active'],['type','=',$type]])->whereIn('provider', $shop_providers)->get(['name','uuid','image','provider']);

            }

            return response()->json([
                "status" => 200,
                "count" => count($data),
                "data" => $data
            ], 200);

        }



        if($provider){

            $data = GasinoSlots::where([['status','=','active'],['type','=',$type],['provider','=',$provider]])->get(['name','uuid','image','provider']);

        }else{

            $data = GasinoSlots::where([['status','=','active'],['type','=',$type]])->get(['name','uuid','image','provider']);

        }


        return response()->json([
            "status" => 200,
            "count" => count($data),
            "data" => $data
        ], 200);


    }




    public function getSlotsGamesList($categorie = "",Request $request){

            if($categorie){


                $data = GasinoSlots::where([['category','=',$categorie]])->get();

                $games_list = array();

                $game_array = [];

                $count = 0;
                foreach($data as $game){
                    
                    $game_array['id']   = $game->id;
                    $game_array['name'] = $game->name;

                    array_push($games_list,$game_array);

                    $count++;
                }

                return response()->json([
                    "status" => 200,
                    "category" => $categorie,
                    "count"   => $count,
                    "games" => $games_list
                ], 200);


            }else{

                $data = GasinoSlots::get();

                $games_list = array();

                $game_array = [];

                $count = 0 ;
                foreach($data as $game){
                    
                    $game_array['id']   = $game->id;
                    $game_array['name'] = $game->name;

                    array_push($games_list,$game_array);

                    $count++;
                }

                return response()->json([
                    "status" => 200,
                    "category" => "all",
                    "count"   => $count,
                    "games" => $games_list
                ], 200);



            }


    }

    public function GetGameName($type,$uuid){

        if($type === "gapi"){

            $game = GasinoSlots::where([['game_id','=',$uuid]])->first();

        }else{

            $game = GasinoSlots::where([['uuid','=',$uuid]])->first();
        }

        return $game ? $game->name : $uuid;
    }

    public function GetGameNameLive($gamefull){

        $json = Storage::disk('public')->get("Livegames.json");

        $json_decode = json_decode($json,true);

        $game_name = "";

        $gamefull_array = explode(":",$gamefull);

        foreach ($json_decode as $key => $game) {
                
            if($game['System'] === $gamefull_array[0]){

                if( preg_match('/'.$gamefull_array[1].'/i',$game['PageCode']) ) {

                    $game_name = $game['name'];

                }
            }
        }


        return $game_name;

    }


    public function decorateHistoryItem($type,$item){

        if($type === "gapi"){

            $item_new['id']       = $item->id;
            $item_new['tp']       = $type;
            $item_new['bet']      = number_format($item->bet,2, '.', ' ');
            $item_new['gain']     = number_format($item->gain,2, '.', ' ');
            $item_new['res']      = $item->res;
            $item_new['game']     = $this->GetGameName($type, $item->game_id);
            $item_new['trade']    = str_replace("bet#",'# ',$item->trade);
            $item_new['date']     = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('d.m.y');
            $item_new['time']     = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('H:i:s');

        }else{

            $item_new['id']       = $item->id;
            $item_new['tp']       = $type;
            $item_new['amount']   = number_format($item->amount,2, '.', ' ');
            $item_new['res']      = $item->type;
            $item_new['game']     = $this->GetGameName($type, $item->game_uuid);
            $item_new['trade']    = '# '.$item->created_at->timestamp;
            $item_new['date']     = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('d.m.y');
            $item_new['time']     = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('H:i:s');

        }


        return $item_new;

    }



    public function historySlots(Request $request){

        $validator = Validator($request->only("game", "date"), [
            "game" => "required",
            "date" => "required|in:1,3,7",
        ]);

        if( $validator->fails() ){

                return response()->json([
                    "status" => 200,
                    "error" => $validator->errors()->first()
                ], 200);
        }


        try {

          $user = JWTAuth::parseToken()->authenticate();

          if($request->date === "1"){

            if($request->game != "all") {


                $dataGator  = Gratortransaction::where([['user','=',$user->username],['game_uuid','=',$request->game],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->get();

            }else{


                $dataGator  = Gratortransaction::where([['user','=',$user->username],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->get();


            }

          }elseif ($request->date === "3") {

            $days_ago  = date("Y-m-d", strtotime("-4 day"));
            $date_today = date("Y-m-d");

            if($request->game != "all") {


                $dataGator = Gratortransaction::whereBetween(Gratortransaction::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['user','=',$user->username],['game_uuid','=',$request->game]])->orderBy('created_at', 'desc')->get();

            }else{


                $dataGator = Gratortransaction::whereBetween(Gratortransaction::raw('DATE(created_at)'), array($days_ago, $date_today))->where('user','=',$user->username)->orderBy('created_at', 'desc')->get();


            }

          }elseif($request->date === "7"){

            $days_ago  = date("Y-m-d", strtotime("-7 day"));
            $date_today = date("Y-m-d");

            if($request->game != "all") {

                $dataGator = Gratortransaction::whereBetween(Gratortransaction::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['user','=',$user->username],['game_uuid','=',$request->game]])->orderBy('created_at', 'desc')->get();

            }else{


                $dataGator = Gratortransaction::whereBetween(Gratortransaction::raw('DATE(created_at)'), array($days_ago, $date_today))->where('user','=',$user->username)->orderBy('created_at', 'desc')->get();

            }

          }else{


                $dataGator  = Gratortransaction::where([['user','=',$user->username],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->get();


          }


        $collection = new Collection();
        $collection = $collection->merge($dataGator);
        $data       = $this->paginate($collection, 20);

          $items = [];

          foreach ($data->items() as $item) {

                $type      = "slotgrator"; //$item->trade ? "gapi" : "slotgrator"; 
                $item_new  = $this->decorateHistoryItem($type, $item);

                array_push($items, $item_new);
          }

                return response()->json([
                    "status" => 200,
                    "data"   => $items,
                    "count"  => $data->total(),
                    "pages"  => $data->lastPage()
                ], 200);


        } catch (JWTException $e) {

                return response()->json([
                    "status" => 200,
                    "error" => 'ERROR Auth:'.$e
                ], 200);
        }

    }



    public function historyLiveCasino(Request $request){

        $validator = Validator($request->only("game", "date"), [
            "game" => "required",
            "date" => "required|in:1,3,7",
        ]);

        if( $validator->fails() ){

                return response()->json([
                    "status" => 200,
                    "error" => $validator->errors()->first()
                ], 200);
        }


        try {

          $user = JWTAuth::parseToken()->authenticate();

          if($request->date === "1"){

            if($request->game != "all") {

                $data  = UsersBets::where([['user_id','=',$user->id],['game_id','=',$request->game],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data  = UsersBets::where([['user_id','=',$user->id],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->paginate(20);
            }

          }elseif ($request->date === "3") {

            $days_ago  = date("Y-m-d", strtotime("-4 day"));
            $date_today = date("Y-m-d");

            if($request->game != "all") {

                $data = UsersBets::whereBetween(UsersBets::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['user_id','=',$user->id],['game_id','=',$request->game]])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data = UsersBets::whereBetween(UsersBets::raw('DATE(created_at)'), array($days_ago, $date_today))->where('user_id','=',$user->id)->orderBy('created_at', 'desc')->paginate(20);
            }

          }elseif($request->date === "7"){

            $days_ago  = date("Y-m-d", strtotime("-7 day"));
            $date_today = date("Y-m-d");

            if($request->game != "all") {

                $data = UsersBets::whereBetween(UsersBets::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['user_id','=',$user->id],['game_id','=',$request->game]])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data = UsersBets::whereBetween(UsersBets::raw('DATE(created_at)'), array($days_ago, $date_today))->where('user_id','=',$user->id)->orderBy('created_at', 'desc')->paginate(20);
            }

          }else{

                $data  = UsersBets::where([['user_id','=',$user->id],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->paginate(20);

          }


          $items = [];

          foreach ($data->items() as $item) {

                    $item_new['id']       = $item->id;
                    $item_new['bet']      = number_format($item->bet,2, '.', ' ');
                    $item_new['gain']     = number_format($item->gain,2, '.', ' ');
                    $item_new['res']      = $item->res;
                    $item_new['game']     = $this->GetGameName($item->game_id);
                    $item_new['trade']    = str_replace("bet#",'# ',$item->trade);
                    $item_new['date']     = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('d.m.y');
                    $item_new['time']     = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('H:i:s');

                    array_push($items, $item_new);
          }

                return response()->json([
                    "status" => 200,
                    "data"   => $items,
                    "count"  => $data->total(),
                    "pages"  => $data->lastPage()
                ], 200);


        } catch (JWTException $e) {

                return response()->json([
                    "status" => 200,
                    "error" => 'ERROR Auth:'.$e
                ], 200);
        }

    }


    public function gateGames(Request $request){


        //Init Config CLass   
        $initConfig = new ConfigCasino();

        //Init Config LIVE CASINO
        $casinoConfig  = $initConfig->slotegratorConfig();

        //Init PARAMS 
        $BASE_URL        = $casinoConfig['BASEURL'];
        $merchantID      = $casinoConfig['merchantId'];
        $merchantKEY     = $casinoConfig['merchantKey'];        

        $headers = [
            'X-Merchant-Id' => $merchantID,
            'X-Timestamp' => time(),
            'X-Nonce' => $initConfig->guidv4(),
        ];


        $params = [];


        $headers['X-Sign'] = $initConfig->getXSign($params, $headers, $merchantKEY);

        $uri      = $BASE_URL.'/games';
        $response = $initConfig->axios($uri, false, $headers)['data'];


                return response()->json([
                    "status" => 200,
                    "data" => $response
                ], 200);



    }

}
