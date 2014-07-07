nodejs-api-streaming
================

A demo application in Javascript for streaming rates using OANDA API and socket.io

### Setup

Clone this repo to the location of your choice

Install socket.io

	npm install socket.io

If there are errors when installing socket.io, check http://stackoverflow.com/questions/12913141/installing-from-npm-fails

	Try

	sudo apt-get update
	sudo apt-get install -y python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

	then npm install socket.io

Update the following information variables in streaming.js:

    domain
    account_id
    access_token (Authorization)
    instruments

To execute, run the following command:

    node streaming.js

When socket.io is started, go to your browser:

	http://127.0.0.1:1337/index.html

### Sample Output

	{"tick":{"instrument":"EUR_USD","time":"2014-03-11T19:09:40.651597Z","bid":1.38672,"ask":1.38685}}
	{"tick":{"instrument":"EUR_USD","time":"2014-03-11T19:09:40.654826Z","bid":1.38673,"ask":1.38685}}
	{"tick":{"instrument":"USD_CAD","time":"2014-03-11T19:09:42.040914Z","bid":1.11062,"ask":1.1108}}
	{"tick":{"instrument":"EUR_USD","time":"2014-03-11T19:09:42.973101Z","bid":1.38673,"ask":1.38685}}
	{"heartbeat":{"time":"2014-03-11T19:09:43.024312Z"}}

### More Information

http://developer.oanda.com/
