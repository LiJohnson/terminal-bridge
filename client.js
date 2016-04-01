var client = require('socket.io-client');
var argv = require('yargs').argv;
var config = require('./config');
var ss = require('socket.io-stream');
var pty = require('child_pty');

var url = 'ws://' + (argv.server || 'lcs.com:3000');

var socket = client.connect( url ,{reconnect:true});

socket.on('connect',function(){
	console.log('connected');
	socket.emit('join',config.serverClient);
}).on('data',function (params) {
    console.log('data',params);
    socket.emit(config.webClient , 'I see ' + params );
})


ss(socket).on('terminal',function(stream,options){
	console.log('stream in');
	var pro = pty.spawn('/bin/bash', ['-c', config.login], options);
	pro.stdout.pipe(stream).pipe(pro.stdin);
	socket.on('disconnect',function(){
		pro.kill('SIGHUP');
	});
});
