require('../');
require('colors')
require('sugar');

var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'new App()'.yellow + ': '.grey;

describe(subject + 'Debug Option', function(){	
	it('new App()'.white+' - should create a new empty instance of App with no options'.grey
	, function(done){
		var app = new App();
		done();
	});
	
	it('new App()'.white+' - should create a new empty instance of App with debug: false option'.grey
	, function(done){
		var app = new App({debug: false});
		done();
	});
	
	it('new App()'.white+' - should create a new empty instance of App with debug: true option'.grey
	, function(done){
		var app = new App({debug: true});
		done();
	});
});

describe(subject + 'Level Option', function(){	
	it('new App()'.white+' - should create a new empty instance of App with debug level 0'.grey
	, function(done){
		var app = new App({level: 0});
		done();
	});
	
	it('new App()'.white+' - should create a new empty instance of App with debug level 1'.grey
	, function(done){
		var app = new App({level: 1});
		done();
	});
});