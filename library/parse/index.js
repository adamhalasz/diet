/*
	Parse Module
	- IP
	- Queries
*/

parse = {};

parse.IP = function(request){
	var ip = null;
	if(isset(request.headers['x-forwarded-for'])){
		ip = request.headers['x-forwarded-for'];
	} else {
		ip = request.connection.remoteAddress;
	}
	return ip;
}

parse.Queries = function(request){
	// Parse query string from URL into an Object
	return (isset(request.url.query)) ? query.parse(request.url.query) : {} ;
}