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
server = {};

server.default = function(app){
	// Define default HTTP port
	if(!host) var host = app.location ? app.location.hostname : 'localhost';
	if(!port) var port = app.port ? app.port : 80 ; 

	// Create Non-secure Server
	server = http.createServer(function(request, response){
		httpHandler(request, response, app, 'http');
	}).listen(port);	
	app.log('   '+'✓'.yellow+' HTTP Server is '+'listening'.yellow+' on ' + (app.domain).underline);
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
		app.log('   '+'✓'.yellow+' HTTPS Server is '+'listening'.yellow+' on ' + (app.domain).underline);
		
	} else {
		app.log('HTTPS: Certificates are missing.'.red);
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
		+		(error.stack || 'Unknown error.')
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
	signal.status 		= function(code, message){ 
		signal.statusMessage = message ? message : code ;
		signal.statusCode = code;
		response.statusCode = code; 
	}
	signal.header 		= function(where, newValue){
		if(!newValue){
			return response.getHeader(where) || request.headers[where];
		} else {
			return response.setHeader(where, newValue);
		}
	}
	signal.header('content-type', 'text/plain');

	// ENV
	signal.env = process.env.NODE_ENV;
	
	// Method
	signal.method = request.method;
	
	// URL
	signal.url = url.parse(http_type + '://' + request.headers.host + request.url);
		
	// IP
	signal.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || false;
	
	// Queries
	signal.query = {}; 
	if(signal.url.query){
		signal.url.query.split(/\&/gi).forEach(function(string){
			var split = string.split('=');
			var key = split[0];
			var value = split[1];
			if(value === 'true') value = true;		// boolean true
			if(value === 'false') value = false; 	// boolean false
			if(!isNaN(value)) value = +value; 		// number
			signal.query[key] = value;
		});
	}
	
	// GET mime type from url IF it's a file request not a page request
	signal.mime_type = path.extname(request.url.pathname).substr(1).toLowerCase();
	
	// Create Redirection Method
	function redirectResponse(input, statusCode){
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
		
		response.statusCode = (!statusCode) ? 302 : statusCode ;
		response.setHeader('Location', path);
	}
	
	// Data Holder
	signal.data = {};
	
	// URL Params /foo/:bar
	signal.params = {};
	
	// passed holder
	signal.passed = true;
	
	// errors holder
	signal.errors = {};
	
	signal.enders = [];
	signal.onEnd = function(callback){
		signal.enders.push(callback);
	}
	
	// Signal Parent Domain
	var domain = $.domains[signal.url.hostname+':'+signal.url.port] || false;
	signal.domain = domain;
	signal.message = '';
	
	// Final Function that runs at the end of every request
	function THE_END(){
		var next = new Next(signal.enders.length, finish);
		signal.enders.forEach(function(ender){
			ender(next, signal);
		});
		function finish(){
			response.end(signal.message);
		}
	}
	
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
		signal.current_plugin = 0;
		
		// total local plugins
		signal.total_plugins = all_plugins.length;
		
		signal.progress = function(callback){
			signal.current_plugin++;
			if(signal.current_plugin < signal.total_plugins){
				patch_plugin(signal.current_plugin, callback);
			} else if (signal.current_plugin == signal.total_plugins) {
				THE_END();
			}
		}
		
		// total global plugins
		if(domain.plugins.global.length){
			signal.total_plugins += domain.plugins.global.length;
			all_plugins = domain.plugins.global.concat(all_plugins);
		}
		
		function patch_plugin(ID, callback){	
			var plugin = all_plugins[ID];
			if(signal.current_plugin <= signal.total_plugins){
				if(signal.current_plugin == signal.total_plugins){
					var plugin_context = signal;
					callback();
				} else {
					var plugin_context = Object.merge(signal, {
						return: function(plugin_return){
							var plugin_name = plugin.options && plugin.options.alias 
								? plugin.options.alias 
								: plugin.argumentName ;
							signal[plugin_name] = plugin_return;
							signal.progress(callback);
						},
						redirect: function(){
							redirectResponse.apply(this, arguments);
							signal.progress(callback);
						},
						end: function(message, statusCode){
							response.statusCode = statusCode ? statusCode : response.statusCode ;
							signal.message = message;
							signal.progress(callback);
						},
						// respond with json success
						success : function(input){
							response.statusCode = 200;
							signal.header('content-type', 'application/json');
							var data = signal.data;
							if(isset(input)) data = Object.merge(signal.data, input);
							data.passed = true;
							data.errors = [];
							signal.end(JSON.stringify(data));
							signal.progress(callback);
						},
						
						// respond with json error
						error : function(){
							response.statusCode = 200;
							signal.header('content-type', 'application/json');
							signal.end(JSON.stringify({passed: false, errors: signal.errors}));
							signal.progress(callback);
						},
						
						// respond with json signal data
						json : function(input){
							var data = signal.data;
							if(isset(input)) data = Object.merge(signal.data, input);
							response.statusCode = 200;
							signal.header('content-type', 'application/json');
							signal.end(JSON.stringify(signal.data));
							signal.progress(callback);
						}
					});
					
					
					if(plugin.type == 'global'){
						plugin.module.global.apply({}, [plugin_context, plugin.options]);
					}
					
					if(plugin.type == 'local') {
						plugin.module.local.apply({}, [plugin_context, plugin.options]);
					}
					
				}
			} else {
				throw new Error('Infinite-loop detected. $.return cannot be called in the last route argument.')
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
					
					// Body
					var body = signal.body.toString().replace(/\+/gi,' ');
					signal.body = {};
					if(body){
						body.split(/\&/gi).forEach(function(string){
							var split = string.split('=');
							var key = split[0];
							var value = split[1];
							if(value === 'true') value = true;		// boolean true
							if(value === 'false') value = false; 	// boolean false
							if(!isNaN(value)) value = +value; 		// number
							if(signal.body[key]){
								if(typeof signal.body[key] == 'string'){
									signal.body[key] = [signal.body[key]];
								}
								signal.body[key].push(decodeURIComponent(value));
							} else {
								signal.body[key] = decodeURIComponent(value);
							}
							
						});
					}
					
					//signal.body = qs.parse(decodeURIComponent(signal.body.toString()));
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
				if(signal.total_plugins > 0){
					patch_plugin(0);
				} else {
					throw 'Error there are no associated middlewares for this route.';
				}
			} else {
				signal.noRoute = true;
				if(signal.total_plugins > 0){
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
			if(!signal.statusMessage) signal.status(404, 'Page not found.');
			if(route){
				patch_plugin(0);
			} else {
				response.end(signal.statusCode+' '+signal.statusMessage);
			}
		}
	} else {
		signal.status(404, 'Domain not found.');
		signal.end(signal.statusCode+' '+signal.statusMessage);
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