module.exports = require('./lib/index.js');
module.exports.server = function(location){
	var server = require('./lib/index.js');
	var app = new server();
	if(location) app.domain(location);
	return app;
}