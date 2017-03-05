// ===========================================================================
//                                   Diet
// ===========================================================================

// ===========================================================================
//  External Dependencies
// ===========================================================================

    require('sugar')
    require('colors')
    const util = require('util');
    const EventEmitter = require('eventemitter2').EventEmitter2;
    
    
// ===========================================================================
//  Internal Dependencies
// ===========================================================================    
    
    const Protocol     = require('./controllers/protocol')
    const Listener     = require('./controllers/listen')
    const Host         = require('./controllers/host')
    const Router       = require('./controllers/router')
    const Resource     = require('./controllers/resource')
    const Construct    = require('./controllers/construct')
    const httpProtocol = require('./controllers/protocols/http')


// ===========================================================================
//  Exports
// =========================================================================== 

    var events = new EventEmitter({ wildcards: true });
    module.exports = Server;
    module.exports.on = events.on;
    module.exports.one = events.once;
    module.exports.many = events.many;
    module.exports.off = events.off;
    module.exports.emit = events.emit;
    module.exports.onAny = events.onAny;


// ===========================================================================
//  Server
// =========================================================================== 

    function Server(options){
 
        // -----------------------------------------------------------------------
        //  Default values
        // -----------------------------------------------------------------------
 
            var options = options || {}

        // -----------------------------------------------------------------------
        //  Get project path
        // -----------------------------------------------------------------------
 
            var path = options.path || require('path').dirname(require('callsite')()[1].getFileName());
 
        // -----------------------------------------------------------------------
        //  Event: app.create
        // -----------------------------------------------------------------------
 
            module.exports.emit('init', { path: path, options: options })

 
        // -----------------------------------------------------------------------
        //  Print Diet Header to console (if not already initialized)
        // -----------------------------------------------------------------------
 
            if(!options.silent && !initialized){ 
                process.stdout.write('\u001B[2J\u001B[0;0f'+' Diet '.inverse+(' ('+JSON.parse(require('fs').readFileSync(__dirname+'/package.json').toString()).version+') ☺\n http://dietjs.com/').dim+'\n\n'); 
                initialized = true; 
            }
        
        
        // -----------------------------------------------------------------------
        // Return a Server Instance
        // -----------------------------------------------------------------------
    	    
    	    var app = new App(path, options)
    	
    	
    	// -----------------------------------------------------------------------
    	//  Server is an Event Emitter
    	// -----------------------------------------------------------------------
        	
        	var events = new EventEmitter({ wildcards: true });
        	app.on = events.on;
        	app.one = events.once;
        	app.many = events.many;
        	app.off = events.off;
        	app.emit = events.emit;
        	app.onAny = events.onAny;
        
        
        // -----------------------------------------------------------------------
        //  Attach HTTP Protocol Handler by default
        // -----------------------------------------------------------------------	
        	app.protocol('http', httpProtocol)
        	module.exports.emit('create', { path: path, options: options, app: app })
    	
    	
    	// -----------------------------------------------------------------------
    	//  Return
    	// -----------------------------------------------------------------------
    	    
    	    return app;
    	    
    	    
    }
    

// ===========================================================================
//  Containers & Helpers
// ===========================================================================
    
    const hosts     = {}
    const servers   = {}
    var initialized = false;


// ===========================================================================
//  App
// ===========================================================================   
    
    function App(path, options){
    
        // -----------------------------------------------------------------------
        //  Variables
        // -----------------------------------------------------------------------
            
            this.silent         = options.silent
            this.defaultHeaders = options.defaultHeaders || { 'X-Powered-By': 'Diet.js', 'Server': 'Diet.js' } // please help spread the word!
            this.address        = require('ip').address()
        	this.path           = path
        	this.dir            = this.path.match(/([^\/]*)\/*$/)[1]
        	this.hosts          = hosts
        	this.protocols      = new Array();
        	//this.host           = '0.0.0.0'
        	
    	
    	// -----------------------------------------------------------------------
    	//  Methods
    	// -----------------------------------------------------------------------
        	
        	this.get            = new Router('get'     , 'method' , this)
        	this.post           = new Router('post'    , 'method' , this)  
        	this.head           = new Router('head'    , 'method' , this)  
        	this.put            = new Router('put'     , 'method' , this)  
        	this.delete         = new Router('delete'  , 'method' , this) 
        	this.patch          = new Router('patch'   , 'method' , this)
        	this.trace          = new Router('trace'   , 'method' , this)
        	this.options        = new Router('options' , 'method' , this)
        	this.header         = new Router('header'  , 'api'    , this)
        	this.footer         = new Router('footer'  , 'api'    , this) 
        	this.missing        = new Router('missing' , 'api'    , this) 
        	this.error          = new Router('error'   , 'api'    , this)
        	this.resource       = new Resource(this)
        	this.model          = new Construct('model', 'models', this)
        	this.view           = new Construct('view', 'views', this)
        	this.controller     = new Construct('controller', 'controllers', this)
        	this.protocol       = new Protocol(this)
        	this.listen         = new Listener(this, servers)
        	this.host           = new Host(this, servers)
    	
    	
    	// -----------------------------------------------------------------------
    	//  Return Instance
    	// -----------------------------------------------------------------------
    	    
    	    return this
    	    
    }

