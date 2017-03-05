// ===========================================================================
//  Diet.js
//  Signal Controller
// ===========================================================================
   "use strict"
   
// ===========================================================================
//  Dependencies
// ===========================================================================

    const qs = require('querystrings')
    const fs = require('fs')
    const url = require('url')
    const status_codes = require('http').STATUS_CODES;
    const utils = require('../../utils')
    const Path = require('path')
    const mime = require('mime');

// ===========================================================================
//  Exports
// ===========================================================================
    module.exports = function(request, response, app, protocol, location, path, match_found, callback){
        // ---------------------------------------------------------------------
        //  signal
        // ---------------------------------------------------------------------
    	let signal = {
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
    		setHeader: function(key, value){ return response.setHeader(key, value); },
    		removeHeader: function(key, value){ return response.removeHeader(key); },
    		getHeader: function(key){ return response.getHeader(key); },
    		getRequestHeader: function(key){ return request.headers[key] },
    		headers: request.headers,	
    		send: function(message) { response.write(message); },               // send data chunk to client
    		sendFile: function(path, encoding){
			    fs.stat(path, function(error, stat){
			    	if(error){
			    		throw error;
			    	} else {
					    response.writeHead(200, {
					        'Content-Type': mime.lookup(path),
					        'Content-Length': stat.size
					    });
					    var readStream = fs.createReadStream(path);
					    readStream.pipe(response);
					    signal.responded = true
					    signal.end()
				    }
			    })
    		},
    		download: function(path, name, encoding){
    			var filename = name ? name : Path.basename(path)
    			signal.setHeader('Content-Disposition', 'attachment; filename="'+filename+'"')
    			signal.sendFile(path, encoding)
    		},
    		redirect: function(input, statusCode, isLast){
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
    			let URI = url.parse(path);
    			if(URI.query){ // Reconstruct the Path
    				var QUERY = '?'+signal.qs.stringify(signal.qs.parse(URI.query));
    				var path = '';
    				if(URI.protocol) 	path += URI.protocol + '//';
    				if(URI.hostname) 	path += URI.hostname;
    				if(URI.port) 		path += ':' + URI.port;
    				if(URI.pathname) 	path += URI.pathname;
    				if(QUERY) {
                        if (!path.indexOf(QUERY) > -1) path += QUERY;
                    }
    			}
    			signal.status((!statusCode) ? 302 : statusCode)
    			signal.header('Location', path);
    			response.end()
    			signal.responded = true
    			if(!isLast) signal.nextRoute()
    		},
    		env: process.env.NODE_ENV,
    		setFinalHeaders: function(data){
    		    if(!response.headersSent){
    		    	if(!signal.header('content-type')) signal.header('content-type', 'text/plain')
    		    	if(data){
    		    		let length = typeof data === 'string' ? Buffer.byteLength(data, 'utf8') : data.length ;
    		    		response.setHeader('content-length', length)
    		    	}
    		    }
    		},
    		end: function(input, isLast){
    			if(!signal.responded && !signal.stopped){
    			    signal.responded = true
    			    if(input && typeof input == 'object' || signal.header('x-requested-with') == 'XMLHttpRequest' || ( signal.header('authorization') && (signal.header('authorization').indexOf('Bearer') != -1 || signal.header('authorization').indexOf('Token') != -1 ))) { 
    			        let data = signal.jsonString(input); // json
    			        signal.setFinalHeaders(data); 
    			        response.end(data)      
    			        if(!isLast) signal.nextRoute() // call next route                                                       
    			    
    			    } else if ((!input && app.html) || (input && !Path.extname(input) && app.html)) {
    			        signal.html(input) // html                  
    			    
    			    } else {
                        signal.setFinalHeaders(input); 
                        response.end(input)  // default
                        if(!isLast) signal.nextRoute() // call next route
    			    }
    			}
    			if(isLast) signal.stopped = true;
    		},
    		status : function(code, message){
    			signal.statusMessage = message || signal.statusMessage || status_codes[code];	
    			signal.statusCode = response.statusCode = code;					
    		},
    		passed: true,
    		error: function(field, error){
    			if(error){
	    			signal.passed = signal.data.passed = false
	    			signal.errors[field] = error
    			} else if (field) {
    				return signal.errors[field]
    			}
    		},
    		success: function(input, isLast){ // respond with JSON success
    			if(!signal.statusCode) signal.status(200)
    			signal.header('content-type', 'application/json')
    			var data = signal.data
    			if(utils.isset(input)) data = Object.merge(signal.data, input)
    			data.passed = true
    			signal.end(data, isLast)
    		},
    		failure: function(input, isLast){ // respond with JSON errors
    			if(!signal.statusCode) signal.status(200)
    			signal.header('content-type', 'application/json')
    			if(signal.data.errors) signal.errors = Object.merge(signal.error, signal.data.errors)
    			if(utils.isset(input)) data = Object.merge(signal.errors, input)
    			signal.end({ passed: false, errors: signal.errors }, isLast)
    		},
    		jsonString: function(input){
    		    if(utils.isset(input)) signal.data = Object.merge(signal.data, input)
    		    if(!signal.statusCode) signal.status(200)
    		    signal.header('content-type', 'application/json')
    		    return JSON.stringify(signal.data);
    		},
    		json : function(input, isLast){ // respond with JSON data
    			signal.end(signal.jsonString(input), isLast)
    		},
    		html: function(input, isLast){
    		    signal.header('content-type', 'text/html; charset=UTF-8')
    		    if(!signal.statusCode) signal.status(200)
    		    if(signal.htmlModule) { 
    		        signal.htmlModule(input) 
    		    } else { 
    		        response.end(input) 
    		        if(!isLast) signal.nextRoute() // call next route
    		    }
    		}
    	}
    	
        // ---------------------------------------------------------------------
        //  signal.params
        // ---------------------------------------------------------------------
    	if(match_found){	
    		let path_keys_length = path[0].paramKeys.length;
    		for(let i = 0; i < path_keys_length; i++){
    			let param = path[0].paramKeys[i];
    			signal.params[param.name] = match_found[i+1];
    		}
    	}
    	
    	// ---------------------------------------------------------------------
        //  signal.body
        // ---------------------------------------------------------------------
    	if(path && request.headers['content-type'] || request.headers['transfer-encoding']){
    		signal.body = ''
    		let multipart = request.headers['content-type'] && request.headers['content-type'].toString().indexOf('multipart/form-data');
    		if(multipart === -1){
    			signal.multipart = false;
    			request.on('data', function(data){ signal.body += data; });
    			request.on('end', function(){ 
    				if(request.headers['content-type'].toString().indexOf('application/x-www-form-urlencoded') != -1){
    					signal.body = signal.qs.parse(decodeURIComponent(signal.body));
    				} else if(request.headers['content-type'] == "application/json") {
    					try {
    						signal.body = JSON.parse(signal.body); 
    					} catch (error) { /*...*/ }
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
    
