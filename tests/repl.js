
require('colors');
require('sugar');
var assert = require('assert');
var request = require('request');
var subject = 'Test'.cyan+' → '.grey+ 'REPL'.yellow + ': '.grey;
var repl = require('repl');

describe(subject + 'start a diet app from the command line', function(){	
	it('app.get(\'/\', ..)'.white+' - imitate repl call'.grey
	, function(done){
		var server = require('diet');
		var app = new server({ _repl: true });
		app.domain(9040);
		app.get('/', function($){ $.end('hello') });
		done();
	});
});

/*
/*
describe(subject + 'start a diet app from the command line', function(){	
	it('app.get(\'/\', ..)'.white+' - create an app from the command line'.grey
	, function(done){
		
		repl.start({
		  prompt: 'node',
		  input: process.stdin,
		  terminal:true,
		  output: process.stdout
		});
		process.stdout.write('require('diet').hey()');
		done()
	});
});

*/
	