require('colors')
require('sugar');

var assert 	= require('assert');
var request = require('request');
var server 	= require('../');
var path = require('path').dirname(require('callsite')()[1].getFileName())

var subject = 'Test'.cyan+' → '.grey+ 'server'.yellow + ': '.grey;

describe(subject + 'Server Instance', function(){	
	it('server'.white+' - Should create a new Server Instance'.grey
	, function(done){
		var app = server({ path: path });
		done();
	});
	
	it('server'.white+' - Should create a new Server Instance with a chain '.grey
	, function(done){
		
		server()
		    .listen('http://localhost:9033/')
		    .get('/', function($){ $.end('hello world'); })
		    .get('/other', function($){ $.end('hello other world') });
		
		var i = 0;
		function next(){ i++; if(i == 2) done(); }
		
		request.get('http://localhost:9033/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello world');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
            next();
		});
		
		
		request.get('http://localhost:9033/other', function(error, response, body){
			if(error) throw error;
			console.log(body);
			assert.equal(body, 'hello other world');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			next();
		});
	});
});
