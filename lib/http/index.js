/* 
Copyright (c) 2014 Halász Ádám

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var vm = require('vm');
var Next = require('nextjs');
var traceback = require('traceback');
var util = require('util');
var fs = require('fs');
var colors = require('colors');
var Dom = require('domain');
var server = {};

server.default = function(domain){
	// Define default HTTP port
	if(!host) var host = domain.location ? domain.location.hostname : 'localhost';
	if(!port) var port = domain.port ? domain.port : 80 ; 

	// Create Non-secure Server
	domain.server = http.createServer(function(request, response){
		httpHandler(request, response, domain, 'http');
	}).listen(port);	
	console.log('   -> HTTP Server is '+'listening'.yellow);
}

server.secure = function(host, port, secure, $){
	if(secure){
		// Define default HTTPS port
		if(!app.options.port) app.options.port = 443; 
		
		// Get Keys from Certificate Files
		var keys = {};
		
		// Required app.options
		keys.key  = fs.readFileSync(secure.key) 
		keys.cert = fs.readFileSync(secure.cert)
		
		// Optional Ca (Intermediate Certificate)
		if(isset(secure.ca)){ keys.ca = fs.readFileSync(secure.ca) } 
		
		// Create Secure Server
		$.server = https.createServer(keys, function(request, response){
			httpHandler(request, response, $, 'https');
		}).listen(port);
		console.log('   -> HTTPS Server is ' + 'listening'.yellow);
		
	} else {
		console.error('HTTPS: Certificates are missing.');
	}
}

module.exports = server;


function httpHandler(request, response, $, http_type){
	
	// Create Signal Method
	var signal = {};
	signal.request = request;
	signal.response = response;
	
	// Print Errors to Browser
	process.setMaxListeners(0);
	process.on('uncaughtException', function(error) { 
		response.end('<!doctype html/><html><head><title>Node Error</title></head><body><div style="font-family:monaco; font-size:13px; line-height:18px; padding:20px;">'
		+	'<div style="clear:both;">'
		+		error.stack
		.replace(/\</gi, '&lt;')
		.replace(/\>/gi, '&gt;')
		.replace(/at\s([^\(\)]+)((:[0-9]+))/gi, '<span style="color:#A0A0A0;">at</span> <span style="color:#575FB6;">$1$2</span>')
		.replace(/at\s([^\(\)]+)\s/gi, '<span style="color:#A0A0A0;">at</span> <span style="color:#575FB6;">$1</span> ')
		.replace(/\n/gi, '<div class="newLine"> </div>')
		.replace(/\s\s\s\s/gi, '<div style="margin-left:40px; float:left; height:18px; clear:both;"> </div>').replace(/\(([^\)]+)\)/gi, '<span style="color:#A0A0A0;">(</span><span style="color:#007F1F;">"$1"</span><span style="color:#A0A0A0;">)</span>')
		
		+	'</div></div></body></html>');
	});
	
	// Headers
	signal.headers 		= request.headers;
	signal.status 		= function(code){ response.statusCode = code; }
	signal.header 		= function(where, newValue){
		if(newValue){
			return response.getHeader(where);
		} else {
			return response.setHeader(where, newValue);
		}
	}
	signal.header('content-type', 'text/plain');
	
	// Method
	signal.method = request.method;
	
	// URL
	signal.url = url.parse(http_type + '://' + request.headers.host + request.url);
		
	// IP
	signal.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || false;
	
	// Queries
	signal.query = signal.url.query ? qs.parse(signal.url.query) : {} ;
	
	// GET mime type from url IF it's a file request not a page request
	signal.mime_type = path.extname(request.url.pathname).substr(1).toLowerCase();
	
	// Create Redirection Method
	signal.redirect = function(path, statusCode){
		if(path == 'back') { path = request.headers.referer || '/'; }
		if(path == 'home') { path = '/'; }
		response.statusCode = (!statusCode) ? 302 : statusCode;
		response.setHeader('Location', path);
		response.end();
	}
	
	
	// Data Holder
	signal.data = {};
	
	// URL Params /foo/:bar
	signal.params = {};
	
	// passed holder
	signal.passed = true;
	
	// errors holder
	signal.errors = {};
	
	// respond with json success
	signal.success = function(){
		response.statusCode = 200;
		signal.header('content-type', 'application/json');
		response.end(JSON.stringify({passed: true, errors: []}));
	}
	
	// respond with json error
	signal.error = function(){
		response.statusCode = 404;
		signal.header('content-type', 'application/json');
		response.end(JSON.stringify({passed: false, errors: signal.errors}));
	}
	
	// respond with json signal data
	signal.json = function(){
		response.statusCode = 200;
		signal.header('content-type', 'application/json');
		response.end(JSON.stringify(signal));
	}
	
	// end with plain text
	signal.end = function(message, statusCode){ 
		endResponse(message, statusCode);
	}
	
	function endResponse(message, statusCode){
		response.statusCode = statusCode ? statusCode : 200 ;
		console.log('response end');
		response.end(message); 
	}
	
	
	
	console.log('signal.url.pathname=',signal.url.pathname);
	
	var domain = $.domains[signal.url.hostname] || false;
	signal.domain = domain;
	
	var context = merge(signal, {});
	if(domain){
		var methodRoutes = domain.routes[signal.method.toUpperCase()];
		
		for(index in methodRoutes){
			var route = Route(methodRoutes[index], signal);
			if(route) break;
		}
		
		var all_plugins = route ? route.plugins : [];
		var current_plugin = 1;
		
		// total local plugins
		var total_plugins = all_plugins.length-1;
		
		// total global plugins
		if(domain.plugins.global.length){
			total_plugins += domain.plugins.global.length;
			all_plugins = domain.plugins.global.concat(all_plugins);
		}
		
		function patch_plugin(ID, callback){
			var plugin = all_plugins[ID];
			console.log('PLUGIN:', ID);
			var plugin_context = merge(context, {
				return: function(plugin_return){
					var plugin_name = plugin.options && plugin.options.alias 
						? plugin.options.alias 
						: plugin.argumentName ;
					context[plugin_name] = plugin_return;
					console.log('   +plugin ->', plugin_name, plugin_return);
					if(current_plugin < total_plugins){
						current_plugin++;
						patch_plugin(current_plugin, callback);
					} else {
						callback();
					}
				}
			});
			if(plugin.type == 'global'){
				plugin.module.global.apply({}, [plugin_context, plugin.options]);
			} else {
				plugin.module.local.apply({}, [plugin_context, plugin.options]);
			}
		}
		if(route){
			if(total_plugins > 0){
				patch_plugin(0, function(){
					route.function(context);
				});
			} else {
				route.function(context);
			}
		} else {
			console.log('\n404 Page not found at ->', signal.url.href);
			
			if(total_plugins > 0){
				patch_plugin(0, function(){
					notFound();
				});
			} else {
				notFound();
			}
			
		}
		
	
		function notFound(){
			var route = domain.routes['GET']['404'];
			if(route){
				route.function(context);
			} else {
				signal.end("404 Page not Found", 404);
			}
		}
	} else {
		signal.end('Domain not found.');
	}
}

function Route(route, signal){
	var match_found = route.regex.exec(signal.url.pathname);
	if(match_found){ 
		Params(route, signal, match_found);
		return route; 
	} else {
		return false;
	}
}

function Params(route, signal, match_found){
	var route_keys_length = route.keys.length;
	for(var i = 0; i < route_keys_length; i++){
		var param = route.keys[i];
		signal.params[param.name] = match_found[i+1];
	}
}

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

