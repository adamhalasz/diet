var merge = require('merge')
var clone = require('clone')

module.exports = function(constructName, constructRoot, app){
    module.app = app;
    
    var constructHolder = 'construct_' + constructName;
    var constructPath = app.path + '/' + constructRoot;
    if(!app[constructHolder]) app[constructHolder] = {};
    
    if(constructName == 'model' || constructName == 'controller'){
        return function(path){
            if(!app[constructHolder][constructPath + '/' + path]) {
                app[constructHolder][constructPath + '/' + path] = require(constructPath + '/' + path);
            }
            return app[constructHolder][constructPath + '/' + path];
        }
    } else if (constructName == 'view') {
        return function(config, renderer){
            if(config == 'html'){
                app.html = true;
                app.header(function($){
                    
                    $.htmlModule = function(pathname){
                        console.log('pathname', pathname)
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