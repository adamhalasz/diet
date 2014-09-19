
require('colors');
require('sugar');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'REPL'.yellow + ': '.grey;
var repl = require('repl');

describe(subject + 'start a diet app from the command line', function(){	
	it('app.get(\'/\', ..)'.white+' - imitate repl call'.grey
	, function(done){
		var server = require('../');
		var app = new server({ _repl: true });
		app.domain(9040);
		app.get('/', function($){ $.end('hello') });
		done();
	});
});