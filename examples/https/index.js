var server = require('diet');
var app = new server();

// These certificates are only for testing purposes
// all modern browsers will reject them and display a warning 
app.domain('https://localhost:9000/', {
	key: app.path + '/secure/server.key',
	cert: app.path + '/secure/server.crt',
	ca: app.path + '/secure/ca.crt',
});

app.start();
app.get('/', function($){
	$.end('HTTPS!');
});