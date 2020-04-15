const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const baseClientPath = path.join(__dirname, './', 'client');
const indexFile = path.join(baseClientPath, 'index.html');
const cssPath = path.join(baseClientPath, 'css');
const jsPath = path.join(baseClientPath, 'js');

app.use('/css', express.static(cssPath));
app.use('/js', express.static(jsPath));

app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});