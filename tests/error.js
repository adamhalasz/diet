require('colors')
require('sugar');

var assert 	= require('assert');
var request = require('request');
var server 	= require('../');

var subject = 'Test'.cyan+' → '.grey+ 'error'.yellow + ': '.grey;

describe(subject + 'Create Error', function(){	
	it('server'.white+' - Should raise a Default Unexpected HTML Error'.grey
	, function(done){
	    
		var app = server();
		app.listen(9040, function(){
    		app.get('/', function($){
    			$.callNonExistingFunction()
    		});
    		
    		request.get({
    			url:'http://localhost:9040',
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    			assert.equal(response.statusCode, 500);
    			done();
    		});
		})
	});
	
	it('server'.white+' - Should raise a Custom Unexpected HTML Error'.grey
	, function(done){
		var app = server();
		app.listen(9041, function(){
    		
    		
    		app.error(function($){
    		    $.end('custom error');
    		});
    		
    		app.get('/', function($){
    			$.callNonExistingFunction();
    		});
    		
    		request.get({
    			url:'http://localhost:9041',
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'custom error');
    			assert.equal(response.headers['content-type'], 'text/plain');
    			assert.equal(response.statusCode, 500);
    			done();
    		});
		});
	});
	
	it('server'.white+' - should raise an error when there is an error within app.error'.grey
	, function(done){
		var app = server();
		app.listen(9042, function(){
		    app.get('/', function($){
		    	$.callNonExistingFunction();
		    });
		    
		    app.error(function($){
		        $.callNonExistingFunction()
		    });
		    
		    request.get({
		    	url:'http://localhost:9042',
		    }, function(error, response, body){
		    	if(error) throw error;
		    	assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
		    	assert.equal(response.statusCode, 500);
		    	done();
		    });
		});
		
	});
	/*
	it('server'.white+' - Raise a Custom Unexpected HTML Error'.grey
	, function(done){
		var app = server();
		done();
	});*/
});