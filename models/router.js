var errorPage = require('./error')
var Next = require('nextjs')
var pathToRegexp = require('path-to-regexp')
var Domain = require('domain')

module.exports = function(method, type, app){
	return function(path){
		var args = arguments
		var argsLength = args.length
		if((type === 'method') && typeof path == 'string'){
			var keys = [];
			var regex = pathToRegexp(path, keys);
		}	
		var route = {
			path: path,
			paramKeys: keys || false,
			paramRegex: regex || false,
			emit: function(request, response, app, nextRoute, signal){
				
				var next = new Next(argsLength, function(){
					// console.log(' --> ALL MIDDLEWARE [ COMPLETED ]')
					signal.nextRoute()
				})
				var count = 0;
				
				(function iterate(){
					// console.log('\n## MIDDLEWARE', 'count=', count, '| argsLength=',argsLength)
					if(count < argsLength){
						var middleware = args[count]
						//var current = iterator.next()
						if(typeof middleware == 'function'){
							// console.log(' --> MIDDLEWARE [ STARTED ]')
							signal.return = function(){ 
								// console.log(' --> MIDDLEWARE [ RETURNED ]')
								count++
								iterate();
								next()
							}
							var domain = Domain.create()
							domain.on('error', function(error){ 
								signal.fail.route = route
								signal.fail.error = error
								signal.fail.middleware = middleware
								errorPage(error, signal, app, middleware) 
							})
							domain.run(function(){
								middleware(signal)
							})
						} else {
							// console.log(' --> MIDDLEWARE [ SKIP ]', middleware)
							count++
							iterate()
							next()
						}
					} else {
						// console.log('--> MIDDLEWARE DONE!')
					}
				})()
			}
		}
		if(!app.routes) app.routes = {}
		if(!app.routes[method]) method = [];
		if(type === 'method'){
			var pathRegister = (!isNaN(path)) ? path+'_status' : path
			
			if(!app.routes[method][pathRegister]) app.routes[method][pathRegister] = [];
			app.routes[method][pathRegister].push(route)
		} else {
			app.routes[method].push(route)
		}
	}
}