
require('colors')
require('sugar');

var assert 	= require('assert');
var request = require('request');
var server 	= require('../');

var subject = 'Test'.cyan+' → '.grey+ 'server'.yellow + ': '.grey;

describe(subject + 'Debug Option', function(){	
	it('server'.white+' - should create a new empty instance of App with no options'.grey
	, function(done){
		var app = new server();
		done();
	});
	
	it('server'.white+' - should create a new empty instance of App with debug: false option'.grey
	, function(done){
		var app = new server({debug: false});
		done();
	});
	
	it('server'.white+' - should create a new empty instance of server with debug: true option'.grey
	, function(done){
		var app = new server({debug: true});
		done();
	});
});

describe(subject + 'Level Option', function(){	
	it('server'.white+' - should create a new empty instance of server with debug level undefined'.grey
	, function(done){
		var app = new server();
		done();
	});
	it('server'.white+' - should create a new empty instance of server with debug level 0'.grey
	, function(done){
		var app = new server({level: 0});
		done();
	});
	
	it('server'.white+' - should create a new empty instance of server with debug level 1'.grey
	, function(done){
		var app = new server({level: 1});
		done();
	});
});
