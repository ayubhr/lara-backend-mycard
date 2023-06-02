<?php

namespace App\Classes\Correction;

error_reporting (E_ALL ^ E_NOTICE);

class Handball {


public function getOverUnderValue($str){
  return (float) filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}


public function validateHandballEvent($event){


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

      if($odd['odd_name'] === "X"){
        
           if($home_scorefinal === $away_scorefinal){

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

            if( ($home_scorefinal+$away_scorefinal) >= round($OverUnderValue) ){

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
    case ['Double Chance', 'Finished'] :

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

      break;

    case ['Halftime/Fulltime', 'Finished'] : 

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

    break;

    case ['Both teams to score', 'Finished'] :

      if($odd['odd_name'] === "Yes"){

            if( ($home_scorefinal > 0) && ($away_scorefinal > 0) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_scorefinal > 0) && ($away_scorefinal > 0) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

    break;
    case ['1X2 & Over/Under', 'Finished'] :

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


    break;
    case ['Correct Score', 'Finished'] :


            if( $scorefinal === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

    break;    
    case ['Home Over/Under', 'Finished'] :
    case ['Total Team 1', 'Finished'] :

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
    case ['Total Team 2', 'Finished'] :

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
    case ['Home team to score', 'Finished'] : 


        if($odd['odd_name'] === "Yes"){


            if( $home_scorefinal > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( $home_scorefinal < 1 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        



    break; 
    case ['Away team to score', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){


            if( $away_scorefinal > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( $away_scorefinal < 1 ){

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
    case ['HT1orFT1', 'Finished'] : 

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


    break;  
    case ['HT2orFT2', 'Finished'] : 

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


    break;  
    case ['HTXorFTX', 'Finished'] : 

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

    break; 
    case ['1st half Result', 'Finished'] : 

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


    break; 
    case ['1st half Double Chance', 'Finished'] : 

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

    break; 
    case ['1st half Over/Under', 'Finished'] :
    case ['1st Half: Over/Under', 'Finished'] :  
    case ['1st Half: Total', 'Finished'] : 

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
    case ['1st half Home Over/Under', 'Finished'] : 

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
    case ['1st half Away Over/Under', 'Finished'] : 

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
    case ['1st half Home team to score', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){


            if( $home_score1h > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( $home_score1h < 1 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case ['1st half Away team to score', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){


            if( $away_score1h > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( $away_score1h < 1 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case ['1st half Both teams to score', 'Finished'] : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score1h > 0) && ($away_score1h > 0) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score1h > 0) && ($away_score1h > 0) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

    break;   
    case ['1st half Correct Score', 'Finished'] : 

            if( $score1h === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

    break;                                
    case ['2nd half Result', 'Finished'] : 

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


    break; 
    case ['2nd half Double Chance', 'Finished'] : 

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

    break; 
    case ['2nd half Over/Under', 'Finished'] :
    case ['2nd Half: Over/Under', 'Finished'] : 
    case ['2nd Half Total', 'Finished'] :  
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
    case ['2nd half Home Over/Under', 'Finished'] : 

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
    case ['2nd half Away Over/Under', 'Finished'] : 

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
    case ['2nd half Home team to score', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){


            if( $home_score2h > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( $home_score2h < 1 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case ['2nd half Away team to score', 'Finished'] : 

        if($odd['odd_name'] === "Yes"){


            if( $away_score2h > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }

        if($odd['odd_name'] === "No"){


            if( $away_score2h < 1 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

        }        

    break; 
    case ['2nd half Both teams to score', 'Finished'] : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score2h > 0) && ($away_score2h > 0) ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score2h > 0) && ($away_score2h > 0) ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

    break;   
    case ['2nd half Correct Score', 'Finished'] : 

            if( $score2h === $odd['odd_name'] ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }

    break;                                 
    case ['Exact Number of Goals', 'Finished'] : 

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


    break; 
    case ['Goals Home Team', 'Finished'] : 

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
    break; 
    case ['Goals Away Team', 'Finished'] : 

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

    break; 
    case ['1st Half Over (0.5)', 'Finished'] : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score1h+$away_score1h) > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score1h+$away_score1h) > 0 ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

    break; 
    case ['2nd Half Over (0.5)', 'Finished'] : 

      if($odd['odd_name'] === "Yes"){

            if( ($home_score2h+$away_score2h) > 0 ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( ($home_score2h+$away_score2h) > 0 ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }

    break; 
    case ['Goal in Both Halves', 'Finished'] : 

      if($odd['odd_name'] === "Yes"){

            if( (($home_score1h+$away_score1h) > 0) && (($home_score2h+$away_score2h) > 0)  ){

              $isValid = "won";

            }else{

              $isValid = "lost";

            }
      }

      if($odd['odd_name'] === "No"){

            if( (($home_score1h+$away_score1h) > 0) && (($home_score2h+$away_score2h) > 0)  ){

              $isValid = "lost";

            }else{

              $isValid = "won";

            }
      }
    break; 
    case ['GG & GG Yes', 'Finished'] : 

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

    break;   
    case ['X & GG', 'Finished'] :

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

    break;
    case ['Double Chance and Over/Under', 'Finished'] :


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


    break;
    case ['1X2 & GG/NG', 'Finished'] :

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

    break;
    case ['Over/Under & GG/NG', 'Finished'] :

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

    break;
    case ['Halftime/Fulltime & Over/Under', 'Finished'] :

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


    break;
    case ['1st half Exact Number of Goals', 'Finished'] :


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


    break;
    case ['1st half Goals Home Team', 'Finished'] :

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


    break;
    case ['1st half Goals Away Team', 'Finished'] :

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

    break; 
    case ['1st half Odd/Even', 'Finished'] :

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
    break;   
    case ['2nd half Odd/Even', 'Finished'] :

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
    break;
    case ['2nd half Exact Number of Goals', 'Finished'] :

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


    break;
    case ['2nd half Goals Home Team', 'Finished'] :

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


    break;
    case ['2nd half Goals Away Team', 'Finished'] :

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

    break;
    case ['Next Goal', 'Finished'] :
    case ['Next Goal', '1st half'] :
    case ['Next Goal', '2nd half'] :
    case ['Next Goal', 'Halftime'] :

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
    case ['Rest of the Match', 'Finished'] :

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