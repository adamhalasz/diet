require('colors');
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Generators'.yellow + ': '.grey;

describe(subject + 'initialize', function(){	
    
    var app = server()
	app.listen(9077)
	
	app.resource('/user/:id?')
	   .get(function($){ $.end('GET user ' + $.params.id) })
	   .post(function($){ $.end('POST user ' + $.params.id) })
	   .put(function($){ $.end('PUT user ' + $.params.id) })
	   .delete(function($){ $.end('DELETE user ' + $.params.id) })
	
	var book = app.resource('/book/:id?')
	    book.get(function($){ $.end('GET book ' + $.params.id) })
	    book.post(function($){ $.end('POST book ' + $.params.id) })
	    book.put(function($){ $.end('PUT book ' + $.params.id) })
	    book.delete(function($){ $.end('DELETE book ' + $.params.id) })
    
    
    it('should test GET resource /user/:id', function(done){
    	request.get('http://localhost:9077/user/123', function(error, response, body){
    		if(error) throw error;
    		assert.equal(body, 'GET user 123');
    		assert.equal(response.headers['content-type'], 'text/plain');
    		assert.equal(response.statusCode, 200);
    		done();
    	})
    })
    
    it('should test POST resource /user/:id', function(done){
    	request.post('http://localhost:9077/user/123', function(error, response, body){
    		if(error) throw error;
    		assert.equal(body, 'POST user 123');
    		assert.equal(response.headers['content-type'], 'text/plain');
    		assert.equal(response.statusCode, 200);
    		done();
    	})
    })
    
    it('should test PUT resource /user/:id', function(done){
    	request.put('http://localhost:9077/user/123', function(error, response, body){
    		if(error) throw error;
    		assert.equal(body, 'PUT user 123');
    		assert.equal(response.headers['content-type'], 'text/plain');
    		assert.equal(response.statusCode, 200);
    		done();
    	})
    })
    
    it('should test DELETE resource /user/:id', function(done){
    	request.delete('http://localhost:9077/user/123', function(error, response, body){
    		if(error) throw error;
    		assert.equal(body, 'DELETE user 123');
    		assert.equal(response.headers['content-type'], 'text/plain');
    		assert.equal(response.statusCode, 200);
    		done();
    	})
    })
})