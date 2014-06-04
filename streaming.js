var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var last;
var tick;

var https = require('https');
var options = {
  host: 'stream-fxpractice.oanda.com',
  // subscribe up to 10 instruments
  // update accountId
  path: '/v1/prices?accountId=<your account ID>&instruments=EUR_USD%2CUSD_CAD',
  method: 'GET',
  // update access token
  headers: {"Authorization" : "Bearer <your access token>"},
};

var request = https.request(options, function(response){
  response.on("data", function(chunk){
    tick = chunk.toString();
  });
  response.on("end", function(){
    console.log("Disconnected");
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
    if (tick !== last) {
      socket.emit('news', tick);
      last = tick;
    }
  }, 0.001);
});
