<?php

namespace App\Http\Controllers\Super;

use JWTAuth;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller{

    public function isTakwira($whois){

       return (preg_match("/takwira/i", $whois)) ? true : false;

    }

    public function login(Request $request){

        $validator = Validator($request->only("username", "password"), [
            'username' => 'required|min:4|max:100',
            'password' => 'required|min:4|max:100',
        ]);

        if($validator->fails()){
                return response()->json([
                    "status" => false,
                    "errors" => $validator->errors()->first()
                ], 200);
        }



        $credentials = $request->only("username", "password");

        $token = null;

        try {


            if (! $token = JWTAuth::attempt($credentials) ) {

                    return response()->json([
                        "status" => false,
                        "message" => "username or password incorrect !"
                    ],200);

            }else{

                $superAdmin = JWTAuth::user();


                if($superAdmin->role != "super"){

                    return response()->json([
                        "status" => false,
                        "message" => "username or password incorrect #1!"
                    ],200);

                }else{


                    $origin = $request->headers->get('origin');


                    if( $this->isTakwira($origin) && !$this->isTakwira($superAdmin->whois) ){

                            return response()->json([
                                "status" => false,
                                "message" => "username or password incorrect #1!"
                            ],200);

                    }


                    $superObj = [];

                    $superObj['id']       = $superAdmin->id;
                    $superObj['username'] = $superAdmin->username;
                    $superObj['solde']    = $superAdmin->sold_sport;


                    return response()->json([
                        "status" => true,
                        "token" => $token,
                        "user" => $superObj
                    ]);
                }



            }

        } catch (JWTException $e) {
                    return response()->json([
                        'status' => false,
                        'message' => 'could not create token'
                    ], 500);
        }


    }




    public function logout(Request $request){

        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                "status" => true,
                "message" => "User logged out successfully"
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                "status" => false,
                "message" => "Ops, the user can not be logged out"
            ]);
        }
    }


}
