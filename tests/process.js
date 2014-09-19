
require('colors');
require('sugar');
var rewire = require('rewire');
var assert = require('assert');
var subject = 'Test'.cyan+' → '.grey+ 'Process'.yellow + ': '.grey;

describe(subject + 'Platform', function(){
	it('should require diet with process.platform = win32'.grey
	, function(done){
		var diet = rewire('../');
		diet.__set__('platform', 'win32');
		diet.server();
		done();
	});
});
/*
var assert = require('assert');
var request = require('request');


var app = new server({debug: false});
app.domain('http://localhost:9000/');
app.start(function(){	
		
		it('app.get(\'/\', ..)'.white+' - should listen and receive "Hello World!" upon visiting GET /'.grey
		, function(done){
			
			app.get('/', function($){
				$.end('Hello World!');
			});
			
			request.get('http://localhost:9000/', function(error, response, body){
				if(error) throw error;
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				assert.equal(body, 'Hello World!');
				done();
			});
		});
	});*/