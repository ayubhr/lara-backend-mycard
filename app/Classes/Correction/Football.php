<?php

namespace App\Classes\Correction;

error_reporting (E_ALL ^ E_NOTICE);

class Football {


public function getOverUnderValue($str){
  return (float) filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}


public function validateFootballEvent($event){


/******************** Init Event data **************************/
$score_array  = $event['event_score'];
$odds_array   = $event['odds'];
$event_period = $event['event_period'];

$isLive       = $event['isEventLive'];

if($isLive){

  $scoreTemp = $event['scoreTemp'];
}
/******************** Init Event data **************************/

if($event_period === "Interrupted"){

    return "cancel";

}


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

//TWO TEAMS
$score1h    = $score_array['ht1_score'];
$score2h    = $score_array['ht2_score'];
$scorefinal = $score_array['ft_score'];

//HOME TEAM
$home_score1h    = (int) explode(":",$score1h)[0];
$home_score2h    = (int) explode(":",$score2h)[0];
$home_scorefinal = (int) explode(":",$scorefinal)[0];

//AWAT TEAM
$away_score1h    = (int) explode(":",$score1h)[1];
$away_score2h    = (int) explode(":",$score2h)[1];
$away_scorefinal = (int) explode(":",$scorefinal)[1];

$isValid = "open";

foreach ($odds_array as $odd) {

  switch ($odd['market_name']) {

    case 'Result':

      if($event_period === "Finished") {

        if($odd['odd_name'] === "1"){

              if($home_scorefinal > $away_scorefinal){

                $isValid = "won";

              }else{

                $isValid = "lost";

              }
        }

      if($odd['odd_name'] === "2"){
        
            if($away_scorefinal > $home_scorefinal){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
           if($home_scorefinal === $away_scorefinal){

              $isValid = "won";

           }else{

              $isValid = "lost";

           } 
      }     

      }
      break;

    case 'Win/Draw/Win':

      if($event_period === "Finished") {

        if($odd['odd_name'] === "1"){

              if($home_scorefinal > $away_scorefinal){

                $isValid = "won";

              }else{

                $isValid = "lost";

              }
        }

      if($odd['odd_name'] === "2"){
        
            if($away_scorefinal > $home_scorefinal){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
           if($home_scorefinal === $away_scorefinal){

              $isValid = "won";

           }else{

              $isValid = "lost";

           } 
      }     

      }
      break;      
    case 'Over/Under' :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {

                $isValid = "lost";

              }

            }

      }

      if($type === "Under"){

            if( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) ){

              if($event_period === "Finished") {

                  $isValid = "won";

              }

            }else{

              $isValid = "lost";

            }
      }

      break;
    case 'Double Chance' :

      if($event_period === "Finished") {
      if($odd['odd_name'] === "1X"){

            if($home_scorefinal >= $away_scorefinal){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "X2"){

            if($away_scorefinal >= $home_scorefinal){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "12"){

            if($home_scorefinal != $away_scorefinal){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
      }
      break;

    case 'Halftime/Fulltime' : 
    case 'Halftime/Fullime':

      if($event_period === "Finished") {
      if($odd['odd_name'] === "1/1"){

            if( ($home_score1h > $away_score1h) && ($home_scorefinal > $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "1/X"){

            if( ($home_score1h > $away_score1h) && ($home_scorefinal === $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "1/2"){

            if( ($home_score1h > $away_score1h) && ($away_scorefinal > $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "X/1"){

            if( ($home_score1h === $away_score1h) && ($home_scorefinal > $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "X/X"){

            if( ($home_score1h === $away_score1h) && ($home_scorefinal === $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "X/2"){

            if( ($home_score1h === $away_score1h) && ($away_scorefinal > $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2/1"){

            if( ($away_score1h > $home_score1h) && ($home_scorefinal > $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2/X"){

            if( ($away_score1h > $home_score1h) && ($home_scorefinal === $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2/2"){

            if( ($away_score1h > $home_score1h) && ($away_scorefinal > $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      }
    break;

    case 'Both teams to score' :

      if($odd['odd_name'] === "Yes"){

            if( ($home_scorefinal > 0) && ($away_scorefinal > 0) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_scorefinal > 0) && ($away_scorefinal > 0) ){

              $isValid = "lost";

            }else{

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }
      }

    break;
    case '1X2 & Over/Under' :

      if($event_period === "Finished") {
      $OverUnderValue = $this->getOverUnderValue(explode("&",$odd['odd_name'])[1]);
      $ResultOverUnder = trim(explode("&",$odd['odd_name'])[0]);

      if(substr_count($odd['odd_name'], 'Over')){


            if($ResultOverUnder === "1"){

                if( ( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) )  &&  ( $home_scorefinal > $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "2"){

                if( ( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) )  &&  ( $away_scorefinal > $home_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "X"){

                if( ( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) )  &&  ( $home_scorefinal === $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }



      }

      if(substr_count($odd['odd_name'], 'Under')){


           if($ResultOverUnder === "1"){

                if( ( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) )  &&  ( $home_scorefinal > $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "2"){

                if( ( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) )  &&  ( $away_scorefinal > $home_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "X"){

                if( ( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) )  &&  ( $home_scorefinal === $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }



      }
      }

    break;
    case 'Correct Score' :

      if($event_period === "Finished") {
            if( $scorefinal === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;    
    case 'Home Over/Under' :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_scorefinal) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($home_scorefinal) < round($OverUnderValue) ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }

    break;
    case 'Away Over/Under' :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_scorefinal) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($away_scorefinal) < round($OverUnderValue) ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{


              $isValid = "lost";

            }
      }

    break;  
    case 'Home team to score' : 


        if($odd['odd_name'] === "Yes"){


            if( $home_scorefinal > 0 ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

        }

        if($odd['odd_name'] === "No"){


            if( $home_scorefinal < 1 ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }

        }        



    break; 
    case 'Away team to score' : 

        if($odd['odd_name'] === "Yes"){


            if( $away_scorefinal > 0 ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

        }

        if($odd['odd_name'] === "No"){


            if( $away_scorefinal < 1 ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }

        }        


    break;  
    case 'Odd/Even' : 

      if($event_period === "Finished") {
        if($odd['odd_name'] === "Even"){


            if( ($home_scorefinal + $away_scorefinal) % 2 == 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "Odd"){


            if( ($home_scorefinal + $away_scorefinal) % 2 != 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        
      }

    break;  
    case 'HT1orFT1' : 

        if($event_period === "Finished") {
        if($odd['odd_name'] === "Yes"){


            if(  ($home_score1h > $away_score1h) || ($home_scorefinal > $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if(  ($home_score1h > $away_score1h) || ($home_scorefinal > $away_scorefinal) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }

        }    

        }
    break;  
    case 'HT2orFT2' : 

      if($event_period === "Finished") {
        if($odd['odd_name'] === "Yes"){


            if(  ($away_score1h > $home_score1h) || ($away_scorefinal > $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if(  ($away_score1h > $home_score1h) || ($away_scorefinal > $home_scorefinal) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }

        }    

      }
    break;  
    case 'HTXorFTX' : 

        if($event_period === "Finished") {
        if($odd['odd_name'] === "Yes"){


            if(  ($away_score1h === $home_score1h) || ($away_scorefinal === $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if(  ($away_score1h === $home_score1h) || ($away_scorefinal === $home_scorefinal) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }

        }     

      }

    break; 
    case '1st half Result' : 

      if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){

      if($odd['odd_name'] === "1"){

            if($home_score1h > $away_score1h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($away_score1h > $home_score1h){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
           if($home_score1h === $away_score1h){

              $isValid = "won";

           }else{

              $isValid = "lost";

           } 
      }     

      }

    break; 
    case '1st half Double Chance' : 

      if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
      if($odd['odd_name'] === "1X"){

            if($home_score1h >= $away_score1h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "X2"){

            if($away_score1h >= $home_score1h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "12"){

            if($home_score1h != $away_score1h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      }
    break; 
    case '1st half Over/Under' : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score1h+$away_score1h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($home_score1h+$away_score1h) < round($OverUnderValue) ){

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case '1st half Home Over/Under' : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score1h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($home_score1h) < round($OverUnderValue) ){

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }

    break; 
    case '1st half Away Over/Under' : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score1h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($away_score1h) < round($OverUnderValue) ){

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }


    break; 
    case '1st half Home team to score' : 

        if($odd['odd_name'] === "Yes"){


            if( $home_score1h > 0 ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }

        }

        if($odd['odd_name'] === "No"){


            if( $home_score1h < 1 ){

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case '1st half Away team to score' : 

        if($odd['odd_name'] === "Yes"){

            if( $away_score1h > 0 ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }

        }

        if($odd['odd_name'] === "No"){


            if( $away_score1h < 1 ){

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case '1st half Both teams to score' : 


        if($odd['odd_name'] === "Yes"){

            if( ($home_score1h > 0) && ($away_score1h > 0) ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score1h > 0) && ($away_score1h > 0) ){

              $isValid = "lost";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }
      }

    break;   
    case '1st half Correct Score' : 

        if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){

            if( $score1h === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

    break;                                
    case '2nd half Result' : 

    if($event_period === "Finished") {
      if($odd['odd_name'] === "1"){

            if($home_score2h > $away_score2h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($away_score2h > $home_score2h){ 

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
           if($home_score2h === $away_score2h){

              $isValid = "won";

           }else{

              $isValid = "lost";

           } 
      }     

    }
    break; 
    case '2nd half Double Chance' : 

      if($event_period === "Finished") {
      if($odd['odd_name'] === "1X"){

            if($home_score2h >= $away_score2h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "X2"){

            if($away_score2h >= $home_score2h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "12"){

            if($home_score2h != $away_score2h){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    }
    break; 
    case '2nd half Over/Under' : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score2h+$away_score2h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
                $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($home_score2h+$away_score2h) < round($OverUnderValue) ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case '2nd half Home Over/Under' : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score2h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($home_score2h) < round($OverUnderValue) ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }


    break; 
    case '2nd half Away Over/Under' : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score2h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

      }

      if($type === "Under"){

            if( ($away_score2h) < round($OverUnderValue) ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }
      }

    break; 
    case '2nd half Home team to score' : 

        if($odd['odd_name'] === "Yes"){


            if( $home_score2h > 0 ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

        }

        if($odd['odd_name'] === "No"){


            if( $home_score2h < 1 ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case '2nd half Away team to score' : 

        if($odd['odd_name'] === "Yes"){


            if( $away_score2h > 0 ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }

        }

        if($odd['odd_name'] === "No"){


            if( $away_score2h < 1 ){

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case '2nd half Both teams to score' : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score2h > 0) && ($away_score2h > 0) ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score2h > 0) && ($away_score2h > 0) ){

              $isValid = "lost";

            }else{
              if($event_period === "Finished") {
              $isValid = "won";
              }

            }
      }

    break;   
    case '2nd half Correct Score' : 

          if($event_period === "Finished") {
            if( $score2h === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
          }

    break;                                 
    case 'Exact Number of Goals' : 

      if($event_period === "Finished") {
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( ($home_scorefinal+$away_scorefinal) >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( ($home_scorefinal+$away_scorefinal) === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

    }
    break; 
    case 'Goals Home Team' : 

      if($event_period === "Finished") {
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( $home_scorefinal >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( $home_scorefinal === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

    }
    break; 
    case 'Goals Away Team' : 

      if($event_period === "Finished") {
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( $away_scorefinal >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( $away_scorefinal === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

    }
    break; 
    case '1st Half Over (0.5)' : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score1h+$away_score1h) > 0 ){

              $isValid = "won";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "lost";
              }

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score1h+$away_score1h) > 0 ){

              $isValid = "lost";

            }else{

              if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
              $isValid = "won";
              }

            }
      }

    break; 
    case '2nd Half Over (0.5)' : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score2h+$away_score2h) > 0 ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score2h+$away_score2h) > 0 ){

              $isValid = "lost";

            }else{

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }
      }

    break; 
    case 'Goal in Both Halves' : 

      if($odd['odd_name'] === "Yes"){

            if( (($home_score1h+$away_score1h) > 0) && (($home_score2h+$away_score2h) > 0)  ){

              $isValid = "won";

            }else{

              if($event_period === "Finished") {
              $isValid = "lost";
              }

            }
      }

      if($odd['odd_name'] === "No"){

            if( (($home_score1h+$away_score1h) > 0) && (($home_score2h+$away_score2h) > 0)  ){

              $isValid = "lost";

            }else{

              if($event_period === "Finished") {
              $isValid = "won";
              }

            }
      }
    break; 
    case 'GG & GG Yes' : 

      if($event_period === "Finished") {
      if($odd['odd_name'] === "Yes"){

            if( (($home_score1h > 0) && ($away_score1h > 0)) && (($home_score2h > 0) && ($away_score2h > 0))  ){

              $isValid = "won";

            }else{


              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( (($home_score1h > 0) && ($away_score1h > 0)) && (($home_score2h > 0) && ($away_score2h > 0))  ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

      }
    break;   
    case 'X & GG' :

      if($event_period === "Finished") {
      if($odd['odd_name'] === "Yes"){

            if( (($home_scorefinal > 0) && ($away_scorefinal > 0)) && ($home_scorefinal === $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( (($home_scorefinal > 0) && ($away_scorefinal > 0)) && ($home_scorefinal === $away_scorefinal) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

      }

    break;
    case 'Double Chance and Over/Under' :

      if($event_period === "Finished") {
      $OverUnderValue = $this->getOverUnderValue(explode("&",$odd['odd_name'])[1]);
      $ResultOverUnder = trim(explode("&",$odd['odd_name'])[0]);

      if(substr_count($odd['odd_name'], 'Over')){


            if($ResultOverUnder === "1X"){

                if( ( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) )  &&  ( $home_scorefinal >= $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "X2"){

                if( ( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) )  &&  ( $away_scorefinal >= $home_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "12"){

                if( ( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) )  &&  ( $home_scorefinal != $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }



      }

      if(substr_count($odd['odd_name'], 'Under')){


           if($ResultOverUnder === "1X"){

                if( ( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) )  &&  ( $home_scorefinal >= $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "X2"){

                if( ( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) )  &&  ( $away_scorefinal >= $home_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }


            if($ResultOverUnder === "12"){

                if( ( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) )  &&  ( $home_scorefinal != $away_scorefinal) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }

            }



      }

    }

    break;
    case '1X2 & GG/NG' :

        if($event_period === "Finished") {
        if($odd['odd_name'] === "1 & GG"){

              if( ($home_scorefinal>$away_scorefinal) && $away_scorefinal > 0  ){

                  $isValid = "won";

              }else{

                  $isValid = "lost";

               }
        }


        if($odd['odd_name'] === "1 & NG"){

              if( ($home_scorefinal>$away_scorefinal) && $away_scorefinal < 1  ){

                  $isValid = "won";

              }else{

                  $isValid = "lost";

               }
        }


        if($odd['odd_name'] === "2 & GG"){

              if( ($away_scorefinal>$home_scorefinal) && $home_scorefinal > 0  ){

                  $isValid = "won";

              }else{

                  $isValid = "lost";

               }
        }


        if($odd['odd_name'] === "2 & NG"){

              if( ($away_scorefinal>$home_scorefinal) && $home_scorefinal < 1  ){

                  $isValid = "won";

              }else{

                  $isValid = "lost";

               }
        }



        if($odd['odd_name'] === "X & GG"){

              if( ($home_scorefinal === $away_scorefinal) && ($home_scorefinal > 0 && $away_scorefinal > 0)   ){

                  $isValid = "won";

              }else{

                  $isValid = "lost";

               }
        }


        if($odd['odd_name'] === "X & NG"){

              if( ($home_scorefinal === $away_scorefinal) && ($home_scorefinal < 1 && $away_scorefinal < 1)   ){

                  $isValid = "won";

              }else{

                  $isValid = "lost";

               }
        } 

      }
    break;
    case 'Over/Under & GG/NG' :

      if($event_period === "Finished") {
      //Over 2.5 & NG
      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);

      if( (substr_count($odd['odd_name'], 'Over')) && (substr_count($odd['odd_name'], 'GG'))  ){


          if( (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue))  &&  (($home_scorefinal > 0) && ($away_scorefinal > 0)) ){

                  $isValid = "won";

          }else{

              $isValid = "lost";

           }

      }

      if( (substr_count($odd['odd_name'], 'Under')) && (substr_count($odd['odd_name'], 'GG'))  ){


          if( (($home_scorefinal+$away_scorefinal) < round($OverUnderValue))  &&  (($home_scorefinal > 0) && ($away_scorefinal > 0)) ){

                  $isValid = "won";

          }else{

              $isValid = "lost";

           }

      }


      if( (substr_count($odd['odd_name'], 'Over')) && (substr_count($odd['odd_name'], 'NG'))  ){


          if( (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue))  &&  (($home_scorefinal < 1) || ($away_scorefinal < 1)) ){

                  $isValid = "won";

          }else{

              $isValid = "lost";

           }

      }

      if( (substr_count($odd['odd_name'], 'Under')) && (substr_count($odd['odd_name'], 'NG'))  ){


          if( (($home_scorefinal+$away_scorefinal) < round($OverUnderValue))  &&  (($home_scorefinal < 1) || ($away_scorefinal < 1)) ){

                  $isValid = "won";

          }else{

              $isValid = "lost";

           }

      }

    }

    break;
    case 'Halftime/Fulltime & Over/Under' :

      if($event_period === "Finished") {
      $HTFT = trim(explode("&",$odd['odd_name'])[0]);
      $OverUnderValue = $this->getOverUnderValue(explode("&",$odd['odd_name'])[1]);

      if( substr_count($odd['odd_name'], 'Over')  ){

          if($HTFT === "1/1" ){

                if( (($home_score1h > $away_score1h) && ($home_scorefinal > $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "1/X"){

                if( (($home_score1h > $away_score1h) && ($home_scorefinal === $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "1/2"){

                if( (($home_score1h > $away_score1h) && ($away_scorefinal > $home_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "X/1"){

                if( (($home_score1h === $away_score1h) && ($home_scorefinal > $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "X/X"){

                if( (($home_score1h === $away_score1h) && ($home_scorefinal === $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "X/2"){

                if( (($home_score1h === $away_score1h) && ($away_scorefinal > $home_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "2/1"){

                if( (($away_score1h > $home_score1h) && ($home_scorefinal > $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "2/X"){

                if( (($away_score1h > $home_score1h) && ($home_scorefinal === $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "2/2"){

                if( (($away_score1h > $home_score1h) && ($away_scorefinal > $home_scorefinal)) && (($home_scorefinal+$away_scorefinal) >= round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

      }

      if( substr_count($odd['odd_name'], 'Under')  ){

          if($HTFT === "1/1" ){

                if( (($home_score1h > $away_score1h) && ($home_scorefinal > $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "1/X"){

                if( (($home_score1h > $away_score1h) && ($home_scorefinal === $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "1/2"){

                if( (($home_score1h > $away_score1h) && ($away_scorefinal > $home_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "X/1"){

                if( (($home_score1h === $away_score1h) && ($home_scorefinal > $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "X/X"){

                if( (($home_score1h === $away_score1h) && ($home_scorefinal === $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "X/2"){

                if( (($home_score1h === $away_score1h) && ($away_scorefinal > $home_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "2/1"){

                if( (($away_score1h > $home_score1h) && ($home_scorefinal > $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "2/X"){

                if( (($away_score1h > $home_score1h) && ($home_scorefinal === $away_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($HTFT === "2/2"){

                if( (($away_score1h > $home_score1h) && ($away_scorefinal > $home_scorefinal)) && (($home_scorefinal+$away_scorefinal) < round($OverUnderValue)) ){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

      }


    }

    break;
    case '1st half Exact Number of Goals' :

      if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( ($home_score1h+$away_score1h) >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( ($home_score1h+$away_score1h) === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }


    }

    break;
    case '1st half Goals Home Team' :

      if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( ($home_score1h) >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( ($home_score1h) === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }


    }

    break;
    case '1st half Goals Away Team' :

    if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);

      if(substr_count($odd['odd_name'], '+')){

          if( $away_score1h >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( $away_score1h === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

    }
    break; 
    case '1st half Odd/Even' :

      if( in_array($event_period, array("Half-Time","Finished","2nd half")) ){
        if($odd['odd_name'] === "Even"){


            if( ($home_score1h + $away_score1h) % 2 == 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "Odd"){


            if( ($home_score1h + $away_score1h) % 2 != 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }       

      }
    break;   
    case '2nd half Odd/Even' :

      if($event_period === "Finished") {
        if($odd['odd_name'] === "Even"){


            if( ($home_score2h + $away_score2h) % 2 == 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "Odd"){


            if( ($home_score2h + $away_score2h) % 2 != 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        } 

      }
    break;
    case '2nd half Exact Number of Goals' :

      if($event_period === "Finished") {
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( ($home_score2h+$away_score2h) >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( ($home_score2h+$away_score2h) === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

      }
    break;
    case '2nd half Goals Home Team' :

      if($event_period === "Finished") {
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( ($home_score2h) >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( ($home_score2h) === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

    }
    break;
    case '2nd half Goals Away Team' :
      if($event_period === "Finished") {
      $ExactGoals = $this->getOverUnderValue($odd['odd_name']);


      if(substr_count($odd['odd_name'], '+')){

          if( $away_score2h >= $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }else{

          if( $away_score2h === $ExactGoals ){

            $isValid = "won";

          }else{

            $isValid = "lost";

          }

      }

      }

    break;
    case 'Next Goal' :

      if( $isLive && !empty($scoreTemp) ){


          $TMP_home_score = (int) explode(":",$scoreTemp)[0];
          $TMP_away_score = (int) explode(":",$scoreTemp)[1];

          if($odd['odd_name'] === "1"){

            if( ($home_scorefinal > $TMP_home_score)  ){

               $isValid = "won";

            }elseif( ( $home_scorefinal == $TMP_home_score ) && ( $away_scorefinal > $TMP_away_score ) ){

                $isValid = "lost";

            }elseif($event_period === "Finished"){

               $isValid = "lost";
            }

          }

          if($odd['odd_name'] === "2"){

            if( ( $away_scorefinal > $TMP_away_score ) ){

                $isValid = "won";

            }elseif( ( $away_scorefinal == $TMP_away_score ) && ( $home_scorefinal > $TMP_home_score ) ){

                $isValid = "lost";

            }elseif($event_period === "Finished"){


                $isValid = "lost";
                
            }


          }


          if($odd['odd_name'] === "X"){

              if( ($scorefinal === $scoreTemp) && $event_period === "Finished" ){

                  $isValid = "won";

              }elseif(  ($scorefinal != $scoreTemp) ){

                  $isValid = "lost";

              }

          }


      }


    break;
    case 'Rest of the Match' :

      if( $isLive && !empty($scoreTemp) && $event_period === "Finished" ){

          $TMP_home_score = (int) explode(":",$scoreTemp)[0];
          $TMP_away_score = (int) explode(":",$scoreTemp)[1];

          $new_home_scorefinal = ( $home_scorefinal - $TMP_home_score );
          $new_away_scorefinal = ( $away_scorefinal - $TMP_away_score );

          if($odd['odd_name'] === "1"){

                if($new_home_scorefinal > $new_away_scorefinal){

                  $isValid = "won";

                }else{

                  $isValid = "lost";

                }
          }

          if($odd['odd_name'] === "2"){
            
                if($new_away_scorefinal > $new_home_scorefinal){ 

                  $isValid = "won";

                }else{

                  $isValid = "lost";
                }
          }

          if($odd['odd_name'] === "X"){
            
               if($new_home_scorefinal === $new_away_scorefinal){

                  $isValid = "won";

               }else{

                  $isValid = "lost";

               } 
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