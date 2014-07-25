// Dependencies
require('./lib/extensions/index.js');
require('./lib/extensions/stacktrace.js');

var http = require('./lib/http');
var Next = require('nextjs');
var url = require('url');
var pathToRegexp = require('path-to-regexp');
var execSync = require("exec-sync");
var colors = require('colors');

console.log(execSync('clear'));
console.log(' Diet v0.5.0 '.inverse);
console.log(' http://dietjs.com/');

// Domain Class
Domain = function(domainName, certificates){
	console.log('\n'+' Loading Domain '.inverse+' - '+domainName.underline+'\n-----------------------------------------------------------------');
	var domain = this;
	
	// Domain Name
	domain.name = domainName;
	
	// Location
	domain.location = url.parse(domain.name);
	domain.protocol = domain.location.protocol.split(':')[0];
	domain.port = domain.location.port || 80;
	
	// HTTPS Certificates
	domain.certifications = certificates;
	
	// Process Path
	domain.path = process.cwd();
	
	// Diet Router Listeners
	domain.routes = { GET:{}, POST: {} };
	
	// Diet Plugins
	domain.plugins = { onload: [], global: [], local: [], all: [] };
	
	// Use Diet Plugin
	domain.plugin = function(name, options){
		console.log('   -> Plugin ' + name.cyan + ' registered'.yellow);
		var plugin = require(name);
	
		domain.plugin[name] = {
			name: name,
			options: options,
			module: plugin
		}
		
		if(plugin.onload){
			domain.plugins.onload.push(domain.plugin[name]);
		};
		
		if(plugin.global){
			domain.plugins.global.push(merge(domain.plugin[name], {
				type: 'global',
				argumentName: name
			}));
		};
		
		return domain.plugin[name] || false;
	}
	
	return domain;
}

function MethodRouter(method){
	return function(){
		var domain = this;
		var action = arguments[0];
		
		var lines = arguments.callee.caller.toString().split('\n');
		
		var trace = printStackTrace({e: new Error()});
		var lineNumber = trace[1].split(':')[1];
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
		domain.routes[method][action] = {
			function: arguments[arguments.length-1],
			plugins: plugins,
			regex: regex,
			keys: keys,
		}
	}
}

Domain.prototype.get = MethodRouter('GET')
Domain.prototype.post = MethodRouter('POST');


// Diet Options
Domain.prototype.debug = false;

// The server from Domain.prototype.http or Domain.prototype.https
Domain.prototype.server = false;

// Diet Use
Domain.prototype.use = function(){}

// Diet Loaded
Domain.prototype.loaded = function(callback){
	var domain = this;
	//console.log('DOMAIN', domain)
	var total_plugins = domain.plugins.onload.length-1;
	var current_plugin = 0;
	function patch_plugin(ID){
		
		var plugin = domain.plugins.onload[ID];
		var plugin_name = plugin.name;
		var plugin_context = merge(domain, {
			return: function(plugin_return){
				//console.log('Domain.prototype.'+plugin_name);
				domain[plugin_name] = plugin_return;
				console.log('   -> Plugin ' + plugin_name.cyan + ' onload'.yellow);
				//console.log(current_plugin, '<', total_plugins);
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
	//console.log(domain.name, 'total_plugins', total_plugins, domain.plugins);
	if(total_plugins > -1){
		patch_plugin(0);
	} else {
		finish();
	}
	
	function finish(){
		console.log('   -> Plugins are ready'.yellow);
		console.log('-----------------------------------------------------------------\n');
		if(callback) callback();
	}
}
Domain.prototype.domains = {};
Domain.prototype.start = function(callback){
	var domain = this;
	//console.log(domain.port);
	//console.log(domain.domains);
	//var port_used = domain.domains.filter(function(item){ return item.port == domain.port; }).length;
	var port_used = false;
	for(index in domain.domains){
		if(domain.domains.hasOwnProperty(index)){
			var d = domain.domains[index];
			if(d.port == domain.port){
				port_used = true;
			}
		}
	}
	if(!port_used){
		if(domain.protocol == 'https'){
			http.secure(domain);
		} else {
			http.default(domain);
		}
	} else {
		console.log('   -> HTTP Server is '+'listening'.yellow);
	}
	domain.domains[domain.location.hostname] = domain;
	domain.loaded(callback);
}

// Logger
var log;
log = function(){
	if(Domain.prototype.debug){
		console.log.apply(this, arguments);
	}
}


