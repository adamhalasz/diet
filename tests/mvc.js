require('colors');
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Generators'.yellow + ': '.grey;

describe(subject + 'initialize', function(){	
    
    var app = server()
    var path = require('path')
    app.view('file', function($){
    	/*console.log('app view file', $.url.pathname)
    	console.log('app view file: signal.responded ->', $.responded)
    	console.log('app view file: path.extname($.url.pathname) ->', path.extname($.url.pathname))*/
    	if(path.extname($.url.pathname) == '.js'){
    		//console.log('set content-type header to application/javascript')
    		$.header('content-type', 'application/javascript')
    		$.end('console.log("hello world")')
    	} else {
    		$.return()
    	}
    })
    
    app.view('html', function(path, context){
    	return path;
    })
    
    app.listen(9076, function(){
    	
    	it('should test app.model', function(done){
    		var middleware = app.model('test')
    		app.get('/model', middleware, function($){
    			assert.equal($.model_key, 'model_value')
    			$.end($.model_key)
    		})
    		request.get('http://localhost:9076/model', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'model_value');
    			assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    			assert.equal(response.statusCode, 200);
    			done();
    		})
    	})
    	
    	it('should test app.view', function(done){
    		
    		var middleware = app.view('test')
    		app.get('/view', middleware, function($){
    			assert.equal($.view_key, 'view_value')
    			$.end($.view_key)
    		})
    		request.get('http://localhost:9076/view', function(error, response, body){
    			if(error) throw error;
    			console.log('http://localhost:9076/view body', body)
    			assert.equal(body, 'view_value');
    			assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    			assert.equal(response.statusCode, 200);
    			done();
    		})
    	})
    	
    	it('should test app.view with `file` directive', function(done){
    		request.get('http://localhost:9076/file.js', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'console.log("hello world")');
    			assert.equal(response.headers['content-type'], 'application/javascript');
    			assert.equal(response.statusCode, 200);
    			done();
    		})
    	})
    	
    	it('should test app.view with `html` directive', function(done){
    		app.get('/view/html', function($){
    			$.end()
    		})
    		request.get('http://localhost:9076/view/html', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'index.html');
    			assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    			assert.equal(response.statusCode, 200);
    			done();
    		})
    	})

    	it('should test app.controller', function(done){
    		
    		var middleware = app.controller('test')
    		
    		app.get('/controller', middleware, function($){
    			assert($.controller_key, 'controller_value')
    			$.end($.controller_key)
    		})
    		
    		request.get('http://localhost:9076/controller', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'controller_value');
    			assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    			assert.equal(response.statusCode, 200);
    			done();
    		})
    	})
    	
    	it('should test app.controller with non-function value for the controller', function(done){
    		
    		app.controller.hello = "world"
    		
    		app.get('/controller/nonfunction', function($){
    			assert(app.controller.hello, 'world')
    			$.end(app.controller.hello)
    		})
    		
    		request.get('http://localhost:9076/controller/nonfunction', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'world');
    			assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    			assert.equal(response.statusCode, 200);
    			done();
    		})
    	})
    	
    })
})