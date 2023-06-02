<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\UserBetsLive;
use App\UsersBets;
use App\Jackpots;
use App\Classes\ConfigCasino;
use App\Classes\ApiClient;
use App\Classes\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Exception; 
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class OnewalletController extends Controller{


public function formatSolde($sold){

	return number_format($sold, 2, '.', '');
}


public function convertBalance($sold){

	return (int)floor($sold * 100 + 0.00001);
}

public function getPercentOfNumber($number, $percent){

        return ($percent / 100) * $number;
}
public function isTakwira($whois){

   return (preg_match("/takwira/i", $whois)) ? true : false;

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


public function Get_Hmac($array,$keysecret){

	unset($array['hmac']);
	ksort($array);

	/* extra arrays verify */
	if (array_key_exists('actions', $array)) {
		 $actions = $array['actions'];
		 $action_value = array();
		 foreach($actions as &$a) {
			 ksort($a);
			 $action_value[] = implode('', array_values($a));
		 }
	 unset($a);
	 $array['actions'] = implode('', $action_value);
	}
	/* extra arrays verify */


	// Generate hmac 
	$hmac_key = hash("sha256", $keysecret, true);
	$hmac_base = implode('', array_values($array));
	$hmac_needed = hash_hmac('sha256', $hmac_base, $hmac_key);


	$hmac_array = array('hmac' => $hmac_needed);

	$returned = $array+$hmac_array;

	return $returned;

}    

	public function wallet(Request $request){


		if(count($request->all()) < 1){

                return response()->json([
                    "status" => "fail",
                    "error" => "101"
                ], 200);
		}


        $validator = Validator($request->only("cmd"), [
            'cmd' => 'required',
        ]);


        if($validator->fails()){
                return response()->json([
                    "status" => "fail",
                    "error" => "cmd_not_found"
                ], 200);
        }


        $operationId = '100';

        $cmd  = $request->cmd;

    	switch ($cmd) {

    		case 'getBalance':

				$user_hash   = $request->login;
		        $user_key    = $request->key;

    			try {

	            	$user = User::where([['callback_hash','=',$user_hash],['callback_key','=',$user_key]])->first();

	            	if(!empty($user)){

		                return response()->json([
		                    "status" => "success",
		                    "error" => "",
		                    "login" => $user->callback_hash,
		                    "balance" => floatval($user->sold_sport)
		                ], 200);

		            }else{

		                return response()->json([
		                    "status" => "fail",
		                    "error" => "user_not_found1"
		                ], 200);


		            }

		        } catch(Exception $e) {

		                return response()->json([
		                    "status" => "fail",
		                    "error" => "user_not_found2"
		                ], 200);
				}


    		break;
    		case 'writeBet':


				$user_hash   = $request->login;
		        $user_key    = $request->key;

	            $user = User::where([['callback_hash','=',$user_hash],['callback_key','=',$user_key]])->first();

	            if(empty($user)){

		                return response()->json([
		                    "status" => "fail",
		                    "error" => "user_not_found"
		                ], 200);

	            }

	            $user_solde = floatval($user->sold_sport);

		        $winLose = $request->winLose;
		        $bet     = $request->bet;
		        $game_id = $request->gameId;

		        $gain    = $winLose + $bet;

		        if ($user_solde < $bet) {

	                return response()->json([
	                    "status" => "fail",
	                    "error" => "fail_balance"
	                ], 200);

		        }

		        try{

			        //$winLose = (int)floor($winLose * 100 + 0.00001);

			        $user_new_sold  = ( $user->sold_sport + ($winLose) );
			        $user->sold_sport = $user_new_sold;
			        $user->save();


		            $shop_id = $request->hall;
		            $trade   = $request->betInfo.'#'.$request->tradeId;

		            $res = ( $gain > 0 ) ? "won" : "lost";

			        $usersBets = new UsersBets();
			        $usersBets->bet = $bet;
			        $usersBets->gain = $gain;
			        $usersBets->shop_id = $shop_id;
			        $usersBets->trade = $trade;
			        $usersBets->res = $res;
			        $usersBets->game_id = $game_id;
			        $usersBets->user_id = $user->id;
			        $usersBets->save();


		            if($this->isTakwira($user->whois)){
		                $this->updateJackpot($bet);
		            }
	            	//$user = User::where([['id','=',$user_id],['callback_key','=',$user_key]])->first();

	                return response()->json([
		                "status" => "success",
		                "error" => '',
		                "login" => $user_hash,
		                "balance" => floatval($user->sold_sport),
		                "operationId" => $operationId
	                ], 200);



 				}catch(Exception $e) {

		                return response()->json([
		                    "status" => "fail",
		                    "error" => "fail_balance ".$e
		                ], 200);
				}

    			
    		break;  

    	}




	

	}


public function provider(Request $request){


	return response()->json([
	    "status" => "true",
	    "message" => "this is a callback test wallet"
	], 200);


}


public function onewallet(Request $request){

	$key = "q2m0q60r9isj4v907uvj95f0fly72uih3xgfhlnjbmfms9xjes11wxfqqs6pvb33";

    $validator = Validator($request->only("type","hmac"), [
		"type" => "required",
		"hmac" => "required",
    ]);


    if( $validator->fails() ){

    		$response = array('error' => 'Transaction parameter mismatch');
    		$response = $this->Get_Hmac($response,$key);
            return response()->json($response, 200);
    }


    $type = $request->type;

    if($type === 'ping'){


		$response = array('status' => 'OK');
		$response = $this->Get_Hmac($response,$key);
        return response()->json($response, 200);

    }elseif($type === 'balance'){


        $error_msgs = array(
            'required' => 'Transaction parameter mismatch',
            'exists' => "Invalid userid",
            'in' => "Invalid currency",
            'numeric' => ":attribute must be digits only"
        );

        //Transaction parameter mismatch
	    $validator = Validator($request->only("userid","currency","i_gamedesc"), [
			"userid" => "required|exists:users,username",
			"currency" => "required|in:TND",
			"i_gamedesc"  => "required",
	    ],$error_msgs);


	    if( $validator->fails() ){

	    		$response = array('error' => $validator->errors()->first());
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);
	    }


    	$req_hmac = $request->hmac;

    	$req_user = $request->userid;
    	$req_cur  = $request->currency;
    	$req_game = $request->i_gamedesc;

        $req_extparam = $request->i_extparam;

    	$user = User::where([['username','=',$req_user]])->first();

    	if($req_extparam === "SlotsIW"){

    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

    	}else{

    			$user_balance = $this->formatSolde($user->sold_livecasino);
    	}


		$response = array('status' => 'OK', 'balance' => $user_balance);
		$response = $this->Get_Hmac($response,$key);
        return response()->json($response, 200);

    }elseif($type === 'debit'){

        $error_msgs = array(
            'required' => 'Transaction parameter mismatch',
            'exists' => "Invalid userid",
            'in' => "Invalid currency",
            'numeric' => ":attribute must be digits only",
            'gt' => "Invalid parameters"
        );

        //Transaction parameter mismatch
	    $validator = Validator($request->only("tid","userid","currency","amount"), [
			"tid"  => "required",
			"userid" => "required|exists:users,username",
			"currency" => "required|in:TND",
			"amount"  => "required|numeric|gt:0",
	    ],$error_msgs);


	    if( $validator->fails() ){

	    		$response = array('error' => $validator->errors()->first());
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);
	    }


	    /** REQUEST DATA ***/

    	//HASHES
    	$req_hmac = $request->hmac;
    	$req_tid  = $request->tid;

    	//User
    	$req_user = $request->userid;
    	$req_cur  = $request->currency;

    	//GAME INFO
    	$req_game        = $request->i_gamedesc;
    	$req_gameidround = $request->i_gameid;
    	$req_actionID    = $request->i_actionid;
    	$req_amount      = $request->amount;


        $req_extparam = $request->i_extparam;

        /*if($req_amount > 500){

	    		$response = array('error' => "Transaction parameter mismatch");
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);
        }*/
        
    	/** REQUEST DATA ***/

    	$user = User::where([['username','=',$req_user]])->first();


    	if(empty($user)){

	    		$response = array('error' => 'Invalid userid');
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);

    	}else{


    		$First_CHK = UserBetsLive::where([['tid','=',$req_tid],['actionid','=',$req_actionID],['amount','=',$req_amount]])->exists();

    		if($First_CHK){

			    	if($req_extparam === "SlotsIW"){

			    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

			    	}else{

			    			$user_balance = $this->formatSolde($user->sold_livecasino);
			    	}

					$response = array('status' => 'OK', 'tid' => $req_tid, 'balance' => $user_balance);
					$response = $this->Get_Hmac($response,$key);
			        return response()->json($response, 200);


    		}


	    	$Second_CHK = UserBetsLive::where([['tid','=',$req_tid],['user','=',$req_user]])->exists();


			if($Second_CHK){

			 		$response = array('error' => 'Transaction Failedxx');
		    		$response = $this->Get_Hmac($response,$key);
		            return response()->json($response, 200);

			}



			    	if($req_extparam === "SlotsIW"){

			    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

			    	}else{

			    			$user_balance = $this->formatSolde($user->sold_livecasino);
			    	}


	    			if( $user_balance >= $req_amount){

				    	if($req_extparam === "SlotsIW"){

				    			$user->sold_casino = (int)floor( ($user_balance - $req_amount) * 100 + 0.00001);

				    	}else{

				    			$user->sold_livecasino = $user_balance - $req_amount;
				    	}

		    			$user->save();


		    			$tokyo = new UserBetsLive();
		    			$tokyo->type = $type;
		    			$tokyo->user = $req_user;
		    			$tokyo->amount = $req_amount;
		    			$tokyo->tid  = $req_tid;
		    			$tokyo->gameid = $req_gameidround;
		    			$tokyo->game   = $req_game;
		    			$tokyo->actionid = $req_actionID;

		    			$tokyo->save();


				    	if($req_extparam === "SlotsIW"){

				    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

				    	}else{

				    			$user_balance = $this->formatSolde($user->sold_livecasino);
				    	}

						$response = array('status' => 'OK', 'tid' => $req_tid, 'balance' => $user_balance);
						$response = $this->Get_Hmac($response,$key);
				        return response()->json($response, 200);

			    	}else{


			    		$response = array('error' => 'INSUFFICIENT_FUNDS');
			    		$response = $this->Get_Hmac($response,$key);
			            return response()->json($response, 200);

			    	}



    	}



	}elseif($type === "credit"){


        $error_msgs = array(
            'required' => 'Transaction parameter mismatch',
            'exists' => "Invalid userid",
            'in' => "Invalid currency",
            'numeric' => ":attribute must be digits only",
            'gt' => "Invalid parameters"
        );

        //Transaction parameter mismatch
	    $validator = Validator($request->only("tid","userid","currency","amount"), [
			"tid"  => "required",
			"userid" => "required|exists:users,username",
			"currency" => "required|in:TND",
			"amount"  => "required|numeric|gt:0",
	    ],$error_msgs);


	    if( $validator->fails() ){

	    		$response = array('error' => $validator->errors()->first());
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);
	    }


	    /** REQUEST DATA ***/

    	//HASHES
    	$req_hmac = $request->hmac;
    	$req_tid  = $request->tid;

    	//User
    	$req_user = $request->userid;
    	$req_cur  = $request->currency;

    	//GAME INFO
    	$req_game        = $request->i_gamedesc;
    	$req_gameidround = $request->i_gameid;
    	$req_actionID    = $request->i_actionid;
    	$req_amount      = $request->amount;


        $req_extparam = $request->i_extparam;


        /*if($req_amount > 2000){

	    		$response = array('error' => "Transaction parameter mismatch");
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);
        }*/


    	/** REQUEST DATA ***/

    	$user = User::where([['username','=',$req_user]])->first();


    	if(empty($user)){

	    		$response = array('error' => 'Invalid userid');
	    		$response = $this->Get_Hmac($response,$key);
	            return response()->json($response, 200);

    	}else{


    		$First_CHK = UserBetsLive::where([['tid','=',$req_tid],['actionid','=',$req_actionID],['amount','=',$req_amount]])->exists();

    		if($First_CHK){

			    	if($req_extparam === "SlotsIW"){

			    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

			    	}else{

			    			$user_balance = $this->formatSolde($user->sold_livecasino);
			    	}

					$response = array('status' => 'OK', 'tid' => $req_tid, 'balance' => $user_balance);
					$response = $this->Get_Hmac($response,$key);
			        return response()->json($response, 200);


    		}


	    	$Second_CHK = UserBetsLive::where([['tid','=',$req_tid],['user','=',$req_user]])->exists();


			if($Second_CHK){

			 		$response = array('error' => 'Transaction Failedxx');
		    		$response = $this->Get_Hmac($response,$key);
		            return response()->json($response, 200);

			}





			    	if($req_extparam === "SlotsIW"){

			    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

			    	}else{

			    			$user_balance = $this->formatSolde($user->sold_livecasino);
			    	}



				    	if($req_extparam === "SlotsIW"){
				    			
				    			$user->sold_casino = (int)floor( ($user_balance + $req_amount) * 100 + 0.00001);

				    	}else{

				    			$user->sold_livecasino = $user_balance + $req_amount;
				    	}

		    			$user->save();


		    			$tokyo = new UserBetsLive();
		    			$tokyo->type = $type;
		    			$tokyo->user = $req_user;
		    			$tokyo->amount = $req_amount;
		    			$tokyo->tid  = $req_tid;
		    			$tokyo->gameid = $req_gameidround;
		    			$tokyo->game   = $req_game;
		    			$tokyo->actionid = $req_actionID;

		    			$tokyo->save();


				    	if($req_extparam === "SlotsIW"){

				    			$user_balance = $this->formatSolde(floatval($user->sold_casino) / 100.00);

				    	}else{

				    			$user_balance = $this->formatSolde($user->sold_livecasino);
				    	}

						$response = array('status' => 'OK', 'tid' => $req_tid, 'balance' => $user_balance);
						$response = $this->Get_Hmac($response,$key);
				        return response()->json($response, 200);




    	}


	}



}






}
