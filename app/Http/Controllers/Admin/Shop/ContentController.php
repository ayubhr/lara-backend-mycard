<?php

namespace App\Http\Controllers\Admin\Shop;

use Auth;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller{

    public function formatSolde($sold){

        return number_format($sold, 2, '.', '');
    }

   public function get_create_shop(){

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;

            if($admin_info->role === "admin" || $admin_info->role === "agent"){

            $html_file = 'create-shop.txt';

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

   public function get_accounts_shop(){


            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            if($admin_info->role === "admin" || $admin_info->role === "agent"){

                $query = User::where([['parent','=',$logged_id],['role','=','shop']])->get();


                $shops_list = '';
                $total_shops = 0;
                $total_shops_funds = 0;
                foreach ($query as $shop) {

                    $total_shops = $total_shops + 1;
                    $total_shops_funds = $total_shops_funds + $shop->sold_sport;

                    $shops_list .= '<li class="pt-row"> <a class="a-simple" href="#admin/shop/shop/'.$shop->id.'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$shop->status.'">'.$shop->username.'</div> <div class="tw-fsize11 tw-fwn">Shop ID : '.$shop->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($shop->sold_sport,2, '.', ' ').'</div> </div> </a> </li>';
                
                }


                $html_file = 'shop-accounts.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
                $html = str_replace('*list-shop*', $shops_list, $html);
                $html = str_replace('*total_shops*', $total_shops, $html);
                $html = str_replace('*total_shops_funds*', number_format($total_shops_funds,2, '.', ' '), $html);

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




    public function get_shop_actions($shop_id){
        
        $admin_info = Auth::guard('web')->user();

        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;


            if($admin_info->role === "admin" || $admin_info->role === "agent"){

                //SINGLE SHOP FROM REQUEST
                $query_2 = User::where([['parent','=',$logged_id],['role','=','shop'],['id','=',$shop_id]])->first();

                if(!empty($query_2)){

                ///ALL SHOPS
                $query = User::where([['parent','=',$shop_id],['role','=','player']])->get();

                $shops_list = '';
                $total_shops = 0;
                $total_shops_funds = 0;
                foreach ($query as $shop) {

                    $total_shops = $total_shops + 1;
                    $total_shops_funds = $total_shops_funds + $shop->sold_sport;

                    $shops_list .= '<li class="pt-row"> <a class="a-simple" href="javascript:void(0)" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$shop->status.'">'.$shop->username.'</div> <div class="tw-fsize11 tw-fwn">Player ID : '.$shop->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($shop->sold_sport,2, '.', ' ').' | '.$this->formatSolde(floatval($shop->sold_casino) / 100.00).' | '.$this->formatSolde($shop->sold_livecasino).'</div> </div> </a> </li>';
                
                }

                if($query_2->status === 'active'){
                    $activity_shop = '<option  value="off" >NO</option><option  value="on" selected>YES</option>';
                }else{
                    $activity_shop = '<option  value="off" selected>NO</option><option  value="on">YES</option>';
                }

                $html_file = 'shop-actions.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
                $html = str_replace('*list-shop*', $shops_list, $html);
                $html = str_replace('*total_shops*', $total_shops, $html);
                $html = str_replace('*total_shops_funds*', number_format($total_shops_funds,2, '.', ' '), $html);
                $html = str_replace('*shop_username*', $query_2->username, $html);
                $html = str_replace('*shop_funds*', number_format($query_2->sold_sport,2, '.', ' '), $html);
                $html = str_replace('*shop_id*', $query_2->id, $html);
                $html = str_replace('*shop_role*', ucfirst($query_2->role), $html);
                $html = str_replace('*created_date*', $query_2->created_at, $html);
                $html = str_replace('*shop_status*', $query_2->status, $html);
                $html = str_replace('*shop_activity*', $activity_shop, $html);

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
