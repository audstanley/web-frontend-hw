const path = require('path');

const extractFilePath = (url) => {
    let filename = 'index.html';
    if (url.length > 1) {
        filename = url.substring(1);
        console.log(filename);
    }
    let filepath = path.resolve(__dirname, 'app', filename);
    return filepath;
};

module.exports = { extractFilePath };