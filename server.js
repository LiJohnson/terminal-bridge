var socketIo = require('socket.io');
var IoServer = function (app) {
    var io = socketIo(app);
    
    ['webClient','serverClient'].forEach(function (name) {
        io.of(name).on('connection',function( socket ){
            console.log(name,'someone comes' );
            socket.on('disconnect',function () {
                console.log('serverClient','someone gone');
            }).on('ha',function (params) {
                
            });
        });
    });
};

module.exports = function( app ) {
    new IoServer(app);
}
