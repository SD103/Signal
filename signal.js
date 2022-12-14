#!/usr/bin/env node
const prompt = require('prompt-sync')({sigint: true});
const net = require('net');
const fs = require('fs');
const server = '/usr/local/bin/signal.d/server';

var script, remoteServer = fs.readFileSync(server, { encoding: 'utf-8' }).split(':');


//This will get the script meant to be ran by the clients by either opening a file provided in argv[2], using argv[2] as the script or getting direct user input with the prompt() function
if (!process.argv[2]) {
    script = prompt("Please enter script to be ran -> ");
} else if (process.argv[2].toLowerCase().includes('-h')) {
    console.log(`\
Signal usage:
    signal --help | -H
     Displays help

    signal <file>
     File must be a node.js file meant for the clients to run on their end

    signal --stdin | -S <script>
     Gets the script from command line arguments

    signal <args> -H | --host 
     Makes the server host run the script
`);
    process.exit(0);
} else {
    script = (
     process.argv[2].toLowerCase().includes('-s') ? process.argv[3]:
     fs.readFileSync(process.argv[2], { encoding: 'utf8' })
    );
};

const tag = ((process.argv.includes('-H') || process.argv.includes('--host')) ? "servsd" : "script");

var client = new net.Socket();
console.log(`Connecting to ${remoteServer[0]}...`);
try { client.connect({host: remoteServer[0], port: parseInt(remoteServer[1])}); } 
 catch (error) {
    console.log(`[ERROR]: Could not connect to ${remoteServer[0]}:${remoteServer[1]}, please check if it's online.`);
    process.exit(1);
}
client.on('connect', () => {
    console.log('connected!');
    client.write(`<${tag}>${script}`);
    client.destroy();
})
