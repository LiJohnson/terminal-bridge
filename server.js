var socketIo = require('socket.io');
var config = require('./config');
var ss = require('socket.io-stream');

var IoServer = function (app) {
    var io = socketIo(app);
    var map = {};
    io.on('connection',function (socket) {
        console.log('someone come ' , socket.id);
        socket.on('disconnect',function(params) {
            console.log('someone gone ' , socket.id);
        }).on('join',function (room) {
            map[room] = socket;
            socket.join(room,function () {
                console.log( 'join in' , room , socket.id );
            });
        }).on(config.webClient,function (params) {
            io.to(config.webClient).emit('data',params);
        }).on(config.serverClient,function (params) {
            io.to(config.serverClient).emit('data',params);
        });

        ss(socket).on('terminal',function(stream,options){
            console.log('proxyStream');
            var proxyStream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});
            ss(map[config.serverClient]).emit('terminal',proxyStream,options);
            proxyStream.pipe(stream).pipe(proxyStream);
        });
    });
    
    var i = 0;
    setInterval(function (params) {
        //io.to(config.webClient).emit('data','server ' + (i++) );
        //io.to(config.serverClient).emit('data','server ' + (i++) ); 
    },1000);
   
};

module.exports = function( app ) {
    new IoServer(app);
}
