require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Plugins (local)'.yellow + ': '.grey;


describe(subject + 'Plain Local Plugin', function(){
	var app = new server({ debug: false });
	var test = app.plugin('test_module')
	app.domain('http://localhost:9003')
	app.start();
		
	it('should check test_module.local'.grey
	, function(done){
		
		app.get('/suite/-1', test, function($){
			$.end($.test.message);
		});		
		
		request.get('http://localhost:9003/suite/-1', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	describe(subject + 'Plain Local Plugin', function(){	
		it('should create an empty plugin register it to the `/` path and test it'.grey
		, function(done){
			function yo($){
				this.sender = 'Adam';
				this.message = 'Yo!';
				$.return(this);
			}
			
			app.get('/suite/0', yo, function($){
				$.end($.yo.message + ' It\'s ' + $.yo.sender + '!');
			});		
			
			request.get('http://localhost:9003/suite/0', function(error, response, body){
				if(error) throw error;
				assert.equal(body, 'Yo! It\'s Adam!');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				done();
			});
		});
	});
	
	describe(subject + 'Multi Level Local Plugins', function(){	
		it('should grab `suite` of object `object.suite` and work as $.suite from within the route.'.grey
		, function(done){
			var object = { 
				suite: function($){
					this.sender = 'Steve';
					this.level = 2;
					$.return(this);
				} 
			};
			
			app.get('/suite/1', object.suite, function($){
				$.end('Hi I am '+$.suite.sender+'. You reached level ' + $.suite.level + '.');
			});		
			
			request.get('http://localhost:9003/suite/1', function(error, response, body){
				if(error) throw error;
				assert.equal(body, 'Hi I am Steve. You reached level 2.');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				done();
			});
		});
		
		it('should grab `suite` of object `object["suite"]` and work as $.suite from within the route.'.grey
		, function(done){
			var object = { 
				suite: function($){
					this.sender = 'Steve Wozniak';
					this.level = 2;
					$.return(this);
				} 
			};
			
			app.get('/suite/2', object["suite"], function($){
				$.end('Hi I am '+$.suite.sender+'. You reacher level ' + $.suite.level + '.');
			});		
			
			request.get('http://localhost:9003/suite/2', function(error, response, body){
				if(error) throw error;
				assert.equal(body, 'Hi I am Steve Wozniak. You reacher level 2.');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				done();
			});
		});
		
		it('should grab `suite` of object `object[\'suite\']` and work as $.suite from within the route.'.grey
		, function(done){
			var object = { 
				suite: { 
					child: function($){
						this.sender = 'Steve';
						this.level = 2;
						$.return(this);
					} 
				}
			};
			
			app.get('/suite/3', object['suite']['child'], function($){
				$.end('Hi I am '+$.child.sender+'. You reacher level ' + $.child.level + '.');
			});		
			
			request.get('http://localhost:9003/suite/3', function(error, response, body){
				if(error) throw error;
				assert.equal(body, 'Hi I am Steve. You reacher level 2.');
				assert.equal(response.headers['content-type'], 'text/plain');
				assert.equal(response.statusCode, 200);
				done();
			});
		});
	});
});

