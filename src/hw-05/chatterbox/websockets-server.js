const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3003;
const ws = new WebSocketServer({
    port: port
});
let messages = [];

console.log('websockets server started');

let loggedIn = false;
ws.on('connection', socket => { 
    console.log('client connection established');

    messages.forEach(function(msg){
        //Regular
        socket.send(msg);
        
        // Silver Challenge: Speakeasy
        // if (loggedIn) {
        //     socket.send(msg);
        // }
    });


    // Regualar:
    socket.on('message', data => {
        console.log('message received: ' + data);
        messages.push(data);
        ws.clients.forEach(function(clientSocket){
            clientSocket.send(data);
        });
    });


    // Silver Challenge: Speakeasy
    // socket.on('message', data => {
    //     console.log('message received: ' + data);
    //     if (loggedIn) {
    //         console.log(data);
    //         messages.push(data);
    //         socket.send(data);
    //     } else if (data == "Swordfish") {
    //         loggedIn = true;
    //         messages.push(data);
    //         socket.send(data);
    //     }
    // });
});