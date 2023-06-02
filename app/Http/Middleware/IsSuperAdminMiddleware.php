<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class IsSuperAdminMiddleware extends BaseMiddleware
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
            $user = JWTAuth::parseToken()->authenticate();


            if($user->role != "super"){

                return response()->json([
                    "status" => false,
                    "message" => "username or password incorrect #2 Middleware!"
                ],200);

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