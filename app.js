var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app).listen(3001);
var io = require('socket.io').listen(server);
io.set('log level', 1);
io.set('transports', ['websocket']);
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
    socket.on('CreateSession', function(msg){
        socket.join(msg);
    });
    socket.on('JoinRoom', function(msg){
        socket.join(msg);
        io.sockets.in(msg).emit('SessionStarted', '');

    });
    socket.on('SendScreen', function(msg){
        socket.broadcast.to(msg.Room).emit('ClientScreen', {message:msg.Data});
    });
    socket.on('ClientMousePosition', function(msg){
        socket.broadcast.to(socket.Room).emit('ClientMousePosition', {PositionLeft:msg.PositionLeft, PositionTop:msg.PositionTop});
    });
    socket.on('AdminMousePosition', function(msg){
        socket.broadcast.to(msg.room).emit('AdminMousePosition', {PositionLeft:msg.PositionLeft, PositionTop:msg.PositionTop});
    });
    socket.on('changeHappened', function(msg){
        io.sockets.emit('changes', msg)
    });
});
app.listen(3000);