const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const products = require('./app/routes/products');
const categories = require('./app/routes/categories');
const healthStore = require('./app/routes/healthStore');

const baseDistPath = path.join(__dirname, '/', 'dist');

app.use('/', express.static(baseDistPath));

app.use('/api/products', products);
app.use('/api/categories', categories);

app.use('/', healthStore);
app.use('/covid/', healthStore);
app.use('/coronavirus/', healthStore);

app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});