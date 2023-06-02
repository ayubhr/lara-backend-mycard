<?php

namespace App\Http\Controllers\Admin\Agency;

use Auth;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller{

   public function get_create_agency(){

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;

            if($admin_info->role === "admin"){

            $html_file = 'create-agency.txt';

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

   public function get_accounts_agency(){


            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            if($admin_info->role === "admin"){

                $query = User::where([['parent','=',$logged_id],['role','=','agent']])->get();

                $agents_list = '';
                $total_agents = 0;
                $total_agents_funds = 0;
                foreach ($query as $agent) {

                    $total_agents = $total_agents + 1;
                    $total_agents_funds = $total_agents_funds + $agent->sold_sport;

                    $agents_list .= '<li class="pt-row"> <a class="a-simple" href="#admin/agency/agent/'.$agent->id.'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$agent->status.'">'.$agent->username.'</div> <div class="tw-fsize11 tw-fwn">Agent ID : '.$agent->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($agent->sold_sport,2, '.', ' ').'</div> </div> </a> </li>';
                
                }


                $html_file = 'agency-accounts.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
                $html = str_replace('*list-agency*', $agents_list, $html);
                $html = str_replace('*total_agents*', $total_agents, $html);
                $html = str_replace('*total_agents_funds*', number_format($total_agents_funds,2, '.', ' '), $html);

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




    public function get_agency_actions($agency_id){
        
        $admin_info = Auth::guard('web')->user();

        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;


            if($admin_info->role === "admin"){

                //SINGLE AGENCY FROM REQUEST
                $query_2 = User::where([['parent','=',$logged_id],['role','=','agent'],['id','=',$agency_id]])->first();

                if(!empty($query_2)){

                ///ALL agencyS
                $query = User::where([['parent','=',$agency_id],['role','=','shop']])->get();

                $agents_list = '';
                $total_agents = 0;
                $total_agents_funds = 0;
                foreach ($query as $agent) {

                    $total_agents = $total_agents + 1;
                    $total_agents_funds = $total_agents_funds + $agent->sold_sport;

                    $agents_list .= '<li class="pt-row"> <a class="a-simple" href="javascript:void(0)" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$agent->status.'">'.$agent->username.'</div> <div class="tw-fsize11 tw-fwn">Shop ID : '.$agent->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($agent->sold_sport,2, '.', ' ').'</div> </div> </a> </li>';
                
                }

                if($query_2->status === 'active'){
                    $activity_agency = '<option  value="off" >NO</option><option  value="on" selected>YES</option>';
                }else{
                    $activity_agency = '<option  value="off" selected>NO</option><option  value="on">YES</option>';
                }

                $html_file = 'agency-actions.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
                $html = str_replace('*list-agency*', $agents_list, $html);
                $html = str_replace('*total_agents*', $total_agents, $html);
                $html = str_replace('*total_agents_funds*', number_format($total_agents_funds,2, '.', ' '), $html);
                $html = str_replace('*agency_username*', $query_2->username, $html);
                $html = str_replace('*agency_funds*', number_format($query_2->sold_sport,2, '.', ' '), $html);
                $html = str_replace('*agency_id*', $query_2->id, $html);
                $html = str_replace('*agency_role*', ucfirst($query_2->role), $html);
                $html = str_replace('*created_date*', $query_2->created_at, $html);
                $html = str_replace('*agency_status*', $query_2->status, $html);
                $html = str_replace('*agency_activity*', $activity_agency, $html);

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
