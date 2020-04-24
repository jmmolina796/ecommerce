const path = require('path');
const express = require('express');
const app = express();
const Bundler = require('parcel-bundler');

const port = process.env.PORT || 3000;

const products = require('./app/routes/products');
const categories = require('./app/routes/categories');

const baseClientPath = path.join(__dirname, '/', 'client');
const baseDistPath = path.join(__dirname, '/', 'dist');
const indexFile = path.join(baseClientPath, 'index.html');

const file = indexFile;
const options = {
    minify: true,
    sourceMaps: false,
    watch: false,
    publicUrl: '/'
};

app.use('/', express.static(baseDistPath));

const parcelBundler = new Bundler(file, options);
parcelBundler.middleware();

app.use('/api/products', products);
app.use('/api/categories', categories);

app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});