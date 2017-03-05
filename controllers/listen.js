// ===========================================================================
//  Diet.js
//  Listener Controller
// ===========================================================================
   "use strict"
   
// ===========================================================================
//  Dependencies
// ===========================================================================
    
    const url = require('url')
    const parent = module.parent.exports
    const utils = require('./utils')
    
// ===========================================================================
//  Exports
// ===========================================================================
	
    module.exports = function(app, servers){
        
    	return function(location, options, callback){
    	    var callback = typeof options == 'function' ? options : callback ;
    	    var options = !options || typeof options == 'function' ? {} : options ;
    	    var host = utils.getHost(location, options)
    	    app.location = host.location
    	    app.port = host.port
    	    
    	    /*
    	    // define location
            if(!isNaN(location)) {
            	app.location = url.parse(protocolName+'://0.0.0.0:'+location);
            
            } else if(typeof location == 'string') {
                var location = location.indexOf('://') == -1 ? 'http://' + location : location ;
            	app.location = url.parse(location) 
            
            } else if(typeof location == 'object') {
            	app.location = location;
            	
            } else if(!utils.isset(location)){
            	app.location = url.parse(protocolName+'://0.0.0.0:80/');
            } */        
            
            // define protocol
    		//var protocol = app.location.protocol === 'http:' ? require('http') : require('https') ;
    		
    		// define port
    		
    		
    		// create route containers
    		app.routes = typeof app.routes != "undefined" ? app.routes : { get: [], post: [], options: [], put: [], patch: [], head: [], delete: [], trace: [], header: [], footer: [], missing: [], error: [] }
    		
    		//console.log(isNaN(location), location, typeof location, app.location);
    		// define host
    		app.location.host = app.location.host.split(':')[1] ? app.location.host : app.location.host + ':' + app.port;
    		//app.host = app.location.host.split(':')[0];
    		
    		// save host to hosts
    		app.hosts[app.location.host] = app
    		
    		app.emit('listen', { port: app.port, location: app.location, options: options });
    		
    		// create new server object
    		// if port is not found in servers
    		if(!servers[app.port]){
    		    var server;
    		    app.protocols.forEach(function(protocolObject){
    		        server = protocolObject.handler(app, options, callback)
    		    })
    		    
    			// save server to servers with it's port
    			servers[app.port] = server
    			
    			// listen on localhost addresses
    			// Implement check if app.hosts['127.0.0.1:' + port] do nothing else
    			//app.listen('http://localhost:'+app.port, options);
    			//app.listen('http://127.0.0.1:'+app.port, options);
    			//app.listen('http://'+app.address+':'+app.port, options);
    			
    		// otherwise reuse the server object
    		} else {
    			var server = servers[app.port]
    			if(callback) callback();
    		}

    		// return server
    		app.server = server;
    		
    		// return app
    		return app;
    	}
    }
   