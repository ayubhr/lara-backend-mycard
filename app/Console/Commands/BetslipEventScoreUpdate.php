<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Betslip;
use App\Classes\Utils;
use Exception; 
use Illuminate\Support\Facades\Storage;

class BetslipEventScoreUpdate extends Command{

protected $signature = 'events:score';

protected $description = 'Update Betslip events score every 2 minutes :)';


public function __construct(){

    parent::__construct();
}


public function handle(){

    $utils = new Utils();

    $betslips = Betslip::whereNull('test')->get();

    $count = 0;

    foreach ($betslips as $betslip) {

        $betslip_id     = $betslip->coupon_code; 
        $betslip_events =  json_decode($betslip->json,true);


        foreach ($betslip_events as &$event) {

            //$days3ago = strtotime(date("Y-m-d H:i:s", strtotime("-3 day")));
            // strtotime($event['date']) > $days3ago 
            if($event['event_period'] != "Finished"  ){
                
               if(  time() > strtotime($event['date'])  ){

                   $event_res = $utils->axios("https://sportv2.mycard77.shop/cache/api/new/EventLiveResult?event_id=".$event['event_id']."&sport=".urlencode($event['event_sport'])."&ts=".$event['date']."")['decode'];


                   if($event_res['code'] === 21 ){


                        if($event['event_sport'] === "Football" ){

                          try {
                                $event_period    = $event_res['event_period'];

                                $score1h    = $event_res['event_score1H'];
                                $score2h    = $event_res['event_score2H'];
                                $scoreFinal = $event_res['event_scoreFull'];

                                $event['event_period'] = $event_period;

                                $event['event_score'] = array();

                                $event['event_score']['ht1_score'] = $score1h;
                                $event['event_score']['ht2_score'] = $score2h;
                                $event['event_score']['ft_score']  = $scoreFinal;

                                $event['updated_score_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                            }catch(Exception $e) {

                              $ErrorEvent = $event['event_id'].' | '.$event['event_home'].' - '.$event['event_away'];
                              $Errormsg = "[Error] >> (".$ErrorEvent.")  ".$e->getMessage()." \r\n";
                              Storage::disk('local')->append('cronScore_error.log', $Errormsg);


                            }

                        }elseif($event['event_sport'] === "Handball" ){

                          try {
                                $event_period    = $event_res['event_period'];

                                $score1h    = $event_res['event_score1H'];
                                $score2h    = $event_res['event_score2H'];
                                $scoreFinal = $event_res['event_scoreFull'];

                                $event['event_period'] = $event_period;

                                $event['event_score'] = array();
                                $event['event_score']['ht1_score'] = $score1h;
                                $event['event_score']['ht2_score'] = $score2h;
                                $event['event_score']['ft_score']  = $scoreFinal;

                                $event['updated_score_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                            }catch(Exception $e) {

                              $ErrorEvent = $event['event_id'].' | '.$event['event_home'].' - '.$event['event_away'];
                              $Errormsg = "[Error] >> (".$ErrorEvent.")  ".$e->getMessage()." \r\n";
                              Storage::disk('local')->append('cronScore_error.log', $Errormsg);


                            }

                        }elseif($event['event_sport'] === "Basketball"){

                            try {
                                $event_period    = $event_res['event_period'];


                                $score1q    = $event_res['event_score1Q'];
                                $score2q    = $event_res['event_score2Q'];
                                $score3q    = $event_res['event_score3Q'];
                                $score4q    = $event_res['event_score4Q'];

                                $scoreFinal = $event_res['event_scoreFull'];

                                $event['event_period'] = $event_period;

                                $event['event_score'] = array();
                                $event['event_score']['q1_score'] = $score1q;
                                $event['event_score']['q2_score'] = $score2q;
                                $event['event_score']['q3_score'] = $score3q;
                                $event['event_score']['q4_score'] = $score4q;

                                $event['event_score']['ft_score']  = $scoreFinal;


                                $event['updated_score_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                            }catch(Exception $e) {

                              $ErrorEvent = $event['event_id'].' | '.$event['event_home'].' - '.$event['event_away'];
                              $Errormsg = "[Error] >> (".$ErrorEvent.")  ".$e->getMessage()." \r\n";
                              Storage::disk('local')->append('cronScore_error.log', $Errormsg);
                              
                            }

                        }elseif($event['event_sport'] === "Tennis"){


                            try {

                                $event_period    = $event_res['event_period'];

                                $score1s    = $event_res['event_score1s'];
                                $score2s    = $event_res['event_score2s'];
                                $score3s    = $event_res['event_score3s'];

                                $scoreFinal = $event_res['event_scoreFull'];

                                $event['event_period'] = $event_period;

                                $event['event_score'] = array();
                                $event['event_score']['s1_score'] = $score1s;
                                $event['event_score']['s2_score'] = $score2s;
                                $event['event_score']['s3_score'] = $score3s;

                                $event['event_score']['ft_score']  = $scoreFinal;

                                $event['updated_score_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());


                            }catch(Exception $e) {

                              $ErrorEvent = $event['event_id'].' | '.$event['event_home'].' - '.$event['event_away'];
                              $Errormsg = "[Error] >> (".$ErrorEvent.")  ".$e->getMessage()." \r\n";
                              Storage::disk('local')->append('cronScore_error.log', $Errormsg);
                              
                            }

                        }elseif($event['event_sport'] === "Ice Hockey"){

                            try {

                                $event_period    = $event_res['event_period'];

                                $score1p    = $event_res['event_score1p'];
                                $score2p    = $event_res['event_score2p'];
                                $score3p    = $event_res['event_score3p'];

                                $scoreFinal = $event_res['event_scoreFull'];

                                $event['event_period'] = $event_period;

                                $event['event_score'] = array();
                                $event['event_score']['p1_score'] = $score1p;
                                $event['event_score']['p2_score'] = $score2p;
                                $event['event_score']['p3_score'] = $score3p;

                                $event['event_score']['ft_score']  = $scoreFinal;

                                $event['updated_score_at'] =  $event['event_state']." | ".date('Y-m-d H:i:s', time());

                            }catch(Exception $e) {

                              $ErrorEvent = $event['event_id'].' | '.$event['event_home'].' - '.$event['event_away'];
                              $Errormsg = "[Error] >> (".$ErrorEvent.")  ".$e->getMessage()." \r\n";
                              Storage::disk('local')->append('cronScore_error.log', $Errormsg);
                              
                            }

                        }


                        echo $event['event_home'].' - '.$event['event_away']." ===> updated score \r\n";
                        $count++;

                    }
                }

            }


        }

        $betslip->json = json_encode($betslip_events);
        $betslip->save();

    }

    $msg = $count.' Betslip events updated successfully :)'; 
    $this->info($msg);

}




}
