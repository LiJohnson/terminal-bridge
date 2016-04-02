(function (io , $) {
    console.log($);
    var socket = new io();
    socket.on('connect',function () {
        console.log('connected');
        socket.emit('join','client');
    }).on('data',function (params) {
        console.log(params);
    }).on('message',function (message) {
        alert(message);
    });

    $('form').addEventListener('submit',function(e){
        socket.emit('server',this.elements[0].value);
        this.elements[0].value = '';
        e.preventDefault();
        return false;
    });

    var contain = $('.terminaljs');
    var term = new Terminal( contain.dataset );
    var stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});

    stream.write("cd \nsource ~/.profile \n");
    ss(socket).emit('terminal', stream, contain.dataset);
    stream.pipe(term).dom(contain).pipe(stream);

})(window.io , function(s){ return document.querySelector(s); });