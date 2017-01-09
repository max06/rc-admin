var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(3000);
console.log('Server listening on port 3000...');