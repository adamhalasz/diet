
require('colors');
require('sugar');
var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Router'.yellow + ': '.grey;

var app = new server({debug: false});
app.domain('http://localhost:9000/');
app.start(function(){	
	describe(subject + 'Simple GET Path Request/Response', function(){	
		it('app.get(\'/\', ..)'.white+' - should listen and receive "Hello World!" upon visiting GET /'.grey
		, function(done){
			
			app.get('/', function($){
				$.end('Hello World!');
			});
			
			request.get('http://localhost:9000/', function(error, response, body){
				if(error) throw error;
				assert.equal(body, 'Hello World!');
				assert.equal(response.statusCode, 200);
				assert.equal(response.headers['content-type'], 'text/plain');
				done();
			});
		});
	});
	
	describe(subject + 'Dynamic GET Path Request/Response', function(){
		it('app.get(\'/user/:name\', ..)'.white+' - should listen and receive "Hello John!" upon visiting GET /user/john'.grey, function(done){
			app.get('/user/:name', function($){
				$.end('Hello '+$.params.name.capitalize()+'!');
			});
			
			request.get('http://localhost:9000/user/john', function(error, response, body){
				if(error) throw error;
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				assert.equal(body, 'Hello John!');
				done();
			});
		});
	});
	
	describe(subject + 'Simple POST Path Request/Response', function(){
		it('app.post(\'/email\', ..)'.white+' - should listen and receive "Your Email is email@test.com!" upon requesting POST /email with body email=email@test.com'.grey, function(done){
			app.post('/email', function($){
				$.end('Your Email is ' + $.body.email + '!');
			});
			
			request.post('http://localhost:9000/email', {form:{email:'email@test.com'}}
			, function(error, response, body){
				if(error) throw error;
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				assert.equal(body, 'Your Email is email@test.com!');
				done();
			});
		});
	});
	
	describe(subject + 'Dynamic POST Path Request/Response', function(){
		it('app.post(\'/email\', ..)'.white+' - should listen and receive "Hello x100, your email is email@test.com!" upon requesting POST /email/:id with body email=email@test.com and pathname /email/x100'.grey, function(done){
			app.post('/email/:id', function($){
				$.end('Hello '+$.params.id+', your email is ' + $.body.email + '!');
			});
			
			request.post('http://localhost:9000/email/x100', {form:{email:'email@test.com'}}
			, function(error, response, body){
				if(error) throw error;
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				assert.equal(body, 'Hello x100, your email is email@test.com!');
				done();
			});
		});
	});
	
	describe(subject + 'GET 404 Page with no Custom 404 Route', function(){	
		it('should visit http://localhost:9000/NON_EXISTING_PAGE and receive content-type text/plain with 404 status code and the body should be "404 Page not found." '.grey
		, function(done){
			
			request.get('http://localhost:9000/NON_EXISTING_PAGE', function(error, response, body){
				if(error) throw error;
				assert.equal(body, '404 Page not found.');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 404);
				done();
				
				describe(subject + 'GET 404 Page with Custom 404 Route SET', function(){	
					it('should visit http://localhost:9000/NON_EXISTING_PAGE and receive content-type text/plain with 404 status code and the body should be "Hello this is a custom 404 page." '.grey
					, function(done){
						app.get('404', function($){
							$.end('Hello this is a custom 404 page.');
						});
						request.get('http://localhost:9000/NON_EXISTING_PAGE', function(error, response, body){
							if(error) throw error;
							assert.equal(body, 'Hello this is a custom 404 page.');
							assert.equal(response.headers['content-type'], 'text/plain');
							assert.equal(response.statusCode, 404);
							done();
						});
					});
				});
				
			});
		});
	});
	
	describe(subject + 'Domain not Found', function(){	
		it('should visit http://test3.local.com:9000/" '.grey
		, function(done){
			
			request.get('http://test3.local.com:9000/', function(error, response, body){
				if(error) throw error;
				assert.equal(body, '404 Domain not found.');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 404);
				done()
			});
		});
	});
	
	describe(subject + 'No associated middlewares for a route', function(){	
		it('app.get(\'/\', ..)'.white+' - should register the GET / Rout with no routes and send back "Error there are no associated middlewares for this route." upon visit'.grey
		, function(done){
			
			app.get('/noMiddleware');
			
			request.get('http://localhost:9000/noMiddleware', function(error, response, body){
				if(error) console.log('YELRRRORR', error);
				assert.equal(body, '500 Route not configured.');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 500);
				done();
			});
		});
	});
});