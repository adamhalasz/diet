
require('colors');
require('sugar');
var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Router'.yellow + ': '.grey;

var app = server();
app.listen('http://localhost:9000/', function(){
    
    // -------[ GET ] -------
    describe(subject + 'Simple GET Path Request/Response', function(){	
    	it('app.get(\'/\', ..)'.white+' - should receive "Hello World!" when visiting GET /'.grey
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
    
    
    // -------[ PUT ] -------
    describe(subject + 'Simple PUT Path Request/Response', function(){	
    	it('app.put(\'/\', ..)'.white+' - should receive "Hello World!" when visiting POST /'.grey
    	, function(done){
    		
    		app.put('/', function($){
    			$.end('Hello World!');
    		});
    		
    		request.put('http://localhost:9000/', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'Hello World!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Dynamic PUT Path Request/Response', function(){
    	it('app.put(\'/user/:name\', ..)'.white+' - should listen and receive "Hello John!" upon visiting PUT /user/john'.grey, function(done){
    		app.put('/user/:name', function($){
    			$.end('Hello '+$.params.name.capitalize()+'!');
    		});
    		
    		request.put('http://localhost:9000/user/john', function(error, response, body){
    			if(error) throw error;
    		    assert.equal(body, 'Hello John!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Simple PUT Path Request/Response with Content-Body', function(){
    	it('app.put(\'/email\', ..)'.white+' - should listen and receive "Your Email is email@test.com!" upon requesting PUT /email with body email=email@test.com'.grey, function(done){
    		app.put('/email', function($){
    			$.end('Your Email is ' + $.body.email + '!');
    		});
    		
    		request.put('http://localhost:9000/email', { 
    		    form: { 
    		        email:'email@test.com' 
    		    }
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'Your Email is email@test.com!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    // -------[ HEAD ] -------
    describe(subject + 'Simple HEAD Path Request/Response', function(){	
    	it('app.head(\'/\', ..)'.white+' - should receive "" when visiting HEAD /'.grey
    	, function(done){
    		
    		app.head('/', function($){
    			$.end('whatever, no response anyway!');
    		});
    		
    		request.head('http://localhost:9000/', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Dynamic HEAD Path Request/Response', function(){
    	it('app.head(\'/user/:name\', ..)'.white+' - should listen and receive "" upon visiting HEAD /user/john'.grey, function(done){
    		app.head('/user/:name', function($){
    			$.end('whatever, no response anyway!');
    		});
    		
    		request.head('http://localhost:9000/user/john', function(error, response, body){
    			if(error) throw error;
    		    assert.equal(body, '');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    // -------[ DELETE ] -------
    describe(subject + 'Simple DELETE Path Request/Response', function(){	
    	it('app.delete(\'/\', ..)'.white+' - should receive "something was deleted!" when visiting DELETE /'.grey
    	, function(done){
    		
    		app.delete('/', function($){
    			$.end('something was deleted!');
    		});
    		
    		request.del('http://localhost:9000/', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'something was deleted!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Dynamic DELETE Path Request/Response', function(){
    	it('app.delete(\'/object/:name\', ..)'.white+' - should listen and receive "The Car was deleted!" upon visiting DELETE /user/john'.grey, function(done){
    		app.delete('/object/:name', function($){
    			$.end('The ' + $.params.name.capitalize()+' was deleted!');
    		});
    		
    		request.del('http://localhost:9000/object/car', function(error, response, body){
    			if(error) throw error;
    		    assert.equal(body, 'The Car was deleted!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    // -------[ TRACE ] -------
    describe(subject + 'Simple TRACE Path Request/Response', function(){	
    	it('app.trace(\'/\', ..)'.white+' - should receive "trace!" when visiting TRACE /'.grey
    	, function(done){
    		
    		app.trace('/', function($){
    			$.end('trace!');
    		});
    		
    		request({
    		    'method': 'trace',
    		    'uri': 'http://localhost:9000/'
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'trace!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Dynamic TRACE Path Request/Response', function(){
    	it('app.trace(\'/object/:name\', ..)'.white+' - should listen and receive "The Car was traced!" upon visiting TRACE /user/john'.grey, function(done){
    		app.trace('/object/:name', function($){
    			$.end('The ' + $.params.name.capitalize()+' was traced!');
    		});
    		
    		request({
    		    'method': 'trace',
    		    'uri': 'http://localhost:9000/object/car'
    		}, function(error, response, body){
    			if(error) throw error;
    		    assert.equal(body, 'The Car was traced!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    // -------[ TRACE ] -------
    describe(subject + 'Simple OPTIONS Path Request/Response', function(){	
    	it('app.options(\'/\', ..)'.white+' - should receive "options!" when visiting OPTIONS /'.grey
    	, function(done){
    		
    		app.options('/', function($){
    			$.end('options!');
    		});
    		
    		request({
    		    'method': 'options',
    		    'uri': 'http://localhost:9000/'
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'options!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Dynamic OPTIONS Path Request/Response', function(){
    	it('app.options(\'/object/:name\', ..)'.white+' - should listen and receive "Car options!" upon visiting OPTIONS /user/john'.grey, function(done){
    		app.options('/object/:name', function($){
    			$.end($.params.name.capitalize() + ' options!');
    		});
    		
    		request({
    		    'method': 'options',
    		    'uri': 'http://localhost:9000/object/car'
    		}, function(error, response, body){
    			if(error) throw error;
    		    assert.equal(body, 'Car options!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    // -------[ PATCH ] -------
    describe(subject + 'Simple PATCH Path Request/Response', function(){	
    	it('app.patch(\'/\', ..)'.white+' - should receive "Hello World!" when visiting PATCH /'.grey
    	, function(done){
    		
    		app.patch('/', function($){
    			$.end('patch!');
    		});
    		
    		request.patch('http://localhost:9000/', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'patch!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    describe(subject + 'Dynamic PATCH Path Request/Response', function(){
    	it('app.patch(\'/object/:name\', ..)'.white+' - should listen and receive "The Car was patched!" upon visiting PATCH /user/john'.grey, function(done){
    		app.patch('/object/:name', function($){
    			$.end('The ' + $.params.name.capitalize()+' was patched!');
    		});
    		
    		request.patch('http://localhost:9000/object/car', function(error, response, body){
    			if(error) throw error;
    		    assert.equal(body, 'The Car was patched!');
    			assert.equal(response.statusCode, 200);
    			assert.equal(response.headers['content-type'], 'text/plain');
    			done();
    		});
    	});
    });
    
    // -------[ POST ] -------
    describe(subject + 'Simple POST Path Request/Response', function(){
    	it('app.post(\'/email\', ..)'.white+' - should listen and receive "Your Email is email@test.com!" upon requesting POST /email with body email=email@test.com'.grey, function(done){
    		app.post('/email', function($){
    			$.end('Your Email is ' + $.body.email + '!');
    		});
    		
    		request.post('http://localhost:9000/email', { 
    		    form: { 
    		        email:'email@test.com' 
    		    }
    		}, function(error, response, body){
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
    
    // -------[ 404: page not found ] -------
    describe(subject + 'GET 404 Page with no Custom 404 Route', function(){	
    	it('should visit http://localhost:9000/NON_EXISTING_PAGE and receive content-type text/plain with 404 status code and the body should be "404 page not found" '.grey
    	, function(done){
    		
    		request.get('http://localhost:9000/NON_EXISTING_PAGE', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '404 page not found');
    			assert.equal(response.headers['content-type'], 'text/plain');
    			assert.equal(response.statusCode, 404);
    			done();
    			
    			describe(subject + 'GET 404 page with Missing Route', function(){	
    				it('should visit http://localhost:9000/NON_EXISTING_PAGE and receive content-type text/plain with 404 status code and the body should be "Hello this is a custom 404 page." '.grey
    				, function(done){
    					app.missing(function($){
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
    
    // -------[ 404: host not found ] -------
    describe(subject + 'Host not Found', function(){	
    	it('should visit http://test3.local.com:9000/" '.grey
    	, function(done){
    		
    		request.get('http://test3.local.com:9000/', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '404 host not found');
    			assert.equal(response.headers['content-type'], 'text/plain');
    			assert.equal(response.statusCode, 404);
    			done()
    		});
    	});
    });
    
    // -------[ 404: no middleware ] -------
    describe(subject + 'No associated middlewares for a route', function(){	
    	it('app.get(\'/\', ..)'.white+' - should register the GET / Route with no middleware or callbacks and make sure the response is "404 page not found"." upon visit'.grey
    	, function(done){
    		
    		app.get('/noMiddleware');
    		
    		request.get('http://localhost:9000/noMiddleware', function(error, response, body){
    			if(error) console.log('YELRRRORR', error);
    			assert.equal(body, '404 page not found');
    			assert.equal(response.headers['content-type'], 'text/plain');
    			assert.equal(response.statusCode, 404);
    			done();
    		});
    	});
    });
});