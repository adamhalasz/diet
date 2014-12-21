require('colors')
require('sugar');

var assert 	= require('assert');
var request = require('request');
var server 	= require('../');

var subject = 'Test'.cyan+' → '.grey+ 'server'.yellow + ': '.grey;

describe(subject + 'Server Instance', function(){	
	it('server'.white+' - Should create a new Server Instance'.grey
	, function(done){
		var app = server();
		done();
	});
});
