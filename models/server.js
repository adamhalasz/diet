var Host = require('./host')
module.exports = function(app, hosts, servers){
	return function(location, httpsOptions, noMessage){
	    
		// get location and create route holder for app
		var location = isNaN(location) ? location : 'http://localhost:'+location ; // if NaN 
		if (typeof location == 'string') {
			if (location.indexOf('://') == -1) var location = 'http://' + location ; // check if protocol else http
		}
		
		app.location = typeof location == 'object' ? location : require('url').parse(location) ; // Make object if is not
		
		// get protocol and port
		if (app.location.protocol.indexOf('http') > -1) {
		var protocol = app.location.protocol === 'http:' ? require('http') : require('https')
		var port = app.location.protocol === 'http:' ? (app.location.port || 80) : (app.location.port || 443) ;
		
		app.routes = typeof app.routes != "undefined" ? app.routes : { get: [], post: [], options: [], put: [], patch: [], head: [], delete: [], trace: [], header: [], footer: [], missing: [], error: [] }
		
		hosts[app.location.host] = app
		
		
		
		// create server
		if(!servers[port]){
			var host = new Host(hosts, protocol, location)
			var server = app.location.protocol === 'http:' 
				? protocol.createServer(host).listen(port, app.host) 
				: protocol.createServer(httpsOptions, host).listen(port, app.host) ;
			servers[port] = server
			
			// listen on localhost addresses
			// Implament check if app.hosts['127.0.0.1:' + port] do nothing else
			app.listen('http://127.0.0.1:'+port, httpsOptions, true);
			app.listen('http://'+app.address+':'+port, httpsOptions, true);
			
		} else {
			var server = servers[port]
		}
		
		// console inititalization message
		if(!noMessage && !app.silent) console.log(' ... '.dim + app.location.protocol.split(':')[0].toUpperCase() + ' Server is listening on', location.underline)
		
		// return server
		return app.server = server
		
		// only return server if there was no fail in the listen line 			
		} else { console.log('Fail in .listen(value)') }
	}
}
