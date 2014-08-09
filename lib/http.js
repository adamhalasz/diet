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
var util = require('util');
var fs = require('fs');
var colors = require('colors');
var Dom = require('domain');
server = {};

server.default = function(app){
	// Define default HTTP port
	if(!host) var host = app.location ? app.location.hostname : 'localhost';
	if(!port) var port = app.port ? app.port : 80 ; 

	// Create Non-secure Server
	server = http.createServer(function(request, response){
		httpHandler(request, response, app, 'http');
	}).listen(port);	
	app.log('   -> HTTP Server is '+'listening'.yellow+' on ' + (app.domain).underline);
}

server.secure = function(host, port, secure, app){
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
		server = https.createServer(keys, function(request, response){
			httpHandler(request, response, app, 'https');
		}).listen(port);
		app.log('   -> HTTPS Server is '+'listening'.yellow+' on ' + (app.domain).underline);
		
	} else {
		app.log('HTTPS: Certificates are missing.');
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
		if(!response.headersSent){
			response.setHeader('content-type', 'text/html');
		}
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
		if(!newValue){
			return response.getHeader(where) || request.headers[where];
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
	signal.redirect = function(input, statusCode){
		if(input.substring(0, 4) == 'back') { 
			var path = request.headers.referer || '/';
		} else if(input.substring(0, 4) == 'home') { 
			var path = '/'; 
		} else {
			var path = input;
		}
		
		// Append Addtional Routes
		if(input.split('back')[1]){
			path += input.split('back')[1];
		}
		
		if(input.split('home')[1]){
			path += input.split('home')[1];
		}
		
		// Remove QueryString Arrays
		var URI = url.parse(path);
		if(URI.query){
			var QUERY = URI.query.replace(/\?/gi, '&') ? '?'+URI.query.replace(/\?/gi, '&') : false;
			
			if(QUERY){
				var queryObject = qs.parse(QUERY.substr(1));
				for(index in queryObject){
					var value = queryObject[index];
					if(typeof value == 'object'){
						queryObject[index] = queryObject[index][queryObject[index].length-1];
					}
				}
				QUERY = '?'+qs.stringify(queryObject);
			}
			
			// Reconstruct the Path
			var path = '';
			if(URI.protocol) 	path += URI.protocol + '//';
			if(URI.hostname) 	path += URI.hostname;
			if(URI.port) 		path += ':' + URI.port;
			if(URI.pathname) 	path += URI.pathname;
			if(QUERY) 			path += QUERY;
		}
		
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
		response.statusCode = 200;
		signal.header('content-type', 'application/json');
		response.end(JSON.stringify({passed: false, errors: signal.errors}));
	}
	
	// respond with json signal data
	signal.json = function(){
		response.statusCode = 200;
		signal.header('content-type', 'application/json');
		response.end(JSON.stringify(signal.data));
	}
	
	// end with plain text
	signal.end = function(message, statusCode){ 
		endResponse(message, statusCode);
	}
	
	function endResponse(message, statusCode){
		response.statusCode = statusCode ? statusCode : 200 ;
		var next = new Next(signal.enders.length, finish);
		signal.enders.forEach(function(ender){
			ender(next, signal);
		});
		function finish(){
			response.end(message);
		} 
	}
	
	signal.enders = [];
	signal.onEnd = function(callback){
		signal.enders.push(callback);
	}
	
	// Signal Parent Domain
	var domain = $.domains[signal.url.hostname] || false;
	signal.domain = domain;
	
	// POST Body
	signal.body = '';
	
	if(domain){
		var methodRoutes = domain.routes[signal.method.toUpperCase()];
		
		for(index in methodRoutes){
			var route = Route(methodRoutes[index], signal);
			if(route) break;
		}
		
		if(route){
			var all_plugins = route.plugins;
		} else if (domain.routes['GET']['404']) {
			var all_plugins = domain.routes['GET']['404'].plugins;
		} else {
			var all_plugins = [];
		}
		var current_plugin = 0;
		
		// total local plugins
		var total_plugins = all_plugins.length-1;
		
		// total global plugins
		if(domain.plugins.global.length){
			total_plugins += domain.plugins.global.length;
			all_plugins = domain.plugins.global.concat(all_plugins);
		}
		
		function patch_plugin(ID, callback){
			var plugin = all_plugins[ID];
			var plugin_context = Object.merge(signal, {
				return: function(plugin_return){
					var plugin_name = plugin.options && plugin.options.alias 
						? plugin.options.alias 
						: plugin.argumentName ;
					signal[plugin_name] = plugin_return;
					
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
		if(signal.method == 'POST'){
			var content_type = request.headers['content-type'];
			var multipart = (isset(content_type)) 
				? content_type.indexOf('multipart/form-data') 
				: -1 ;
			
			// NON-MULTIPART request
			if(multipart == -1){
				signal.multipart = false;
				
				request.on('data', function(data){
					signal.body += data;
				});
				request.on('end', function(){
					
					signal.body = qs.parse(decodeURIComponent(signal.body.toString()));
					afterBody();
				});
				
			// MULTIPART request
			} else {
				signal.multipart = true;
				afterBody();
			}
		} else {
			afterBody();
		}
		
		function afterBody(){
			if(route){
				if(total_plugins > 0){
					patch_plugin(0, function(){
						route.function(signal);
					});
				} else {
					route.function(signal);
				}
			} else {
				
				signal.noRoute = true;
				if(total_plugins > 0){
					patch_plugin(0, function(){
						notFound();
					});
				} else {
					notFound();
				}
				
			}
		}
		function notFound(){
			var route = domain.routes['GET']['404'];
			if(route){
				route.function(signal);
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