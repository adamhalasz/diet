
require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Domains (https)'.yellow + ': '.grey;

describe(subject + 'Try to use listen on HTTPS without the httpsOption', function(){	
	it('should fail trying to use HTTPS without app.secure'.grey
	, function(done){
		var app = server();
		try {
			app.listen('https://localhost:9014/');
		} catch (error) {
			assert.equal(typeof error, 'object');
			done();
		}
		
		/*
		app.get('/', function($){
			$.end('hello from https://localhost:9014');
		});
		
		request.get('https://localhost:9014', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from https://localhost:9014');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			
			done();
		});*/
	});
	
	it('should use HTTPS by adding httpsOptions to app.listen and make sure the connection is working'.grey
	, function(done){
		var app = server();
		var fs = require('fs')
		app.listen('https://localhost:9015/', {
			key: fs.readFileSync(__dirname + '/secure/server.key'),
			cert: fs.readFileSync(__dirname + '/secure/server.crt'),
			ca: fs.readFileSync(__dirname + '/secure/ca.crt'),
		});
		
		app.get('/', function($){
			$.end('hello from https://localhost:9015');
		});
		
		request.get({
			url:'https://localhost:9015',
			strictSSL: false
		}, function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from https://localhost:9015');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});