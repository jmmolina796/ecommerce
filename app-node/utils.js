const url = require('url');

const getUrl = (reqUrl) => {
    const parsedUrl = url.parse(reqUrl, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/|\/$/g, '');
    return trimmedPath;
};

module.exports = {
    getUrl
};