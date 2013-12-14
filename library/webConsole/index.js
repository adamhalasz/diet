module.exports = function(app){
	console.log('webconsole');
	var webConsole = app.subdomain(app, { 
		domain		: 'console.' + app.options.domain,
		port		: 80,
		path		: __dirname,
		renderer	: 'ect',
		public		: __dirname + '/resources',
		mysql		: merge(app.mysql, {database: 'webConsole'}),
	});
	
	webConsole.get.simple('/', function(request, response){
		response.html('index.html');
	});
	
	// COMET
	webConsole.comet = new Comet({
	    app      : webConsole,
	    database : 'webConsole',
	    id       : function(request, response){ return request.sid; },
	    sender   : function(request, mysql, callback){ 
	    	callback(request.sid);
	    }
	});
	
	// COLLECT Listeners
	webConsole.comet.listener('user', function(request, package, mysql, options, end){
		end(request.sid, options);
	});
	webConsole.comet.listener('home', function(request, package, mysql, options, end){
		end(package.listener, options);
	});
	
	// Message event
	var message        = webConsole.comet.action('message');
	message.onSubmit   = function(mysql, request, response, package, private, listener, end){
	    mysql.messages.save({
	    	hostname	: request.url.hostname, 
	    	message		: package.message,
	    	time		: new Date().getTime(),
	    }, function(rows, onerror, id){
	    	package.id = id;
	    	end();
	    });
	}
	message.onEmit     = function(package, request, response, mysql){
		response.end(JSON.stringify(package));
		mysql.end();
	}
	
	return webConsole;
}