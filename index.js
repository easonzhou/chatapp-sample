var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var username = 'user ';
var id = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){	
    console.log('a user connected');
    id++;
    var u = username + id;
    socket.broadcast.emit('chat message', u + ' connects');
    socket.on('chat message', function(msg){
	socket.broadcast.emit('chat message', u + ': ' + msg);
    });
    socket.on('typing', function(msg){
	socket.broadcast.emit('typing', u + ' is typing...');
    });
    socket.on('disconnect', function(){
	io.emit(u + ' disconnected');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

