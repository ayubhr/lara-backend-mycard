<?php

namespace App\Exceptions;

use Request;
use Illuminate\Auth\AuthenticationException;
use Response;

use Illuminate\Support\Arr;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {

       /*if($e instanceof \Symfony\Component\Debug\Exception\FatalThrowableError){
            return response()->json([
                "status" => false,
                "message" => "unauthorized"
            ]);
        }


        if($e instanceof \Illuminate\Session\TokenMismatchException){
            return response()->json([
                "status" => false,
                "message" => "unauthorized"
            ]);
        }


        if ($this->isHttpException($e)) {
        if ($e->getStatusCode() == 404) {
            return response()->json([
                "status" => false,
                "message" => "unauthorized"
            ]);
        }
        }

        if ($this->isHttpException($e)) {
        if ($e->getStatusCode() == 503) {
            return response()->json([
                "status" => false,
                "message" => "unauthorized"
            ]);
        }
        }

        if ($this->isHttpException($e)) {
        if ($e->getStatusCode() == 403) {
            return response()->json([
                "status" => false,
                "message" => "unauthorized"
            ]);
        }
        }

        if ($this->isHttpException($e)) {
            return response()->json([
                "status" => false,
                "message" => "unauthorized"
            ]);
        }*/

        return parent::render($request, $e);        
    }



    protected function unauthenticated($request, AuthenticationException $exception){
        if($request->expectsJson()) {

            $response["d"]["action"] = 1;
            $response["d"]["status"] = 302;
            $response["d"]["redirectUri"] = "till/till-login";

            return response()->json($response,302);

        }


    }

}
