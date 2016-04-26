// ===========================================================================
//  Diet.js
//  Router Controller
// ===========================================================================
   "use strict"
   
// ===========================================================================
//  Dependencies
// ===========================================================================
    
    const errorPage    = require('./error')
    const Next         = require('nextjs')
    const pathToRegex  = require('path-to-regexp')
    const Domain       = require('domain')
    const async        = require('async')
    const parent       = module.parent.exports
    var Generator      = (function*(){}).constructor;

// ===========================================================================
//  Exports
// ===========================================================================

    module.exports = function(method, type, app){
    	return function(path){
    		
    		var args = arguments;
    		var argsLength = args.length > 1 ? args.length : 1 ;
    		
    		if((type === 'method') && typeof path == 'string'){
    			var keys = [];
    			var regex = pathToRegex(path, keys);
    		}	
    		
    		var route = {
    			path: path,
    			paramKeys: keys || false,
    			paramRegex: regex || false,
    			handler: function(request, response, app, nextRoute, signal){
    				
    				var next = new Next(argsLength, function(){
    					
    					app.emit('route.end', { method: method, path: path, route: route, app: app, type: type, signal: signal });
    					
    					signal.nextRoute();
    				})
    				var count = 0;
    				
    				app.emit('route.start', { method: method, path: path, route: route, app: app, type: type, signal: signal });
    				
    				(function nextController(){
    					// console.log('\n## controller', 'count=', count, '| argsLength=',argsLength)
    					
    					if(count <= argsLength){
    					    
    						var controller = args[count];
    						
    						app.emit('route.controller.start', { method: method, path: path, route: route, app: app, type: type, controller: controller, signal: signal, current: count, total: argsLength})
    						
    						if(typeof controller == 'function'){
    						
    							// console.log(' --> controller [ STARTED ]')
    							signal.return = function(){ 
    							    app.emit('route.controller.end', { method: method, path: path, route: route, app: app, type: type, signal: signal });
    							    
    								// console.log(' --> controller [ RETURNED ]')
    								count++; nextController(); next();
    								//signal.nextRoute();
    							}
    							
    							var domain = Domain.create();
    							
    							domain.on('error', function(error){ 
    							    if (error.stack) console.error(error.stack);
    								
    								signal.fail.route = route;
    								signal.fail.error = error;
    								signal.fail.controller = controller;
    								
    								app.emit('route.controller.error', { method: method, path: path, route: route, app: app, type: type, controller: controller, error: error, signal: signal })
    								
    								errorPage(error, signal, app, controller);
    							});
    							
    							domain.run(function(){
    							    
    							    // If the controller is a Generator
    							    if(controller instanceof Generator){
    							        
    							        // Create Iterator 
    							        var iterator = controller(signal);
    							        
    							        // Resurscive Iterator
    							        (function nextIteration(error, value){
    							            // Get the next Iteration
    							            var result = iterator.next(value);
    							            
    							            app.emit('route.controller.iterate.start', { method: method, path: path, route: route, app: app, type: type, controller: controller, signal: signal, result: result})
    							            
    							            // If iterator is not finishd
    							            if(!result.done){
    							                // function
    							                if(typeof result.value == 'function'){
                                                    result.value(nextIteration)
                                                    
                                                // array of functions
                                                } else if (typeof result.value == 'object') {
                                                    async.each(result.value, function(item, callback){
                                                        item(function(error, result){ 
                                                            callback({ error: error, result: result })
                                                        });
                                                    }, function(values){
                                                        nextIteration(values.error, values.result);
                                                    })
                                                    
                                                // unknown type
                                                } else {
                                                    nextIteration(error, value);
                                                }
                                            
                                            // Call next controller
    							            } else {
    							                app.emit('route.controller.iterate.end', { method: method, path: path, route: route, app: app, type: type, controller: controller, signal: signal})
    							                //count++; 
    							                //nextController(); 
    							            }
    							        })()
    							        
    							    // Run Simple Function 
    							    } else {
    								    controller(signal)
    								}
    							})
    						} else {
    						    app.emit('route.controller.skip', { method: method, path: path, route: route, app: app, type: type, controller: controller, signal: signal })
    							// console.log(' --> controller [ SKIP ]', controller)
    							count++; nextController(); next();
    						}
    					} else {
    					    app.emit('route.controller.end', { method: method, path: path, route: route, app: app, type: type, signal: signal })
    					    //count++;// next();
    						// console.log('--> controller DONE!')
    					}
    				})()
    			}
    		}
    		
    		if(!app.routes) app.routes = {}
    		if(!app.routes[method]) app.routes[method] = [];
    		
    		if(type === 'method'){
    		
    			var pathRegister = (!isNaN(path)) ? path+'_status' : path
    			if(!app.routes[method][pathRegister]) app.routes[method][pathRegister] = [];
    			app.routes[method][pathRegister].push(route)
    		
    		} else {
    		
    			app.routes[method].push(route)
    		
    		}
    		
    		app.emit('route.attach', { method: method, path: path, route: route, type: type })
    		
    		return app;
    	}
    	
    	return app;
    }
    
