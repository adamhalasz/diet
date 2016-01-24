require('colors');
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'Events'.yellow + ': '.grey;

describe(subject + 'initialize', function(){	
    /*
    it('server'.white+' - Should listen on server "create" event'.grey, function(done){
        var passed = false
        server.one('create', function(event){
            done()
        })
        var app = server()
    });

    it('server'.white+' - Should listen on app "listen" event'.grey, function(done){
        var app = server()
        var passed = false;
        app.on('listen', function(event){
            if(!passed) {
                done()
            }
            passed = true;
        })
        app.listen('http://localhost:9100/')
    });
    
    it('server'.white+' - Should listen on app "route.attach" event'.grey, function(done){
        var passed = false;
        var app = server()
        app.on('route.attach', function(event){
            if(event.app == app){
                assert.equal(event.method, 'get')
                assert.equal(event.path, '/user/:id')
                done()
            }
        })
        app.get('/user/:id', function($){
            $.end()
        })
    });
    */
    /*
    it('server'.white+' - Should listen on "get" event'.grey, function(done){
            var app = server();
            var passed = false;
            server.on('route', function(event){
                //assert.equal(event.location, 'http://localhost:9999/');
                console.log('eventevent', event)
                if(event.location == 'http://localhost:9999/' || event.location == 'http://127.0.0.1:9999/') passed = true
            })
            
            app.listen('http://localhost:9999/');
            assert(passed, true)
            done()
    
        });
    */
    
});