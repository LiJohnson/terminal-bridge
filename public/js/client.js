(function (doc , io , $) {
    var socket = new io();
    var contain = $('.terminaljs');
    var term = new Terminal( contain.dataset );
    var stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});

    socket.on('connect',function () {
        console.log('connected');
        socket.emit('join','client');
    }).on('message',function (message) {
        alert(message);
    });

    stream.write("cd \nsource ~/.profile \n");
    ss(socket).emit('terminal', stream, contain.dataset);
    stream.pipe(term).dom(contain).pipe(stream);

    doc.addEventListener('paste',function(e){
        console.log(e);
        var item = e.clipboardData.items[0];
        var data = item && item.kind == 'string' && e.clipboardData.getData(item.type);
        data && stream.write(data);
    });

    window.onresize = function(){
        var size = {rows:contain.clientHeight/16,columns:contain.clientWidth/8};
        size.rows = ~~size.rows;
        size.columns = ~~size.columns;
        socket.emit('resize',size);
        term.state.resize(size);
    };
    window.onresize();
})(document , window.io , function(s){ return document.querySelector(s); });