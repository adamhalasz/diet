var Signal = require('./signal')
var Error = require('./error')
var url = require('url')
var RouteIterator = require('./iterator')
module.exports = function(hosts, protocol, location){
	return function(request, response){
	    // set default header
		response.setHeader('Content-Type', 'text/plain')
		
		// determine method, host, location, port and hostname
		var method   = request.method ? request.method.toLowerCase() : '' ;      
		var host     = request.headers.host ? request.headers.host : '' ; 
		var location = request.url ? url.parse(request.url) : '' ;      
		var port     = host.split(':')[1];
		var hostname = isset(port) ? host : host + ':' + protocol.globalAgent.defaultPort ;
		
		// get app (host controller) handling this hostname
		var app = hosts[hostname] 
			
		// if the app (host controller) exists and it has routes for this method
		if(app && app.routes && app.routes[method]){ 
		    
		    // set default headers
			for(var key in app.defaultHeaders) {
   				response.setHeader(key, app.defaultHeaders[key])
			}
			
			// get routes for this method
			var routes = app.routes[method] 
			
			// get path from routes
			var path = routes[location.pathname]
			var match_found = false
			
			if(!path){                                     // dynamic path
				for(index in routes){                      // loop trough all method routes
					var item = new Array(routes[index][0])
					if(item[0].paramRegex){
						match_found = item[0].paramRegex.exec(location.pathname)
						if(match_found){
							var path = item;
							break;
						}
					}
				}
			}
			
			// Create Signal
			new Signal(request, response, app, protocol, location, path, match_found, signalReady)
			
			// When Signal is Ready
			function signalReady(signal){
				new RouteIterator(app.routes.header, signal, headersReady, 'header')
			}
			
			// When Headers are Ready
			function headersReady(signal){
				if(path) { 
					new RouteIterator(path, signal, bodyReady, 'body') 
				} else {
				    bodyReady(signal, 'footer_404');
				}
			}
			
			// When Bodies are ready
			function bodyReady(signal, state){
			    new RouteIterator(app.routes.footer, signal, footersReady, state || 'footer')
			}
			
			// When Footers are Ready
			function footersReady(signal){
				if(!signal.responded){
					signal.status(404)
					if (app.routes.missing.length){ 
						new RouteIterator(app.routes.missing, signal, false, 'missing_body') 
					} else { 
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
