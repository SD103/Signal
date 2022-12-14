Signal, by SD

DISCLAIMER:
This program is entirely designed for usage on the users OWN MACHINES
Do not ever attempt to "RCE" someone without their expressed permission as it is a breach of privacy and *illegal*.

This is a basic program showing off potential RCE uses with the net module in Node.JS
I use this with several computers in my home to synchronise them in running programs or to mine crypto.

Installation:

The installation will cover installing the server host, a client and the program that's going to be sending messages to the server host

For the server host:
Start by configuring the variables
logging controls if you want to log packets sent to the host to a text file.
logs is the absolute path to the file that said logs are going to be written to.
port is the port of the machine that the server will be running on

Run the program with node whenever you want the server to be on.

(Make sure to use `ip addr` or `ifconfig` to get the address of your server host)

For the client:
change the server variable to be the ip address of your server machine and port that the program is being ran on.
Run the client or put it in your boot folder so that it's always ran on boot.

For the program sender / main file (signal.js)
run the following:
```
sudo make
sudo make install-libs
```
Then run `signal` in the terminal whenever you want to use it.