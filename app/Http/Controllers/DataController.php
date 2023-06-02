<?php

namespace App\Http\Controllers;

use JWTAuth;
use Tymon\JWTAuth\Token;
use App\Classes\ConfigCasino;
use App\User;
use App\Betslip;
use App\ReservedBetslip;
use App\Transactions_History;
use App\SportsbookTransaction;
use Illuminate\Http\Request;
use Exception; 
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;



class DataController extends Controller{

    public $api_base_url =  "https://app.kong-gateway.com/ns"; 

    //"https://nestjs.mysuper77.com";

    public $organization_id = "23d040dc-bee0-4049-a4cb-7a90b488564a";

    public function formatSolde($sold){

        return number_format($sold, 2, '.', '');
    }


    public function isAuthIdentical($search, $str){

        $search = str_replace("https://","",$search);
        $search = str_replace("www.","",$search);

        return (preg_match("/".$search."/i", $str)) ? true : false;

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


    public function changeWhois(Request $request){
        

        $superID = $request->super_id;

        $super         = User::where('id','=',$superID)->first();

        if(empty($super)){

            return response()->json([
                "status" => false,
                "msg" => "super not found"
            ],200);


        }


        $super_childs  = User::where('parent','=',$super->id)->get();

        $count = 0;
        $users_updated_array = array();


        if($super_childs){


            $user_obj = [];
            foreach($super_childs as $child){

                $child_whois = $child->whois;
                if(!$this->isAuthIdentical($child_whois, $super->whois)){

                        $tt_up = User::where('id',$child->id)->update(['whois'=> $super->whois]);

                        if($tt_up){

                            $user_obj['username']  = $child->username;
                            $user_obj['old_whois'] = $child_whois;
                            $user_obj['new_whois'] = $super->whois;
                            $user_obj['role'] = $child->role;
                            array_push($users_updated_array,$user_obj);
                            $count++;
                        }

                }

                /*** CHILD CHILDS ***/
                $childs_childs = User::where('parent','=',$child->id)->get();

                if($childs_childs){

                    $user_obj_x = [];
                    foreach($childs_childs as $childth){

                        $childth_whois = $childth->whois;
                        if(!$this->isAuthIdentical($childth_whois, $super->whois)){

                                $tt_up_x = User::where('id',$childth->id)->update(['whois'=> $child->whois]);

                                if($tt_up_x){

                                    $user_obj_x['username']  = $childth->username;
                                    $user_obj_x['old_whois'] = $childth_whois;
                                    $user_obj_x['new_whois'] = $super->whois;
                                    $user_obj_x['role'] = $childth->role;
                                    array_push($users_updated_array,$user_obj_x);
                                    $count++;
                                }

                        }

                        /******* CHILDS CHILD CHILDS ********/
                        $childs_xxx = User::where('parent','=',$childth->id)->get();
                        if($childs_xxx){

                            $user_obj_xxx = [];
                            foreach($childs_xxx as $childxxx){

                                $childxxx_whois = $childxxx->whois;

                                if(!$this->isAuthIdentical($childxxx_whois, $super->whois)){

                                        $tt_up_xx = User::where('id',$childxxx->id)->update(['whois'=> $childth->whois]);

                                        if($tt_up_xx){

                                            $user_obj_xxx['username']  = $childxxx->username;
                                            $user_obj_xxx['old_whois'] = $childxxx_whois;
                                            $user_obj_xxx['new_whois'] = $super->whois;
                                            $user_obj_xxx['role'] = $childxxx->role;
                                            array_push($users_updated_array,$user_obj_xxx);
                                            $count++;
                                        }

                                }

                            }


                        }
                        /******* CHILDS CHILD CHILDS ********/



                    }

                }
                /*** CHILD CHILDS ***/

                

            }

        }



            return response()->json([
                "status" => false,
                "count" => $count,
                "updated" => $users_updated_array
            ],200);


    }


    public function getuserinfo(Request $request){

        try {

            $client_info = JWTAuth::parseToken()->authenticate();

            $logged_player['name']  = $client_info->name;
            $logged_player['username']  = $client_info->username;
            $logged_player['sold_sport']  = $this->formatSolde($client_info->sold_sport);
            $logged_player['sold_casino'] = $this->formatSolde(floatval($client_info->sold_casino) / 100.00);
            $logged_player['sold_livecasino']  = $this->formatSolde($client_info->sold_livecasino);
            $logged_player['tree']  = $this->getPlayerTree($client_info->username);



            return response()->json([
                "status" => true,
                "user" => $logged_player
            ],200);

        } catch (JWTException $e) {
                    return $e;
        }


    }


    public function changepassword(Request $request){


        $validator = Validator($request->only("old_password", "new_password"), [
            "old_password" => "required|string|min:3|max:50",
            "new_password" => "required|string|min:5|max:50|different:old_password",
        ]);


        if( $validator->fails() ){
                return response()->json([
                    "status" => false,
                    "error" => $validator->errors()->first(),
                    "type"  => "error"
                ], 200);
        }

        try {


            $user = JWTAuth::parseToken()->authenticate();


            if ( !Hash::check($request->old_password, $user->password)) {

                    return response()->json([
                        "status" => false,
                        "error" => "the old password didn't match our records",
                        "type"  => "error"
                    ], 200);
             }


            $user->password = bcrypt($request->new_password);
            $user->save();

            return response()->json([
                "status" => true,
                "message" => "password changed successfully",
                "type"  => "success",
                "error"  => ""
            ],200);

        } catch (JWTException $e) {
                    return $e;
        }


    }


    public function transferfunds(Request $request){

        $validator = Validator($request->only("amount", "transfer_origin", "transfer_destination"), [
            "amount" => "required|numeric|between:0.1,999999999999999",
            "transfer_origin" => "required|string|in:paris,casino,livecasino|different:transfer_destination",
            "transfer_destination" => "required|string|in:paris,casino,livecasino|different:transfer_origin",
        ]);

        if( $validator->fails() ){
                return response()->json([
                    "status" => false,
                    "error" => $validator->errors()->first(),
                    "type"  => "error"
                ], 200);
        }

        try {

            $user = JWTAuth::parseToken()->authenticate();


            $user_casino_formated     = $this->formatSolde(floatval($user->sold_casino) / 100.00);

            /** Sports ====> (Casino || LiveCasino )  ***/
            if($request->transfer_origin === "paris" && $request->transfer_destination === "casino"){   

                    if($user->sold_sport < abs($request->amount)){

                        return response()->json([
                            "status" => false,
                            "error" => "Le solde de votre compte de paris n'est pas suffisant pour acheter le montant demandé des jetons",
                             "type"  => "warning"
                        ],200);

                    }else{


                        $user->sold_sport  = ($user->sold_sport - abs($request->amount));
                        $user->sold_casino = (int)floor( ($user_casino_formated + abs($request->amount)) * 100 + 0.00001);
                        $user->save();

                        return response()->json([
                            "status" => true,
                            "message" => "Funds transférer avec succéss",
                            "type"  => "success",
                            "error"  => ""
                        ],200);

                    }


            }

            if($request->transfer_origin === "paris" && $request->transfer_destination === "livecasino"){   

                    if($user->sold_sport < abs($request->amount)){

                        return response()->json([
                            "status" => false,
                            "error" => "Le solde de votre compte de paris n'est pas suffisant pour acheter le montant demandé des jetons",
                             "type"  => "warning"
                        ],200);

                    }else{


                        $user->sold_sport      = ($user->sold_sport - abs($request->amount));
                        $user->sold_livecasino = ($user->sold_livecasino + abs($request->amount));
                        $user->save();

                        return response()->json([
                            "status" => true,
                            "message" => "Funds transférer avec succéss",
                            "type"  => "success",
                            "error"  => ""
                        ],200);

                    }


            }
            /** Sports ====> (Casino || LiveCasino )  ***/


            /** Casino ====> (Sport  || LiveCasino )  ***/
            if($request->transfer_origin === "casino" && $request->transfer_destination === "paris"){

                    if($user_casino_formated < abs($request->amount)){

                        return response()->json([
                            "status" => false,
                            "error" => "Your casino balance is insufficient to withdraw requested amount",
                            "type"  => "warning",
                            "message"  => ""
                        ],200);

                    }else{



                        $user->sold_casino = (int)floor( ($user_casino_formated - abs($request->amount)) * 100 + 0.00001);
                        $user->sold_sport  = ($user->sold_sport + abs($request->amount));
                        $user->save();
                        return response()->json([
                            "status" => true,
                            "message" => "Transfert de fonds terminé avec succès",
                            "type"  => "succèss",
                            "error"  => ""
                        ],200);                     

                    }
                    
            }

            if($request->transfer_origin === "casino" && $request->transfer_destination === "livecasino"){

                    if($user_casino_formated < abs($request->amount)){

                        return response()->json([
                            "status" => false,
                            "error" => "Your casino balance is insufficient to withdraw requested amount",
                            "type"  => "warning",
                            "message"  => ""
                        ],200);

                    }else{

                        $user->sold_casino = (int)floor( ($user_casino_formated - abs($request->amount)) * 100 + 0.00001);
                        $user->sold_livecasino  = ($user->sold_livecasino + abs($request->amount));
                        $user->save();
                        return response()->json([
                            "status" => true,
                            "message" => "Transfert de fonds terminé avec succès",
                            "type"  => "succèss",
                            "error"  => ""
                        ],200);                     

                    }
                    
            }
            /** Casino ====> (Sport  || LiveCasino )  ***/


            /** LiveCasino ====> (Sport  || Casino )  ***/
            if($request->transfer_origin === "livecasino" && $request->transfer_destination === "paris"){

                    if($user->sold_livecasino < abs($request->amount)){

                        return response()->json([
                            "status" => false,
                            "error" => "Your LiveCasino balance is insufficient to withdraw requested amount",
                            "type"  => "warning",
                            "message"  => ""
                        ],200);

                    }else{



                        $user->sold_livecasino = ($user->sold_livecasino - abs($request->amount));
                        $user->sold_sport      = ($user->sold_sport + abs($request->amount));
                        $user->save();
                        return response()->json([
                            "status" => true,
                            "message" => "Transfert de fonds terminé avec succès",
                            "type"  => "succèss",
                            "error"  => ""
                        ],200);                     

                    }
                    
            }

            if($request->transfer_origin === "livecasino" && $request->transfer_destination === "casino"){

                    if($user->sold_livecasino < abs($request->amount)){

                        return response()->json([
                            "status" => false,
                            "error" => "Your Livecasino balance is insufficient to withdraw requested amount",
                            "type"  => "warning",
                            "message"  => ""
                        ],200);

                    }else{


                        $user->sold_livecasino  = ($user->sold_livecasino - abs($request->amount));
                        $user->sold_casino = (int)floor( ($user_casino_formated + abs($request->amount)) * 100 + 0.00001);
                        $user->save();

                        return response()->json([
                            "status" => true,
                            "message" => "Transfert de fonds terminé avec succès",
                            "type"  => "succèss",
                            "error"  => ""
                        ],200);                     

                    }
                    
            }
            /** Casino ====> (Sport  || LiveCasino )  ***/


        } catch (JWTException $e) {
                    return $e;
        }


    }


    public function Generate_BetslipCode(){

        $randomNum = substr(str_shuffle("0123456789"), 0, 9);

        $verify_exist = Betslip::whereCoupon_code($randomNum)->exists();

        if($verify_exist === true){

            $this->Generate_BetslipCode();

        }else{

            return $randomNum;
        }

    }

    public function axiosOld($url ,$post=false){

        $curl = curl_init();
        $option = [
          CURLOPT_SSL_VERIFYPEER  => false,
          CURLOPT_RETURNTRANSFER  => true,
          CURLOPT_URL             => $url,
          CURLOPT_USERAGENT       => 'Mozilla/5.0 (Macintosh; Intel Mac OS X vip; rv:42.0) Gecko/06072000 Firefox/42.0',
          CURLOPT_COOKIEJAR       => 'cookie.txt',
          CURLOPT_COOKIEFILE      => 'cookie.txt'
        ];

        curl_setopt_array($curl, $option);
        if($post){
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
        }

        $data = curl_exec($curl);
        $type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        return array(
          'data'      => $data,
          'type'      => $type,
          'decode'    => json_decode($data, true),
          'httpcode'  => $httpcode
        );


    }


    public function axios($url ,$post=false, $isJson){

            $curl = curl_init();
            $option = [
              CURLOPT_SSL_VERIFYPEER  => false,
              CURLOPT_RETURNTRANSFER  => true,
              CURLOPT_URL             => $url,
              CURLOPT_USERAGENT       => 'Mozilla/5.0 (Macintosh; Intel Mac OS X vip; rv:42.0) Gecko/06072000 Firefox/42.0',
              CURLOPT_COOKIEJAR       => 'cookie.txt',
              CURLOPT_COOKIEFILE      => 'cookie.txt'
            ];

            curl_setopt_array($curl, $option);

            if($post){

                curl_setopt($curl, CURLOPT_POST, true);

                if($isJson){

                  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
                  $post = json_encode($post);

                }

                curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
            }

            $data = curl_exec($curl);
            $type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
            $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

            curl_close($curl);

            return array(
              'data'      => $data,
              'type'      => $type,
              'decode'    => json_decode($data, true),
              'httpcode'  => $httpcode
            );


    }

    public function getPercentOfNumber($number, $percent){

            return ($percent / 100) * $number;
    }

    public function getOddUpdateLive($array,$odd_id,$odd_name=false){

        $up_odds = [];
        foreach ($array[0]['StakeTypes'] as $obj) {

            if (isset($obj['Stakes'])) {

                foreach ($obj['Stakes'] as $stake) {

                    if( $stake["Id"] === $odd_id ){

                         $up_odds['marked_id']   = $stake["GId"];
                         $up_odds['market_name'] = $obj["N"];
                         $up_odds['odd_id']      = $stake["Id"];

                         if($odd_name){

                             $up_odds['odd_name']    = $stake["N"]; //$odd_name;

                         }else{

                             $up_odds['odd_name']    = $stake["N"];
                         }

                         $up_odds['odd_value']   = $stake["F"]; //number_format($stake["F"],2,".",".");


                    }
                }
            }
        }


        return $up_odds;
    }


    public function getOddUpdate($array,$odd_id,$odd_name=false){

        $up_odds = [];
        foreach ($array[0]['StakeTypes'] as $obj) {

            if (isset($obj['Stakes'])) {

                foreach ($obj['Stakes'] as $stake) {

                    if( $stake["Id"] === $odd_id ){

                         $up_odds['marked_id']   = $stake["GId"];
                         $up_odds['market_name'] = $obj["N"];
                         $up_odds['odd_id']      = $stake["Id"];


                         $up_odds['odd_name']    = ($stake["A"] != null) ? $stake["N"]." ".$stake["A"] : $stake["N"]; 


                         $up_odds['odd_value']   = $stake["F"]; //number_format($stake["F"],2,".",".");

                    }
                }
            }
        }


        return $up_odds;
    }

    //$prime = (($coef-($coef-getPercentOfNumber($coef,$evt_count)))*$stake);


    public function submit_betslip(Request $request){

        $validator = Validator($request->only("totalStake", "gain", "prime", "Maxgain", "bmq", "bcount", "events"), [
            "totalStake" => "required|numeric|between:0.5,10000",
            "gain" => "required|numeric",
            "prime" => "numeric",
            "Maxgain" => "numeric",
            "bmq" => "required|numeric",
            "bcount" => "required|numeric",
            "events" => "required",
        ]);

        if( $validator->fails() ){
                return response()->json([
                    "status" => false,
                    "error"  => $validator->errors()->first(),
                    "type"   => "error"
                ], 200);
        }

        /*try {

            $usero = JWTAuth::parseToken()->authenticate();

            $userID =  $usero->id;

            if($userID != 143){

                return response()->json([
                    "status" => false,
                    "error"  => "Betslip submit temporary disabled",
                    "type"   => "error"
                ], 200);


            }


        } catch (JWTException $e) {
                    return $e;
        }*/


        $coupon_code = $this->Generate_BetslipCode();

        $stake     = (float) $request->totalStake;
        $gain      = (float) $request->gain;
        $coef      = (float) $request->bmq;
        $evt_count = intval($request->bcount);
        $events_json = $request->events;

        $Events = array();

        $coteTotale = 1;
        $eventsCount = 0;


        $started_events_obj     = array();
        $started_events_objLive = array();

        $notLiveEvents = array();
        $LiveEvents = array();

        foreach ($events_json as $key => $event) {

           if($event['event_isLive'] === true){

                array_push($LiveEvents,$event);

           }else{

                array_push($notLiveEvents,$event);

           }

        }


        /*return response()->json([
            "status" => true,
            "live" => $LiveEvents,
            "notlive" => $notLiveEvents
        ],200);*/



        if(!empty($notLiveEvents)){ 

               foreach ($notLiveEvents as $key => $event) {

                   $evt['event_id']       = $event['event_id'];

                   $evt['isEventLive']    =  $event['event_isLive'];

                   if(isset($event['event_sport'])){

                    $evt['event_sport']    = $event['event_sport'];     

                   }else{

                    $evt['event_sport']    = null;     

                   }

                   $evt['event_away']     = $event['event_away'];
                   $evt['event_home']     = $event['event_home'];
                   $evt['event_state']     = "open";

                   $evt['event_period'] = "";

                   $eventsCount++;

                   $cached_event_obj = $this->axiosOld("https://sportv2.mycard77.shop/cache/api/new/init_EventOdds?event_id=".$event['event_id']."")['decode'];


                   if( !array_key_exists('error',$cached_event_obj) ){

                       $evt['date']  =  date('Y-m-d H:i:s', strtotime($cached_event_obj[0]['date']));
                       $evt['Fdate'] =  date('d.m. H:i', strtotime($cached_event_obj[0]['date']));


                       if ( time() > strtotime($evt['date']) ) {

                            $event_stated['event_id']   = $evt['event_id'];
                            $event_stated['event_home'] = $evt['event_home'];
                            $event_stated['event_away'] = $evt['event_away'];

                            array_push($started_events_obj,$event_stated);
                       }

                           if($cached_event_obj[0]['sport_name'] === "Football"){ 

                               $event_score = array();

                               $event_score['ht1_score'] = "";
                               $event_score['ht2_score'] = "";
                               $event_score['ft_score'] = "";

                           }elseif($cached_event_obj[0]['sport_name'] === "Basketball"){

                               $event_score = array();

                               $event_score['q1_score'] = "";
                               $event_score['q2_score'] = "";
                               $event_score['q3_score'] = "";
                               $event_score['q4_score'] = "";
                               $event_score['ft_score'] = "";

                           }elseif($cached_event_obj[0]['sport_name'] === "Tennis"){

                               $event_score = array();

                               $event_score['s1_score'] = "";
                               $event_score['s2_score'] = "";
                               $event_score['s3_score'] = ""; 
                               $event_score['ft_score'] = "";



                           }elseif($cached_event_obj[0]['sport_name'] === "Handball"){

                               $event_score = array();

                               $event_score['ht1_score'] = "";
                               $event_score['ht2_score'] = "";
                               $event_score['ft_score'] = "";


                           }elseif($cached_event_obj[0]['sport_name'] === "Ice Hockey"){

                               $event_score = array();

                               $event_score['p1_score'] = "";
                               $event_score['p2_score'] = "";
                               $event_score['p3_score'] = "";
                               $event_score['ft_score'] = "";


                           }else{

                               $event_score = array();
                               $event_score['ht1_score'] = "";
                               $event_score['ht2_score'] = "";
                               $event_score['ft_score'] = "";
                           }


                       


                            $evt['event_score'] = $event_score;






                       $NewOdds = array();

                       if( array_key_exists('StakeTypes', $cached_event_obj[0]) ){


                              try {

                                $odds = $event['odds'][0];

                                $odds = $this->getOddUpdate($cached_event_obj,$odds['odd_id']);

                                $odds['isWinner'] = 'open';
                                $coteTotale *= $odds['odd_value'];

                                array_push($NewOdds,$odds);

                              }catch(Exception $e) {

                                $event_stated['event_id']   = $evt['event_id'];
                                $event_stated['event_home'] = $evt['event_home'];
                                $event_stated['event_away'] = $evt['event_away'];
                                array_push($started_events_obj,$event_stated);

                              }


                       }else{



                            $event_stated['event_id']   = $evt['event_id'];
                            $event_stated['event_home'] = $evt['event_home'];
                            $event_stated['event_away'] = $evt['event_away'];

                            array_push($started_events_obj,$event_stated);
                       }


                    $evt['odds'] = $NewOdds;
                    array_push($Events,$evt);

                   }else{



                            $event_stated['event_id']   = $evt['event_id'];
                            $event_stated['event_home'] = $evt['event_home'];
                            $event_stated['event_away'] = $evt['event_away'];

                            array_push($started_events_obj,$event_stated);



                   }


                }
        }


        if(!empty($LiveEvents)){ 


               if( count($LiveEvents) === 1){

                    sleep(50);

               }else{

                    sleep(10);
               }
            
               foreach ($LiveEvents as $key => $event) {

                   $evt['event_id']       =  $event['event_id'];

                   $evt['isEventLive']    =  $event['event_isLive'];

                   if(isset($event['event_sport'])){

                    $evt['event_sport']    = $event['event_sport'];     

                   }else{

                    $evt['event_sport']    = null;     

                   }

                   $evt['event_away']     = $event['event_away'];
                   $evt['event_home']     = $event['event_home'];
                   $evt['event_state']     = "open";

                   $eventsCount++;

                   $cached_event_obj = $this->axiosOld("https://sportv2.mycard77.shop/cache/api/new/init_EventOddsLive?event_id=".$event['event_id']."&sport_name=".urlencode($event['event_sport'])."")['decode'];

                   if( !array_key_exists('error',$cached_event_obj) ){

                       $evt['date']  =  date('Y-m-d H:i:s', strtotime($cached_event_obj[0]['D']));
                       $evt['Fdate'] =  date('d.m. H:i', strtotime($cached_event_obj[0]['D']));


                           $homeFscore = $cached_event_obj[0]['HS'];
                           $awayFscore = $cached_event_obj[0]['AS'];
                           $combinedScore = $homeFscore.":".$awayFscore;

                           $combinedScore = $homeFscore.":".$awayFscore;


                           if($cached_event_obj[0]['SN'] === "Football"){ 

                               $event_score = array();

                               $event_score['ht1_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[0]);
                               $event_score['ht2_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[1]);
                               $event_score['ft_score'] = $combinedScore;

                           }elseif($cached_event_obj[0]['SN'] === "Basketball"){

                               $event_score = array();

                               $event_score['q1_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[0]);
                               $event_score['q2_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[1]);
                               $event_score['q3_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[2]);
                               $event_score['q4_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[3]);
                               $event_score['ft_score'] = $combinedScore;

                           }elseif($cached_event_obj[0]['SN'] === "Tennis"){

                               $event_score = array();

                               if (strpos($cached_event_obj[0]['SS'],"-") !== false) {


                                   [$event_score['s1_score'], $event_score['s2_score'], $event_score['s3_score'] ] = explode("-", $cached_event_obj[0]['SS']);


                               }else{


                                    [$event_score['s1_score'], $event_score['s2_score'], $event_score['s3_score'] ] = [$cached_event_obj[0]['SS'],"",""];

                               }
 
                               $event_score['ft_score'] = $combinedScore;



                           }elseif($cached_event_obj[0]['SN'] === "Handball"){

                               $event_score = array();

                               $event_score['ht1_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[0]);
                               $event_score['ht2_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[1]);
                               $event_score['ft_score'] = $combinedScore;


                           }elseif($cached_event_obj[0]['SN'] === "Ice Hockey"){

                               $event_score = array();

                               $event_score['p1_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[0]);
                               $event_score['p2_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[1]);
                               $event_score['p3_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[2]);
                               $event_score['ft_score'] = $combinedScore;


                           }else{

                               $event_score = array();
                               $event_score['ht1_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[0]);
                               $event_score['ht2_score'] = trim(explode("-",$cached_event_obj[0]['SS'])[1]);
                               $event_score['ft_score'] = $combinedScore;
                           }


                       


                       $evt['event_score'] = $event_score;

                     /* Log::channel('stderr')->info("############");
                      Log::channel('stderr')->info(">>>> (ID) : ".$event["event_id"]."  |  ".$event['event_home']." - ".$event['event_away']);
                      Log::channel('stderr')->info($evt['event_score']);
                      Log::channel('stderr')->info("############");*/
                   //Log::channel('stderr')->info($cached_event_obj);
                   //Log::channel('stderr')->info("############");


                       $evt['scoreTemp'] = $combinedScore;

                       $evt['event_period'] = trim($cached_event_obj[0]['ES']);

                       $evt['pa_info'] = trim($cached_event_obj[0]['ES'])." | ".$cached_event_obj[0]['PT']." '";

                       $NewOdds = array();

                       if( array_key_exists('StakeTypes', $cached_event_obj[0]) ){

                              try {

                                $odds = $event['odds'][0];

                                $odds = $this->getOddUpdateLive($cached_event_obj,$odds['odd_id'],$odds['odd_name']);


                                if(!empty($odds)){

                                    $odds['isWinner'] = 'open';
                                    $coteTotale *= $odds['odd_value'];
                                    array_push($NewOdds,$odds);

                                }else{


                                    $event_stated['event_id']   = $event['event_id'];
                                    $event_stated['event_home'] = $event['event_home'];
                                    $event_stated['event_away'] = $event['event_away'];
                                    $event_stated['event_odd']  = $event['odds'][0]['market_name'].' '.$event['odds'][0]['odd_name'];
                                    array_push($started_events_objLive,$event_stated);

                                }

                               }catch(Exception $e) {

                                    $event_stated['event_id']   = $event['event_id'];
                                    $event_stated['event_home'] = $event['event_home'];
                                    $event_stated['event_away'] = $event['event_away'];
                                    $event_stated['event_odd']  = $event['odds'][0]['market_name'].' '.$event['odds'][0]['odd_name'];
                                    array_push($started_events_objLive,$event_stated);

                              }


                        
                       }else{

                            $event_stated['event_id']   = $event['event_id'];
                            $event_stated['event_home'] = $event['event_home'];
                            $event_stated['event_away'] = $event['event_away'];
                            $event_stated['event_odd']  = $event['odds'][0]['market_name'].' '.$event['odds'][0]['odd_name'];
                            array_push($started_events_objLive,$event_stated);


                       }

                    $evt['odds'] = $NewOdds;
                    array_push($Events,$evt);


                   }else{



                            $event_stated['event_id']   = $event['event_id'];
                            $event_stated['event_home'] = $event['event_home'];
                            $event_stated['event_away'] = $event['event_away'];
                            $event_stated['event_odd']  = $event['odds'][0]['market_name'].' '.$event['odds'][0]['odd_name'];
                            array_push($started_events_objLive,$event_stated);

                   }

                }
        }


            if( count($started_events_objLive) ){

                    return response()->json([
                        "status" => true,
                        "type"   => "started_eventsLive",
                        "message" => $started_events_objLive,
                        "error"  => ""
                    ],200);


            }

            if( count($started_events_obj) ){

                    return response()->json([
                        "status" => true,
                        "type"   => "started_events",
                        "message" => $started_events_obj,
                        "error"  => ""
                    ],200);

            }


            

        $coteTotale = (float)  $coteTotale;
        $gainTotale = (float) ($coteTotale*$stake);



        if($eventsCount > 4){

             $prime     = (float) round((($coteTotale-($coteTotale-$this->getPercentOfNumber($coteTotale,$eventsCount)))*$stake),2);
             
             $Maxgain   = $gainTotale+$prime;

        }else{

              $prime     = 0;
              $Maxgain   = $gainTotale;
           
        } 

        try {

            $user = JWTAuth::parseToken()->authenticate();

            $user_id =  $user->id;
            $user_solde =  (float) $user->sold_sport;

            if($user_solde < $stake){

                return response()->json([
                    "status" => false,
                    "type"   => "error",
                    "error" => "Montant sur votre compte n'est pas suffisant pour le payement d'une fiche web"
                ],200);


            }elseif($Maxgain > 30000){


                return response()->json([
                    "status" => false,
                    "type"   => "error",
                    "error" => "Gain maximal par la fiche est 30,000.00 TND"
                ],200);


            }else{

                $betslip = new Betslip();

                $betslip->coupon_code = $coupon_code;
                $betslip->user_id = $user_id;
                $betslip->evt_count = $eventsCount;
                $betslip->stake = $stake;
                $betslip->coef = $coteTotale;
                $betslip->gain = $gainTotale;
                $betslip->gainMax   = $Maxgain;
                $betslip->prime = $prime;
                $betslip->json = json_encode($Events);
                $betslip->type = count($LiveEvents) ? "live" :"normal";
                $betslip->state = "running";

                $betslip->save();


                $user->sold_sport = ( $user_solde - $stake );
                $user->save();

                return response()->json([
                    "status" => true,
                    "type"   => "success",
                    "message" => "Votre web fiche est transmis avec succés",
                    "error"  => ""
                ],200);

            }

        } catch (JWTException $e) {
                    return $e;
        }


    }


    public function list_betslip(Request $request){

        try {

            $user = JWTAuth::parseToken()->authenticate();
            $betslips_query = Betslip::where([['user_id','=',$user->id],['state','=','running']])->orderBy('created_at', 'desc')->get();

            $betslips = [];
            //$betslips['count'] = 0;
            $count = 0;
            foreach ($betslips_query as $betslip) {


                $betslip_json['id']      = $betslip->id;
                $betslip_json['coupon_code']      = $betslip->coupon_code;
                $betslip_json['state']      = $betslip->state;
                $betslip_json['type']       = $betslip->type;
                $betslip_json['stake']      = number_format($betslip->stake,2);
                $betslip_json['coef']       = number_format($betslip->coef,2);
                $betslip_json['gain']       = number_format($betslip->gain,2);
                $betslip_json['cashout']    = number_format($betslip->cashout,2);
                $betslip_json['date']       = date("m.d.y H:i", strtotime($betslip->created_at));

                $count++;
                array_push($betslips, $betslip_json);

            }

            return response()->json([
                "status" => true,
                "count" => $count,
                "data" => $betslips
            ],200);

        } catch (JWTException $e) {
                    return $e;
        }


    }



    public function list_betslipDesktop($state, Request $request){

        try {

            $user = JWTAuth::parseToken()->authenticate();

            if($state === "closed"){

                $betslips_query = Betslip::where([['user_id','=',$user->id],['state','!=','running']])->orderBy('created_at', 'desc')->get();
            }else{

                $betslips_query = Betslip::where([['user_id','=',$user->id],['state','=','running']])->orderBy('created_at', 'desc')->get();

            }

            $betslips = [];
            //$betslips['count'] = 0;
            $count = 0;
            foreach ($betslips_query as $betslip) {


                $betslip_json['coupon_code'] = $betslip->coupon_code;
                $betslip_json['state']       = $betslip->state;
                $betslip_json['date']        = date("d.m H:i", strtotime($betslip->created_at));
                $betslip_json['type']        = $betslip->type;
                $betslip_json['stake']       = number_format($betslip->stake,2);
                $betslip_json['coef']        = number_format($betslip->coef,2);
                $betslip_json['prime']       = number_format($betslip->prime,2);
                $betslip_json['gain']        = number_format($betslip->gain,2);
                $betslip_json['gainMax']     = number_format($betslip->gainMax,2);
                $betslip_json['cashout']     = number_format($betslip->cashout,2);



                $arro = json_decode($betslip->json,true);

                usort($arro, array($this,'date_compare'));
                $betslip_json['events']      = $arro;
                $betslip_json['evt_count']   = $betslip->evt_count;

                $count++;
                array_push($betslips, $betslip_json);

            }

            return response()->json([
                "status" => true,
                "count" => $count,
                "data" => $betslips
            ],200);

        } catch (JWTException $e) {
                    return $e;
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

    public function list_betslipClosed(Request $request){

        try {

            $user = JWTAuth::parseToken()->authenticate();
            //['state','=','running']
            $betslips_query = Betslip::where([['user_id','=',$user->id],['state','!=','running']])->orderBy('created_at', 'desc')->get();

            $betslips = [];
            //$betslips['count'] = 0;
            $count = 0;
            foreach ($betslips_query as $betslip) {


                $betslip_json['id']      = $betslip->id;
                $betslip_json['coupon_code']      = $betslip->coupon_code;
                $betslip_json['state']      = $betslip->state;
                $betslip_json['type']       = $betslip->type;
                $betslip_json['stake']      = number_format($betslip->stake,2);
                $betslip_json['coef']       = number_format($betslip->coef,2);
                $betslip_json['gain']       = number_format($betslip->gain,2);
                $betslip_json['date']       = date("m.d.y H:i", strtotime($betslip->created_at));

                $count++;
                array_push($betslips, $betslip_json);

            }

            return response()->json([
                "status" => true,
                "count" => $count,
                "data" => $betslips
            ],200);

        } catch (JWTException $e) {
                    return $e;
        }


    }

    public function date_compare($a, $b){

        $t1 = strtotime($a['date']);
        $t2 = strtotime($b['date']);
        return $t1 - $t2;
    }    

    public function verifySignature($postData, $signature, $organizationID){


        $queyData     = http_build_query($postData);

        $expectedSignature = hash_hmac('sha1', $queyData, $organizationID);


        return $expectedSignature === $signature;

    }

    public function webhookwalletSportsbook(Request $request){


        $validator = Validator($request->only("action"), [
            "action" => "required",
        ]);

        if( $validator->fails() ){

            $response = array('status' => false, 'error' => $validator->errors()->first());
            return response()->json($response, 200);
        }


        $signature      = $request->headers->get('x-signature');


        $organizationID = $this->organization_id;



        /*if( $this->verifySignature($request->all(), $signature, $organizationID) === false  ){

            $response = array('status' => false, 'error' => "error signature");
            return response()->json($response, 200);

        }*/



        //Log::channel('stderr')->info($request->all());

        $action = $request->action;


        if($action === "auth"){

            try{

                $user = JWTAuth::parseToken()->authenticate();


                $superConfig = $this->getSuperConfig($user->username);

                if(!empty($superConfig)){


                    if($superConfig["role"] === "super"){

                        $organizationID = $superConfig["org"];

                    }

                }


                return response()->json([
                    "status" => true,
                    "player_id" => $user->username,
                    "player_name" => $user->username,
                    "parent_id" => $user->parent
                ], 200);


            }catch (JWTException $e) {


                $response = array('status' => false, 'error' => "UNAUTHORIZED");
                return response()->json($response, 200);

             }


        }elseif($action === "balance"){


                $player          = $request->player_id;


                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
                        ], 200);

                }


                $superConfig = $this->getSuperConfig($user->username);

                if(!empty($superConfig)){


                    if($superConfig["role"] === "super"){

                        $organizationID = $superConfig["org"];

                    }

                }


                return response()->json([
                    "status" => true,
                    "player_id" => $user->username,
                    "balance" => $user->sold_sport,
                ], 200);



        }elseif($action === "bet"){



                $player          = $request->player_id;
                $transaction_id  = $request->transaction_id;
                $session_id      = $request->session_id;
                $type            = $request->type;
                $coupon_id       = $request->coupon_id;
                $amount          = (float) $request->amount;


                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
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



                $superConfig = $this->getSuperConfig($user->username);

                if(!empty($superConfig)){


                    if($superConfig["role"] === "super"){

                        $organizationID = $superConfig["org"];

                    }

                }




                if( $user->sold_sport < $amount ){

                    $response = array('status' => false, 'error' => "INSUFFICIENT_FUNDS");
                    return response()->json($response, 200);
                }


                try {


                    DB::transaction(function () use ($player,$action,$type,$amount,$session_id,$transaction_id,$coupon_id) {
                        // Lock the row for update
                        $userToUpdate = User::where([['username','=',$player]])->lockForUpdate()->first();

                        $transaction_exit = SportsbookTransaction::where([['transaction_id','=',$transaction_id]])->first();

                        //check if transaction doesn't not exist
                        if(!$transaction_exit){

                                // Insert a new row
                                DB::table('sportsbook_transactions')->insert([
                                    'action' => $action,
                                    'type' => $type,
                                    'user' => $userToUpdate->username,
                                    'amount' => $amount,
                                    'transaction_id' => $transaction_id,
                                    'session_id' => $session_id,
                                    'betslip_id' => $coupon_id,
                                    'created_at' => Carbon::now()
                                ]);

                                // Make changes to player locked row
                                $userToUpdate->decrement('sold_sport', $amount);
                                $userToUpdate->update();

                        }
                    });


                    $user->refresh();

                    return response()->json([
                        "status" => true,
                        "player_id" => $user->username,
                        "balance" => $user->sold_sport,
                        "transaction_id" => $transaction_id
                    ], 200);


                } catch (Exception $e) {

                    Log::channel('stderr')->info($e);
                    return response()->json([
                        "status" => false,
                        "error" => "INTERNAL_ERROR",
                        "stackTrace" => $e
                    ], 200);


                }




        }elseif($action === "win"){


                $player          = $request->player_id;
                $transaction_id  = $request->transaction_id;
                $session_id      = $request->session_id;
                $type            = $request->type;
                $coupon_id       = $request->coupon_id;
                $amount          = (float) $request->amount;

                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
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


                $superConfig = $this->getSuperConfig($user->username);

                if(!empty($superConfig)){


                    if($superConfig["role"] === "super"){

                        $organizationID = $superConfig["org"];

                    }

                }


                try {


                    DB::transaction(function () use ($player,$action,$type,$amount,$session_id,$transaction_id,$coupon_id) {
                        // Lock the row for update
                        $userToUpdate = User::where([['username','=',$player]])->lockForUpdate()->first();

                        $transaction_exit = SportsbookTransaction::where([['transaction_id','=',$transaction_id]])->first();

                        //check if transaction doesn't not exist
                        if(!$transaction_exit){

                                // Insert a new row
                                DB::table('sportsbook_transactions')->insert([
                                    'action' => $action,
                                    'type' => $type,
                                    'user' => $userToUpdate->username,
                                    'amount' => $amount,
                                    'transaction_id' => $transaction_id,
                                    'session_id' => $session_id,
                                    'betslip_id' => $coupon_id,
                                    'created_at' => Carbon::now()
                                ]);

                                // Make changes to player locked row
                                $userToUpdate->increment('sold_sport', $amount);
                                $userToUpdate->update();

                        }
                    });


                    $user->refresh();

                    return response()->json([
                        "status" => true,
                        "player_id" => $user->username,
                        "balance" => $user->sold_sport,
                        "transaction_id" => $transaction_id
                    ], 200);


                } catch (Exception $e) {

                    return response()->json([
                        "status" => false,
                        "error" => "INTERNAL_ERROR"
                    ], 200);


                }




        }elseif($action === "refund"){


                $player          = $request->player_id;
                $transaction_id  = $request->transaction_id;
                $ref_transaction_id = $request->ref_transaction_id;
                $session_id      = $request->session_id;
                $type            = $request->type;
                $coupon_id       = $request->coupon_id;
                $amount          = (float) $request->amount;

                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
                        ], 200);

                }


                $superConfig = $this->getSuperConfig($user->username);

                if(!empty($superConfig)){


                    if($superConfig["role"] === "super"){

                        $organizationID = $superConfig["org"];

                    }

                }


                $transaction_exit = SportsbookTransaction::where([['transaction_id','=',$transaction_id]])->exists();

                if($transaction_exit){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }

                $check_duplicated_refund_transaction = SportsbookTransaction::where([['transaction_id','=',$ref_transaction_id],['type','=',"refunded"]])->exists();

                if($check_duplicated_refund_transaction){

                        return response()->json([
                            "status" => true,
                            "player_id" => $player,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }



                try {


                    DB::transaction(function () use ($player,$action,$type,$amount,$session_id,$transaction_id,$ref_transaction_id,$coupon_id) {
                        // Lock the row for update
                        $userToUpdate = User::where([['username','=',$player]])->lockForUpdate()->first();

                        $ref_tr_exist = SportsbookTransaction::where([['transaction_id','=',$ref_transaction_id],['type','=',$type]])->first();

                        //check if transaction doesn't not exist
                        if($ref_tr_exist){

                                    // Insert a new row

                                    $userToUpdate->increment('sold_sport', $ref_tr_exist->amount);
                                    $userToUpdate->update();


                                    //insert refund transaction if exist
                                    DB::table('sportsbook_transactions')->insert([
                                        'action' => $action,
                                        'type' => "refunded",
                                        'user' => $userToUpdate->username,
                                        'amount' => $amount,
                                        'transaction_id' => $ref_transaction_id,
                                        'session_id' => $session_id,
                                        'betslip_id' => $coupon_id,
                                        'created_at' => Carbon::now()
                                    ]);


                                    //insert transaction

                                    DB::table('sportsbook_transactions')->insert([
                                        'action' => $action,
                                        'type' => $type,
                                        'user' => $userToUpdate->username,
                                        'amount' => $amount,
                                        'transaction_id' => $transaction_id,
                                        'session_id' => $session_id,
                                        'betslip_id' => $coupon_id,
                                        'created_at' => Carbon::now()
                                    ]);
       

                        }
                    });


                    $user->refresh();

                    return response()->json([
                        "status" => true,
                        "player_id" => $user->username,
                        "balance" => $user->sold_sport,
                        "transaction_id" => $transaction_id
                    ], 200);


                } catch (Exception $e) {

                    return response()->json([
                        "status" => false,
                        "error" => "INTERNAL_ERROR"
                    ], 200);


                }





        }else if($action === "rollback"){


                $player          = $request->player_id;
                $type            = $request->type;
                $transaction_id  = $request->transaction_id;
                $session_id      = $request->session_id;
                $coupon_id       = $request->coupon_id;
                $amount          = (float) $request->amount;

                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
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


                $superConfig = $this->getSuperConfig($user->username);

                if(!empty($superConfig)){


                    if($superConfig["role"] === "super"){

                        $organizationID = $superConfig["org"];

                    }

                }


                try {


                    DB::transaction(function () use ($player,$action,$amount,$session_id,$type,$transaction_id,$coupon_id) {
                        // Lock the row for update
                        $userToUpdate = User::where([['username','=',$player]])->lockForUpdate()->first();

                        $transaction_exit = SportsbookTransaction::where([['transaction_id','=',$transaction_id]])->first();

                        //check if transaction doesn't not exist
                        if(!$transaction_exit){

                                // Insert a new row
                                DB::table('sportsbook_transactions')->insert([
                                    'action' => $action,
                                    'type' => $type,
                                    'user' => $userToUpdate->username,
                                    'amount' => $amount,
                                    'transaction_id' => $transaction_id,
                                    'session_id' => $session_id,
                                    'betslip_id' => $coupon_id,
                                ]);

                                // Make changes to player locked row
                                $userToUpdate->decrement('sold_sport', $amount);
                                $userToUpdate->update();

                        }
                    });


                    $user->refresh();

                    return response()->json([
                        "status" => true,
                        "player_id" => $user->username,
                        "balance" => $user->sold_sport,
                        "transaction_id" => $transaction_id
                    ], 200);


                } catch (Exception $e) {

                    return response()->json([
                        "status" => false,
                        "error" => "INTERNAL_ERROR"
                    ], 200);


                }

        }



    }



    public function webhookwallet(Request $request){


        $validator = Validator($request->only("action"), [
            "action" => "required",
        ]);

        if( $validator->fails() ){

            $response = array('status' => false, 'error' => $validator->errors()->first());
            return response()->json($response, 200);
        }


        $signature      = $request->headers->get('x-signature');


        $organizationID = $this->organization_id;

        //Log::channel('stderr')->info($request->all());

        $action = $request->action;


        if($action === "auth"){

            try{

                $user = JWTAuth::parseToken()->authenticate();


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



                return response()->json([
                    "status" => true,
                    "player_id" => $user->username,
                    "player_name" => $user->username,
                    "parent_id" => $user->parent
                ], 200);


            }catch (JWTException $e) {


                $response = array('status' => false, 'error' => "UNAUTHORIZED");
                return response()->json($response, 200);

             }


        }elseif($action === "balance"){


                $player          = $request->player_id;


                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
                        ], 200);

                }


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


                return response()->json([
                    "status" => true,
                    "player_id" => $user->username,
                    "balance" => $user->sold_sport,
                ], 200);



        }elseif($action === "bet"){


                $player          = $request->player_id;
                $transaction_id  = $request->transaction_id;
                $couponCode      = $request->coupon;
                $amount          = (float) $request->amount;

                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
                        ], 200);

                }


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




                if( $user->sold_sport < $amount ){

                    $response = array('status' => false, 'error' => "INSUFFICIENT_FUNDS");
                    return response()->json($response, 200);
                }


                $elo_query = $user->decrement('sold_sport', $amount);
                $user->update();

                if($elo_query){

                        return response()->json([
                            "status" => true,
                            "player_id" => $user->username,
                            "balance" => $user->sold_sport,
                            "transaction_id" => $transaction_id
                        ], 200);

                }else{


                        return response()->json([
                            "status" => false,
                            "error" => "INTERNAL_ERROR"
                        ], 200);

                }

        }elseif($action === "win"){


                $player          = $request->player_id;
                $transaction_id  = $request->transaction_id;
                $couponCode      = $request->coupon;
                $amount          = (float) $request->amount;

                //get user data
                $user = User::where([['username','=',$player]])->first();


                if(empty($user)){

                        return response()->json([
                            "status" => false,
                            "error" => "USER_NOT_FOUND"
                        ], 200);

                }


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



                $elo_query = $user->increment('sold_sport', $amount);
                $user->update();

                if($elo_query){

                        return response()->json([
                            "status" => true,
                            "player_id" => $user->username,
                            "balance" => $user->sold_sport,                            
                            "transaction_id" => $transaction_id
                        ], 200);

                }else{


                        return response()->json([
                            "status" => false,
                            "error" => "INTERNAL_ERROR"
                        ], 200);

                }

        }elseif($action === "refund"){






        }



    }



    public function submit_betslipNew(Request $request){

        $validator = Validator($request->only("totalStake", "gain", "prime", "Maxgain", "bmq", "bcount", "events"), [
            "totalStake" => "required|numeric|between:0.5,10000",
            "gain" => "required|numeric",
            "prime" => "numeric",
            "Maxgain" => "numeric",
            "bmq" => "required|numeric",
            "bcount" => "required|numeric",
            "events" => "required",
        ]);

        if( $validator->fails() ){
                return response()->json([
                    "status" => false,
                    "error"  => $validator->errors()->first(),
                    "type"   => "error"
                ], 200);
        }


        $stake       = (float) $request->totalStake;
        $events_json = $request->events;


        $isLiveEventExist = false;
        $LiveEventsCount = 0;
        foreach ($events_json as $key => $event) {

           if($event['event_isLive'] === true){

                $isLiveEventExist = true;
                $LiveEventsCount++;

           }

        }


        if($isLiveEventExist && ($LiveEventsCount < 3) ) {

                sleep(32);

        }


        $uri_service = "https://bookmaker.api-ngsportservice.com/WebServices/BetslipService.asmx/create"; 

        $Postdata = array(
              'totalStake' => $stake,
              'events' => $events_json
        );

        $response = $this->axios($uri_service,$Postdata,true);

        $res_status = $response['httpcode'];

        if($res_status === 200){

           $res_data   = $response['decode'];

            if($res_data['status'] == 0 && $res_data['error_code'] == 1){

                $error = $res_data['error_msg'];

                if($error['code'] === "error_exist_live_bet"){

                        return response()->json([
                            "status" => true,
                            "type"   => "started_eventsLive",
                            "message" => $error['message'],
                            "error"  => ""
                        ],200);

                }elseif($error['code'] === "error_exist_line_bet"){

                        return response()->json([
                            "status" => true,
                            "type"   => "started_events",
                            "message" => $error['message'],
                            "error"  => ""
                        ],200);
                }else{

                        return response()->json([
                            "status" => true,
                            "type"   => "error",
                            "message" => $error['message'],
                            "error"  => ""
                        ],200);

                }

            }elseif($res_data['status'] == 1){


                try {

                    $user = JWTAuth::parseToken()->authenticate();

                    $user_id =  $user->id;
                    $user_solde =  (float) $user->sold_sport;

                    if($user_solde < $res_data['stake']){

                        return response()->json([
                            "status" => true,
                            "type"   => "error",
                            "error"  => "",
                            "message" => "Montant sur votre compte n'est pas suffisant pour le payement d'une fiche web"
                        ],200);


                    }else{

                        $coupon_code = $this->Generate_BetslipCode();

                        $betslip = new Betslip();

                        $betslip->coupon_code = $coupon_code;
                        $betslip->user_id     = $user_id;
                        $betslip->evt_count   = $res_data['events_count'];
                        $betslip->stake       = $res_data['stake'];
                        $betslip->coef        = $res_data['coef'];
                        $betslip->gain        = $res_data['gain'];
                        $betslip->gainMax     = $res_data['gainMax'];
                        $betslip->prime       = $res_data['bonus'];
                        $betslip->json        = json_encode($res_data['betslip_events']);
                        $betslip->type        = $res_data['betslip_type'];
                        $betslip->state       = "running";
                        $betslip->test        = "YES";

                        $betslip->save();

                        $user->sold_sport     = ( $user_solde - $res_data['stake'] );
                        $user->save();

                        return response()->json([
                            "status" => true,
                            "type"   => "success",
                            "message" => "Votre web fiche est transmis avec succés",
                            "error"  => ""
                        ],200);

                    }

                } catch (JWTException $e) {


                        return response()->json([
                            "status" => false,
                            "type"   => "error",
                            "error" => "Something went wrong ! Try later please"
                        ],200);

                }


            }


        }else{

            return response()->json([
                "status" => false,
                "type"   => "error",
                "error" => "Something went wrong ! Try later please"
            ],200);


        }


    }




    public function get_betslip($betslip_id, Request $request){

        try {

            $user = JWTAuth::parseToken()->authenticate();

            $betslip_query = Betslip::where([['user_id','=',$user->id],['coupon_code','=',$betslip_id]])->first();


            if(!empty($betslip_query)){

                $betslip['coupon_code'] = $betslip_query->coupon_code;
                $betslip['state']       = $betslip_query->state;
                $betslip['date']        = date("d.m H:i", strtotime($betslip_query->created_at));
                $betslip['type']        = $betslip_query->type;
                $betslip['stake']       = number_format($betslip_query->stake,2);
                $betslip['coef']        = number_format($betslip_query->coef,2);
                $betslip['prime']       = number_format($betslip_query->prime,2);
                $betslip['gain']        = number_format($betslip_query->gain,2);
                $betslip['gainMax']     = number_format($betslip_query->gainMax,2);
                $betslip['cashout']     = number_format($betslip_query->cashout,2);



                $arro = json_decode($betslip_query->json,true);

                usort($arro, array($this,'date_compare'));
                $betslip['events']      = $arro;
                $betslip['evt_count']   = $betslip_query->evt_count;

                return response()->json([
                    "status" => true,
                    "betslip" => $betslip
                ],200);

            }else{

                return response()->json([
                    "status" => true,
                    "error" => "bet not found"
                ],200);


            }

        } catch (JWTException $e) {
                    return $e;
        }


    }


    public function updateEventsSeteled($events){

        foreach($events as $key => $event){

            if($event['event_state'] === "open"){

                    $events[$key]['event_state'] =  "return";
                    $events[$key]['odds'][0]['isWinner'] =  "return";

            }

        }

        return $events;
    }

    public function cashoutBetslip(Request $request){

        $validator = Validator($request->only("acceptChange", "amount", "coupon"), [
            "acceptChange" => "required|boolean",
            "amount" => "required|numeric",
            "coupon" => "required",
        ]);

        if( $validator->fails() ){
                return response()->json([
                    "status" => false,
                    "error"  => $validator->errors()->first(),
                    "type"   => "error"
                ], 200);
        }


        $acceptChange       =  $request->acceptChange;
        $amount_requested   = (float) abs($request->amount);
        $coupon_code        = $request->coupon;

        try {


            $user = JWTAuth::parseToken()->authenticate();
            //['state','=','running']
            $betslip = Betslip::where([['user_id','=',$user->id],['coupon_code','=',$coupon_code]])->first();

            if(!empty($betslip)){

                    $bs_cashoutValue = $betslip->cashout;

                    if($bs_cashoutValue === NULL || $bs_cashoutValue <= 0.1 ){

                            return response()->json([
                                "status" => true,
                                "error_code"  => "CASHOUT_UNAVAILABLE",
                                "type"   => "error"
                            ],200);


                    }

                    if($acceptChange === false){

                        if($bs_cashoutValue != $amount_requested){

                            return response()->json([
                                "status" => true,
                                "error_code"  => "CASHOUT_VALUE_CHANGED",
                                "amount"   => number_format($bs_cashoutValue,2),
                                "old_amount"   => number_format($amount_requested,2),
                                "type"   => "error"
                            ],200);

                        }else{


                            if($betslip->state === "running"){

                                $betslip->state = "returned";
                                $betslip->gain = $bs_cashoutValue;
                                $betslip->cashout = null;

                                $betslip_events =  json_decode($betslip->json,true);
                                $updated_events = $this->updateEventsSeteled($betslip_events);
                                $betslip->json    = json_encode($updated_events);
                                

                                if($bs_cashoutValue < 500 && $bs_cashoutValue < $betslip->gainMax ){

                                    $user->sold_sport = ($user->sold_sport + $bs_cashoutValue);
                                    $user->update();
                                    
                                }else{

                                    $betslip->manuel = "_VERIFY";
                                }

                                $betslip->update();

                                return response()->json([
                                    "status" => true,
                                    "error_code"  => "",
                                    "amount"  => number_format($bs_cashoutValue,2),
                                    "type"   => "success"
                                ],200);

                            }else{

                                    return response()->json([
                                        "status" => true,
                                        "error_code"  => "CASHOUT_UNAVAILABLE",
                                        "type"   => "error"
                                    ],200);

                            }

                        }

                    }elseif($acceptChange === true){

                        if($betslip->state === "running"){

                            $betslip->state = "returned";
                            $betslip->gain = $bs_cashoutValue;
                            $betslip->cashout = null;

                            $betslip_events =  json_decode($betslip->json,true);
                            $updated_events = $this->updateEventsSeteled($betslip_events);
                            $betslip->json    = json_encode($updated_events);

                            if($bs_cashoutValue < 500 && $bs_cashoutValue < $betslip->gainMax ){

                                $user->sold_sport = ($user->sold_sport + $bs_cashoutValue);
                                $user->update();
                                
                            }else{

                                $betslip->manuel = "_VERIFY";
                            }
                            $betslip->update();


                            return response()->json([
                                "status" => true,
                                "error_code"  => "",
                                "amount"  => number_format($bs_cashoutValue,2),
                                "type"   => "success"
                            ],200);

                        }else{


                                    return response()->json([
                                        "status" => true,
                                        "error_code"  => "CASHOUT_UNAVAILABLE",
                                        "type"   => "error"
                                    ],200);


                        }


                    }



            }else{

                return response()->json([
                    "status" => true,
                    "error_code"  => "CASHOUT_UNAVAILABLE",
                    "type"   => "error"
                ],200);

            }

        } catch (JWTException $e) {
                    return $e;
        }


    }


    /************************************************/

    public function GenerateBCode(){

        $randomNum = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, 5);

        $verify_exist = ReservedBetslip::whereCode($randomNum)->exists();

        if($verify_exist === true){

            $this->GenerateBCode();

        }else{

            return $randomNum;
        }

    }


    public function get_reserved_betslip($code){


            $saved_betslip = ReservedBetslip::whereCode($code)->first();

            return response()->json([
                "status" => true,
                "data" => $saved_betslip
            ],200);


    }

    public function reserve_betslip(Request $request){

        $validator = Validator($request->only("totalStake", "gain", "prime", "Maxgain", "bmq", "bcount", "events"), [
            "totalStake" => "required|numeric|between:0.5,10000",
            "gain" => "required|numeric",
            "prime" => "numeric",
            "Maxgain" => "numeric",
            "bmq" => "required|numeric",
            "bcount" => "required|numeric",
            "events" => "required",
        ]);

        if( $validator->fails() ){
                return response()->json([
                    "status" => false,
                    "error"  => $validator->errors()->first(),
                    "type"   => "error"
                ], 200);
        }


        $stake       = (float) $request->totalStake;
        $events_json = $request->events;


        $isLiveEventExist = false;
        $LiveEventsCount = 0;
        foreach ($events_json as $key => $event) {

           if($event['event_isLive'] === true){

                $isLiveEventExist = true;
                $LiveEventsCount++;

           }

        }


        if($isLiveEventExist && ($LiveEventsCount < 3) ) {

                sleep(32);

        }


        $uri_service = "https://bookmaker.api-ngsportservice.com/WebServices/BetslipService.asmx/create"; 

        $Postdata = array(
              'totalStake' => $stake,
              'events' => $events_json
        );

        $response = $this->axios($uri_service,$Postdata,true);

        $res_status = $response['httpcode'];

        if($res_status === 200){

           $res_data   = $response['decode'];

            if($res_data['status'] == 0 && $res_data['error_code'] == 1){

                $error = $res_data['error_msg'];

                if($error['code'] === "error_exist_live_bet"){

                        return response()->json([
                            "status" => true,
                            "type"   => "started_eventsLive",
                            "message" => $error['message'],
                            "error"  => ""
                        ],200);

                }elseif($error['code'] === "error_exist_line_bet"){

                        return response()->json([
                            "status" => true,
                            "type"   => "started_events",
                            "message" => $error['message'],
                            "error"  => ""
                        ],200);
                }else{

                        return response()->json([
                            "status" => true,
                            "type"   => "error",
                            "message" => $error['message'],
                            "error"  => ""
                        ],200);

                }

            }elseif($res_data['status'] == 1){


                try {

                        $b_code = $this->GenerateBCode();

                        $res_betslip = new ReservedBetslip();

                        $res_betslip->code        = $b_code;
                        $res_betslip->evt_count   = $res_data['events_count'];
                        $res_betslip->stake       = $res_data['stake'];
                        $res_betslip->coef        = $res_data['coef'];
                        $res_betslip->gain        = $res_data['gain'];
                        $res_betslip->gainMax     = $res_data['gainMax'];
                        $res_betslip->prime       = $res_data['bonus'];
                        $res_betslip->json        = json_encode($res_data['betslip_events']);
                        $res_betslip->save();   

                        return response()->json([
                            "status" => true,
                            "type"   => "success",
                            "code" => $b_code,
                            "error"  => ""
                        ],200);

                } catch (JWTException $e) {


                        return response()->json([
                            "status" => false,
                            "type"   => "error",
                            "error" => "Something went wrong ! Try later please"
                        ],200);

                }


            }


        }else{

            return response()->json([
                "status" => false,
                "type"   => "error",
                "error" => "Something went wrong ! Try later please"
            ],200);


        }


    }



    public function deleteCircuit(Request $request){
        

        $adminUsername = $request->admin_username;

        $admin       = User::where('username','=',$adminUsername)->first();

        if(empty($admin)){

            return response()->json([
                "status" => false,
                "msg" => "admin not found"
            ],200);


        }


        $admin_childs  = User::where('parent','=',$admin->id)->get();

        $count = 0;

        $childs_ids_array = array();

        $users_updated_array = array();


        if($admin_childs){


            $user_obj = [];
            foreach($admin_childs as $child){


                array_push($childs_ids_array,$child->id);
                $count++;


                /*** CHILD CHILDS ***/
                $childs_childs = User::where('parent','=',$child->id)->get();

                if($childs_childs){

                    foreach($childs_childs as $childth){

                        array_push($childs_ids_array,$childth->id);
                        $count++;

                        /******* CHILDS CHILD CHILDS ********/
                        $childs_xxx = User::where('parent','=',$childth->id)->get();
                        if($childs_xxx){

                            foreach($childs_xxx as $childxxx){

                                array_push($childs_ids_array,$childxxx->id);
                                $count++;


                            }


                        }
                        /******* CHILDS CHILD CHILDS ********/



                    }

                }
                /*** CHILD CHILDS ***/

                

            }

        }



            return response()->json([
                "status" => true,
                "count" => $count,
                "users_ids" => $childs_ids_array
            ],200);


    }


    public function getCircuit(Request $request){
        

        $adminUsername = $request->admin_username;

        $admin       = User::where('username','=',$adminUsername)->first();

        if(empty($admin)){

            return response()->json([
                "status" => false,
                "msg" => "admin not found"
            ],200);


        }


        $admin_childs  = User::where('parent','=',$admin->id)->get();

        $count = 0;

        $childs_ids_array = array();

        $users_updated_array = array();


        if($admin_childs){


            $user_obj = [];
            foreach($admin_childs as $child){


                if($child->role != "player"){
                    array_push($childs_ids_array,$child->id);
                    $count++;
                }


                /*** CHILD CHILDS ***/
                $childs_childs = User::where('parent','=',$child->id)->get();

                if($childs_childs){

                    foreach($childs_childs as $childth){


                        if($childth->role != "player"){

                                array_push($childs_ids_array,$childth->id);
                                $count++;
                        }


                        /******* CHILDS CHILD CHILDS ********/
                        $childs_xxx = User::where('parent','=',$childth->id)->get();
                        if($childs_xxx){

                            foreach($childs_xxx as $childxxx){


                                if($childxxx->role != "player"){


                                    array_push($childs_ids_array,$childxxx->id);
                                    $count++;


                                }



                            }


                        }
                        /******* CHILDS CHILD CHILDS ********/



                    }

                }
                /*** CHILD CHILDS ***/

                

            }

        }



            return response()->json([
                "status" => true,
                "count" => $count,
                "users_ids" => $childs_ids_array
            ],200);


    }

    public function historyPlayer(Request $request){

        $validator = Validator($request->only("type", "date"), [
            "type" => "required|in:+,-,all",
            "date" => "required|in:1,3,7,10",
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

            if($request->type != "all") {

                $data  = Transactions_History::where([['account','=',$user->username],['sign','=',$request->type],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data  = Transactions_History::where([['account','=',$user->username],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->paginate(20);


            }

          }elseif ($request->date === "3") {

            $days_ago  = date("Y-m-d", strtotime("-4 day"));
            $date_today = date("Y-m-d");

            if($request->type != "all") {

                $data = Transactions_History::whereBetween(Transactions_History::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['account','=',$user->username],['sign','=',$request->type]])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data = Transactions_History::whereBetween(Transactions_History::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['account','=',$user->username]])->orderBy('created_at', 'desc')->paginate(20);


            }

          }elseif($request->date === "7"){

            $days_ago  = date("Y-m-d", strtotime("-7 day"));
            $date_today = date("Y-m-d");

            if($request->game != "all") {

                $data = Transactions_History::whereBetween(Transactions_History::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['account','=',$user->username],['sign','=',$request->type]])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data = Transactions_History::whereBetween(Transactions_History::raw('DATE(created_at)'), array($days_ago, $date_today))->where([['account','=',$user->username]])->orderBy('created_at', 'desc')->paginate(20);


            }

          }else{

            if($request->type != "all") {

                $data  = Transactions_History::where([['account','=',$user->username],['sign','=',$request->type]])->orderBy('created_at', 'desc')->paginate(20);

            }else{

                $data  = Transactions_History::where([['account','=',$user->username]])->orderBy('created_at', 'desc')->paginate(20);


            }


          }

          $items = [];

          foreach ($data->items() as $item) {

                $item_new['id']       = $item->id;
                $item_new['amount']   = $item->sign === "+" ? number_format($item->amount,2, '.', ' ') : "-".number_format($item->amount,2, '.', ' ');
                $item_new['balance']  = $item->parent_balance;
                $item_new['sign']     = $item->sign === "+" ? "Payement en espèces" : "Déboursement en espèces";
                $item_new['date']     = $item->created_at->format('d/m/Y H:i:s');

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




    /************************************************/


}
