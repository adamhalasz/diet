
require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Domains (http)'.yellow + ': '.grey;

describe(subject + 'Setup Domain with a String or a URL Object or Undefined', function(){	
	it('should create an app and setup the domain with a `string` listening on http://localhost:9006/'.grey
	, function(done){
		var app = server();
		app.listen('http://localhost:9006/');
		
		app.get('/', function($){
			$.end('hello from localhost:9006');
		});
		
		request.get('http://localhost:9006/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9006');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	it('should create an app with 2 header middleware'.grey
	, function(done){
		var app = server();
		app.listen('http://localhost:9020/');
		app.header(require('test_module'));
		app.header(require('test_module2'));
		
		app.get('/', function($){
			$.end('hello from localhost:9020');
		});
		
		request.get('http://localhost:9020/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9020');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	it('should create an app and setup the domain with an `object` listening on http://localhost:9007/'.grey
	, function(done){
		var app = server();
		app.listen({ 
			protocol: 'http:',
			hostname: 'localhost',
			host: 'localhost:9007',
			port: '9007'
		});
		
		app.get('/', function($){
			$.end('hello from localhost:9007');
		});
		
		request.get('http://localhost:9007/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9007');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	
	it('should create an app and setup the domain with an Integer domain and check if the app.location.port is 9035 and the app.location.host is localhost:9035."'.grey
	, function(done){
		var app = server();
		app.listen(9035)
		assert.equal(app.location.port, 9035);
		assert.equal(app.location.host, 'localhost:9035');
		done();
	});

});

describe(subject + 'Create Multiple Apps on Different HTTP Ports', function(){	
	it('should create server Instance listening on http://localhost:9001/'.grey
	, function(done){
		var app = server();
		app.listen('http://localhost:9001/');
		
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
	
	it('should create server Instance listening on http://localhost:9002/'.grey
	, function(done){
		var app = server();
		app.listen('http://localhost:9002/');
		
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

describe(subject + 'Create Multiple Apps on the same HTTP port (9003) with Different Domains', function(){	
	it('should create server Instance listening on http://test.local.com:9003/'.grey
	, function(done){
		var app = server();
		app.listen('http://test.local.com:9003/');
		
		app.get('/', function($){
			$.end('hello from http://test.local.com:9003/');
		});
		
		request.get('http://test.local.com:9003/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from http://test.local.com:9003/');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	it('should create server Instance listening on http://test2.local.com:9003/'.grey
	, function(done){
		var app = server();
		app.listen('http://test2.local.com:9003/');
		
		app.get('/', function($){
			$.end('hello from http://test2.local.com:9003/');
		});
		
		request.get('http://test2.local.com:9003/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from http://test2.local.com:9003/');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	})
});