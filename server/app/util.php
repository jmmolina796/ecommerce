<?php

    function getBaseUrl() {
        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
        return $actual_link;
    }

    function getUrlPath($uri, $position) {
        $path = substr($uri, 1);
        $pathArray = explode('/', $path);
        if ($position === -1) {
            return $pathArray[count($pathArray) - 1];
        } else {
            return $pathArray[$position];
        }
    }

    function getJsonFromFile($path) {
        $data = file_get_contents($path);
        $json = json_decode($data);
        return $json;
    }

    function sendJsonFile($path) {
        header('Content-Type: application/json');
        $data = file_get_contents($path);
        echo $data;
    }

    function sendAndTransformJson($object) {
        $json = json_encode($object);
        header('Content-Type: application/json');
        echo $json;
    }

    function minifyHTML($html) 
    {
        $search = array(
            '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
            '/[^\S ]+\</s',     // strip whitespaces before tags, except space
            '/(\s)+/s',         // shorten multiple whitespace sequences
            '~>\\s+<~m'
        );

        $replace = array('>','<','\\1','><');
        $html = preg_replace($search, $replace, $html);
        return trim($html);
    }

    function template($name, $vars = array()) {
        extract($vars);
        require_once "./app/templates/$name.php";
        return preg_replace('~>\\s+<~m', '><', $html);
    }

    function load($name, $vars = array()) {
        extract($vars);
        require "./dist/$name.php";
    }

    function toNumber ($str) {
        
        $strWithoutCommas = preg_replace('/,/', '', $str);
        
        if (!is_numeric($strWithoutCommas)) {
            return null;
        }
    
        return $strWithoutCommas;
    };

    function getDiscountPercentage($originalPriceStr, $discountPriceStr) {
        $originalPrice = toNumber($originalPriceStr);
        $discountPrice = toNumber($discountPriceStr);

        if(is_null($originalPrice) || $originalPrice === 0) {
            $percentage = 0;
        } else {
            $percentage = 100 - ($discountPrice * 100 / $originalPrice);
        }

        if (!is_numeric($percentage)) {
            $percentage = 0;
        }
        return (int) $percentage;
    }

    function getVisIpAddr() { 
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) { 
            return $_SERVER['HTTP_CLIENT_IP']; 
        } 
        else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) { 
            return $_SERVER['HTTP_X_FORWARDED_FOR']; 
        } 
        else { 
            return $_SERVER['REMOTE_ADDR']; 
        } 
    }

    function setCountryCode() {
        if($_GET['countryCode']) {
            $GLOBALS['countryCode'] = strtolower($_GET['countryCode']);
        } else {
            $countryCode = 'MX';
            $ip = getVisIpAddr();
            
            $result = file_get_contents('http://ip2c.org/'.$ip);
    
            if ($result[0] === '1') {
                $reply = explode(';',$result);
                $countryCode = $reply[1];
            }
    
            $GLOBALS['countryCode'] = strtolower($countryCode);
        }
    }

    function getCountryCode() {
        return $GLOBALS['countryCode'];
    }