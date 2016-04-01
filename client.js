var client = require('socket.io-client');
var argv = require('yargs').argv;
var config = require('./config');

var url = 'ws://' + (argv.server || 'lcs.com:3000');

var socket = client.connect( url ,{reconnect:true});

socket.on('connect',function(){
	console.log('connected');
}).on('data',function (params) {
    console.log('data',params);
    socket.emit(config.webClient , 'I see ' + params );
}).emit('join',config.serverClient);

var i = 0;
setInterval(function () {
    //socket.emit(config.webClient, 'data' + (i++) );
},1000);
