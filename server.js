const path = require('path');
const express = require('express');
const app = express();
const Bundler = require('parcel-bundler');

const port = process.env.PORT || 3000;

const baseClientPath = path.join(__dirname, './', 'client');
const indexFile = path.join(baseClientPath, 'index.html');

const file = indexFile;
const options = {
    minify: true,
    sourceMaps: false
};

const bundler = new Bundler(file, options);

app.use(bundler.middleware());

app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});