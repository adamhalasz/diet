require('diet');
require('colors');
var assert = require('assert');
var request = require('request');


describe('Test: App Router', function(){
	var app = new App({debug: false});
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
		
		it('app.post(\'/email\', ..)'.white+' -should listen and receive "Your Email is email@test.com!" upon requesting POST /email with body email=email@test.com'.grey, function(done){
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
});