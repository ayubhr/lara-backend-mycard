<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class IsMycardMiddleware extends BaseMiddleware
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {


            $whitelisted_roles = ["admin", "agent", "shop"];

            $user = JWTAuth::parseToken()->authenticate();


            if( !in_array($user->role, $whitelisted_roles) ){

                return response()->json([
                    "status" => false,
                    "message" => "are you stupid paw #2 !!!!!"
                ],401);

            }

        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['status' => false,'message' => 'Token is Invalid'],200);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['status' => false,'message' => 'Token is Expired'],200);
            }else{
                return response()->json(['status' => false,'message' => 'Authorization Token not found'],404);
            }
        }
        return $next($request);
    }
}