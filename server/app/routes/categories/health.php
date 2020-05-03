<?php

    include_once('./app/util.php');

    function categories_health_handler($vars, $uri) {
        $path = './app/db/categories/health.json';
        sendJsonFile($path);
    }