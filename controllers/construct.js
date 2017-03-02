// ===========================================================================
//  Diet.js
//  Construct Controller
// ===========================================================================
  
// ===========================================================================
//  Dependencies
// ===========================================================================

    var merge = require('merge')
    var clone = require('clone')
    
// ===========================================================================
//  Exports
// ===========================================================================

    module.exports = function(constructName, constructRoot, app){
        module.app = app;
        
        var constructHolder = 'construct_' + constructName;
        var constructPath = app.path + '/' + constructRoot;
        if(!app[constructHolder]) app[constructHolder] = {};
        
        if(constructName == 'model'){
            function Model(name){
                if(!app[constructHolder][constructPath + '/' + name]) {
                    app[constructHolder][constructPath + '/' + name] = require(constructPath + '/' + name);
                }
                return app[constructHolder][constructPath + '/' + name];
            } 
            return Model;
            
        } else if(constructName == 'controller'){
        
            function Controller(name, handler){
                if(!handler){
                    if(!app[constructHolder][constructPath + '/' + name]) {
                        app[constructHolder][constructPath + '/' + name] = require(constructPath + '/' + name);
                    }
                    return app[constructHolder][constructPath + '/' + name];
                }
            }
            
            // Register a Proxy Setter/Getter to create Thunks dynamically around Controller Methods
            var ControllerProxy = new Proxy(Controller, {
                get: function(target, name) {
                    return target[name];
                },
                set: function(target, name, originalFunction) {
                    
                    if(typeof originalFunction == 'function'){
	                    // Create a Thunk Around the Function
	                    target[name] = function ControllerThunk(){
	                        var args = [];
	                        for(var i = 0; i < arguments.length; i++) args[i] = arguments[i]
	                        if(typeof args[args.length-1] == 'function'){
	                            originalFunction.apply(this, args)
	                        } else {
	                            return function(callback){
	                                
	                                args[args.length] = callback;
	                                //console.log('CONTROLLER CALL: ARGUMENTS -> ', args)
	                                //console.log('CONTROLLER CALL: CALLBACK -> ', callback)
	                                //console.log('CONTROLLER CALL: HANDLER ->', originalFunction.toString());
	                                originalFunction.apply(this, args)
	                            }
	                        }
	                    };
                    } else {
                    	target[name] = originalFunction
                    }
                    return target[name];
                }
            });
            
            return ControllerProxy;
            
        } else if (constructName == 'view') {
            return function(config, renderer){
            	if(renderer){
	                if(config == 'html'){
	                    app.html = true;
	                    app.header(function($){
	                        $.htmlModule = function(pathname){
	                            if(!pathname || (pathname && pathname.indexOf(/\n|\r/) != -1)){
	                        		var path     = pathname ? pathname : 'index.html' 
	                        		var context  = merge(clone($, false, 1), $.data)
	                        		var html     = renderer(path, context)
	                        		$.response.end(html)
	                        	} else if (pathname) {
	                        	    $.response.end(pathname)
	                        	}
	                        	
	                        	$.nextRoute() // call next route
	                        }
	                        $.return()
	                    })
	                } else if (config == 'file' || config == 'files' || config == 'static') {
	                    app.footer(renderer)
	                }
                } else {
     			    if(!app[constructHolder][constructPath + '/' + config]) {
     			        app[constructHolder][constructPath + '/' + config] = require(constructPath + '/' + config);
     			    }
     			    return app[constructHolder][constructPath + '/' + config];
         			
                }
            }
        }
    }
    
