require('colors');
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Generators'.yellow + ': '.grey;

describe(subject + 'initialize', function(){	
    
    var app = server()
    app.listen(9075, function(){
        
        // ROUTES
        app.get('/', function *($){
            // Linear Exection
            $.data.title = yield app.controller.getTitle('Hello')
            $.data.title2 = yield getName()
            $.data.title3 = yield getName2('is cool')
            $.data.description = yield app.controller.getDescription();
            
            // Parallel Execution
            $.data.counter = yield [
                app.controller.add(2,2),
                app.controller.multiply(2,2)
            ]
           
            app.controller.getTitle('Hola', function(error, result){
                $.data.title4 = result;
                $.json()
            })
        })
        
        // CONTROLLERS
        app.controller.add = function(a, b, done){
            setTimeout(function(){
                done(null, a+b)
            }, 50)
        }
        
        app.controller.multiply = function(a, b, done){
            setTimeout(function(){
                done(null, a*b)
            }, 100)
        }
        
        function getName(){
            return function(done){
                setTimeout(function(){
                    done(null, 'Diet')
                }, 50)        
            }
        }
        function getName2(suffix){
            console.log('getName2', arguments)
            return function(done){
                setTimeout(function(){
                    
                    done(null, 'Diet ' + suffix)
                }, 50)        
            }
        }
    
        app.controller.getTitle = function(prefix, done){
            setTimeout(function(){
                done(null, prefix + ' World')
            }, 50)
        }
        
        app.controller.getDescription = function(done){
            setTimeout(function(){
                done(null, 'How are you?')
            }, 50)
        }
        
        it('server'.white+' - Should test "controllers"'.grey, function(done){
    
            // TEST
            request.get({
            	url:'http://localhost:9075/'
            }, function(error, response, rawBody){
            	if(error) throw error;
            	assert.equal(response.statusCode, 200);
            	assert.equal(response.headers['content-type'], 'application/json');
            	console.log('rawBody', rawBody)
            	var body = JSON.parse(rawBody);
            	assert.equal(body.title, 'Hello World');
            	assert.equal(body.title2, 'Diet');
            	assert.equal(body.title3, 'Diet is cool');
            	assert.equal(body.title4, 'Hola World');
            	assert.equal(body.description, 'How are you?');
            	assert.equal(body.counter, 4);
            	
            	done();
            });
        });
    });
});