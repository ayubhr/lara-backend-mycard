<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\Classes\ExecludeTree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller{

    public function formatSolde($sold){

        return number_format($sold, 2, '.', '');
    }


    public function isTakwira($whois){

       return (preg_match("/takwira/i", $whois)) ? true : false;

    }


    public function isAuthIdentical($search, $str){

        return (preg_match("/".$search."/i", $str)) ? true : false;

    }

    public function authBelongsTo($logged_whois){


        // FORZZA.WIN || FORRZA1.COM
        if( $this->isAuthIdentical("mycard77.win", $logged_whois) ){

            return "forzza.win|forrza1.com|forzza.vip";

        // FORZZA.TOP
        }elseif( $this->isAuthIdentical("mycard.forzza.top", $logged_whois) ){

            return "forzza.top";


        // FORZZA.SHOP || FORZZAXBET.COM (BASSEM)
        }elseif( $this->isAuthIdentical("mycard77.shop", $logged_whois) ){

            return "forzza.shop|forzzaxbet|forzza.it";

        //FORZZA.VIP (CHARFE)
        }elseif( $this->isAuthIdentical("mycard77.vip", $logged_whois) ){

            return "forzza.vip|forzza.win";

        //FORZZA.LIVE (SAHEB CHARFE)
        }elseif( $this->isAuthIdentical("mycard77.live", $logged_whois) ){

            return "forzza.live";

        // FORZZA.WIN || FORRZA1.COM
        }elseif( $this->isAuthIdentical("mycard77.forrza1", $logged_whois) ){

            return "forzza.win|forrza1.com";

        // FORZZA.SHOP || FORZZAXBET.COM (BASSEM)
        }elseif( $this->isAuthIdentical("mycard.forzzaxbet", $logged_whois) ){

            return "forzzaxbet.com|forzza.shop|forzza.it";


        // LIVER1X2.COM (KHOUBAYEB)
        }elseif( $this->isAuthIdentical("admin.liver1x2", $logged_whois) ){

            return "liver1x2.com";

        //TAKWIRA.COM
        }elseif( $this->isAuthIdentical("mycard.takwira.com", $logged_whois) ){

            return "takwira.com";

        }elseif( $this->isAuthIdentical("mycard.takwira365.org", $logged_whois) ){

            return "takwira365.org";

        }elseif( $this->isAuthIdentical("mycard.takwira.org", $logged_whois) ){

            return "takwira.org";

        }elseif( $this->isAuthIdentical("mycard.takwira.it", $logged_whois) ){

            return "takwira.it";

        }elseif( $this->isAuthIdentical("mycard.forzza.it", $logged_whois) ){

            return "forzza.shop|forzzaxbet.com|forzza.it";

        }else{


            return "404";
        }   




    }


public function getPlayerTree($username){
    

    $treeArray = array();


    $first  = User::where('username','=',$username)->first();
    if(!$first){

        return $treeArray;

    }else{


            array_push($treeArray, ["username"=> $first->username,"role"=> $first->role]);

    
            $parent = User::where('id','=',$first->parent)->first();
            if(!$parent){

                    return $treeArray;
            }else{

                    array_push($treeArray, ["username"=> $parent->username,"role"=> $parent->role]);

                    $super = "";
                    $isHead = false;
                    while(!$isHead){

                        $parent = User::where('id','=',$parent->parent)->first();
                        if(!$parent){

                            return $treeArray;
                        }else{

                                array_push($treeArray, ["username"=> $parent->username,"role"=> $parent->role]);

                                if($parent->parent === 0){

                                    $super = $parent->username;
                                    $isHead = true;
                                    break;
                                }

                        }

                    }

            }

    }

   
    return $treeArray;

}

    public function getIp() {

        //return "102.156.216.242";

        if(filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {

          return $_SERVER['HTTP_CLIENT_IP'];

        }elseif (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {

          return $_SERVER['HTTP_X_FORWARDED_FOR'];

        }else{

          return $_SERVER['REMOTE_ADDR'];

        }

    }

    public function login(Request $request){

        $validator = Validator($request->only("username", "password", "remember_me"), [
            'username' => 'required|min:4|max:100',
            'password' => 'required|min:4|max:100',
            'remember_me' => 'boolean',
        ]);

        if($validator->fails()){
                return response()->json([
                    "status" => false,
                    "message" => $validator->errors()->first()
                ], 200);
        }



        $credentials = $request->only("username", "password");
        $token = null;

        try {


            if($request->remember_me){

                    JWTAuth::factory()->setTTL(7200);

            }else{

                    JWTAuth::factory()->setTTL(120);

            }


            if (! $token = JWTAuth::attempt($credentials)) {
                    return response()->json([
                        "status" => false,
                        "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                    ],200);
            }else{

                $client_info = JWTAuth::user();

                if($client_info->role != "player"){

                            return response()->json([
                                "status" => false,
                                "message" => "Forbidden Access : Only Players Can Access"
                            ],200);

                }elseif($client_info->status != "active"){

                            return response()->json([
                                "status" => false,
                                "message" => "Votre compte est temporairement bloqué"
                            ],200);




                }else{


                    $origin = $request->headers->get('origin');
                    $user_id = $client_info->id;
                    $userWhois = $client_info->whois;


                    $player_belongs_to = $this->authBelongsTo($userWhois);


                    if( $this->isAuthIdentical("localhost|127.0.0.1" ,$origin) === false ){

                            if( $this->isAuthIdentical($player_belongs_to, $origin) === false ){


                                    return response()->json([
                                        "status" => false,
                                        "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                                        //"err"     => "player belongs to ".$player_belongs_to." "
                                    ],200);


                            }

                    }
                    
                           
                    /*if( $this->isTakwira($origin) && !$this->isTakwira($client_info->whois) ){

                            return response()->json([
                                "status" => false,
                                "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                            ],200);

                    }*/
                    /*$goAway = new ExecludeTree();
                    $goAway_Tree  = $goAway->checkTree();

                    $blkDomains = ['https://forzza.win','https://www.forzza.win'];


                    if( (in_array($origin, $blkDomains)) && (  ) ){

                        return response()->json([
                            "status" => false,
                            "exclude" => true,
                            "message" => "Nom d'utilisateur erroné et/ou mot de passe erroné"
                        ],200);

                    }else{*/


                        $client_info->ip     = $this->getIp();
                        $client_info->online = 1;
                        $client_info->save();

                        $logged_player['name']  = $client_info->name;
                        $logged_player['username']  = $client_info->username;
                        $logged_player['sold_sport']  = $this->formatSolde($client_info->sold_sport);
                        $logged_player['sold_casino'] = $this->formatSolde(floatval($client_info->sold_casino) / 100.00);
                        $logged_player['sold_livecasino']  = $this->formatSolde($client_info->sold_livecasino);

                        $logged_player['tree']  = $this->getPlayerTree($client_info->username);

                        return response()->json([
                            "status" => true,
                            "token" => $token,
                            "user" => $logged_player
                        ]);


                    //}


                }

            }
        } catch (JWTException $e) {
                    return response()->json([
                        'status' => false,
                        'error' => 'could not create token'
                    ], 500);
        }


    }



    public function logout(Request $request){

        $this->validate($request, [
            "token" => "required"
        ]);

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
