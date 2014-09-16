require('../');
require('colors')
require('sugar');

var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Domains (http)'.yellow + ': '.grey;

describe(subject + 'Create Multiple Apps on Different HTTP Ports', function(){	
	it('should create new App Instance listening on http://localhost:9001/'.grey
	, function(done){
		var app = new App({debug: false});
		app.domain('http://localhost:9001/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost:9001');
		});
		
		request.get('http://localhost:9001/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9001');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			
			done();
		});
	});
	
	it('should create new App Instance listening on http://localhost:9002/'.grey
	, function(done){
		var app = new App({debug: false});
		app.domain('http://localhost:9002/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost:9002');
		});
		
		request.get('http://localhost:9002/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9002');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	})
});

describe(subject + 'Create Multiple Apps on the same HTTP port (80) with Different Domains', function(){	
	it('should create new App Instance listening on http://localhost/'.grey
	, function(done){
		var app = new App({debug: false});
		app.domain('http://localhost/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost');
		});
		
		request.get('http://localhost/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	it('should create new App Instance listening on http://127.0.0.1/'.grey
	, function(done){
		var app = new App({debug: false});
		app.domain('http://127.0.0.1/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from 127.0.0.1');
		});
		
		request.get('http://127.0.0.1/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from 127.0.0.1');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	})
});