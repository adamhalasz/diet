require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Signal'.yellow + ': '.grey;

var app = new server({debug: false});
app.domain('http://localhost:9010');
app.start(function(){
	describe(subject + 'signal.status', function(){	
		it('should set statusMessage to "Something went wrong." if there is no second arguement for signal.status()'.grey
		, function(done){
			
			app.get('/signal/status', function($){
				$.status(200);
				assert.equal($.statusMessage, 'Something went wrong.')
				$.end();
			});
			
			request.get('http://localhost:9010/signal/status', function(error, response, body){
				if(error) throw error;
				done();
			});
		});
	});
	
	describe(subject + 'signal.header', function(){	
		it('should get a header and validate it'.grey
		, function(done){
			
			app.get('/signal/header/get', function($){
				assert.equal($.header('content-type'), 'text/plain');
				$.end();
			});
			
			request.get('http://localhost:9010/signal/header/get', function(error, response, body){
				if(error) throw error;
				done();
			});
		});
		
		it('should set a header and validate the updated header value'.grey
		, function(done){
			
			app.get('/signal/header/get', function($){
				$.header('content-type', 'text/html');
				assert.equal($.header('content-type'), 'text/html');
				$.end('<!DOCTYPE html>'
					+	'<html>'
					+		'<head>'
					+			'<title>hello</title>'
					+		'</head>'
					+		'<body>Hello!</body>'
					+	'</html>');
			});
			
			request.get('http://localhost:9010/signal/header/get', function(error, response, body){
				if(error) throw error;
				done();
			});
		});
		
	});
	describe(subject + 'signal.query types', function(){	
		it('should check boolean query value'.grey
		, function(done){
			var count = 0;
			app.get('/signal/query/boolean', function($){
				assert.equal(typeof $.query.value, 'boolean');
				$.end();
				count++; if(count == 2) done();
			});
			
			request.get('http://localhost:9010/signal/query/boolean/?value=true', function(error, response, body){
				if(error) throw error;
			});
			
			request.get('http://localhost:9010/signal/query/boolean/?value=false', function(error, response, body){
				if(error) throw error;
			});
		});
		
		it('should check number query value'.grey
		, function(done){
			var count = 0;
			app.get('/signal/query/number', function($){
				assert.equal(typeof $.query.value, 'number');
				$.end();
				count++; if(count == 2) done();
			});
			
			request.get('http://localhost:9010/signal/query/number/?value=1', function(error, response, body){
				if(error) throw error;
			});
			
			request.get('http://localhost:9010/signal/query/number/?value=1.2', function(error, response, body){
				if(error) throw error;
			});
		});
		
		it('should check string query value'.grey
		, function(done){
			var count = 0;
			app.get('/signal/query/string', function($){
				assert.equal(typeof $.query.value, 'string');
				$.end();
				count++; if(count == 2) done();
			});
			
			request.get('http://localhost:9010/signal/query/string/?value=A_B_C', function(error, response, body){
				if(error) throw error;
			});
			
			request.get('http://localhost:9010/signal/query/string/?value=@_#_!', function(error, response, body){
				if(error) throw error;
			});
		});
		
	});
	
	var afterHome;
	describe(subject + 'signal.redirect', function(){
		this.timeout(5000);
		
		it('should redirect home'.grey
		, function(done){
			
			var home_was_reached = false;
			app.get('/', function($){
				home_was_reached = true;
				$.end('welcome home');
			});
			
			app.get('/signal/redirect/home', function($){
				$.redirect('home');
				$.end();
			});
			
			request.get({
				url: 'http://localhost:9010/signal/redirect/home',
				followRedirect: true
			}, function(error, response, body){
				assert.equal(home_was_reached, true);
				done();
			});
			
			
		});
		
		
		it('should redirect home with query parameters'.grey, function(done){
			var home_with_query_was_reached = false;
			app.get('/', function($){
				
				assert.equal($.query.value, 'yolo');
				assert.equal($.query.ten, 10);
				assert.equal(typeof $.query.ten, 'number');
				assert.equal($.query.yes, true);
				assert.equal(typeof $.query.yes, 'boolean');
				assert.equal($.query.no, false);
				assert.equal(typeof $.query.no, 'boolean');
				
				home_with_query_was_reached = true;
				$.end('welcome home');
			});
			
			app.get('/signal/redirect/home', function($){
				$.redirect('home?value=yolo&ten=10&yes=true&no=false');
				$.end();
			});
			
			request.get({
				url: 'http://localhost:9010/signal/redirect/home',
				followRedirect: true
			}, function(error, response, body){
				assert.equal(home_with_query_was_reached, true);
				done();
			});
		});
		
		it('should redirect somewhere'.grey
		, function(done){
			var finish_was_reached = false;
			app.get('/signal/redirect/somewhere/finish', function($){
				finish_was_reached = true;
				$.end('welcome home');
			});
			
			app.get('/signal/redirect/somewhere/start', function($){
				$.redirect('/signal/redirect/somewhere/finish');
				$.end();
			});
			
			request.get({
				url: 'http://localhost:9010/signal/redirect/somewhere/start',
				followRedirect: true
			}, function(error, response, body){
				assert.equal(finish_was_reached, true);
				done();
			});
		});
		
		it('should redirect back'.grey
		, function(done){
			var start_was_reached_twice = 0;
			app.get('/signal/redirect/back/finish', function($){
				$.redirect('back');
			});
			
			app.get('/signal/redirect/back/start', function($){
				start_was_reached_twice++;
				if(start_was_reached_twice < 2){
					request.get({
						url: 'http://localhost:9010/signal/redirect/back/finish',
						headers: {
							referer: $.url.href
						},
						followRedirect: true
					}, function(error, response, body){
						$.end();
					});
				} else {
					$.end();
				}
			});
			
			request.get({
				url: 'http://localhost:9010/signal/redirect/back/start',
				followRedirect: true
			}, function(error, response, body){
				assert.equal(start_was_reached_twice, 2);
				done();
			});
		});
		
		it('should redirect back with query parameters'.grey
		, function(done){
			var start_was_reached_twice = 0;
			app.get('/signal/redirect/back/query/finish', function($){
				$.redirect('back?value=yolo&ten=10&yes=true&no=false');
			});
			
			app.get('/signal/redirect/back/query/start', function($){
				start_was_reached_twice++;
				if(start_was_reached_twice < 2){
					request.get({
						url: 'http://localhost:9010/signal/redirect/back/query/finish',
						headers: {
							referer: $.url.href
						},
						followRedirect: true
					}, function(error, response, body){
						$.end();
					});
				} else {
					assert.equal($.query.value, 'yolo');
					assert.equal($.query.ten, 10);
					assert.equal(typeof $.query.ten, 'number');
					assert.equal($.query.yes, true);
					assert.equal(typeof $.query.yes, 'boolean');
					assert.equal($.query.no, false);
					assert.equal(typeof $.query.no, 'boolean');
					$.end();
				}
			});
			
			request.get({
				url: 'http://localhost:9010/signal/redirect/back/query/start',
				followRedirect: true
			}, function(error, response, body){
				assert.equal(start_was_reached_twice, 2);
				done();
			});
		});
		
		
		/*
		it('should redirect back'.grey
		, function(done){
			var redirect = false;
			app.get('/signal/redirect/back/start', function($){
				if(!redirect){
					console.log('!redirect BACK BACK', $.header('location'))
					$.redirect('back');
					console.log('!redirect BACK BACK', $.header('location'))
					redirect = true;
				} else {
					console.log('=redirect')
					console.log(response.headers);
					done();
					$.end();
				}
			});
			
			app.get('/signal/redirect/back/back', function($){
				console.log('BACK BACK', $.headers)
				$.redirect('back');
				$.end();
			});
			
			request.get({
				url: 'http://localhost:9010/signal/redirect/back/start',
				followRedirect: true
			}, function(error, response, body){
				console.log('back/start RESPONDED')
				console.log(response.headers);
			});
			
			
		});*/
	});
});