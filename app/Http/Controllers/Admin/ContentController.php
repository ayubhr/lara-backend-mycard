<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\User;
use App\Betslip;
use App\ReportedBetslips;
use App\SuperConfig;
use App\Transactions_History;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ContentController extends Controller{

    public function isTakwira($host){

        return (preg_match("/localhost|takwira/i", $host)) ? true : false;

    }

    public function isWinMycard($whois){

       return (preg_match("/mycard77.win|127.0.0.1/i", $whois)) ? true : false;

    }


    public function getApp(Request $request){


                $appDownload = '<div data-role="page" id="tmenu" data-url="tmenu_aspx" data-lang="en" tabindex="0" class="ui-page ui-page-theme-a ui-page-active" style="min-height: 785px;">
    <div data-tap-toggle="false" data-role="header" data-theme="b" class="tw-header ui-header ui-bar-b" data-add-back-btn="false" data-back-btn-text="." role="banner">
        <h1 class="tw-header-title ui-title" role="heading" aria-level="1">download mycard77</h1>
    </div>
    <div data-role="content" class="ui-content" role="main">
        <div id="twMainContentView">
            <ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">
                <li data-theme="a" data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child" style="font-weight: bold; font-size: 15px;">Application mobile Mycard77</li>
                <li class="ui-li-static ui-body-inherit">
                    <div class="tw-info tw-msg-info3"></div>
                    <div class="tw-popup-box">
    <bdi>
    لا يقبل متجر Google Play حاليًا التطبيقات التي تقدم ألعابًا بأموال حقيقية. لذلك ، يجب أن تسمح بتثبيت التطبيقات من مصادر غير معروفة. يكرر التطبيق نفس معايير الأمان مثل موقعنا على الإنترنت.
    </bdi>
                        <br />
                        <br>
                        <div style="float: right;"><bdi>• صب لapplication وتمتع بالخدمات الحصرية و السرعة</bdi></div>
                        <div style="float: right;"><bdi>• تنجم تكلم طاقم العمل في أي وقت فالمباشر عن طريق الlive chat</bdi></div>
                        <div style="float: right;"><bdi>• إعلام العملاء بأوقات التحديثات </bdi></div>
                        <div style="margin-top: 20%;"><img src="Content/installapkmycard77.gif" style="height: 420px; display: block; margin-left: auto; margin-right: auto;" /></div>
                    </div>

                </li>
                <li class="ui-li-static ui-body-inherit ui-last-child">
                    <a
                        href="Content/Mycard77.apk"
                        data-role="button"
                        data-theme="a"
                        data-iconpos="right"
                        data-icon="app-install"
                        style="text-align: center; white-space: normal; font-weight: bold;"
                        class="ui-link ui-btn ui-btn-a ui-icon-app-install ui-btn-icon-right ui-shadow ui-corner-all"
                        role="button"
                    >
                        Download
                    </a>
                    <a
                        href="#till"
                        data-role="button"
                        data-theme="a"
                        data-iconpos="right"
                        data-icon="app-install"
                        style="text-align: center; white-space: normal; font-weight: bold; margin-top: 11px;"
                        class="ui-btn ui-input-btn ui-btn-e ui-corner-all ui-shadow ui-mini ui-icon-arrow-l ui-btn-icon-right"
                        role="button"
                    >
                        Back
                    </a>
                </li>
            </ul>
        </div>
        <div id="twInfoContentView" class="fieldHide"></div>
        <div id="masterDetailsBox" class="fieldHide"></div>
    </div>
</div>';

                $response["d"]["action"] = 1;
                $response["d"]["status"] = 200;
                $response["d"]["html"] =   $appDownload;
                $response["d"]["redirectUri"] = 'admin/download/app';

                return $response;


    }



    public function init(Request $request){

    	if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;

            $html_file = 'menu-'.$admin_info->role.'.txt';

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

            $origin = $request->headers->get('host');


            if($this->isWinMycard($origin)){

                 $appDownloadLi = '<div class="tw-admin-menu ui-collapsible ui-collapsible-themed-content ui-last-child ui-collapsible-collapsed" >
    <h3 class="ui-collapsible-heading ui-collapsible-heading-collapsed">
        <a href="#admin/download/app" class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-right ui-btn-g ui-mini ui-icon-arrow-d"> <span> Download Application Mobile</span><span class="ui-collapsible-heading-status"> click to expand contents</span></a>
    </h3>
</div>';

                 $html = str_replace('*isApp*', $appDownloadLi, $html);

            }else{

                 $html = str_replace('*isApp*', "", $html);

            }





            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;
            $response["d"]["redirectUri"] = 'till/tmenu';

            return $response;
        }

            $html = Storage::disk('public')->get('init.txt');

            $origin = $request->headers->get('host');

            if($this->isTakwira($origin)){

                $html = str_replace('<!-- is_takwira_2 -->', '<div class="login-picture" style="text-align: center;padding: 5%;"> <svg id="H1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="180" height="50" viewBox="0 0 220 66"> <defs> <filter id="Welcome_Back" x="24" y="31" width="186" height="33" filterUnits="userSpaceOnUse"> <feOffset dy="3" input="SourceAlpha"></feOffset> <feGaussianBlur stdDeviation="1" result="blur"></feGaussianBlur> <feFlood flood-opacity="0.161"></feFlood> <feComposite operator="in" in2="blur"></feComposite> <feComposite in="SourceGraphic"></feComposite> </filter> </defs> <rect id="Rectangle_2058" data-name="Rectangle 2058" width="66" height="66" rx="33" fill="#3cba74"></rect> <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Welcome_Back)"> <text id="Welcome_Back-2" data-name="Welcome Back" transform="translate(117 52)" fill="#202020" font-size="27" font-family="Helvetica"><tspan x="-89.787" y="0">Welcome Back</tspan></text> </g> </svg> </div>' ,$html);
            }

           	$response["d"]["action"] = 1;
        	$response["d"]["status"] = 200;	
        	$response["d"]["html"] =  $html;
        	$response["d"]["redirectUri"] = "till/till-login";

    	    return $response;

    }


    public function getbalance(Request $Request){

            $logged_funds = number_format(Auth::guard('web')->user()->sold_sport,2, '.', ' ');
            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200;
            $response["d"]["ats"] = $logged_funds;

            return response()->json($response);


    }

   public function telegramNotify($chatID, $message){

        $Token="1431446612:AAHHRDz9hAzKcZsDfjSweO3tLa_iA42_K_M";

        $url="https://api.telegram.org/bot".$Token;
        $params=[
                'chat_id'=>$chatID,
                'text'=> $message,
        ];

        $ch = curl_init($url . '/sendMessage');
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_exec($ch);
        curl_close($ch);

    } 

   public function report_betslip(Request $Request){
        
       if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $html_file = 'betslip-report.txt';

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;

            return $response;

        }

   }

    public function whoSuper($username){
                
        $first  = User::where('username','=',$username)->first();
        if(!$first) return "a";
        $parent = User::where('id','=',$first->parent)->first();
        if(!$parent) return "b";

        $super = "";
        $isHead = false;
        while(!$isHead){

            $parent = User::where('id','=',$parent->parent)->first();
            if(!$parent) return "c";
            if($parent->parent === 0){

                $super = $parent->username;
                $isHead = true;
                break;
            }

        }

        return [
                "super"  => $super,
                "child"  => $username,
                "date"  => Carbon::now()->format('Y-m-d H:i:s')
                ];


    }

   public function post_report_betslip(Request $request){

        if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $validator = Validator($request->only("coupon"), [
                "coupon" => "required|min:6"
            ]);

            if($validator->fails()){

                $error_msg = $validator->errors()->first();

                $html = Storage::disk('public')->get('info.txt');
                $html = str_replace('*message_error*', $error_msg, $html);
                $response["d"]["action"] = 3;
                $response["d"]["status"] = 200; 
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = $html;
                return $response;
            }            

            $coupon = $request->coupon;
            $betslip = Betslip::whereCoupon_code($coupon)->first();

            if(!$betslip){

                $msg_error = 'betslip with code coupon : <b>'.$coupon.'</b> doesn\'t exist';
                $html = Storage::disk('public')->get('info.txt');
                $html = str_replace('*message_error*', $msg_error, $html);
                $response["d"]["action"] = 3;
                $response["d"]["status"] = 200; 
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = $html;
                return $response;
            }


            $player = User::whereId($betslip->user_id)->first();
            $super  = $this->whoSuper($player->username);

            $superConfig  = SuperConfig::whereSuper($super["super"])->first();

            if($superConfig){

                $newR_Betslip = new ReportedBetslips();
                $newR_Betslip->coupon  = $betslip->coupon_code;
                $newR_Betslip->player  = $super["child"];
                $newR_Betslip->details = $request->details;
                $newR_Betslip->reporter = $logged_username;
                $newR_Betslip->state   = "open";
                $newR_Betslip->save();

                $msgText  = " ******* NEW BETSLIP REPORT ******* \n";

                $msgText .= " #COUPON   : ".$betslip->coupon_code." \n";
                $msgText .= " #PLAYER   : ".$super["child"]." \n";

                if( !empty($request->details) ){

                   $msgText .= " #DETAILS : ".$request->details." \n";
                }

                $msgText .= "\n #REPORTER        : ".$logged_username." \n";
                $msgText .= " #DATE            : ".$super['date']." \n";
                $msgText .= "*********************************** ";

                $this->telegramNotify($superConfig->telegram, $msgText);

                $response["d"]["status"] = 200; 
                $response["d"]["action"] = 3;
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = '<ul class="ui-listview" id="twInfoView" data-role="listview" data-inset="true"> <li class="ui-li-divider ui-bar-inherit ui-first-child" data-role="list-divider" role="heading">Info</li> <li class="ui-li-static ui-body-inherit"> <div class="tw-info tw-msg-check-circle2"></div> <div class="tw-popup-box">betslip with code coupon : <b>'.$betslip->coupon_code.'</b>  est reporté avec succéss</div> </li> <li class="ui-li-static ui-body-inherit"> <input type="button" data-iconpos="right" data-icon="check" data-mini="true" data-theme="e" onclick="hideInfoView();" value="OK" /> </li></ul>';

                return $response;


            }else{

                $response["d"]["status"] = 200; 
                $response["d"]["action"] = 3;
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = '<ul class="ui-listview" id="twInfoView" data-role="listview" data-inset="true"> <li class="ui-li-divider ui-bar-inherit ui-first-child" data-role="list-divider" role="heading">Info</li> <li class="ui-li-static ui-body-inherit"> <div class="tw-info tw-msg-check-circle2"></div> <div class="tw-popup-box"># betslip with code coupon : <b>'.$betslip->coupon_code.'</b>  est reporté avec succéss</div> </li> <li class="ui-li-static ui-body-inherit"> <input type="button" data-iconpos="right" data-icon="check" data-mini="true" data-theme="e" onclick="hideInfoView();" value="OK" /> </li></ul>';

                return $response;

            }



        }


   }

   public function get_search(Request $request){


            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $validator = Validator($request->only("routeAction", "search","tosearch"), [
                "routeAction" => "required|string",
                "search" => "required|string",
                "tosearch" => "required|in:agent,shop,player"
            ]);

            if($validator->fails()){

                $error_msg = $validator->errors()->first();

                $html = Storage::disk('public')->get('info.txt');
                $html = str_replace('*message_error*', $error_msg, $html);
                $response["d"]["action"] = 3;
                $response["d"]["status"] = 200; 
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = $html;

                return $response;
            }

            if($request->tosearch === "agent"){
                $route = '#admin/agency/agent';
            }elseif ($request->tosearch === "shop") {
                $route = '#admin/shop/shop';
            }elseif($request->tosearch === "player"){
                $route = '#admin/cashier/player';
            }

            if($admin_info->role === "admin" || $admin_info->role === "agent" || $admin_info->role === "shop" ){

                $query = User::where([['parent','=',$logged_id],['role','=',$request->tosearch],['username','like','%'.$request->search.'%']])->get();

                $search = '<ul id="playersListSearch" data-role="listview" class="tw-ul-overview transactional-list" data-inset="false" style="padding-top:17px;">';
                foreach ($query as $finded) {

                    $search .= '<li class="pt-row"> <a class="a-simple" href="'.$route.'/'.$finded->id.'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true"> <div class="ui-grid-a"> <div class="ui-block-a tw-break-word tw-fsize11" style="width:75%;"> <div class="user-'.$finded->status.'">'.$finded->username.'</div> <div class="tw-fsize11 tw-fwn">'.ucfirst($request->tosearch).' ID : '.$finded->id.'</div> </div> <div class="ui-block-b tw-text-right tw-fwn tw-fsize11" style="width:25%;">'.number_format($finded->sold_sport,2, '.', ' ').'</div> </div> </a> </li>';
                
                }

                $search .= '</ul>';


                $response["d"]["status"] = 200;
                $response["d"]["psc"] = $query->count();
                $response["d"]["html"] =  $search;

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



    public function transactions_history(){

        if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $html_file = 'transaction-history.txt';

            $today_date = date("d.m.Y");
            $min_date = date("Y-m-d", strtotime("-6 months"));

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
            $html = str_replace('*today_date*', $today_date, $html);
            $html = str_replace('*min_date*', $min_date, $html);

            $query = Transactions_History::where([['parent','=',$logged_id],['created_at','like','%'.date("Y-m-d").'%']])->orderBy('created_at', 'desc')->get();

            if(!empty($query)){

                $list = '';
                foreach ($query as $transaction) {
                    
                    $state = ($transaction->sign === '+' ? 'active' : 'inactive'); 
                    $state_x = ($transaction->sign === '+' ? '' : '-');
                    $new_formated_date =  date("d.m.Y H:i:s", strtotime($transaction->created_at));


                    $list .= '<li class="pt-row"> <div class="ui-grid-c tw-fsize11"> <div class="ui-block-a tw-inline">'.$transaction->account.'</div> <div class="ui-block-b tw-inline tw-text-center">'.$new_formated_date.'</div> <div class="ui-block-c tw-inline tw-text-right tw-break-word user-'.$state.'">'.$state_x.number_format($transaction->amount,2, '.', ' ').'</div> <div class="ui-block-d tw-inline tw-text-right tw-break-word">'.number_format($transaction->parent_balance,2, '.', ' ').'</div> </div> </li>';

                }


                $html = str_replace('*list-transactions*', $list, $html);


            }else{

                $html = str_replace('*list-transactions*', '', $html);

            }

            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;

            return $response;
        }

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200; 
            $response["d"]["html"] =  Storage::disk('public')->get('init.txt');
            $response["d"]["redirectUri"] = "till/till-login";

            return $response;

    }


    public function get_transactions_history(Request $request){

        if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $validator = Validator($request->only("edate","fdate"), [
                "edate" => "required|min:6",
                "fdate" => "required|min:6"
            ]);

            if($validator->fails()){

                $error_msg = $validator->errors()->first();

                $html = Storage::disk('public')->get('info.txt');
                $html = str_replace('*message_error*', $error_msg, $html);
                $response["d"]["action"] = 3;
                $response["d"]["status"] = 200; 
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = $html;
                return $response;
            }            


            $edate = date("Y-m-d", strtotime($request->edate)).' 23:59:59';
            $fdate = date("Y-m-d", strtotime($request->fdate)).' 00:00:00';;

            $query = Transactions_History::whereBetween(Transactions_History::raw('DATE(created_at)'), array($fdate, $edate))->where('parent','=',$logged_id)->orderBy('created_at', 'desc')->get();

            if(!empty($query)){

                $list = '<div class="tw-ul-overview" style="margin-top:20px;"> <div><input id="searchTransactions" data-mini="true" data-type="search" /></div> <ul class="ul-simple transactional-list" data-role="listview" data-filter="true" data-input="#searchTransactions" data-theme="a" data-count-theme="a" data-inset="false" style="margin-top:12px;"> <li data-role="list-divider" class="tw-ui-li-divider ui-li-divider ui-bar-b "> <div class="ui-grid-c tw-fsize10"> <div class="ui-block-a tw-inline">Utilisateur</div> <div class="ui-block-b tw-inline tw-text-center">Date</div> <div class="ui-block-c tw-inline tw-text-rintent10">Amount</div> <div class="ui-block-d tw-inline tw-text-rintent10">Balance</div> </div> </li>';

                foreach ($query as $transaction) {
                    
                    $state = ($transaction->sign === '+' ? 'active' : 'inactive');
                    $state_x = ($transaction->sign === '+' ? '' : '-'); 
                    $new_formated_date =  date("d.m.Y H:i:s", strtotime($transaction->created_at));

                    $list .= '<li class="pt-row"> <div class="ui-grid-c tw-fsize11"> <div class="ui-block-a tw-inline">'.$transaction->account.'</div> <div class="ui-block-b tw-inline tw-text-center">'.$new_formated_date.'</div> <div class="ui-block-c tw-inline tw-text-right tw-break-word user-'.$state.'">'.$state_x.number_format($transaction->amount,2, '.', ' ').'</div> <div class="ui-block-d tw-inline tw-text-right tw-break-word">'.number_format($transaction->parent_balance,2, '.', ' ').'</div> </div> </li>';

                }


                $list .= ' <li><input type="button" data-theme="e" value="Top" data-icon="arrow-u" data-iconpos="right" data-mini="true" onclick="TwNavigation.PageTop();" /></li> </ul></div>';


            }else{

                $list = '';
            }


            $response["d"]["action"] = 5;
            $response["d"]["status"] = 200; 
            $response["d"]["mode"] = 5; 
            $response["d"]["html"] = $list;
            return $response;


        }

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200; 
            $response["d"]["html"] =  Storage::disk('public')->get('init.txt');
            $response["d"]["redirectUri"] = "till/till-login";

            return $response;

    }


    public function cashier_transactions(){

        if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $html_file = 'cashier-transaction.txt';

            $today_date = date("d.m.Y");
            $min_date = date("Y-m-d", strtotime("-6 months"));

            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
            $html = str_replace('*today_date*', $today_date, $html);
            $html = str_replace('*min_date*', $min_date, $html);

            $query = Transactions_History::where([['parent','=',$logged_id],['created_at','like','%'.date("Y-m-d").'%']])->get();

            if(!empty($query)){

                $total_deposit = 0;
                $total_retrait = 0;
                foreach ($query as $transaction) {
                    if($transaction->sign === '+'){
                        $total_deposit = $total_deposit + $transaction->amount;
                    }elseif ($transaction->sign === '-') {
                        $total_retrait = $total_retrait + $transaction->amount;
                    }
                }
                    
                if($total_deposit > $total_retrait){
                    $merge = $total_deposit - $total_retrait;
                    $state = 'active';
                    $sign = '';
                }elseif($total_deposit < $total_retrait){
                    $merge = $total_retrait - $total_deposit;
                    $state = 'inactive';
                    $sign = '-';
                }elseif($total_deposit === $total_retrait){
                    $merge = $total_retrait - $total_deposit;
                    $state = 'active';
                    $sign = '';
                }


                $merge = number_format($merge,2, '.', ' ');
                $total_deposit = number_format($total_deposit,2, '.', ' ');
                $total_retrait = number_format($total_retrait,2, '.', ' ');

                $html = str_replace('*state*', $state, $html);
                $html = str_replace('*sign*', $sign, $html);
                $html = str_replace('*merge*', $merge, $html);
                $html = str_replace('*total_deposit*', $total_deposit, $html);
                $html = str_replace('*total_retrait*', $total_retrait, $html);


            }else{

                $html = str_replace('*state*', 'active', $html);
                $html = str_replace('*sign*', '', $html);
                $html = str_replace('*merge*', '0.00', $html);
                $html = str_replace('*total_deposit*', '0.00', $html);
                $html = str_replace('*total_retrait*', '0.00', $html);


            }


            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;

            return $response;
        }

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200; 
            $response["d"]["html"] =  Storage::disk('public')->get('init.txt');
            $response["d"]["redirectUri"] = "till/till-login";

            return $response;

    }



    public function get_cashier_transactions(Request $request){

        if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            $validator = Validator($request->only("edate","fdate"), [
                "edate" => "required|min:6",
                "fdate" => "required|min:6"
            ]);

            if($validator->fails()){

                $error_msg = $validator->errors()->first();

                $html = Storage::disk('public')->get('info.txt');
                $html = str_replace('*message_error*', $error_msg, $html);
                $response["d"]["action"] = 3;
                $response["d"]["status"] = 200; 
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = $html;
                return $response;
            }            


            $edate = date("Y-m-d", strtotime($request->edate)).' 23:59:59';
            $fdate = date("Y-m-d", strtotime($request->fdate)).' 00:00:00';;

            $query = Transactions_History::whereBetween(Transactions_History::raw('DATE(created_at)'), array($fdate, $edate))->where('parent','=',$logged_id)->get();

            $html = '<ul class="tw-ul-overview ul-simple transactional-list" data-role="listview" data-theme="a" data-count-theme="a" data-inset="false" style="margin-top:16px;"> <li data-role="list-divider" class="tw-ui-li-divider ui-li-divider ui-bar-b "> <div class="ui-grid-b tw-fsize11"> <div class="ui-block-a tw-inline"></div> <div class="ui-block-b tw-inline">Term</div> <div class="ui-block-c tw-inline tw-text-rintent10">Amount</div> </div> </li> <li class="pt-row"> <div class="ui-grid-b tw-fsize11"> <div class="ui-block-a tw-inline"></div> <div class="ui-block-b tw-inline tw-break-word">Dépôt totale en esp&#232;ces</div> <div class="ui-block-c tw-inline tw-text-right tw-break-word user-active">*total_deposit*</div> </div> </li> <li class="pt-row"> <div class="ui-grid-b tw-fsize11"> <div class="ui-block-a tw-inline"></div> <div class="ui-block-b tw-inline tw-break-word">Retrait totale en esp&#232;ces</div> <div class="ui-block-c tw-inline tw-text-right tw-break-word user-inactive">-*total_retrait*</div> </div> </li> <li class="pt-row"> <div class="ui-grid-a tw-fsize11"> <div class="ui-block-a tw-inline"></div> <div class="ui-block-b tw-inline tw-text-right tw-bold user-*state*">*sign**merge*</div> </div> </li> </ul>';

            if(!empty($query)){

                $total_deposit = 0;
                $total_retrait = 0;
                foreach ($query as $transaction) {
                    if($transaction->sign === '+'){
                        $total_deposit = $total_deposit + $transaction->amount;
                    }elseif ($transaction->sign === '-') {
                        $total_retrait = $total_retrait + $transaction->amount;
                    }
                }
                    
                if($total_deposit > $total_retrait){
                    $merge = $total_deposit - $total_retrait;
                    $state = 'active';
                    $sign = '';
                }elseif($total_deposit < $total_retrait){
                    $merge = $total_retrait - $total_deposit;
                    $state = 'inactive';
                    $sign = '-';
                }elseif($total_deposit === $total_retrait){
                    $merge = $total_retrait - $total_deposit;
                    $state = 'active';
                    $sign = '';
                }


                $merge = number_format($merge,2, '.', ' ');
                $total_deposit = number_format($total_deposit,2, '.', ' ');
                $total_retrait = number_format($total_retrait,2, '.', ' ');

                $html = str_replace('*state*', $state, $html);
                $html = str_replace('*sign*', $sign, $html);
                $html = str_replace('*merge*', $merge, $html);
                $html = str_replace('*total_deposit*', $total_deposit, $html);
                $html = str_replace('*total_retrait*', $total_retrait, $html);


            }else{

                $html = str_replace('*state*', 'active', $html);
                $html = str_replace('*sign*', '', $html);
                $html = str_replace('*merge*', '0.00', $html);
                $html = str_replace('*total_deposit*', '0.00', $html);
                $html = str_replace('*total_retrait*', '0.00', $html);


            }



            $response["d"]["action"] = 5;
            $response["d"]["status"] = 200; 
            $response["d"]["mode"] = 5; 
            $response["d"]["html"] = $html;
            return $response;


        }

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200; 
            $response["d"]["html"] =  Storage::disk('public')->get('init.txt');
            $response["d"]["redirectUri"] = "till/till-login";

            return $response;

    }
 

   public function Treeget(){

        if (Auth::guard('web')->check()) {

            $admin_info = Auth::guard('web')->user();

            $logged_username = $admin_info->username;
            $logged_funds = $admin_info->sold_sport;
            $logged_id = $admin_info->id;

            if($admin_info->role === "admin"){


                $agents_list = '';
                $total_agents = 0;
                $total_agents_funds = 0;

                $html_file = 'tree.txt';

                $html = Storage::disk('public')->get($html_file);
                $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
                $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);

                $response["d"]["status"] = 200;
                $response["d"]["html"] =  $html;
                $response["d"]["action"] = 1;
                $response["d"]["redirectUri"] = 'admin/finances/overview';

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


            $response["d"]["action"] = 1;
            $response["d"]["status"] = 200; 
            $response["d"]["html"] =  Storage::disk('public')->get('init.txt');
            $response["d"]["redirectUri"] = "till/till-login";

            return $response;



    }




public function TreeGetData(Request $request){


  if (Auth::guard('web')->check()) {

        $admin_info = Auth::guard('web')->user();

        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;

        if($admin_info->role === "admin"){


          $usersNested = User::with('seniors')->where('id', '=', $logged_id)->select(array('id', 'username', 'sold_sport','sold_casino','sold_livecasino','role','parent'))->get();


            $usersNested = $usersNested->toArray();

            array_multisort(array_column($usersNested[0]['seniors'], 'role'), SORT_ASC, $usersNested[0]['seniors']);

            $data['users'] = $usersNested;
            

            return response()->json([
                "status" => true,
                "data" => $usersNested[0]
            ],200);

        }else{

            return response()->json([
                "status" => false,
                "data" => null
            ],200);

        }

    }else{


            return response()->json([
                "status" => false,
                "msg" => "Unauthorized"
            ],401);

    }


}



}

