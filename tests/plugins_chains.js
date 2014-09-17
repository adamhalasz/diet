require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Plugins (chains)'.yellow + ': '.grey;
var app = new server({ debug: false }).domain('http://localhost:9011').start();

describe(subject + 'Plain Local Plugin', function(){	
	it('should create the yo local function plugin then attach it to the plugin chain of Route "GET /suite/0"  on the fly then test the connection.'.grey
	, function(done){
		function yo($){
			this.sender = 'Adam';
			this.message = 'Yo!';
			$.return(this);
		}
		
		app.get('/suite/0', function($){
			$.chain().plugin('yo', yo).load(function(){
				$.end($.yo.message + ' It\'s ' + $.yo.sender + '!');
			});
		});		
		
		request.get('http://localhost:9011/suite/0', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'Yo! It\'s Adam!');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});