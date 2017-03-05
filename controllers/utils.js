var url = require('url')
var Utils = new Object()

Utils.isset = function isset(object){
	return (object != "undefined" && object != undefined && object != null && object != "" && typeof(object) != 'undefined') ? true : false ;
}

Utils.getHost = function(inputLocation, options){
	var options = !options || typeof options == 'function' ? {} : options ;
	var protocolName = (typeof options == 'object' && options.cert || options.key || options.ca) ? 'https' : 'http' ;

	// define location
	if(!isNaN(inputLocation)) {
		var location = url.parse(protocolName+'://0.0.0.0:'+inputLocation);
	
	} else if(typeof inputLocation == 'string') {
	    var location = inputLocation.indexOf('://') == -1 ? 'http://' + inputLocation : inputLocation ;
			location = url.parse(location) 
	
	} else if(typeof inputLocation == 'object') {
		var location = inputLocation;
		
	} else if(!Utils.isset(inputLocation)){
		var location = url.parse(protocolName+'://0.0.0.0:80/');
	}
	
	var port = location.protocol === 'http:' && (!options || (!options.cert && !options.key)) 
		? (location.port || 80) 
		: (location.port || 443) ;
	
	return { port: port, location: location }
}

module.exports = Utils