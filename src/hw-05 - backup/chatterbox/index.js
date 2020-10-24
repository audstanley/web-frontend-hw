const http = require('http');
const fs = require('fs');
const path = require('path');
const { extractFilePath } = require('./extract');
const wss = require('./websockets-server');
const WebSocket = require('ws');

const handleError = (err, res) => {
    console.log('handling error');

    res.writeHead(404);
    res.write('404 File not found');
    res.end();
};

const server = http.createServer((req,res) => {
    console.log(`responding to a request`);

    let filepath = extractFilePath(req.url);
    fs.readFile(filepath, (err, data) => {
        if(err) {
            handleError(err, res);
            return;
        } else {
            res.end(data);
        }
    });
});

server.listen(3002);