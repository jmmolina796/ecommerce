<?php

    include_once('./app/util.php');

    function products_handler($router) {

        $countryCode = getCountryCode();

        $path = "./app/db/categories/$countryCode/";
        $categories = array_diff(scandir($path), array('..', '.'));

        foreach($categories as $category) {
            product_handler($router, $category);
        }
        
    }

    function product_handler($router, $categoryName) {

        $countryCode = getCountryCode();

        $path = "./app/db/categories/$countryCode/$categoryName";
        $categories = getJsonFromFile($path);

        $products = array_map(function($category) {
            return '/'.$category->url;
        }, $categories);
        
        foreach($products as $product) {
            $router->get($product, function($vars, $uri) use ($categoryName) {
                product_api_handler($vars, $uri, $categoryName);
            });
        }

    }

    function product_api_handler($vars, $uri, $categoryName) {

        $countryCode = getCountryCode();
        
        $elementsLoaded = (is_numeric($_GET['elements']) && $_GET['elements'] >= 0) ? $_GET['elements'] : 0 ;
        $loadInterval = 12;

        $selectedUrl = getUrlPath($uri, -1);
        
        $path = "./app/db/categories/$countryCode/$categoryName";
        $categories = getJsonFromFile($path);

        $selectedCategory = array_filter($categories, function($category) use ($selectedUrl) {
            return $category->url === $selectedUrl;
        });

        $firstKey = array_keys($selectedCategory)[0];

        $currentCategory = $selectedCategory[$firstKey];

        $path = "./app/db/products/$countryCode/".$currentCategory->products.".json";

        $products = getJsonFromFile($path);

        $products = array_splice($products, $elementsLoaded, $loadInterval);

        $preparedProduct = (object) [
            "titleCategory" => $currentCategory->title,
            "urlCategory" => $currentCategory->url,
            "products" => $products
        ];

        sendAndTransformJson($preparedProduct);
    }