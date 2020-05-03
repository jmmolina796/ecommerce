<?php

    include_once('./app/util.php');

    function store_health_handler($router) {
        
        $router->get('', 'store_health_html_handler');

        $path = './app/db/categories/health.json';
        $categories = getJsonFromFile($path);

        $products = array_map(function($category) {
            return '/'.$category->url;
        }, $categories);
        
        foreach($products as $product) {
            $router->get($product, 'store_health_html_handler');
        }

    }

    function store_health_html_handler($vars, $uri) {
        require './dist/index.html';
    }