var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection',function( socket ){
	console.log('someone comes');
});

server.listen(9090);
