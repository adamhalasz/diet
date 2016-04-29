// ===========================================================================
//  Diet.js
//  Construct Controller
// ===========================================================================
  
// ===========================================================================
//  Dependencies
// ===========================================================================

    var merge = require('merge')
    var clone = require('clone')
    require('object.observe')
    
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
                if(handler){
                    return app.controller[change.name];
                } else {
                    if(!app[constructHolder][constructPath + '/' + name]) {
                        app[constructHolder][constructPath + '/' + name] = require(constructPath + '/' + name);
                    }
                    return app[constructHolder][constructPath + '/' + name];
                }
            }
            
            // Observe changes on the Controller Object
            Object.observe(Controller, function(changes){
                changes.forEach(function(change){
                    if(change.type == 'add'){
                    
                        // Create a Thunk Around the Function
                        var originalFunction = app.controller[change.name];
                        app.controller[change.name] = function(){
                            //console.log('In Controller', change.name, arguments.callee.name)
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
                    }
                })
            })
            
            return Controller;
            
        } else if (constructName == 'view') {
            return function(config, renderer){
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
            }
        }
    }
    
