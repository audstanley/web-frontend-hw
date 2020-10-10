const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});

console.log('websockets server started');

ws.on('connection', socket => { 
    console.log('client connection established');

    socket.on('message', data => {
        console.log('message received: ' + data);
        socket.send(data);
    });
});