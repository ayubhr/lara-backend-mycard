<?php

namespace App\Classes;

class ConfigCasino {


    public function Generate_Keygen(){

       $keygen = substr(str_shuffle("0123456789ABCDEFGHMZELXAZM"), 0, 14);

       return rand(11,99).'-'.$keygen;
    }

    public function guidv4($data = null) {

        $data = $data ?? random_bytes(16);
        assert(strlen($data) == 16);

        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }


    public function initCurl($url ,$post=false, $headers=false){

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
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($post));
        }

        if($headers){
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
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


    public function SlotsConfig(){

        $config  = array(
                            'API_URL'       => 'https://play.gapi.lol/api/games/post/', 
                            'API_ID'        => 'JJPZZ0iF1sRUpjoMnYhRsNPZXFULTBfV',
                            'API_KEY'       => 'xr7BKMnwjFzVVwdwOrkzoAUmL05YzvyO',
                            'GAME_URL'      => 'https://play.gapi.lol/play/',
                            'WALLET_URL'    => 'https://mycard77.shop/casino_api/slotsCalls',
                            'CALLBACK_KEY'  => $this->Generate_Keygen(),
                            'EXIT_URL'      => 'https://forzza.shop/casino-games',
                            'CUR'           => 'TND',
                            'LANG'          => 'en'
                        );


        return $config;
    }


    public function LiveCasinoConfig(){

        $config  = array(
                            'API_URL'       => 'https://apiprod3.fundist.org/', 
                            'API_KEY'       => '96e27536249921dd8622400ba5f541e9',
                            'API_PWD'       => '0895308468708563',
                            'API_HMAC'      => 'q2m0q60r9isj4v907uvj95f0fly72uih3xgfhlnjbmfms9xjes11wxfqqs6pvb33',
                            'CUR'           => 'TND',
                            'LANG'          => 'en',
                            'VPS_IP'        => '109.106.244.61'
                        );


        return $config;
    }

    public function slotegratorConfig(){

        $config  = array(
                            'merchantId'       => 'dcb83642c2031a7af1975462a6f04923', 
                            'merchantKey'      => 'f7056e320003a14bcb26633864bff459adf45157',
                            'BASEURL'          => 'https://gis.slotegrator.com/api/index.php/v1'
                        );


        return $config;
    }


    public function fiableConfig(){

        $config  = array(
                            'token'       => 'd021d919118009631d3e849ef26dc4d', 
                            'secret'      => 'df87ee956ea1bd7a995db3b881f1c2e',
                            'BASEURL'     => 'https://x-7.fiable-admin.com/'
                        );


        return $config;
    }

    public function fiableSignature($data){

        $fiableConf = $this->fiableConfig();

        $data  = json_encode($data);

        $data  = preg_replace('/\s+/','',$data);

        $hash  = $data.''.$fiableConf['secret'];

        $hash  = utf8_encode($hash);


        return md5($hash);

    }


    public function openFiableSession($postData){

        $fiableConf = $this->fiableConfig();


        $requestURL = $fiableConf['BASEURL'].'api/session/open';

        $requestSignature = $this->fiableSignature($postData);


        //return $postData;

        $curl = curl_init();
        $option = [
          CURLOPT_SSL_VERIFYPEER  => false,
          CURLOPT_RETURNTRANSFER  => true,
          CURLOPT_CONNECTTIMEOUT  => 5,
          CURLOPT_HEADER          => false,
          CURLOPT_URL             => $requestURL,
          CURLOPT_USERAGENT       => 'Mozilla/5.0 (Macintosh; Intel Mac OS X vip; rv:42.0) Gecko/06072000 Firefox/42.0',
          CURLOPT_COOKIEJAR       => 'cookie.txt',
          CURLOPT_COOKIEFILE      => 'cookie.txt'
        ];

        curl_setopt_array($curl, $option);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Token: '.$fiableConf['token'],
            'Message-Signature: '.$requestSignature,
            'Enctype: application/json',
        ));

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



    public function axiosSecond($endpoint,$post=false,$isValidate=false){

        $casinoConfig  = $this->slotegratorConfig();

        $BASE_URL        = $casinoConfig['BASEURL'];
        $merchantID      = $casinoConfig['merchantId'];
        $merchantKEY     = $casinoConfig['merchantKey'];        

        $nonce = $this->guidv4();
        $time = time();

        $headers = [
            'X-Merchant-Id' => $merchantID,
            'X-Timestamp' => $time,
            'X-Nonce' => $nonce,
        ];

        if(!$post){

            $postData = [ ];

        }else{

            $postData = $post;
        }

        $mergedParams = array_merge($postData, $headers);
        ksort($mergedParams);

        $hashString = http_build_query($mergedParams);
        $XSign = hash_hmac('sha1', $hashString, $merchantKEY);

        if($post || $isValidate){

            ksort($postData);
            $postData = http_build_query($postData);
        }

        $requestURL = $BASE_URL.$endpoint;

        $curl = curl_init();
        $option = [
          CURLOPT_SSL_VERIFYPEER  => false,
          CURLOPT_RETURNTRANSFER  => true,
          CURLOPT_CONNECTTIMEOUT  => 5,
          CURLOPT_HEADER          => false,
          CURLOPT_URL             => $requestURL,
          CURLOPT_USERAGENT       => 'Mozilla/5.0 (Macintosh; Intel Mac OS X vip; rv:42.0) Gecko/06072000 Firefox/42.0',
          CURLOPT_COOKIEJAR       => 'cookie.txt',
          CURLOPT_COOKIEFILE      => 'cookie.txt'
        ];

        curl_setopt_array($curl, $option);

        if($post || $isValidate){
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
        }

        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'X-Merchant-Id: '.$merchantID,
            'X-Timestamp: '.$time,
            'X-Nonce: '.$nonce,
            'X-Sign: '.$XSign,
            'Accept: application/json',
            'Enctype: application/x-www-form-urlencoded',
        ));

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




    public function verifyXsign($postData,$headers,$xSign){


        $casinoConfig  = $this->slotegratorConfig();

        $BASE_URL        = $casinoConfig['BASEURL'];
        $merchantID      = $casinoConfig['merchantId'];
        $merchantKEY     = $casinoConfig['merchantKey'];        

        $mergedParams = array_merge($postData, $headers);
        ksort($mergedParams);

        $hashString = http_build_query($mergedParams);

        $expectedSign = hash_hmac('sha1', $hashString, $merchantKEY);

        if ($xSign !== $expectedSign) {

                return 'Invalid_SIGN';

        }else{


                return 'OK';
        }


    }

    public function slotegratorConfigStag(){

        $config  = array(
                            'merchantId'       => '389786bfb9026ee7fe4c735442f3a9c6', 
                            'merchantKey'      => 'dcb906de8fc4ccac0665ec189e61d208c0f88ffa',
                            'BASEURL'          => 'https://staging.slotegrator.com/api/index.php/v1'
                        );


        return $config;
    }

    public function verifyXsignTest($postData,$headers,$xSign){


        $casinoConfig  = $this->slotegratorConfigStag();

        $BASE_URL        = $casinoConfig['BASEURL'];
        $merchantID      = $casinoConfig['merchantId'];
        $merchantKEY     = $casinoConfig['merchantKey'];        

        $mergedParams = array_merge($postData, $headers);
        ksort($mergedParams);

        $hashString = http_build_query($mergedParams);

        $expectedSign = hash_hmac('sha1', $hashString, $merchantKEY);

        if ($xSign !== $expectedSign) {

                return 'Invalid_SIGN';

        }else{


                return 'OK';
        }


    }


    public function axiosStag($endpoint,$post=false,$isValidate=false){

        $casinoConfig  = $this->slotegratorConfigStag();

        $BASE_URL        = $casinoConfig['BASEURL'];
        $merchantID      = $casinoConfig['merchantId'];
        $merchantKEY     = $casinoConfig['merchantKey'];        

        $nonce = $this->guidv4();
        $time = time();

        $headers = [
            'X-Merchant-Id' => $merchantID,
            'X-Timestamp' => $time,
            'X-Nonce' => $nonce,
        ];

        if(!$post){

            $postData = [ ];

        }else{

            $postData = $post;
        }

        $mergedParams = array_merge($postData, $headers);
        ksort($mergedParams);

        $hashString = http_build_query($mergedParams);
        $XSign = hash_hmac('sha1', $hashString, $merchantKEY);

        if($post || $isValidate){

            ksort($postData);
            $postData = http_build_query($postData);
        }

        $requestURL = $BASE_URL.$endpoint;

        $curl = curl_init();
        $option = [
          CURLOPT_SSL_VERIFYPEER  => false,
          CURLOPT_RETURNTRANSFER  => true,
          CURLOPT_CONNECTTIMEOUT  => 5,
          CURLOPT_HEADER          => false,
          CURLOPT_URL             => $requestURL,
          CURLOPT_USERAGENT       => 'Mozilla/5.0 (Macintosh; Intel Mac OS X vip; rv:42.0) Gecko/06072000 Firefox/42.0',
          CURLOPT_COOKIEJAR       => 'cookie.txt',
          CURLOPT_COOKIEFILE      => 'cookie.txt'
        ];

        curl_setopt_array($curl, $option);

        if($post || $isValidate){
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
        }

        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'X-Merchant-Id: '.$merchantID,
            'X-Timestamp: '.$time,
            'X-Nonce: '.$nonce,
            'X-Sign: '.$XSign,
            'Accept: application/json',
            'Enctype: application/x-www-form-urlencoded',
        ));

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
