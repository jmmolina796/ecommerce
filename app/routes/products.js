const router = require('express').Router();
const { getUrl } = require('../utils');
const products = require('../db/products');

const urls = Object.keys(products).map(v => `/${v}`);

router.get(urls, (req, res) => {

	const url = getUrl(req.url);
	const productList = products[url];

	if(productList) {
		res.json(productList);
	} else {
		res.json({});
	}

});

module.exports = router