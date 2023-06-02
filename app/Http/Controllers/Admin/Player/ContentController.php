<?php

namespace App\Http\Controllers\Admin\Player;

use Auth;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller{


    public function formatSolde($sold){

        return number_format($sold, 2, '.', '');
    }

   public function get_create_player(){

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;

            if($admin_info->role === "admin" || $admin_info->role === "agent" || $admin_info->role === "shop"){

            $html_file = 'create-player.txt';

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;

            return $response;


            }else{

            $html_file = 'menu-'.$admin_info->role.'.txt';

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;
            $response["d"]["redirectUri"] = 'till/tmenu';

            return $response;

            }

    }

   public function get_accounts_player(){


            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            if($admin_info->role === "admin" || $admin_info->role === "agent" || $admin_info->role === "shop"){

                $query = User::where([['parent','=',$logged_id],['role','=','player']])->get();

                $players_list = '';
                $total_players = 0;
                $total_players_funds = 0;
                foreach ($query as $player) {

                    $total_players = $total_players + 1;
                    $total_players_funds = $total_players_funds + $player->sold_sport;

                    //0.00 | 2.6 | 6.00
                    $players_list .= '<li class="pt-row"> <a class="a-simple" href="#admin/cashier/player/'.$player->id.'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$player->status.'">'.$player->username.'</div> <div class="tw-fsize11 tw-fwn">Player ID : '.$player->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($player->sold_sport,2, '.', ' ').'</div> </div> </a> </li>';
                
                }


                $html_file = 'player-accounts.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
                $html = str_replace('*list-player*', $players_list, $html);
                $html = str_replace('*total_players*', $total_players, $html);
                $html = str_replace('*total_players_funds*', number_format($total_players_funds,2, '.', ' '), $html);

                $response["d"]["status"] = 200;
                $response["d"]["html"] =  $html;

                return $response;




            }else{

            $html_file = 'menu-'.$admin_info->role.'.txt';

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;
            $response["d"]["redirectUri"] = 'till/tmenu';

            return $response;

            }

    }




    public function get_player_actions($player_id){
        
        $admin_info = Auth::guard('web')->user();

        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;


            if($admin_info->role === "admin" || $admin_info->role === "agent" || $admin_info->role === "shop"){

                //SINGLE PLAYER FROM REQUEST
                $query_2 = User::where([['parent','=',$logged_id],['role','=','player'],['id','=',$player_id]])->first();

                if(!empty($query_2)){

                ///ALL PLAYERS
                $query = User::where([['parent','=',$logged_id],['role','=','player']])->get();

                $players_list = '';
                $total_players = 0;
                $total_players_funds = 0;
                foreach ($query as $player) {

                    $total_players = $total_players + 1;
                    $total_players_funds = $total_players_funds + $player->sold_sport;

                    $players_list .= '<li class="pt-row"> <a class="a-simple" href="#admin/cashier/player/'.$player->id.'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$player->status.'">'.$player->username.'</div> <div class="tw-fsize11 tw-fwn">Player ID : '.$player->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($player->sold_sport,2, '.', ' ').' | '.$this->formatSolde(floatval($player->sold_casino) / 100.00).' | '.$this->formatSolde($player->sold_livecasino).'</div> </div> </a> </li>';
                
                }

                if($query_2->status === 'active'){
                    $activity_player = '<option  value="off" >NO</option><option  value="on" selected>YES</option>';
                }else{
                    $activity_player = '<option  value="off" selected>NO</option><option  value="on">YES</option>';
                }

                $html_file = 'player-actions.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
                $html = str_replace('*list-player*', $players_list, $html);
                $html = str_replace('*total_players*', $total_players, $html);
                $html = str_replace('*total_players_funds*', number_format($total_players_funds,2, '.', ' '), $html);
                $html = str_replace('*player_username*', $query_2->username, $html);
                $html = str_replace('*player_funds*', number_format($query_2->sold_sport,2, '.', ' '), $html);
                $html = str_replace('*player_id*', $query_2->id, $html);
                $html = str_replace('*player_role*', ucfirst($query_2->role), $html);
                $html = str_replace('*created_date*', $query_2->created_at, $html);
                $html = str_replace('*player_status*', $query_2->status, $html);
                $html = str_replace('*player_activity*', $activity_player, $html);

                $response["d"]["status"] = 200;
                $response["d"]["action"] = 5;
                $response["d"]["html"] =  $html;

                return $response;



                }else{

                    $html_file = 'menu-'.$admin_info->role.'.txt';

                    $html = Storage::disk('public')->get($html_file);
                    $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                    $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

                    $response["d"]["action"] = 1;
                    $response["d"]["status"] = 200;
                    $response["d"]["html"] =  $html;
                    $response["d"]["redirectUri"] = 'till/tmenu';

                    return $response;



                }


            }else{

            $html_file = 'menu-'.$admin_info->role.'.txt';

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;
            $response["d"]["redirectUri"] = 'till/tmenu';

            return $response;

            }


    }



}
