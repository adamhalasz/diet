require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');
var should = require('should');
var fs = require('fs');

var subject = 'Test'.cyan+' → '.grey+ 'Signal'.yellow + ': '.grey;

var app = server();
app.listen('http://localhost:9010/', function(){

    describe(subject + 'signal.status', function(){	
    	it('should set statusMessage to "OK" if the status code is 200 when there is no second arguement for signal.status()'.grey
    	, function(done){
    		
    		app.get('/signal/status', function($){
    			$.status(200);
    			assert.equal($.statusMessage, 'OK')
    			$.end();
    		});
    		
    		request.get('http://localhost:9010/signal/status', function(error, response, body){
    			if(error) throw error;
    			done();
    		});
    	});
    });
    
    describe(subject + 'signal.body', function(){	
    	it('should validate signal.body types'.grey
    	, function(done){
    		
    		app.post('/signal/body/types', function($){
    			assert.equal(typeof $.body.string, 'string');
    			assert.equal(typeof $.body.number, 'number');
    			assert.equal(typeof $.body.yes, 'boolean');
    			assert.equal(typeof $.body.no, 'boolean');
    			assert.equal(Array.isArray($.body.array), true);
    			
    			assert.equal($.body.string, 'hello');
    			assert.equal($.body.number, 10);
    			assert.equal($.body.yes, true);
    			assert.equal($.body.no, false);
    			
    			assert.equal($.header('content-type'), 'text/plain');
    			$.end('hey');
    		});
    		
    		request.post('http://localhost:9010/signal/body/types', {
    			form: { 
    				string: 'hello',
    				number: 10,
    				yes: true,
    				no: false,
    				array: ['one', 'two', 'three', 'four'],
    				array2: [10, 20, 30, 40]
    			}
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'hey')
    			done();
    		});
    	});
    });
    
    describe(subject + 'signal.body with no content-type in request header', function(){	
    	it('should validate signal.body types with not content-type'.grey
    	, function(done){
    		
    		app.post('/signal/body/types/2', function($){
    			assert.equal(typeof $.body.string, 'string');
    			assert.equal(typeof $.body.number, 'number');
    			assert.equal(typeof $.body.yes, 'boolean');
    			assert.equal(typeof $.body.no, 'boolean');
    			assert.equal(Array.isArray($.body.array), true);
    			
    			assert.equal($.body.string, 'hello');
    			assert.equal($.body.number, 10);
    			assert.equal($.body.yes, true);
    			assert.equal($.body.no, false);
    			
    			assert.equal($.header('content-type'), 'text/plain');
    			$.end('hey');
    		});
    		
    		request.post('http://localhost:9010/signal/body/types/2', {
    			form: { 
    				string: 'hello',
    				number: 10,
    				yes: true,
    				no: false,
    				array: ['one', 'two', 'three', 'four'],
    				array2: [10, 20, 30, 40]
    			},
    			headers: {
    				'content-type': false
    			}
    		}, function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'hey')
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
    		
    		app.get('/signal/header/get2', function($){
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
    		
    		request.get('http://localhost:9010/signal/header/get2', function(error, response, body){
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
    	
    	it('should redirect to /signal/redirect/qs/finish?value=yolo&yes=true&no=false&ten=10 and test if the type of query parameters are correct'.grey
    	, function(done){
    		
    		var reached = false;
    		
    		app.get('/signal/redirect/qs/start', function($){
    			$.redirect('/signal/redirect/qs/finish?value=yolo&yes=true&no=false&ten=10', 301);
    			assert.equal($.statusCode, 301);
    		});
    		
    		app.get('/signal/redirect/qs/finish', function($){
    			reached = true;
    			assert.equal($.query.value, 'yolo');
    			assert.equal($.query.ten, 10);
    			assert.equal(typeof $.query.ten, 'number');
    			assert.equal($.query.yes, true);
    			assert.equal(typeof $.query.yes, 'boolean');
    			assert.equal($.query.no, false);
    			assert.equal(typeof $.query.no, 'boolean');
    			$.end();
    		});
    		
    		request.get({
    			url: 'http://localhost:9010/signal/redirect/qs/start',
    			followRedirect: true
    		}, function(error, response, body){
    			assert.equal(reached, true);
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
    		
    		app.get('/signal/redirect/home/query', function($){
    			$.redirect('home?value=yolo&ten=10&yes=true&no=false', 301);
    		});
    		
    		request.get({
    			url: 'http://localhost:9010/signal/redirect/home/query',
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
    
    });
    
    describe(subject + 'signal responses', function(){	
    	it('should test signal.success'.grey
    	, function(done){
    		
    		app.get('/signal/responses/success', function($){
    			$.success();
    		});
    		
    		request.get('http://localhost:9010/signal/responses/success', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '{"passed":true}');
    			assert.equal(response.headers['content-type'], 'application/json');
    			done();
    		});
    	});
    	
    	it('should test signal.error and signal.failure'.grey
    	, function(done){
    		
    		app.get('/signal/responses/failure', function($){
    			$.error('test', 'testing');
    			$.failure();
    		});
    		
    		request.get('http://localhost:9010/signal/responses/failure', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '{"passed":false,"errors":{"test":"testing"}}');
    			assert.equal(response.headers['content-type'], 'application/json');
    			done();
    		});
    	});
    	
    	it('should set an with signal.error(key, value) and get it with signal.error(key) '.grey
    	, function(done){
    		
    		app.get('/signal/error/get', function($){
    			$.error('test', 'testing');
    			assert.equal($.error('test'), 'testing');
    			$.failure();
    		});
    		
    		request.get('http://localhost:9010/signal/error/get', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '{"passed":false,"errors":{"test":"testing"}}');
    			assert.equal(response.headers['content-type'], 'application/json');
    			done();
    		});
    	});
    	
    	it('should test signal.send'.grey
    	, function(done){
    		
    		app.get('/signal/responses/send', function($){
    			$.send('hello!');
    			$.end();
    		});
    		
    		request.get('http://localhost:9010/signal/responses/send', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, 'hello!');
    			assert.equal(response.headers['content-type'], 'text/plain');
    			assert.equal(response.statusCode, 200);
    			done();
    		});
    	});
    	
    	it('should test signal.json'.grey
    	, function(done){
    		
    		app.get('/signal/responses/json', function($){
    			$.data.string = 'test';
    			$.data.number = 10;
    			$.data.boolean = true;
    			$.json();
    		});
    		
    		request.get('http://localhost:9010/signal/responses/json', function(error, response, body){
    			if(error) throw error;
    			assert.equal(body, '{"string":"test","number":10,"boolean":true}');
    			assert.equal(response.headers['content-type'], 'application/json');
    			done();
    		});
    	});
    	
    	it('should test signal.body with mutlipart form request', function(done){
    		app.post('/signal/responses/body/mutlipart', function($){
    			assert.equal($.multipart, true)
    			$.end();
    			done()
    		});
    		
    		var Request = request.post('http://localhost:9010/signal/responses/body/mutlipart');
    		var form = Request.form();
    		form.append('test', 'value')
    		form.append('my_buffer', new Buffer([1, 2, 3]))
    	})
    });
    
    it('should handle error gracefully'.grey
    , function(done){
    	  
    	app.get('/signal/handleError', function($){
    		$.fail();
    		$.end();
    	});
    	
    	request.get({
    		url: 'http://localhost:9010/signal/handleError'
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 500);
    		done();
    	});
    });
    
    it('should handle XMLHttpRequest error gracefully '.grey
    , function(done){
    	  
    	app.get('/signal/handleError/XMLHttpRequest', function($){
    		$.fail();
    		$.end();
    	});
    	
    	request.get({
    		url: 'http://localhost:9010/signal/handleError/XMLHttpRequest',
    		followRedirect: true,
    		headers: {
    			'X-Requested-With': 'XMLHttpRequest'
    		}
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 500);
    		done();
    	});
    });
    
    
    it('should send JSON response {"ajax":true} on requesting /signal/dynamicRespond with X-Requested-With=XMLHttpRequest header'.grey
    , function(done){
    	app.get('/signal/dynamicRespond', function($){
    	    $.data.ajax = true;
    		$.end('non-ajax-response');
    	});
    	
    	request.get({
    		url: 'http://localhost:9010/signal/dynamicRespond',
    		headers: {
    			'X-Requested-With': 'XMLHttpRequest'
    		}
    	}, function(error, response, body){
    	    assert.equal(body, '{"ajax":true}');
    		assert.equal(response.statusCode, 200);
    		done();
    	});
    });
    
    it('should send JSON response {"ajax":true} on requesting /signal/dynamicRespond with Authorization header having a Bearer in it'.grey
    , function(done){
    	
    	request.get({
    		url: 'http://localhost:9010/signal/dynamicRespond',
    		headers: {
    			'Authorization': 'Bearer test='
    		}
    	}, function(error, response, body){
    	    assert.equal(body, '{"ajax":true}');
    		assert.equal(response.statusCode, 200);
    		done();
    	});
    });
    
    it('should send JSON response {"ajax":true} on requesting /signal/dynamicRespond with Authorization header having a Token in it'.grey
    , function(done){
    	request.get({
    		url: 'http://localhost:9010/signal/dynamicRespond',
    		headers: {
    			'Authorization': 'Token test='
    		}
    	}, function(error, response, body){
    	    assert.equal(body, '{"ajax":true}');
    		assert.equal(response.statusCode, 200);
    		done();
    	});
    });
    
    it('should send JSON response "non-ajax-response" on requesting /signal/dynamicRespond with Authorization header having a Basic in it'.grey
    , function(done){
    	request.get({
    		url: 'http://localhost:9010/signal/dynamicRespond',
    		headers: {
    			'Authorization': 'Basic test='
    		}
    	}, function(error, response, body){
    	    assert.equal(body, 'non-ajax-response');
    		assert.equal(response.statusCode, 200);
    		done();
    	});
    });
    
    it('should send PLAIN response "non-ajax-response" on requesting /signal/dynamicRespond with X-Requested-With=XMLHttpRequest header'.grey
    , function(done){
    	request.get({
    		url: 'http://localhost:9010/signal/dynamicRespond',
    	}, function(error, response, body){
    	    assert.equal(body, 'non-ajax-response');
    		assert.equal(response.statusCode, 200);
    		done();
    	});
    });
    
    it('should send HTML response "non-ajax-response" on requesting /signal/dynamicRespond with "app.html = true" settings'.grey
    , function(done){
        app.html = true;
    	request.get({
    		url: 'http://localhost:9010/signal/dynamicRespond',
    	}, function(error, response, body){
    	    assert.equal(body, 'non-ajax-response');
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    		app.html = false;
    		done();
    	});
    });
    
    it('should send a file with signal.sendFile() with a specific path'.grey
    , function(done){
        app.get('/signal/sendFile/specific', function($){
        	$.sendFile(app.path+'/image.png')
        })
    	request.get({
    		url: 'http://localhost:9010/signal/sendFile/specific',
    	}, function(error, response, body){
    		var fileContents = fs.readFileSync(__dirname+'/image.png', 'utf8')
    	    assert.equal(body, fileContents);
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'image/png');
    		done();
    	});
    });
    
    it('should download a file with signal.download() with a filename'.grey
    , function(done){
        app.get('/signal/download', function($){
        	$.download('./tests/image.png', 'diet_logo.png')
        })
    	request.get({
    		url: 'http://localhost:9010/signal/download',
    	}, function(error, response, body){
    		var fileContents = fs.readFileSync(__dirname+'/image.png', 'utf8')
    	    assert.equal(body, fileContents);
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'image/png');
    		assert.equal(response.headers['content-disposition'], 'attachment; filename="diet_logo.png"');
    		done();
    	});
    });
    
    it('should download a file with signal.download() without a filename'.grey
    , function(done){
        app.get('/signal/download/nofilename', function($){
        	$.download('./tests/image.png')
        })
    	request.get({
    		url: 'http://localhost:9010/signal/download/nofilename',
    	}, function(error, response, body){
    		var fileContents = fs.readFileSync(__dirname+'/image.png', 'utf8')
    	    assert.equal(body, fileContents);
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'image/png');
    		assert.equal(response.headers['content-disposition'], 'attachment; filename="image.png"');
    		done();
    	});
    });
    
    it('should send a file with signal.sendFile() with a relative path'.grey
    , function(done){
        app.get('/signal/sendFile/relative', function($){
        	$.sendFile('./tests/image.png')
        })
    	request.get({
    		url: 'http://localhost:9010/signal/sendFile/relative',
    	}, function(error, response, body){
    		var fileContents = fs.readFileSync(__dirname+'/image.png', 'utf8')
    	    assert.equal(body, fileContents);
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'image/png');
    		done();
    	});
    });
    
    it('should send a an error calling signal.sendFile() with the wrong path'.grey
    , function(done){
        app.get('/signal/sendFile/wrong', function($){
        	$.sendFile('./tests/undefined.png')
        })
    	request.get({
    		url: 'http://localhost:9010/signal/sendFile/wrong',
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 500);
    		assert.equal(response.headers['content-type'], 'text/html; charset=UTF-8');
    		done();
    	});
    });
    
    it('should set a response header with signal.setHeader()'.grey
    , function(done){
        app.get('/signal/setHeader', function($){
        	$.setHeader('content-type', 'application/custom')
        	$.end()
        })
    	request.get({
    		url: 'http://localhost:9010/signal/setHeader',
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'application/custom');
    		done();
    	});
    });
    
    it('should set a response header with signal.setHeader() then remove it with signal.removeHeader()'.grey
    , function(done){
        app.get('/signal/removeHeader', function($){
        	$.setHeader('x-custom', 'x-value')
        	$.removeHeader('x-custom')
        	$.end()
        })
    	request.get({
    		url: 'http://localhost:9010/signal/removeHeader',
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['x-custom'], undefined);
    		done();
    	});
    });
    
    it('should get a response header with signal.getHeader()'.grey
    , function(done){
        app.get('/signal/getHeader', function($){
        	var contentType = $.getHeader('content-type')
        	assert.equal('text/plain', contentType)
        	$.end()
        })
    	request.get({
    		url: 'http://localhost:9010/signal/getHeader',
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 200);
    		assert.equal(response.headers['content-type'], 'text/plain');
    		done();
    	});
    });
    
    it('should get a request header with signal.getRequestHeader()'.grey
    , function(done){
        app.get('/signal/getRequestHeader', function($){
        	var host = $.getRequestHeader('host')
        	assert.equal('localhost:9010', host)
        	$.end()
        })
    	request.get({
    		url: 'http://localhost:9010/signal/getRequestHeader',
    	}, function(error, response, body){
    		assert.equal(response.statusCode, 200);
    		done();
    	});
    });
});


var app2 = server()
app2.listen(9170, function(){
    describe(subject + 'middleware control flow', function(){

        it('should create a server on port 9170 and run only the first route\'s middleware '.grey
        , function(done){
            this.timeout(10000);
            var one = false;
            var two = false;
            app2.get('/', function($){
                $.end('hello world!', true); // <-- stop middleware chain
            }, function($){
                one = true;
                $.return()
            })
            
            app2.get('/', function($){
                two = true;
                $.return()
            })
            
        	request.get({
        		url: 'http://localhost:9170/',
        	}, function(error, response, body){
        	    setTimeout(function(){
        	        assert.equal(one, false)
        	        assert.equal(two, false)
        		    done();
        		}, 2000)
        	});
        });
            
    });
})
    
    


