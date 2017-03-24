var server = require('../../')
var request = require('request')

var proxy = server()
proxy.listen('test.local.com:3000')
proxy.header(function($){
	request.get('http://test2.local.com:5000/', function(error, response, body){
		if(error) throw error;
		$.send('\nPort 3000 reached\n\nResponse from http://test2.local.com/:\n')
		$.end(body)
	});
})

var app = server()
app.listen('test.local.com:5000')
app.host('test2.local.com:5000')
app.get('/', function($){
	$.end('Hello world!')
})
