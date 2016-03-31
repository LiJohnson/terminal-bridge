var client = require('socket.io-client');
var argv = require('yargs').argv;

var socket = client.connect('ws://' + (argv.server || 'lcs.com:3000'),{reconnect:true});

socket.on('connect',function(){
	console.log('connected');
});
