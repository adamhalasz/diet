require('colors');
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Plugins (onload)'.yellow + ': '.grey;

describe(subject + 'Plain Onload Plugin', function(){
	it('should create an app and use the non-regular module `yo` plugin then makes sure that yo.message is "Yo!"'.grey
	, function(done){	
		var app = new server();
		app.domain(9032);
		app.plugin('test_module')
		app.start(function(){
			done();
		})
	});
	it('should create an app and use the non-regular module `yo` plugin then makes sure that yo.message is "Yo!"'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://localhost:9008');
		var yo = app.plugin('./test_plugins/yo.js');
		assert.equal(yo.message, 'Yo!');
		done()
	});
	
	it('should create an app and use the regular module `test_module` plugin then makes sure that app.test_module returns "ready" after app.start'.grey
	, function(done){
		var app = new server({ debug: true });
		app.domain('http://localhost:9032');
		var test = app.plugin('test_module');
		app.start(function(){
			assert.equal(isset(test.global), true);
			done();
		});
	});
});