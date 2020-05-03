<?php

	require './vendor/autoload.php';

	require_once('./app/routes/root.php');
	require_once('./app/routes/stores/health.php');
	require_once('./app/routes/categories/health.php');
	require_once('./app/routes/products/health.php');

	$dispatcher = FastRoute\simpleDispatcher(function($router) {
		
		$router->get('/', 'root_handler');

		$router->addGroup('', 'store_health_handler');
		$router->addGroup('/coronavirus', 'store_health_handler');
		$router->addGroup('/covid', 'store_health_handler');
		
		$router->get('/api/categories', 'categories_health_handler');
		$router->get('/api/categories/coronavirus', 'categories_health_handler');
		$router->get('/api/categories/covid', 'categories_health_handler');

		$router->addGroup('/api/products', 'products_health_handler');
		$router->addGroup('/api/products/coronavirus', 'products_health_handler');
		$router->addGroup('/api/products/covid', 'products_health_handler');
		
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