// ===========================================================================
//  Diet.js
//  Protocol Controller
// ===========================================================================
    module.exports = function(app){
        return function(name, handler){
            app.emit('protocol.attach', { app: app, name: name, handler: handler })
            app.protocols.push({ name: name, handler: handler })
            return app;
        }
    }