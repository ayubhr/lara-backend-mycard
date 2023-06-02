<?php

namespace App\Classes;

class Utils {

    public function axios($url ,$post=false){

        $curl = curl_init();
        $option = [
          CURLOPT_SSL_VERIFYPEER  => false,
          CURLOPT_RETURNTRANSFER  => true,
          CURLOPT_URL             => $url,
          CURLOPT_USERAGENT       => 'Mozilla/5.0 (Macintosh; Intel Mac OS X vip; rv:42.0) Gecko/06072000 Firefox/42.0',
          CURLOPT_COOKIEJAR       => 'cookie.txt',
          CURLOPT_COOKIEFILE      => 'cookie.txt'
        ];

        curl_setopt_array($curl, $option);
        if($post){
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
        }

        $data = curl_exec($curl);
        $type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        return array(
          'data'      => $data,
          'type'      => $type,
          'decode'    => json_decode($data, true),
          'httpcode'  => $httpcode
        );


    }



}
