var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Events'.yellow + ': '.grey;

describe(subject + 'initialize', function(){
	
	
	var proxy = server()
	proxy.listen('test.local.com:9079')
	proxy.header(function($){
		request.get('http://test2.local.com:9078/', function(error, response, body){
			if(error) throw error;
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			assert.equal(body, 'PROXY_HOST_TEST');
			$.end(body)
		});
	})
    
    var app = server()
    app.listen('test.local.com:9078')
    app.host('test2.local.com:9078')
    app.get('/', function($){
    	$.end('PROXY_HOST_TEST')
    })
    
    it('should test app.host()', function(done){
        
        request.get('http://test.local.com:9079/', function(error, response, body){
        	if(error) throw error;
        	assert.equal(body, 'PROXY_HOST_TEST');
        	assert.equal(response.headers['content-type'], 'text/plain');
        	assert.equal(response.statusCode, 200);
        	done();
        });
    });
})