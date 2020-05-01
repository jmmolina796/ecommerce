const router = require('express').Router();
const categories = require('../db/categories');

router.get('/', (req, res) => {

	if (!categories) {
		res.json({});
		return;
	}

	const preparedCategories = categories.map( ({title, url, message, imageName}) => ({
		title,
		url,
		message,
		imageName
	}));

	res.json(preparedCategories);

});

module.exports = router