<?php

namespace App\Http\Controllers\Super;

use JWTAuth;
use App\User;
use App\Betslip;
use App\Transactions_History;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception; 
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;

class DataController extends Controller{

    public function getSuperinfo(Request $request){

        try {

            $superAdmin = JWTAuth::parseToken()->authenticate();

            $superObj = [];

            $superObj['id']       = $superAdmin->id;
            $superObj['username'] = $superAdmin->username;
            $superObj['solde']    = $superAdmin->sold_sport;

            return response()->json([
                "status" => true,
                "user" => $superObj
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }

    public function listAdmin(Request $request){

        try {

            $super = JWTAuth::parseToken()->authenticate();
            
            $query = User::where([['parent','=',$super->id],['role','=','admin']])->get();


            return response()->json([
                "status" => true,
                "admins" => $query
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function listBetslips(Request $request){

        try {

            $super = JWTAuth::parseToken()->authenticate();
            
            $allData = [];

            $Magic_XXL = DB::table('betslip')
                          ->join('users AS user', 'betslip.user_id', '=', 'user.id')
                          ->join('users AS shop', 'user.parent', '=', 'shop.id')
                          ->join('users AS agent', 'shop.parent', '=', 'agent.id')
                          ->join('users AS admin', 'agent.parent', '=', 'admin.id')
                          ->join('users AS supero', 'admin.parent', '=', 'supero.id')
                          ->select('user.username AS user', 'shop.username AS shop', 'agent.username AS agent','admin.username AS admin', 'supero.username AS supero', 'betslip.*')
                          ->where([['supero.username', '=', $super->username],['betslip.gainMax', '>=', 500],['betslip.manuel', '=', '_VERIFY'],['betslip.state', '=', 'win']])
                          ->get();

            $Magic_XL = DB::table('betslip')
                          ->join('users AS user', 'betslip.user_id', '=', 'user.id')
                          ->join('users AS shop', 'user.parent', '=', 'shop.id')
                          ->join('users AS agent', 'shop.parent', '=', 'agent.id')
                          ->join('users AS admin', 'agent.parent', '=', 'admin.id')
                          ->select('user.username AS user', 'shop.username AS shop', 'agent.username AS agent','admin.username AS admin', 'betslip.*')
                          ->where([['admin.username', '=', $super->username],['betslip.gainMax', '>=', 500],['betslip.manuel', '=', '_VERIFY'],['betslip.state', '=', 'win']])
                          ->get();


            $Magic_M = DB::table('betslip')
                          ->join('users AS user', 'betslip.user_id', '=', 'user.id')
                          ->join('users AS shop', 'user.parent', '=', 'shop.id')
                          ->join('users AS agent', 'shop.parent', '=', 'agent.id')
                          ->select('user.username AS user', 'shop.username AS shop', 'agent.username AS agent', 'betslip.*')
                          ->where([['agent.username', '=', $super->username],['betslip.gainMax', '>=', 500],['betslip.manuel', '=', '_VERIFY'],['betslip.state', '=', 'win']])
                          ->get();


            $Magic_S = DB::table('betslip')
                          ->join('users AS user', 'betslip.user_id', '=', 'user.id')
                          ->join('users AS shop', 'user.parent', '=', 'shop.id')
                          ->select('user.username AS user', 'shop.username AS shop',  'betslip.*')
                          ->where([['shop.username', '=', $super->username],['betslip.gainMax', '>=', 500],['betslip.manuel', '=', '_VERIFY'],['betslip.state', '=', 'win']])
                          ->get();

            if(count($Magic_XXL)){

                array_push($allData,$Magic_XXL);
            }

            if(count($Magic_XL)){

                array_push($allData,$Magic_XL);
            }

            if(count($Magic_M)){

                array_push($allData,$Magic_M);
            }

            if(count($Magic_S)){

                array_push($allData,$Magic_S);
            }

            //$newArray = (object) array_merge( (array) $Magic_XXL, (array) $Magic_XL, (array) $Magic_M, (array) $Magic_S);

            return response()->json([
                "status" => true,
                "data" => $allData
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }



    public function getAdmin(Request $request, $adminID){

        try {


            $super = JWTAuth::parseToken()->authenticate();
            
            $query = User::where([['parent','=',$super->id],['id','=',$adminID]])->first();



            if(!empty($query)){

                    $superObj = [];

                    $superObj['id']       = $query->id;
                    $superObj['username'] = $query->username;
                    $superObj['solde']    = $query->sold_sport;

                    $queryHistory = Transactions_History::where([['parent','=',$super->id],['account','=',$query->username]])->orderBy('created_at', 'desc')->get();

            }else{

                    $queryHistory = null;
                    $superObj = null;
            }




            $final = [];

            $final['admin'] = $superObj;
            $final['history'] = $queryHistory;

            return response()->json([
                "status" => true,
                "data" => $final
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


    public function soldeManage(Request $request){


        $validator = Validator($request->only("action", "amount", "userid"), [
            'action' => 'required|in:deposit,retrait',
            'amount' => 'required|numeric',
            'userid' => 'required|exists:users,id',
        ]);

        if($validator->fails()){
                return response()->json([
                    "status" => true,
                    "error" => $validator->errors()->first()
                ], 200);
        }

        try {

            $super = JWTAuth::parseToken()->authenticate();
            
            $adminID = $request->userid;
            $amount  = abs($request->amount);
            $action  = $request->action;

            $admin = User::where([['parent','=',$super->id],['id','=',$adminID]])->first();

            if(!empty($admin)){

            if($action === "deposit"){

                if($super->sold_sport < $amount){
                        return response()->json([
                            "status" => true,
                            "error" => "your solde is low, recharge !"
                        ],200);
                }


                //UPDATE SENDER FUNDS
                $super->sold_sport = ( $super->sold_sport - $amount );
                $super->update();


                //UPDATE RECEIVER FUNDS
                $admin->sold_sport = ( $admin->sold_sport + $amount );
                $admin->update();

                //INSERT TRANSACTION HISTORY 
                $transaction = new Transactions_History();
                $transaction->parent  = $super->id;
                $transaction->account = $admin->username;
                $transaction->sign = '+';
                $transaction->amount = $amount;
                $transaction->parent_balance = $admin->sold_sport;
                $transaction->save();

                return response()->json([
                    "status" => true,
                    "message" => "solde updated successfully"
                ],200);


            }elseif($action === "retrait"){

                if($admin->sold_sport < $amount){

                        return response()->json([
                            "status" => true,
                            "error" => "balance is low for retrait !"
                        ],200);
                }


                //UPDATE SENDER FUNDS
                $super->sold_sport = ( $super->sold_sport + $amount );
                $super->update();
                //UPDATE RECEIVER FUNDS
                $admin->sold_sport = ( $admin->sold_sport - $amount );
                $admin->update();

                //INSERT TRANSACTION HISTORY 
                $transaction = new Transactions_History();
                $transaction->parent  = $super->id;
                $transaction->account = $admin->username;
                $transaction->sign = '-';
                $transaction->amount = $amount;
                $transaction->parent_balance = $admin->sold_sport;
                $transaction->save();

                return response()->json([
                    "status" => true,
                    "message" => "solde updated successfully"
                ],200);

            }


            }else{

                        return response()->json([
                            "status" => false,
                            "message" => "something wen't wrong !"
                        ],200);


            }

        } catch (JWTException $e) {

                    return $e;
        }


    }





    public function userCreate(Request $request){


        $validator = Validator($request->only("username", "password"), [
            'username' => 'required|alpha_dash|unique:users',
            'password' => 'required|string|min:5|max:30',
        ]);

        if($validator->fails()){
                return response()->json([
                    "status" => true,
                    "error" => $validator->errors()->first()
                ], 200);
        }

        try {

            $super = JWTAuth::parseToken()->authenticate();
            
            $origin = $request->headers->get('origin');

            $user = new User();
            $user->name = $request->username;
            $user->username = $request->username;
            $user->password = bcrypt($request->password);
            $user->parent = $super->id;
            $user->whois  = $super->whois;
            $user->sold_sport = 0;
            $user->sold_casino = 0;
            $user->sold_livecasino = 0;
            $user->role = "admin";
            $user->status = "active";
            $user->save();


            return response()->json([
                "status" => true,
                "message" => "admin added successfully"
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }



    public function depositBetslip(Request $request){


        $validator = Validator($request->only("coupon_code"), [
            'coupon_code' => 'required|exists:betslip',
        ]);

        if($validator->fails()){
                return response()->json([
                    "status" => true,
                    "error" => $validator->errors()->first()
                ], 200);
        }

        try {

            $super = JWTAuth::parseToken()->authenticate();
            
            $betslip = Betslip::where([['coupon_code','=',$request->coupon_code],['manuel','=','_VERIFY'],['gainMax','>=',500]])->first();


            if(empty($betslip)){

                return response()->json([
                    "status" => true,
                    "message" => "",
                    "error" => true
                ],200);

            }

            $user = User::where('id','=',$betslip->user_id)->first();
            $user->sold_sport = ($user->sold_sport + $betslip->gainMax);
            $user->update();

            $betslip->manuel = "DONE";
            $betslip->update();

            return response()->json([
                "status" => true,
                "message" => "success"
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }




    public function getChilds(Request $request, $adminID, $childID=false){

        try {


            $super = JWTAuth::parseToken()->authenticate();
            
            if(empty($childID)){

                $check = User::where([['parent','=',$super->id],['id','=',$adminID]])->first();

            }else{

                $check = User::where([['parent','=',$adminID],['id','=',$childID]])->first();

            }

            //return $check;
            $superObj = [];


            
            if(!empty($check)){


                $childs = User::where([['parent','=',$check->id]])->get();

                $superObj['username']     = $check->username;
                $superObj['role']         = $check->role;
                $superObj['parent']       = $check->parent;
                $superObj['count']        = count($childs);
                $superObj['childs']       = $childs;

            }


            return response()->json([
                "status" => true,
                "data" => $superObj
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


    }


}