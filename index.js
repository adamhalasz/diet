var platform = module.platform = process.platform;
console.log(module.platform);

module.exports = require('./lib/index.js');

module.exports.server = function(location){
	console.log(platform);
	var server = require('./lib/index.js');
	var app = new server({ platform: platform });
	if(location) app.domain(location);
	return app;
}