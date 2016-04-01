var socketIo = require('socket.io');
var config = require('./config');

var IoServer = function (app) {
    var io = socketIo(app);

    io.on('connection',function (socket) {
        console.log('someone come ' , socket.id);
        socket.on('disconnect',function(params) {
            console.log('someone gone ' , socket.id);
        }).on('join',function (room) {
            socket.join(room,function () {
                console.log( 'join in' , room , socket.id );
            });
        }).on(config.webClient,function (params) {
            io.to(config.webClient).emit('data',params);
        }).on(config.serverClient,function (params) {
            io.to(config.serverClient).emit('data',params);
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
