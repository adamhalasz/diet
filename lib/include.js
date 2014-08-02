var callsite = require('callsite');
var path = require('path');
var fs = require('fs');
var vm = require('vm');
var util = require('util');

require('./extensions.js');

include = function (include_path, parentModule){
	
	var stack = callsite();
	var requester = stack[1].getFileName();
	var dir_name = path.dirname(requester);
	var dir_match = dir_name.match(/([^\/]*)\/*$/)[1]
	
	console.log(requester, dir_name, dir_match);
	var resolveModule = function(module) {
        if (module.charAt(0) !== '.') return module;
        return path.resolve(dir_name, module);
    };
	console.log(include_path, resolveModule(include_path))
	
	
	
	//console.log(path);
	var file = '';
		file += 'module.exports = function(){\n';
		file += 	fs.readFileSync(resolveModule(include_path)).toString();
		file += '\n}';
		
	var sandbox = { 
		process	: process, 
		module	: module,
		console	: console,
		require : function(module){
			if (module.charAt(0) !== '.') var name = module;
			var name = path.resolve(dir_name, module);
			return require(name);
		},
		finish: function(){
			console.log(arguments);
		} 
	};
	
	//console.log(file);
	try {
		vm.runInNewContext(file, sandbox, include_path);
		return sandbox.module.exports();
	} catch (error) {
		throw new Error(error);
	}
}