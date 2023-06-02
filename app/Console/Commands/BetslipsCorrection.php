<?php

namespace App\Console\Commands;

error_reporting (E_ALL ^ E_NOTICE);

use Illuminate\Console\Command;
use App\User;
use App\Betslip;

class BetslipsCorrection extends Command{

protected $signature = 'betslips:correction';

protected $description = 'Correction Betslip  every 2 minutes :)';

    public function __construct(){
        parent::__construct();
    }

    public function getPercentOfNumber($number, $percent){

            return ($percent / 100) * $number;
    }


public function handle(){

    $betslips = Betslip::where([['test','=','YES'],['state','=','running']])->get();

    $betslips_losts    = 0;
    $betslips_wons     = 0;
    $betslips_running  = 0;

    foreach ($betslips as $betslip) {

        $betslip_id     = $betslip->coupon_code; 
        $betslip_events =  json_decode($betslip->json,true);

        $lost_nb   = 0;
        $won_nb    = 0;
        $cancel_nb    = 0;
        $run_nb    = 0;
        $events_nb = 0;

        $go = true;
        foreach ($betslip_events as $event) {

           $events_nb++;

                if($betslip->state === "running"){

                   if($event['event_state'] === "lost" ){

                        $lost_nb++;    

                   }

                   if($event['event_state'] === "won" ){

                        $won_nb++;

                   }                   


                   if($event['event_state'] === "cancel" ){

                        $cancel_nb++;

                   }         

                   if($event['event_state'] === "open" ){

                        $run_nb++;

                   }         

                }else{


                    $go = false;
                }          


        }


        if($go){

            if($lost_nb > 0 ){

                $betslips_losts++;
                $betslip->state = "lost";
                $betslip->cashout = null;
                $betslip->update();

                $cashBack = $this->getPercentOfNumber($betslip->stake,10);
                $user = User::where([['id','=',$betslip->user_id]])->first();
                $user->sold_sport = ($user->sold_sport + $cashBack);
                $user->update();


                echo $betslip->coupon_code." Lost  \r\n";

            }elseif( ($won_nb === $events_nb) ){

                $betslips_wons++;
                $betslip->state = "win";
                $betslip->cashout = null;

                if($betslip->gainMax < 500){

                    $user = User::where([['id','=',$betslip->user_id]])->first();
                    $user->sold_sport = ($user->sold_sport + $betslip->gainMax);
                    $user->update();
                    
                }else{

                    $betslip->manuel = "_VERIFY";

                }


                $betslip->update();
                echo $betslip->coupon_code." Won  \r\n";

            }else{


                $betslips_running++;
                echo $betslip->coupon_code." En cours  \r\n";
            }

        }


    }

    $msg = "";
    $msg .= $betslips_losts." Betslips Loses :( \r\n"; 
    $msg .= $betslips_wons." Betslips Wons  :D \r\n"; 
    $msg .= $betslips_running." Betslips Running :) \r\n"; 

    $this->info($msg);


}



}

