
require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Domains (http)'.yellow + ': '.grey;

describe(subject + 'Try to use HTTPS without app.secure', function(){	
	it('should fail trying to use HTTPS without app.secure'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('https://localhost:9014/');
		
		try {
			app.start();
		} catch (error) {
			assert.equal(error.message, 'HTTPS: Certificates are missing. \n app.secure.key and app.secure.cert must be set.');
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
	
	it('should use HTTPS with app.secure and make sure the connection is working'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('https://localhost:9015/', {
			key: app.path + '/secure/server.key',
			cert: app.path + '/secure/server.crt',
			ca: app.path + '/secure/ca.crt',
		});
		app.start();
		
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