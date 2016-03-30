var client = require('socket.io-client');

var socket = client.connect('http://lcs.com:9090',{reconnect:true});

socket.on('connect',function(){
	console.log('connected');
});
