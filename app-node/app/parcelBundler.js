const path = require('path');
const Bundler = require('parcel-bundler');

const baseClientPath = path.join(__dirname, '../', 'client');
const indexFile = path.join(baseClientPath, 'index.html');

const file = indexFile;

const options = {
    minify: false,
    sourceMaps: false,
    watch: true,
    publicUrl: '/'
};

const parcelBundler = new Bundler(file, options);


module.exports = parcelBundler;