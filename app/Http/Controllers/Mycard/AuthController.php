<?php

namespace App\Http\Controllers\Mycard;

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

    public function isWinMycard($whois){

       return (preg_match("/win/i", $whois)) ? true : false;

    }


    public  $whitelisted_roles = ["admin", "agent", "shop"];

    public function login(Request $request){

        $validator = Validator($request->only("username", "password"), [
            'username' => 'required|min:4|max:100',
            'password' => 'required|min:4|max:100',
        ]);

        if($validator->fails()){
                return response()->json([
                    "status" => false,
                    "type" => "error",
                    "mode" => "info",
                    "message" => $validator->errors()->first()
                ], 200);
        }



        $credentials = $request->only("username", "password");

        $token = null;

        try {


            JWTAuth::factory()->setTTL(7200);

            if (! $token = JWTAuth::attempt($credentials) ) {

                    return response()->json([
                        "status" => false,
                        "type" => "error",
                        "mode" => "info",
                        "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                    ],200);

            }else{

                $admin = JWTAuth::user();

                if( !in_array($admin->role, $this->whitelisted_roles) ){

                    return response()->json([
                        "status" => false,
                        "type" => "error",
                        "mode" => "info",
                        "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                    ],200);

                }


                if($admin->status === "blocked"){

                    return response()->json([
                        "status" => false,
                        "type" => "error",
                        "mode" => "info",
                        "message" => "Votre compte est temporairement bloqué"
                    ],200);


                }


                $whoisApp = $request->headers->get('whoisapp');


                if( $whoisApp === "mycard.win" && !$this->isWinMycard($admin->whois) ){

                        return response()->json([
                            "status" => false,
                            "type" => "error",
                            "mode" => "info",
                            "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                        ],200);

                }


                $admin_info = [];

                $admin_info['id']       = $admin->id;
                $admin_info['username'] = $admin->username;
                $admin_info['solde']    = $admin->sold_sport;
                $admin_info['role']     = $admin->role;

                return response()->json([
                    "status" => true,
                    "type" => "ok",
                    "token" => $token,
                    "user" => $admin_info
                ]);



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
