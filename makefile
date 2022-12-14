#!/bin/make

DEST = /usr/local/bin/signal.d

make:
	chmod +x signal.js
	chmod 755 signal.js
	mkdir $(DEST)
	touch $(DEST)/server
	cp signal.js /usr/local/bin/signal

install-libs:
	cd /usr/local/bin
	npm i prompt-sync --package-lock
	npm i axios --package-lock
	npm i net --package-lock