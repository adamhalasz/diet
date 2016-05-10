//
// HTTP(S) Protocol
//
var Host = require('./host')

module.exports = function(app, options, callback){
    
    // create new host object
    var protocol = app.location.protocol === 'http:' ? require('http') : require('https') ;
    var host = new Host(app, protocol, app.location)
    
    // define http or https server
    if(app.location.protocol === 'http:'){
        var server = protocol.createServer(host).listen(app.port, '0.0.0.0', callback) ;
    
    } else if (options) {
        var server = protocol.createServer(options, host).listen(app.port, '0.0.0.0', callback)
    
    } else {
        throw new Error('Cannot start a HTTPS server without Options');
    }
    
    // console inititalization message
    if(!options.noMessage && !app.silent) console.log(' ... '.dim + app.location.protocol.split(':')[0].toUpperCase() + ' Server is listening on', (app.location.href || (app.location.host)).underline)
    
    return server;
}