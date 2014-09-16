require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Plugins (onload)'.yellow + ': '.grey;

describe(subject + 'Plain Onload Plugin', function(){	
	it('should create an app and use the non-regular module `yo` plugin then makes sure that app.yo is "Yo Message!" after app.start'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://localhost:9008');
		app.plugin('./test_plugins/yo.js');
		app.start(function(){
			assert.equal(app.yo, 'Yo!');
			done();
		});
	});
	
	it('should create an app and use the regular module `test_module` plugin then makes sure that app.test_module returns "ready" after app.start'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://localhost:9009');
		app.plugin('test_module');
		app.start(function(){
			assert.equal(app.test_module, 'ready');
			done();
		});
	});
});