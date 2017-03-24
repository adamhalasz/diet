// ===========================================================================
//  Diet.js
//  HTTP(S) Host Controller
// ===========================================================================
   "use strict"
    
// ===========================================================================
//  Dependencies
// ===========================================================================
    const Signal        = require('./signal')
    const Error         = require('../../error')
    const url           = require('url')
    const RouteIterator = require('../../iterator')
    const utils         = require('../../utils')
    
// ===========================================================================
//  Exports
// ===========================================================================

    module.exports = function(App, protocol, location){

    	return function(request, response){
    		
    	    App.emit('route.start', { app: App, request: request, response: response })
    	    
    	    // set default header
    		response.setHeader('Content-Type', 'text/plain')
    		
    		// determine method, host, location, port and hostname
    		var method   = request.method ? request.method.toLowerCase() : '' ;      
    		var host     = request.headers.host ? request.headers.host : '' ; 
    		var location = request.url ? url.parse(request.url) : '' ;      
    		var port     = host.split(':')[1] || protocol.globalAgent.defaultPort;
    		var hostname = utils.isset(port) ? host : host + ':' + protocol.globalAgent.defaultPort ;
			
    		// get app (host controller) handling this hostname
    		var app = App.hosts[hostname] || App.hosts[hostname+':'+port] || App.hosts['0.0.0.0:'+port] || App.hosts[port]
    		
    		// if the app (host controller) exists and it has routes for this method
    		if(app && app.routes && app.routes[method]){ 
    		    
    		    // set default headers
    			for(let key in app.defaultHeaders) {
       				response.setHeader(key, app.defaultHeaders[key])
    			}
    			
    			// get routes for this method
    			let routes = app.routes[method] 
    			
    			// get path from routes
    			let path = routes[location.pathname]
    			let match_found = false
    			
    			if(!path){                                     // dynamic path
    				for(let index in routes){                      // loop trough all method routes
    					let item = new Array(routes[index][0])
    					if(item[0].paramRegex){
    						match_found = item[0].paramRegex.exec(location.pathname)
    						if(match_found){
    							path = item;
    							break;
    						}
    					}
    				}
    			}
    			
    			// Create Signal
    			new Signal(request, response, app, protocol, location, path, match_found, signalReady)
    			
    			// When Signal is Ready
    			function signalReady(signal){
    			    app.emit('route.headers', { app: app, signal: signal })
    				new RouteIterator(app.routes.header, signal, headersReady, 'header')
    			}
    			
    			// When Headers are Ready
    			function headersReady(signal){
    			    
    				if(path) { 
    				    app.emit('route.body', { path: path, app: app, signal: signal })
    					new RouteIterator(path, signal, bodyReady, 'body') 
    				} else {
    				    app.emit('route.footer_404', { app: app, signal: signal });
    				    bodyReady(signal, 'footer_404');
    				}
    			}
    			
    			// When Bodies are ready
    			function bodyReady(signal, state){
    			    app.emit('route.' + (state || 'footer'));
    			    new RouteIterator(app.routes.footer, signal, footersReady, state || 'footer')
    			}
    			
    			// When Footers are Ready
    			function footersReady(signal){
    				if(!signal.responded){
    				    
    					signal.status(404)
    					if (app.routes && app.routes.missing && app.routes.missing.length){ 
    					    app.emit('route.missing');
    						new RouteIterator(app.routes.missing, signal, false, 'missing_body') 
    					} else { 
    					    app.emit('route.missingAll');
    						response.end('404 page not found') 
    					}
    				}
    			}
    			
    			
    		} else {
    		    response.statusCode = 404
    			response.end('404 host not found') // no host found
    		}	
    		
    	}
    }