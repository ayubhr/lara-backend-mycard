<?php

namespace App\Classes\Correction;

error_reporting (E_ALL ^ E_NOTICE);

class Basketball {


public function getOverUnderValue($str){
  return (float) filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}


public function validateBasketballEvent($event){


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

//FINAL SCORE
$scorefinal    = $score_array['ft_score'];

//QUARTERS SCORE
$q1_score    = $score_array['q1_score'];
$q2_score    = $score_array['q2_score'];
$q3_score    = $score_array['q3_score'];
$q4_score    = $score_array['q4_score'];


//HOME TEAM
$home_score1q    = (int) explode(":",$q1_score)[0];
$home_score2q    = (int) explode(":",$q2_score)[0];
$home_score3q    = (int) explode(":",$q3_score)[0];
$home_score4q    = (int) explode(":",$q4_score)[0];
$home_scorefinal = (int) explode(":",$scorefinal)[0];
$home_score1h    = ($home_score1q+$home_score2q);
$home_score2h    = ($home_score3q+$home_score4q);

//AWAY TEAM
$away_score1q    = (int) explode(":",$q1_score)[1];
$away_score2q    = (int) explode(":",$q2_score)[1];
$away_score3q    = (int) explode(":",$q3_score)[1];
$away_score4q    = (int) explode(":",$q4_score)[1];
$away_scorefinal = (int) explode(":",$scorefinal)[1];
$away_score1h    = ($away_score1q+$away_score2q);
$away_score2h    = ($away_score3q+$away_score4q);


$isValid = "open";

foreach ($odds_array as $odd) {

  switch ([$odd['market_name'], $event_period]) {
    case ['Result', 'Finished'] :
      
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


      break;
    case ['Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_scorefinal+$away_scorefinal)  >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_scorefinal+$away_scorefinal) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;
    case ['Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_scorefinal) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_scorefinal) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;
    case ['Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_scorefinal) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_scorefinal) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;        
    case ['1st Quarter/Match', 'Finished'] : 

      if($odd['odd_name'] === "1/1"){

            if( ($home_score1q > $away_score1q) && ($home_scorefinal > $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

  
      if($odd['odd_name'] === "2/2"){

            if( ($away_score1q > $home_score1q) && ($away_scorefinal > $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;
    case ['Halftime/Fullime', 'Finished'] : 

      if($odd['odd_name'] === "1/1"){

            if( ( $home_score1h > $away_score1h  ) && ($home_scorefinal > $away_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

  
      if($odd['odd_name'] === "2/2"){

            if( ($away_score1h  > $home_score1h) && ($away_scorefinal > $home_scorefinal) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;    
    case ['Overtime', 'Finished'] :

        if($odd['odd_name'] === "Yes"){

            if( $home_scorefinal == $away_scorefinal ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){

            if( $home_scorefinal != $away_scorefinal ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }
    break;    
    case ['Odd/Even', 'Finished'] : 


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


    break;  
    case ['Home win in all Quarters', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){

            if( (($home_score1q>$away_score1q) && ($home_score2q>$away_score2q) && ($home_score3q>$away_score3q) && ($home_score4q>$away_score4q))  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( !(($home_score1q>$away_score1q) && ($home_score2q>$away_score2q) && ($home_score3q>$away_score3q) && ($home_score4q>$away_score4q))  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        


    break;  
    case ['Away win in all Quarters', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){

            if( (($home_score1q<$away_score1q) && ($home_score2q<$away_score2q) && ($home_score3q<$away_score3q) && ($home_score4q<$away_score4q))  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( !(($home_score1q<$away_score1q) && ($home_score2q<$away_score2q) && ($home_score3q<$away_score3q) && ($home_score4q<$away_score4q))  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        


    break;    
    case ['Home win in Both Halves', 'Finished'] : 


        if($odd['odd_name'] === "Yes"){

            if(  ($home_score1h>$away_score1h) && ($home_score2h>$away_score2h)  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if(  !(($home_score1h>$away_score1h) && ($home_score2h>$away_score2h))  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        } 

    break; 
    case ['Away win in Both Halves', 'Finished'] : 


        if($odd['odd_name'] === "Yes"){

            if(  ($away_score1h>$home_score1h) && ($away_score2h>$home_score2h)  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){

            if(  !(($away_score1h>$home_score1h) && ($away_score2h>$home_score2h))  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        } 

    break;     
    case ['1st Half: Result', 'Finished'] : 

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
        
            if($away_score1h == $home_score1h){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

    break; 
    case ['1st Half: Over/Under', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score1h+$away_score1h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score1h+$away_score1h) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['1st Half: Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score1h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score1h) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case ['1st Half: Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score1h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_score1h) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;        
    case ['2nd Half: Result', 'Finished'] : 

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
        
            if($away_score2h == $home_score2h){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

    break; 
    case ['2nd Half: Over/Under', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score2h+$away_score2h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score2h+$away_score2h) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['2nd Half: Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score2h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score2h) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case ['2nd Half: Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score2h) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_score2h) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;      
     case ['1st Quarter: Result', 'Finished'] : 

      if($odd['odd_name'] === "1"){

            if($home_score1q > $away_score1q){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($away_score1q > $home_score1q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
            if($away_score1q == $home_score1q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

    break; 
    case ['1st Quarter: Over/Under', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score1q+$away_score1q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score1q+$away_score1q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['1st Quarter: Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score1q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score1q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case ['1st Quarter: Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score1q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_score1q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;  
    case ['2nd Quarter: Result', 'Finished'] : 

      if($odd['odd_name'] === "1"){

            if($home_score2q > $away_score2q){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($away_score2q > $home_score2q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
            if($away_score2q == $home_score2q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

    break; 
    case ['2nd Quarter: Over/Under', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score2q+$away_score2q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score2q+$away_score2q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['2nd Quarter: Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score2q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score2q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case ['2nd Quarter: Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score2q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_score2q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;    
    case ['3rd Quarter: Result', 'Finished'] : 

      if($odd['odd_name'] === "1"){

            if($home_score3q > $away_score3q){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($away_score3q > $home_score3q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
            if($away_score3q == $home_score3q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

    break; 
    case ['3rd Quarter: Over/Under', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score3q+$away_score3q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score3q+$away_score3q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['3rd Quarter: Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score3q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score3q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case ['3rd Quarter: Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score3q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_score3q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break; 
    case ['4th Quarter: Result', 'Finished'] : 

      if($odd['odd_name'] === "1"){

            if($home_score4q > $away_score4q){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "2"){
        
            if($away_score4q > $home_score4q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

      if($odd['odd_name'] === "X"){
        
            if($away_score4q == $home_score4q){

              $isValid = "won";

            }else{

              $isValid = "lost";
            }
      }

    break; 
    case ['4th Quarter: Over/Under', 'Finished'] : 

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score4q+$away_score4q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score4q+$away_score4q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }
    break;   
    case ['4th Quarter: Home Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($home_score4q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($home_score4q) < round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

    break;   
    case ['4th Quarter: Away Over/Under', 'Finished'] :

      $OverUnderValue = $this->getOverUnderValue($odd['odd_name']);
      $type = explode(" ", $odd['odd_name'])[0];

      if($type === "Over"){

            if( ($away_score4q) >= round($OverUnderValue) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

      }

      if($type === "Under"){

            if( ($away_score4q) < round($OverUnderValue) ){

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