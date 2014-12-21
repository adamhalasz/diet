var Signal = require('./signal')
var Error = require('./error')
var url = require('url')
var RouteIterator = require('./iterator')
module.exports = function(hosts, protocol, location){
	return function(request, response){
		response.setHeader('X-Powered-By', 'Diet.js')               // set software information for stats
		response.setHeader('Content-Type', 'text/plain')
		var app = hosts[request.headers.host]                       // find host 
		var method = request.method.toLowerCase()                   // get method
		if(app && app.routes && app.routes[method]){                // check if host exists
			var routes = app.routes[method]                         // method routes
			var location = url.parse(request.url)                   // parse location
			var path = routes[location.pathname]                    // static path
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
				//console.log('app.routes.footer', app.routes.footer)
				if(path) { 
					new RouteIterator(path, signal, function(signal){
						new RouteIterator(app.routes.footer, signal, footersReady, 'footer')
					}, 'body') 
				} else {
					new RouteIterator(app.routes.footer, signal, footersReady, 'footer_404')
				}
			}
			
			// When Footers are Ready
			function footersReady(signal){
				if(!signal.responded){
					signal.status(404)
					//console.log(signal.url.pathname, 'FOOTER READY')
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