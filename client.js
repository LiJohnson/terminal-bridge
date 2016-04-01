var client = require('socket.io-client');
var argv = require('yargs').argv;

var url = 'ws://' + (argv.server || 'lcs.com:3000');
var path = argv.path || '/serverClient';
var socket = client.connect( url + path ,{reconnect:true});

socket.on('connect',function(){
	console.log('connected');
});
