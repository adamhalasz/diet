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
require('./lib/http.js');
require('./lib/stacktrace.js');
require('./lib/include.js');

var http = require('./lib/http');
var Next = require('nextjs');
var url = require('url');
var pathToRegexp = require('path-to-regexp');
var execSync = require("exec-sync");
var colors = require('colors');
var callsite = require('callsite');
var path = require('path');
var fs = require('fs');
var version = JSON.parse(fs.readFileSync(__dirname+'/package.json').toString()).version;
var util = require('util');

// Init Log
console.log(execSync('clear'));
console.log((' Diet v'+version+' ').inverse);
console.log(' http://dietjs.com/');

// Domain Class
App = function(level){
	var app = this;
	this.level = app.level = level || 0;
	
	// Process Path
	var stack = callsite();
	var requester = stack[1].getFileName();
	app.path = path.dirname(requester);
	app.dirName = app.path.match(/([^\/]*)\/*$/)[1]
	
	var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

	if(app.path.substring(0, homeDir.length) == homeDir){
		var displayPath = '~'+app.path.slice(homeDir.length);
	} else {
		var displayPath = app.path;
	}
	
	app.log('');
	app.log(' app '.yellow.inverse+(' '+app.dirName+' ').inverse
	+ ' at '.grey + displayPath.grey);
	app.log('-----------------------------------------------------------------');

	
	// Diet Router Listeners
	app.routes = { GET:{}, POST: {} };
	
	// Diet Plugins
	app.plugins = { onload: [], global: [], local: [], all: [] };

	// Use Diet Plugin
	app.plugin = function(name, options){
		app.log('   -> Plugin ' + name.cyan + ' registered'.yellow);
		
		var lines = arguments.callee.caller.toString().split('\n');
		
		var trace = printStackTrace({e: new Error()});
		var lineNumber = trace[1].split(':')[1];
		var args = lines[lineNumber-1].split(',');
		
		function _getCallerFile() {
		    try {
		        var err = new Error();
		        var callerfile;
		        var currentfile;
		
		        Error.prepareStackTrace = function (err, stack) { return stack; };
				app.log(err.stack.shift());
		        currentfile = err.stack.shift().getFileName();
		
		        while (err.stack.length) {
		            callerfile = err.stack.shift().getFileName();
		
		            if(currentfile !== callerfile) return callerfile;
		        }
		    } catch (err) {}
		    return undefined;
		}
		
		var resolvedModule = require.resolve(app.path+'/node_modules/'+name);
		var plugin = require(resolvedModule);
		
		app.plugin[name] = {
			name: name,
			options: options,
			module: plugin
		}
		
		if(plugin.onload){
			app.plugins.onload.push(app.plugin[name]);
		};
		
		if(plugin.global){
			app.plugins.global.push(merge(app.plugin[name], {
				type: 'global',
				argumentName: name
			}));
		};
		
		return plugin;
	}
	
	return app;
}

function MethodRouter(method){
	return function(){
		var app = this;
		var action = arguments[0];
		
		// Create Stack Trace
		var trace = printStackTrace({e: new Error()});
		
		// Parse out the Line Number from the Second Trace Line
		var lineNumber = trace[1].split(':')[1];
		
		// Parse out the File Name from the Second Trace Line
		var file_name = trace[1].split('@')[1].split(':')[0];
		
		// Read the File from the file_name
		var file_contents = fs.readFileSync(file_name).toString('utf8');
		
		// Split file_contents into an Array of it's lines
		var lines = file_contents.split('\n');
		
		// Parse out the arguments at the lineNumber from the lines
		var args = lines[lineNumber-1].split(',');
		
		// Construct Local Plugins
		var plugins = [];
		for(index in arguments){
			var argument = arguments[index];
			var argumentName = args[index].trim();
			if(typeof argument == 'object'){
				plugins.push(merge(argument, {
					type: 'local_module',
					argumentName: argumentName,
				}));
			} else if (typeof argument == 'function') {
				plugins.push({
					type: 'local',
					module: { local: argument },
					argumentName: argumentName,
				});
			}
		}
		var keys = [];
		var regex = pathToRegexp(action, keys);
		app.routes[method][action] = {
			function: arguments[arguments.length-1],
			plugins: plugins,
			regex: regex,
			keys: keys,
		}
	}
}

App.prototype.get = MethodRouter('GET')
App.prototype.post = MethodRouter('POST');


// Diet Options
App.prototype.debug = false;

// The server from App.prototype.http or App.prototype.https
App.prototype.server = false;

// Diet Use
App.prototype.use = function(){}

// Diet Loaded
App.prototype.loaded = function(callback){
	var app = this;
	var total_plugins = app.plugins.onload.length-1;
	var current_plugin = 0;
	function patch_plugin(ID){
		
		var plugin = app.plugins.onload[ID];
		var plugin_name = plugin.name;
		var plugin_context = merge(app, {
			return: function(plugin_return){
				//app.log('app.prototype.'+plugin_name);
				app[plugin_name] = plugin_return;
				
				//app.log(current_plugin, '<', total_plugins);
				if(current_plugin < total_plugins){
					current_plugin++;
					patch_plugin(current_plugin);
				} else {
					finish();
				}
				
			}
		});
		plugin.module.onload.apply({}, [plugin_context, plugin.options]);
	}
	//app.log(App.name, 'total_plugins', total_plugins, App.plugins);
	if(total_plugins > -1){
		patch_plugin(0);
	} else {
		finish();
	}
	
	function finish(){
		app.log('   -> Plugins are ready'.yellow);
		if(callback) callback();
	}
}
App.prototype.domains = {};
App.prototype.start = function(domainName, callback){
	var app = this;
	
	// Domain Name
	app.domain = domainName;
	
	// Location
	app.location = url.parse(app.domain);
	app.protocol = app.location.protocol.split(':')[0];
	app.port = app.location.port || 80;
	
	app.loaded(function(){
		var port_used = false;
		for(index in app.domains){
			if(app.domains.hasOwnProperty(index)){
				var d = app.domains[index];
				if(d.port == app.port){
					port_used = true;
				}
			}
		}
		if(!port_used){
			if(app.protocol == 'https'){
				http.secure(app);
			} else {
				http.default(app);
			}
		} else {
			app.log('   -> HTTP Server is '+'listening'.yellow+' on ' + (app.domain).underline);
		}
		
		app.log('-----------------------------------------------------------------\n');
		
		app.domains[app.location.hostname] = app;
		if(callback) callback();
	});
}

App.prototype.log = function(){
	var array = Array.apply(null, arguments);
	if(this.level > 0){
		var gap = '';
		for(i=0; i <= this.level; i++){
			gap += '  ';
		}
		array.unshift(gap);
	}
	
	
	console.log.apply(this, array);
}