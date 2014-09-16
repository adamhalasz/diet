module.exports = require('./lib/index.js');
module.exports.server = function(){
	var server = require('./lib/index.js');
	return new server();
}