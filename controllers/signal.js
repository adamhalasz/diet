var qs = require('diet-qs')
var fs = require('fs')
var url = require('url')
var status_codes = require('http').STATUS_CODES;
module.exports = function(request, response, app, protocol, location, path, match_found, callback){
	var signal = {
		app: app,
		url: location,                                                  // pass parsed request url
		qs: qs,                                                         // pass query string parser
		query: location.query ? qs.parse(location.query) : {} ,         // parse query string
		response: response,                                             // original response
		request: request,                                               // original request
		method: request.method,                                         // GET or POST
		multipart: false,                                               // is it a multipart request?
		params: {}, data: {}, route: {}, fail: {}, errors: {},          // containers
		header : function(where, newValue){		
			if(!newValue){                                                  // not a set operation
				return response.getHeader(where) || request.headers[where]; // get header
			} else if(!response.headersSent){                               // if headers are not yet sent
				return response.setHeader(where, newValue);                 // set header
			}
		},
		headers: request.headers,	
		send:  function(message) { response.write(message); },               // send data chunk to client
		redirect: function(input, statusCode){
			if(input.substring(0, 4) === 'back') { 
				var path = request.headers.referer || '/';
			} else if(input.substring(0, 4) === 'home') { 
				var path = '/'; 
			} else {
				var path = input;
			}
			// Append Additional Routes
			if(input.split('back')[1]){ path += input.split('back')[1]; }
			if(input.split('home')[1]){ path += input.split('home')[1]; }
			var URI = url.parse(path);
			if(URI.query){ // Reconstruct the Path
				var QUERY = '?'+signal.qs.stringify(signal.qs.parse(URI.query));
				var path = '';
				if(URI.protocol) 	path += URI.protocol + '//';
				if(URI.hostname) 	path += URI.hostname;
				if(URI.port) 		path += ':' + URI.port;
				if(URI.pathname) 	path += URI.pathname;
				if(QUERY) 			path += QUERY;
			}
			signal.status((!statusCode) ? 302 : statusCode)
			signal.header('Location', path);
			response.end()
			signal.responded = true
			signal.nextRoute()
		},
		env: process.env.NODE_ENV,
		setFinalHeaders: function(data){
		    if(!response.headersSent){
		    	if(!signal.header('content-type')) signal.header('content-type', 'text/plain')
		    	if(data){
		    		var length = typeof data === 'string' ? Buffer.byteLength(data, 'utf8') : data.length ;
		    		response.setHeader('content-length', length)
		    	}
		    }
		},
		end : function(input){
			if(!signal.responded){
			    signal.responded = true
			    if(typeof input == 'object' || signal.header('x-requested-with') == 'XMLHttpRequest' || ( signal.header('authorization') && (signal.header('authorization').indexOf('Bearer') != -1 || signal.header('authorization').indexOf('Token') != -1 ))) { 
			        var data = signal.jsonString(input); // json
			        signal.setFinalHeaders(data); 
			        response.end(data)      
			        signal.nextRoute() // call next route                                                       
			    
			    } else if (app.html) {
			        signal.html(input) // html                  
			    
			    } else {
                    signal.setFinalHeaders(input); 
                    response.end(input)  // default
                    signal.nextRoute() // call next route
			    }
			}
		},
		status : function(code, message){
			signal.statusMessage = message || signal.statusMessage || status_codes[code];	
			signal.statusCode = response.statusCode = code;					
		},
		passed: true,
		error: function(field, error){
			signal.passed = signal.data.passed = false
			signal.errors[field] = error
		},
		success: function(input){                                       // respond with JSON success
			if(!signal.statusCode) signal.status(200)
			signal.header('content-type', 'application/json')
			var data = signal.data
			if(isset(input)) data = Object.merge(signal.data, input)
			data.passed = true
			signal.end(data)
		},
		failure: function(input){                                            // respond with JSON errors
			if(!signal.statusCode) signal.status(200)
			signal.header('content-type', 'application/json')
			if(signal.data.errors) signal.errors = Object.merge(signal.error, signal.data.errors)
			if(isset(input)) data = Object.merge(signal.errors, input)
			signal.end({ passed: false, errors: signal.errors })
		},
		jsonString: function(input){
		    if(isset(input)) signal.data = Object.merge(signal.data, input)
		    if(!signal.statusCode) signal.status(200)
		    signal.header('content-type', 'application/json')
		    return JSON.stringify(signal.data);
		},
		json : function(input){                                    // respond with JSON data
			signal.end(signal.jsonString(input))
		},
		html: function(input){
		    signal.header('Content-Type', 'text/html; charset=UTF-8')
		    if(!signal.statusCode) signal.status(200)
		    if(signal.htmlModule) { 
		        signal.htmlModule(input) 
		    } else { 
		        response.end(input) 
		        signal.nextRoute() // call next route
		    }
		}
	}
	
    // signal.params
	if(match_found){	
		var path_keys_length = path[0].paramKeys.length;
		for(var i = 0; i < path_keys_length; i++){
			var param = path[0].paramKeys[i];
			signal.params[param.name] = match_found[i+1];
		}
	}
	
    // signal.body
	if(path && request.headers['content-type'] || request.headers['transfer-encoding']){
		signal.body = ''
		var multipart = request.headers['content-type'] && request.headers['content-type'].toString().indexOf('multipart/form-data');
		if(multipart === -1){
			signal.multipart = false;
			request.on('data', function(data){ signal.body += data; });
			request.on('end', function(){ 
				if(request.headers['content-type'].toString().indexOf('application/x-www-form-urlencoded') != -1){
					signal.body = signal.qs.parse(signal.body);
				} else if(request.headers['content-type'] == "application/json") {
					try {
						signal.body = JSON.parse(signal.body); 
					} catch (error) {}
				}
				callback(signal); 
			});
		} else {
			signal.multipart = true;
			callback(signal);
		}
	} else {
		callback(signal);
	}
}