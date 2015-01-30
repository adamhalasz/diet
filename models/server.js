var Host = require('./host')
module.exports = function(app, hosts, servers){
	return function(location, httpsOptions){
		// get location and create route holder for app
		var location = isNaN(location) ? location : 'http://localhost:'+location ;
		app.location = typeof location == 'object' ? location : require('url').parse(location) ;
		app.routes = { get: [], post: [], options: [], put: [], patch: [], head: [], delete: [], trace: [], header: [], footer: [], missing: [], error: [] }
		hosts[app.location.host] = app
		
		// get protocol and port
		var protocol = app.location.protocol === 'http:' ? require('http') : require('https')
		var port = app.location.protocol === 'http:' ? (app.location.port || 80) : (app.location.port || 443) ;
		
		// create server
		if(!servers[port]){
			var host = new Host(hosts, protocol, location)
			var server = app.location.protocol === 'http:' 
				? protocol.createServer(host).listen(port) 
				: protocol.createServer(httpsOptions, host).listen(port) ;
			servers[port] = server
			
		} else {
			var server = servers[port]
		}
		
		// console inititalization message
		console.log(' ➭ '.dim + app.location.protocol.split(':')[0].toUpperCase() + ' Server is listening on', location.underline)
		
		// return server
		return app.server = server
	}
}