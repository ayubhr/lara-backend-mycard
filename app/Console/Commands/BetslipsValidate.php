<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Betslip;
use App\Classes\Utils;
use Illuminate\Support\Facades\Log;

class BetslipsValidate extends Command{

protected $signature = 'betslips:validate';

protected $description = 'Validate Betslip events every 2 minutes :)';

public function __construct(){
    parent::__construct();
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


public function checkPerformanceEvent($data){

    $check = false;
    foreach ($data as $event) {

        $event_period = isset($event['event_period']) ? $event['event_period'] : "" ;
        $event_state  = isset($event['event_state']) ? $event['event_state'] : "";

        if($event_period != "Finished" || $event_state === "open"){

            $check = true;
            break;

        }

    }

    return $check;

}

public function handle(){

    $utils = new Utils();

    //$betslips = Betslip::whereIn('state', array("running", "lost"))->where('created_at', '>=', '2021-11-08 00:00:00')->get();

    $Blacklisted = ["win","lost","returned"];

    $Blacklisted_Users = [3931, 8563, 9777, 9095, 8876, 8832, 9956, "9956", "8832", "8876", "3931", "8563", "9777", "9095"];


    $betslips = Betslip::where([['test','=','YES']])->whereNotIn('state', $Blacklisted)->orderBy('id', 'DESC')->get();

    $count = 0;

    $uri_service = "https://bookmaker.api-ngsportservice.com/WebServices/BetslipService.asmx/update"; 


    foreach ($betslips as $betslip) {


        $betslip_events =  json_decode($betslip->json,true);
        $checker = $this->checkPerformanceEvent($betslip_events);

        if($checker){

            $betslip_ready = $betslip->toArray();
            $Postdata = array(
                      'betslip' => $betslip_ready
            );

            $response = $this->axios($uri_service,$Postdata,true);

            $res_status = $response['httpcode'];

            if($res_status === 200){

                $res_data   = $response['decode'];

                      /*Log::channel('stderr')->info("############");
                      Log::channel('stderr')->info(">>>> (CpID) : ".$betslip["coupon_code"]." | ".$res_status." >>>>>");
                      Log::channel('stderr')->info($res_data['events']);
                      Log::channel('stderr')->info($response);
                      Log::channel('stderr')->info("############");*/

                if($res_data['status'] == 1){

                    $re_calculated  = $res_data['recalculated'];
                    $updated_events = $res_data['events'];

                    $betslip->json    = json_encode($updated_events);

                    if($betslip->state === "running"){

                        if($res_data['cashout'] > 0 && !in_array($betslip->user_id, $Blacklisted_Users) ){

                            $betslip->cashout   = $res_data['cashout'];

                        }else{

                            $betslip->cashout   = null;
                        }

                    }else{

                            $betslip->cashout   = null;
                    }

                    if($re_calculated){

                        $betslip->coef    = $res_data['coef'];
                        $betslip->gain    = $res_data['gain'];
                        $betslip->gainMax = $res_data['gainMax'];
                        $betslip->prime   = $res_data['prime'];

                    }


                    $betslip->update();
                    $count++;

                }else{


                    $betslip->cashout   = null;
                    $betslip->update();

                }


            }

        }



    }

    $msg = $count.' BETSLIPS validated successfully :)'; 
    $this->info($msg);


}



}

