var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var last;
var tick;


/*
Environment           <Domain>
fxTrade               stream-fxtrade.oanda.com
fxTrade Practice      stream-fxpractice.oanda.com
sandbox               stream-sandbox.oanda.com
*/

// Replace the following variables with your personal ones
var domain = 'stream-sandbox.oanda.com'
var access_token = 'ACCESS-TOKEN'
var account_id = '12345'
// Up to 10 instruments, separated by URL-encoded comma (%2C)
var instruments = "EUR_USD%2CUSD_CAD"

var https;

if (domain.indexOf("stream-sandbox") > -1) {
  https = require('http');
} else {
  https = require('https');
}
var options = {
  host: domain,
  path: '/v1/prices?accountId=' + account_id + '&instruments=' + instruments,
  method: 'GET',
  headers: {"Authorization" : "Bearer " + access_token},
};

var request = https.request(options, function(response){
      response.on("data", function(chunk){
         bodyChunk = chunk.toString();
      });
      response.on("end", function(chunk){
         console.log("Error connecting to OANDA HTTP Rates Server");
         console.log("HTTP - " + response.statusCode);
         console.log(bodyChunk);
         process.exit(1);
      });
});

request.end();

app.listen(1337, '127.0.0.1');

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
};

io.sockets.on('connection', function (socket) {
  setInterval(function(){
    if (bodyChunk !== last) {
      socket.emit('news', bodyChunk);
      last = bodyChunk;
    }
  }, 0.001);
});
