// ===========================================================================
//  Diet.js
//  Resource Controller
// ===========================================================================
    module.exports = function(app){
        return function Resource(path){
            const resource = Object.assign({}, app);
            app.emit('resource.init', { app: app, path: path, resource: resource })
            for(method in app.routes) registerMethod(path, app, resource, method);
            return resource;
        }
    }
    
    function registerMethod(path, app, resource, method){
    	resource[method] = function AddResourceMethod(){
    		app.emit('resource.add_method', { app: app, path: path, method: method, resource: resource })
    		var args = Array.prototype.slice.call(arguments);
    		args.unshift(path)
    		app[method].apply(this, args)
    		return resource
    	}
    }