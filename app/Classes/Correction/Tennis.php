<?php

namespace App\Classes\Correction;

error_reporting (E_ALL ^ E_NOTICE);

class Tennis {


public function getOverUnderValue($str){
  return (float) filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}


public function validateTennisEvent($event){


/******************** Init Event data **************************/
$score_array  = $event['event_score'];
$odds_array   = $event['odds'];
$event_period = $event['event_period'];


$isLive       = $event['isEventLive'];

if($isLive){

  $scoreTemp = $event['scoreTemp'];

}
/******************** Init Event data **************************/


if( !isset($score_array['ft_score']) ){


    return "open";

}else{

if( $score_array['ft_score'] === "null:null" || $score_array['ft_score'] === "null" ){

    return "open";

}

}


if( empty($score_array['ft_score']) ){

    return "open";

}

//TWO PLAYERS
$scorefinal    = $score_array['ft_score'];

$set1_score    = $score_array['s1_score'];
$set2_score    = $score_array['s2_score'];
$set3_score    = $score_array['s3_score'];


//PLAYER HOME
$player1_scorefinal = (int) explode(":",$scorefinal)[0];
$player1_set1_score = (int) explode(":",$set1_score)[0];
$player1_set2_score = (int) explode(":",$set2_score)[0];
$player1_set3_score = (int) explode(":",$set3_score)[0];

//PLAYER AWAY
$player2_scorefinal = (int) explode(":",$scorefinal)[1];
$player2_set1_score = (int) explode(":",$set1_score)[1];
$player2_set2_score = (int) explode(":",$set2_score)[1];
$player2_set3_score = (int) explode(":",$set3_score)[1];


$player1_TotalSets = ($player1_set1_score+$player1_set2_score+$player1_set3_score);
$player2_TotalSets = ($player2_set1_score+$player2_set2_score+$player2_set3_score);  



$isValid = "open";

foreach ($odds_array as $odd) {

  switch ([$odd['market_name'], $event_period]) {
    case ['Result', 'Finished'] :
      
      if($odd['odd_name'] === "1"){

          if($player1_scorefinal > $player2_scorefinal){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

      if($odd['odd_name'] === "2"){
        
            if($player2_scorefinal > $player1_scorefinal){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }


    break;
    case ['Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($player1_TotalSets+$player2_TotalSets)  >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($player1_TotalSets+$player2_TotalSets) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      break;
    case ['1st Set/Match', 'Finished'] : 

      if($odd['odd_name'] === "1/1"){

            if( ($player1_set1_score > $player2_set1_score) && ($player1_scorefinal > $player2_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "1/2"){

            if( ($player1_set1_score > $player2_set1_score) && ($player2_scorefinal > $player1_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }


      if($odd['odd_name'] === "2/1"){

            if( ($player2_set1_score > $player1_set1_score) && ($player1_scorefinal > $player2_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2/2"){

            if( ($player2_set1_score > $player1_set1_score) && ($player2_scorefinal > $player1_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;
    case ['Correct Score', 'Finished'] :

            if( $scorefinal === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

    break;    
    case ['Total Odd/Even', 'Finished'] : 


        if($odd['odd_name'] === "Even"){


            if( ($player1_scorefinal + $player2_scorefinal) % 2 == 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "Odd"){


            if( ($player1_scorefinal + $player2_scorefinal) % 2 != 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        


    break;  
    case ['1st Set: Total Odd/Even', 'Finished'] : 

        if($odd['odd_name'] === "Even"){


            if( ($player1_set1_score + $player2_set1_score) % 2 == 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "Odd"){


            if( ($player1_set1_score + $player2_set1_score) % 2 != 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        


    break;  
    case ['1st Set: Score', 'Finished'] : 


            if( $set1_score === $odd['odd_name'] ){


              $isValid = "won";

            }else{

              $isValid = "lost";

            }

    break; 
    case ['1st Set: Winner', 'Finished'] : 

      if($odd['odd_name'] === "1"){

            if($player1_set1_score > $player2_set1_score){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($player2_set1_score > $player1_set1_score){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }


    break; 
    case ['1st Set: Total', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($player1_set1_score+$player2_set1_score) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($player1_set1_score+$player2_set1_score) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['2nd Set: Total Odd/Even', 'Finished'] : 

        if($odd['odd_name'] === "Even"){


            if( ($player1_set2_score + $player2_set2_score) % 2 == 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "Odd"){


            if( ($player1_set2_score + $player2_set2_score) % 2 != 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        


    break;  
    case ['2nd Set: Score', 'Finished'] : 


            if( $set2_score === $odd['odd_name'] ){


              $isValid = "won";

            }else{

              $isValid = "lost";

            }

    break; 
    case ['2nd Set: Winner', 'Finished'] : 

      if($odd['odd_name'] === "1"){

            if($player1_set2_score > $player2_set2_score){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($player2_set2_score > $player1_set2_score){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }


    break; 
    case ['2nd Set: Total', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($player1_set2_score+$player2_set2_score) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($player1_set2_score+$player2_set2_score) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;      
    default:
      $isValid = "open";
  }


}


return $isValid; 

}




}