var socketIo = require('socket.io');
var IoServer = function (app) {
    var io = socketIo(app);

    io.on('connection',function( socket ){
        console.log('someone comes');
        
        socket.on('disconnect',function () {
            console.log('someone gone');
        });
    });
};

module.exports = function( app ) {
    new IoServer(app);
}
