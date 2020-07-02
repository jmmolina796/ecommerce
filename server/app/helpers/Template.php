<?php

    include_once('./app/util.php');

    class Template {
        private $countryCode;

        private $storeInfo;
        private $categoriesInfo;

        private $baseUrl;
        private $urlStore;
        private $urlCategory;

        private $currentCategory;

        private $products;

        function __construct($storeInfo, $categoriesInfo, $uri) {
            $this->countryCode = getCountryCode();

            $this->storeInfo = $storeInfo;
            $this->categoriesInfo = $categoriesInfo;

            $this->defineUrls($uri);
            $this->defineCurrentCategory($uri);
            $this->defineProducts();

        }

        private function defineUrls($uri) {
            $this->baseUrl = getBaseUrl();

            $urlPaths = substr($uri, 1);

            $explotedPaths = explode("/", $urlPaths);
            $urlStore = "";
            $urlCategory = "";

            if($explotedPaths[0] === "") {
                $urlStore = "";
                $urlCategory = "";
            } else if((!in_array($explotedPaths[0], $this->storeInfo->urls))) {
                $urlStore = "";
                $urlCategory = $explotedPaths[0];
            } else {
                $urlStore = $explotedPaths[0];
                $urlCategory = is_null($explotedPaths[1]) ? "" : $explotedPaths[1];
            }
            $this->urlStore = $urlStore;
            $this->urlCategory = $urlCategory;
        }

        private function defineCurrentCategory($uri) {
            if ($this->urlCategory === "") {
                $this->currentCategory = $this->categoriesInfo[0];
            } else {
                $categoriesFiltered = array_filter($this->categoriesInfo, function($c) use ($uri) {
                    return $this->urlCategory === $c->url;
                });
                $firstKey = array_keys($categoriesFiltered)[0];
                $this->currentCategory = $categoriesFiltered[$firstKey];
            }
        }

        private function defineProducts() {
            if ($this->storeInfo->displayProducts) {
                if ($this->currentCategory) {
                    $products = $this->currentCategory->products;
                    $path = "./app/db/products/".$this->countryCode."/".$products.".json";
                    $this->products = getJsonFromFile($path);
                } else {
                    $this->products = array();
                }
            }
        }

        function setHead() {
            $title = $this->storeInfo->title;
            $description = $this->storeInfo->description;

            require_once "./app/templates/head.php";

            return $html;
        }

        function setH1() {
            $header = $this->storeInfo->header;

            require_once "./app/templates/h1.php";

            return $html;
        }

        function setNav() {

            $basePath = ($this->urlStore === "") ? "/" : "/".$this->urlStore.'/';
            
            $baseUrlStore = $this->baseUrl.$basePath;
            $categories = $this->categoriesInfo;
            
            require_once "./app/templates/nav.php";

            return $html;
        }

        function setMainMessage() {
            $baseUrl = $this->baseUrl;
            $image = $this->storeInfo->image;
            $offer = $this->storeInfo->offer;
            $slogan = $this->storeInfo->slogan;
            $message = $this->storeInfo->message;
            $button = $this->storeInfo->button;

            require_once "./app/templates/mainMessage.php";

            return $html;
        }

        function setCategories() {
            $categories = $this->categoriesInfo;
            
            require_once "./app/templates/categories.php";

            return $html;
        }

        function setProducts() {
            
            $productsTitle = is_null($this->storeInfo->productsTitle) ? $this->currentCategory->title : $this->storeInfo->productsTitle;
            $displayProducts = $this->storeInfo->displayProducts;
            
            if ($this->storeInfo->displayProducts) {
                $products = $this->products;
                $products = array_splice($products, 0, 12);
            }
            
            require_once "./app/templates/products.php";
            
            return $html;
        }

        function setFooter() {
            $footer = $this->storeInfo->footer;
            
            require_once "./app/templates/footer.php";

            return $html;
        }

        function buildAndSend() {

            $fileName = $this->storeInfo->templateFile;
            
            $head = minifyHTML($this->setHead());
            $countryCode = $this->countryCode;
            $h1 = minifyHTML($this->setH1());
            $nav = minifyHTML($this->setNav());
            $mainMessage = minifyHTML($this->setMainMessage());
            // $categories = minifyHTML($this->setCategories());
            $products = minifyHTML($this->setProducts());
            $footer = minifyHTML($this->setFooter());
            
            require "./dist/".$fileName.".php";
        }
    }