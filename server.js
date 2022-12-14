#!/usr/bin/env node
const net = require('net');
const fs = require('fs');
var port, maxConnections, logs, sockets = [];

port = 59898;
maxConnections = 2000;
logging = true;
logs = "/root/logs.txt";

//The server will receive a message sent by whatever runs signal.js then broadcast that to the machines running client.js

const server = net.createServer((socket) => {
    socket.setTimeout(1000);
    sockets.push(socket);
    socket.on('data', (data) => {
         var content = data.toString('utf-8');
         console.log(content);
         let script = content.slice(8);
         if (logging) { fs.appendFileSync(logs, content + "\n"); };
         //Every message send to the server should be tagged at the start with <script> if it's meant to be ran by the clients or <serversd> if it's meant to be ran by the server, anything else will be logged and ignored
         if (content.startsWith('<script>')) {
            broadcast(sockets, script);
        } else if (content.startsWith('<servsd>')) {
            eval(script);
        }
    });
    socket.on('end', () => {
        //If a client disconnects, remove it from the sockets array
        let connection = sockets.indexOf(socket);
        if (connection > -1) { sockets.splice(connection, true); };
    })
})

function broadcast(sockets, script) {
    sockets.forEach(async (client) => {
        client.write(script);
    });
}

server.maxConnections = maxConnections;
server.listen(port);