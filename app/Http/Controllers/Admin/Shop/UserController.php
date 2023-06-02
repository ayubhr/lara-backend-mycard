<?php

namespace App\Http\Controllers\Admin\Shop;

use Auth;
use App\User;
use App\Transactions_History;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller{

	//MANAGEMENT POSTS SHOP
	public function post_create_shop(Request $request){
		
        $admin_info = Auth::guard('web')->user();
        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;

        $messages = array(
            'required' => 'The attribute field is required !',
            'alpha_dash' => 'No symbols or spaces allowed !',
            'unique' => "Le nom d'utilisateur deja existe"
        );

        $validator = Validator($request->only("username","pswd"), [
            "username" => "required|alpha_dash|unique:users",
            "pswd" => "required|string|min:5|max:30"
        ],$messages);


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


        if($admin_info->role === "admin" || $admin_info->role === "agent"){

            $origin = $request->headers->get('origin');
            
	        $user = new User();
	        $user->name = $request->username;
	        $user->username = $request->username;
	        $user->password = bcrypt($request->pswd);
	        $user->parent = $logged_id;
            $user->whois  = $admin_info->whois;
	        $user->sold_sport = 0;
	        $user->sold_casino = 0;
	        $user->role = "shop";
	        $user->status = "active";
	        $user->save();

            $html_file = 'info-large.txt';
            $html = Storage::disk('public')->get($html_file);
            $html = str_replace('*username*', '<span class="ui-icon-user ui-btn-icon-left"></span> '.$logged_username, $html);
            $html = str_replace('*funds*', number_format($logged_funds,2, '.', ' '), $html);
            $html = str_replace('*msg_success*', 'Un nouveau compte shop a été créé avec succès', $html);

            $response["d"]["action"] = 5;
            $response["d"]["status"] = 200;
            $response["d"]["html"] =  $html;
            $response["d"]["redirectUri"] = 'info-message';

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


	public function deposit_retrait(Request $request){


        $admin_info = Auth::guard('web')->user();
        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;


        $validator = Validator($request->only("amount","paymentMode","shop_id","routeAction"), [
            "amount" => "required|numeric|between:0.1,999999999999999",
            "paymentMode" => "required|in:1,2",
            "shop_id" => "required|numeric",
            "routeAction" => "required"
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

        if($admin_info->role === "admin" || $admin_info->role === "agent"){

	        $receiver = User::where([['parent','=',$logged_id],['id','=',$request->shop_id]])->first();

       		 if(!empty($receiver)){

       		 	if($request->paymentMode === "1"){

	       		 	if($admin_info->sold_sport < abs($request->amount) ){

						$html = Storage::disk('public')->get('info.txt');
						$html = str_replace('*message_error*', 'Votre solde insuffisant pour terminer le deposit !', $html);
						$response["d"]["action"] = 3;
						$response["d"]["status"] = 200;	
						$response["d"]["mode"] = 1;	
						$response["d"]["html"] = $html;

						return $response;

	       		 	}

	       		 	//UPDATE SENDER FUNDS
	       		 	$admin_info->sold_sport = ( $admin_info->sold_sport - abs($request->amount) );
	       		 	$admin_info->save();
	       		 	//UPDATE RECEIVER FUNDS
	       		 	$receiver->sold_sport = ( $receiver->sold_sport + abs($request->amount) );
	       		 	$receiver->save();

                    //INSERT TRANSACTION HISTORY 
                    $transaction = new Transactions_History();
                    $transaction->parent  = $admin_info->id;
                    $transaction->account = $receiver->username;
                    $transaction->sign = '+';
                    $transaction->amount = abs($request->amount);
                    $transaction->parent_balance = $receiver->sold_sport;
                    $transaction->save();

       		 	}elseif($request->paymentMode === "2"){

	       		 	if($receiver->sold_sport < abs($request->amount) ){

						$html = Storage::disk('public')->get('info.txt');
						$html = str_replace('*message_error*', 'Shop solde insuffisant pour terminer le retrait !', $html);
						$response["d"]["action"] = 3;
						$response["d"]["status"] = 200;	
						$response["d"]["mode"] = 1;	
						$response["d"]["html"] = $html;

						return $response;

	       		 	}


       		 	//UPDATE SENDER FUNDS
	       		 	$admin_info->sold_sport = ( $admin_info->sold_sport + abs($request->amount) );
	       		 	$admin_info->save();
	       		 	//UPDATE RECEIVER FUNDS
	       		 	$receiver->sold_sport = ( $receiver->sold_sport - abs($request->amount) );
	       		 	$receiver->save();

                    //INSERT TRANSACTION HISTORY 
                    $transaction = new Transactions_History();
                    $transaction->parent  = $admin_info->id;
                    $transaction->account = $receiver->username;
                    $transaction->sign = '-';
                    $transaction->amount = abs($request->amount);
                    $transaction->parent_balance = $receiver->sold_sport;
                    $transaction->save();
                    
       		 	}

	            $response["d"]["action"] = 1;
	            $response["d"]["status"] = 200;
	            $response["d"]["ats"] = number_format($admin_info->sold_sport,2, '.', ' '); //NEW BALANCE SENDER;
	            $response["d"]["uts"] = number_format($receiver->sold_sport,2, '.', ' '); ///TOTAL BALANCE RECEIVER BALANCE
	            $response["d"]["rcf"] = 1;
	            $response["d"]["ppMsg"] =  '<ul data-role="listview" data-inset="true"> <li data-role="list-divider" data-theme="b" style="text-indent:1em;">Info</li> <li> <div class="tw-info tw-msg-check-circle2"></div> <div class="tw-popup-box">La transaction sest terminée avec succès</div> </li> <li> <div class="ui-grid-solo"> <div class="ui-block-a"><input type="button" data-icon="check" data-iconpos="right" data-theme="c" value="OK" data-mini="true" class="admin-popup-close" /></div> </div> </li></ul';

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


	public function status_change(Request $request){

        $admin_info = Auth::guard('web')->user();
        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;


        $validator = Validator($request->only("activity-switch","mode","shop_id","routeAction"), [
            "activity-switch" => "required|in:off,on",
            "mode" => "required",
            "shop_id" => "required|numeric",
            "routeAction" => "required"
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

        if($admin_info->role === "admin" || $admin_info->role === "agent"){

	        $shop = User::where([['parent','=',$logged_id],['id','=',$request->shop_id]])->first();

       		if(!empty($shop)){

       			if($request["activity-switch"] === "off"){

       				$shop->status = "blocked";
       				$shop->save();

       			}elseif($request["activity-switch"] === "on"){
       				
       				$shop->status = "active";
       				$shop->save();
       			}

       			$response["d"]["status"] = 200;	
				$response["d"]["uas"] = $request["activity-switch"];

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


	public function reset_password_shop(Request $request){

        $admin_info = Auth::guard('web')->user();
        $logged_username = $admin_info->username;
        $logged_funds = $admin_info->sold_sport;
        $logged_id = $admin_info->id;


        $validator = Validator($request->only("mode","shop_id","routeAction"), [
            "mode" => "required",
            "shop_id" => "required|numeric",
            "routeAction" => "required"
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

        if($admin_info->role === "admin" || $admin_info->role === "agent"){

	        $shop = User::where([['parent','=',$logged_id],['id','=',$request->shop_id]])->first();

       		if(!empty($shop)){

       			$new_password = rand(000000,999999);
   				$shop->password = bcrypt($new_password);
   				$shop->save();


       			$response["d"]["status"] = 200;	
       			$response["d"]["action"] = 3;
       			$response["d"]["mode"] = 1;	
				$response["d"]["html"] = '<ul class="ui-listview" id="twInfoView" data-role="listview" data-inset="true"> <li class="ui-li-divider ui-bar-inherit ui-first-child" data-role="list-divider" role="heading">Info</li> <li class="ui-li-static ui-body-inherit"> <div class="tw-info tw-msg-check-circle2"></div> <div class="tw-popup-box">Le nouveau mot de passe de shop <i>'.$shop->username.' </i> est : <b>'.$new_password.'</b></div> </li> <li class="ui-li-static ui-body-inherit"> <input type="button" data-iconpos="right" data-icon="check" data-mini="true" data-theme="e" onclick="hideInfoView();" value="OK" /> </li></ul>';

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
