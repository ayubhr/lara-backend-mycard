<?php

namespace App\Classes;
use App\User;

class ExecludeTree {


public function checkTree() {


    $bara_rawah = [ 2 ];

    $usersNested = User::with('seniors')->whereIn('id', $bara_rawah)->select(array('id', 'username', 'sold_sport','sold_casino','sold_livecasino','role','parent'))->get();
     
     $mycard_ids  = [];
     $players_ids = [];
     foreach ($usersNested[0]['seniors'] as $senior) {


        if($senior['role'] != "player"){
            
            array_push($mycard_ids, $senior['id']);

            if(!empty($senior['juniors'])){

                foreach ($senior['juniors'] as $junior) {

                    if($junior['role'] != "player"){

                        array_push($mycard_ids, $junior['id']);
                        if(!empty($junior['childs'])){

                            foreach ($junior['childs'] as $child) {


                                if($child['role'] != "player"){

                                    array_push($mycard_ids, $child['id']);

                                }elseif($child['role'] === "player"){


                                    array_push($players_ids, $child['id']);

                                }


                            }

                        }



                    }elseif($junior['role'] === "player"){

                        array_push($players_ids, $junior['id']);


                    }


                }


            }




        }elseif($senior['role'] === "player"){

            array_push($players_ids, $senior['id']);

        }


     }


     array_push($mycard_ids,$bara_rawah[0]);


     $dataResponse['mycard_ids']  = $mycard_ids;
     $dataResponse['mycard_count']  = count($mycard_ids);
     $dataResponse['players_ids'] = $players_ids;
     $dataResponse['players_count'] = count($players_ids);
     $dataResponse['domains_player'] = ['https://forzza.win','https://www.forzza.win'];
     $dataResponse['domains_mycard'] = ['https://mycard77.win','https://www.mycard77.win'];


     return $dataResponse;



}




}
