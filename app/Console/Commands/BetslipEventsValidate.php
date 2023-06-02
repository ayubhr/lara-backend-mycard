<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Betslip;
use App\Classes\Correction\Football;
use App\Classes\Correction\Tennis;
use App\Classes\Correction\Basketball;
use App\Classes\Correction\Handball;
use App\Classes\Correction\Hockey;

class BetslipEventsValidate extends Command{

protected $signature = 'events:validate';

protected $description = 'Validate Betslip events every 2 minutes :)';

public function __construct(){
    parent::__construct();
}

public function handle(){

    $Football   = new Football();
    $Tennis     = new Tennis();
    $Basketball = new Basketball();
    $Handball   = new Handball();
    $Hockey     = new Hockey();

    $betslips = Betslip::whereNull('test')->get();

    $count = 0;

    foreach ($betslips as $betslip) {

        $betslip_id     = $betslip->coupon_code; 
        $betslip_events =  json_decode($betslip->json,true);


        foreach ($betslip_events as &$event) {

           if( $event['event_state'] === "open" || $event['event_state'] === "cancel"  ){


                if($event['event_sport'] === "Football"){

                    $validator_state = $Football->validateFootballEvent($event);

                    $event['event_state'] = $validator_state;

                    if(isset($event['odds'][0]['isWinner'])){
                        
                        $event['odds'][0]['isWinner'] = $validator_state; 

                    }

                    $event['updated_odds_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                    echo "FOOT >> ".$event['event_home'].' - '.$event['event_away']." ===> ".$validator_state." \r\n";

                    $count++;

                }elseif($event['event_sport'] === "Basketball"){

                    $validator_state = $Basketball->validateBasketballEvent($event);

                    $event['event_state'] = $validator_state;

                    if(isset($event['odds'][0]['isWinner'])){
                        
                        $event['odds'][0]['isWinner'] = $validator_state; 

                    }

                    $event['updated_odds_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                    echo "BASKET >> ".$event['event_home'].' - '.$event['event_away']." ===> ".$validator_state." \r\n";

                    $count++;

                }elseif($event['event_sport'] === "Handball"){

                    $validator_state = $Handball->validateHandballEvent($event);

                    $event['event_state'] = $validator_state;

                    if(isset($event['odds'][0]['isWinner'])){
                        
                        $event['odds'][0]['isWinner'] = $validator_state; 

                    }

                    $event['updated_odds_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                    echo "Handball >> ".$event['event_home'].' - '.$event['event_away']." ===> ".$validator_state." \r\n";

                    $count++;

                }elseif($event['event_sport'] === "Tennis"){

                    $validator_state = $Tennis->validateTennisEvent($event);

                    $event['event_state'] = $validator_state;

                    if(isset($event['odds'][0]['isWinner'])){
                        
                        $event['odds'][0]['isWinner'] = $validator_state; 

                    }

                    $event['updated_odds_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                    echo "TENNIS >> ".$event['event_home'].' - '.$event['event_away']." ===> ".$validator_state." \r\n";

                    $count++;

                }elseif($event['event_sport'] === "Ice Hockey"){

                    $validator_state = $Hockey->validateHockeyEvent($event);

                    $event['event_state'] = $validator_state;

                    if(isset($event['odds'][0]['isWinner'])){
                        
                        $event['odds'][0]['isWinner'] = $validator_state; 

                    }

                    $event['updated_odds_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                    echo "HOCKEY >> ".$event['event_home'].' - '.$event['event_away']." ===> ".$validator_state." \r\n";

                    $count++;

                }                

                
           }


        }

        $betslip->json = json_encode($betslip_events);
        $betslip->save();

    }

    $msg = $count.' Events validated successfully :)'; 
    $this->info($msg);


}



}


