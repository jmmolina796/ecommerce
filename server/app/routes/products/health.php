<?php

    include_once('./app/util.php');

    function products_health_handler($router) {
        
        $path = './app/db/categories/health.json';
        $categories = getJsonFromFile($path);

        $products = array_map(function($category) {
            return '/'.$category->url;
        }, $categories);
        
        foreach($products as $product) {
            $router->get($product, 'product_health_handler');
        }
    }

    function product_health_handler($vars, $uri) {

        $selectedUrl = getUrlPath($uri, -1);
        
        $path = './app/db/categories/health.json';
        $categories = getJsonFromFile($path);

        $selectedCategory = array_filter($categories, function($category) use ($selectedUrl) {
            return $category->url === $selectedUrl;
        });

        $firstKey = array_keys($selectedCategory)[0];

        $currentCategory = $selectedCategory[$firstKey];

        $path = './app/db/products/'.$currentCategory->products.'.json';

        $products = getJsonFromFile($path);

        $preparedProduct = (object) [
            "titleCategory" => $currentCategory->title,
            "urlCategory" => $currentCategory->url,
            "products" => $products
        ];

        sendAndTransformJson($preparedProduct);

    }