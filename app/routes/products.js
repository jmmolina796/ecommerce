const router = require('express').Router();
const { getUrl } = require('../utils');
const categories = require('../db/categories');

const urls = categories.map(c => `/${c.url}`);

router.get(urls, (req, res) => {
	
	const selectedUrl = getUrl(req.url);
	const selectedCategory = categories.filter(p => p.url === selectedUrl);

	if(!selectedCategory) {
		res.json({});
		return;
	}

	const productList = selectedCategory[0];

	if(!productList) {
		res.json({});
		return;
	}

	const { title, url, products } = productList


	res.json({
		titleCategory: title,
		urlCategory: url,
		products
	});

});

module.exports = router