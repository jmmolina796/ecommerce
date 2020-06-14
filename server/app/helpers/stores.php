<?php

    include_once('./app/util.php');
    include_once('./app/helpers/Template.php');

    function stores_handler($router) {

        $path = './app/db/stores/';
        $stores = array_diff(scandir($path), array('..', '.'));

        foreach($stores as $store) {
            store_handler($router, $store);
        }

    }

    function store_handler($router, $storeName) {
        $path = "./app/db/stores/$storeName";
        $storeInfo = getJsonFromFile($path);

        $path = "./app/db/categories/$storeName";
        $categoriesInfo = getJsonFromFile($path);

        $categories = array_map(function($category) {
            return '/'.$category->url;
        }, $categoriesInfo);
        
        foreach($storeInfo->urls as $url) {
            
            $router->get('/'.$url, function($vars, $uri) use ($storeInfo, $categoriesInfo) {
                store_html_handler($vars, $uri, $storeInfo, $categoriesInfo);
            });
            
            foreach($categories as $category) {
                
                $completeUrl = ($url === "") ? ($url.$category) : ('/'.$url.$category);
                
                $router->get($completeUrl, function($vars, $uri) use ($storeInfo, $categoriesInfo) {
                    store_html_handler($vars, $uri, $storeInfo, $categoriesInfo);
                });
            }
        }
    }

    function store_html_handler($vars, $uri, $storeInfo, $categoriesInfo) {
        $template = new Template($storeInfo, $categoriesInfo, $uri);
        $template->buildAndSend();
    }