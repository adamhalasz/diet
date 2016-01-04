// Route Iterator
var ArrayIterator = require('es6-iterator/array')
module.exports = function(route, signal, callback, state){
	if(route.length){
		var iterator = new ArrayIterator(route);
		(function nextRoute(){
			var current = iterator.next()
			if(!current.done){
				signal.nextRoute = nextRoute
				current.value.emit(signal.request, signal.response, signal.app, nextRoute, signal)
			} else if (callback) {
				callback(signal)
			}
		})()
	} else if (callback) {
		callback(signal)
	}
}