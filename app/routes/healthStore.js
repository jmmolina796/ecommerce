const parcelBundler = require('../parcelBundler');
const router = require('express').Router();
const categories = require('../db/categories');

const urls = categories.map(c => `/${c.url}`);

router.get(['/', ...urls], parcelBundler.middleware());

module.exports = router;