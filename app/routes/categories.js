const router = require('express').Router();
const categories = require('../db/categories');

router.get('/', (req, res) => {

	if(categories) {
		res.json(categories);
	} else {
		res.json({});
	}

});

module.exports = router