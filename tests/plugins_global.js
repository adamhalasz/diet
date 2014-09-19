require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Plugins (global)'.yellow + ': '.grey;

describe(subject + 'Present in Routes', function(){	
	it('should attach the test_module as a global plugin and test if it is present in all the Routes'.grey
	, function(done){
		var app = new server({ debug: true })
		app.domain('http://localhost:9012')
		app.plugin('test_module')
		app.start()
		
		app.get('/1', function($){
			console.log($.test_module);
			assert($.test_module.version, 'v1.0')
			$.end('1:'+$.test_module.version)
		});
		
		app.get('/2', function($){
			assert($.test_module.version, 'v1.0')
			$.end('2:'+$.test_module.version)
		})
		
		request.get('http://localhost:9012/1', function(error, response, body){
			if(error) throw error;
			assert.equal(body, '1:v1.0')
			assert.equal(response.headers['content-type'], 'text/plain')
			assert.equal(response.statusCode, 200)
			finish()
		})
		
		request.get('http://localhost:9012/2', function(error, response, body){
			if(error) throw error
			assert.equal(body, '2:v1.0')
			assert.equal(response.headers['content-type'], 'text/plain')
			assert.equal(response.statusCode, 200)
			finish()
		});
		
		var c = 0;
		function finish(){
			c++;
			if(c == 2) done()
		}
	});
});