(function (io , $) {
    console.log($);
    var socket = new io();
    socket.on('connect',function () {
        console.log('connected');
    }).on('data',function (params) {
        console.log(params);
    }).emit('join','client');

    $('form').addEventListener('submit',function(e){
        socket.emit('server',this.elements[0].value);
        this.elements[0].value = '';
        e.preventDefault();
        return false;
    });

})(window.io , function(s){ return document.querySelector(s); });