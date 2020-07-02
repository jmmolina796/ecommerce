<?php

	require './vendor/autoload.php';

	require_once('./app/helpers/stores.php');
	require_once('./app/helpers/products.php');

	setCountryCode();

	$dispatcher = FastRoute\simpleDispatcher(function($router) {
		
		// $router->get('/', 'root_handler');

		$router->addGroup('', 'stores_handler');

		$router->addGroup('/api/products', 'products_handler');
		
	});

	$httpMethod = $_SERVER['REQUEST_METHOD'];
	$uri = $_SERVER['REQUEST_URI'];

	if (false !== $pos = strpos($uri, '?')) {
		$uri = substr($uri, 0, $pos);
	}
	$uri = rawurldecode($uri);

	$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

	switch ($routeInfo[0]) {
		case FastRoute\Dispatcher::NOT_FOUND:
			echo 'Not Found';
			break;
		case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
			$allowedMethods = $routeInfo[1];
			echo 'Not Found';
			break;
		case FastRoute\Dispatcher::FOUND:
			$handler = $routeInfo[1];
			$vars = $routeInfo[2];
			$handler($vars, $uri);
			break;
	}