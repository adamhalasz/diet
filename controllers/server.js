var Host = require('./host')
var url = require('url');
module.exports = function(app, hosts, servers){
	return function(location, httpsOptions, noMessage){
	    // define location
        if(!isNaN(location)) {
        	app.location = url.parse('http://localhost:'+location);
        } else if(typeof location == 'string') {
                var location = location.indexOf('://') == -1 ? 'http://' + location : location ;
        	app.location = url.parse(location) 
        } else if(typeof location == 'object') {
        	app.location = location;
        } else if(!isset(location)){
        	app.location = url.parse('http://localhost:80/');
        }            
        
        // define protocol
		var protocol = app.location.protocol === 'http:' ? require('http') : require('https') ;
		
		// define port
		var port = app.location.protocol === 'http:' ? (app.location.port || 80) : (app.location.port || 443) ;
		
		// create route containers
		app.routes = typeof app.routes != "undefined" ? app.routes : { get: [], post: [], options: [], put: [], patch: [], head: [], delete: [], trace: [], header: [], footer: [], missing: [], error: [] }
		
		//console.log(isNaN(location), location, typeof location, app.location);
		// define host
		app.location.host = app.location.host.split(':')[1] ? app.location.host : app.location.host + ':' + port;
		
		// save host to hosts
		hosts[app.location.host] = app
		
		// create new server object
		// if port is not found in servers
		if(!servers[port]){
		    // create new host object
			var host = new Host(hosts, protocol, location)
			
			// define http or https server
			var server = app.location.protocol === 'http:' 
				? protocol.createServer(host).listen(port, app.host) 
				: protocol.createServer(httpsOptions, host).listen(port, app.host) ;
			
			// save server to servers with it's port
			servers[port] = server
			
			// listen on localhost addresses
			// Implament check if app.hosts['127.0.0.1:' + port] do nothing else
			app.listen('http://127.0.0.1:'+port, httpsOptions, true);
			app.listen('http://'+app.address+':'+port, httpsOptions, true);
			
		// otherwise reuse the server object
		} else {
			var server = servers[port]
		}
		
		// console inititalization message
		if(!noMessage && !app.silent) console.log(' ... '.dim + app.location.protocol.split(':')[0].toUpperCase() + ' Server is listening on', app.location.href.underline)
		
		// return server
		app.server = server;
		return app;
	}
}
