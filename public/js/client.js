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

    false && $('form').addEventListener('submit',function(e){
        socket.emit('server',this.elements[0].value);
        this.elements[0].value = '';
        e.preventDefault();
        return false;
    });

    var contain = $('.terminaljs');
    var term = window.t=new Terminal( contain.dataset );
    var stream = window.st=ss.createStream({decodeStrings: false, encoding: 'utf-8'});

    stream.write("cd \nsource ~/.profile \n");
    ss(socket).emit('terminal', stream, contain.dataset);
    stream.pipe(term).dom(contain).pipe(stream);

    window.onresize = function(){
        var size = {rows:contain.clientHeight/17,columns:contain.clientWidth/8};
        size.rows = ~~size.rows;
        size.columns = ~~size.columns;
        socket.emit('resize',size);
        term.state.resize(size);
    };
    window.onresize();
})(window.io , function(s){ return document.querySelector(s); });