<?php

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
