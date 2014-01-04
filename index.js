// Dietjs Application Framework v0.2.5

// ## DESCRIPTION: 
/* ================================================================
	A stable environment for node.js to create feature rich 
	modern web applications in a clean way.
*/
// ## TODO:
/* ================================================================
	- Better Uploading Module
	- Application Monitoring Service
	- Image processing API with Imagemagick
	- WebSocket Module
	- Multi Core Support
	- better porting and cross-environment support
	- better documentation
	- mysql sanitize module	
*/
// ## VERSIONS:
/*	
	
	Version 0.2.5 - Started on 2013 Februray 20
	================================================================
		- app.dictionary introduced
		- response.head introduced
		- response.html now includes arguments from response.head as a default
		- stand alone dictionary module
		- Improved html/form module with inside labels
		- comet.onExit introduced
		- cheerio introduced for html manipulation
		
	Version 0.2.4 - Started on 2013 Junuary 23
	================================================================
		- Cross file locals introduced inside the `html` module
		- Echo is now not part of the `html` module
		- Introduced app.notFound for 404 error routing
		- Introduced auto app.www 
		- Introduced app.denie_requests
		- Introduced app.domain_redirect
		- public folder now can have any name because .html is 
			no longer requires "/public" as the public folder's name 
			instead uses the custom one specified in app.options.public
		
	Version 0.2.3 - Started on 2012 October 3
	================================================================
		- MySQL data mapping
		- MySQL is now based on the mysql.js javascript module
		- MySQL API drastically changed
		- Better form handling logic with `check` module
		- Improved overall stability
			
	Version 0.2.2 - Started on 2012 Spring
	================================================================
		- Added subdomain support with app.subdomain()
		- Better cookie set
	
	Version 0.2.1 - Started on 2012 Winter
	================================================================
	- Extension Apps with app.extend();
		Extremly useful for a site which requires additional 
		embeddable systems to improve it's customer experience, 
		for example a forum, feedback or blog system
	- Very Simple Image Processing API with ImageMagick
	
	Version 0.2 - Started on 2011 October 31
	================================================================
	- Easy HTTP/HTTPS server creation (very good)
	- Advanced Route Handling (excellent)
		- With Manual URL handling (ex: /home, /about, /work)
		- With Dynamic URL Handling (ex: /posts/9874, /user/john)
	- Static File Handler (good)
	- Advanced HTML with Node Module (very good)
		- With automatic .html to html with node integration
		- With Object Logger
		- With Advanced Error Tracking
	- Included Mysql Management (good)
	- Included Cookie Management (fairly good)
	- Included HTML Upload Module (very bad)
	- Included Async Module (fairly good)
	- Included Extension Module (ex: isset() ) (fairly good)
	
	Notes: Totally drops Express and Jade opening the gate for 
			 better customization
	
	Version 0.1 - Started on 2011 June 1 (ideology & basics)
	================================================================
	- mysql support for express
	- based on express and jade 
	*/
	// DEFINE node modules path
	node_modules = __dirname.substr(0, __dirname.length-11);
	
	// Require Dependencies
	require('./library/extensions');
	http 			= require('http');
	https 			= require('https');
	util 			= require('util');
	path			= require('path');
	fs				= require('fs');
	query			= require('querystring');
	vm				= require('vm');
	url				= require('url');
	exec			= require('child_process').exec;
	crypto 			= require('crypto');
	querystring 	= require('querystring');
	events 		 	= require('events');
	zlib 		 	= require('zlib');
	
	// Include Third Party Modules
	gravatar 		= require('gravatar');
	agent 			= require('useragent');
	OAuth			= require('oauth').OAuth; 
	nodemailer 		= require('nodemailer');
	
	// Include Diet Modules
	Upload			= require('diet-upload');
	Cookies 		= require('diet-cookies');
	Accounts		= require('diet-accounts')
	Request			= require('diet-request');
	Comet 			= require('diet-comet');
	Dictionary		= require('diet-dictionary');
	tasks			= require('diet-tasks');
	MySQLClient		= require('diet-mysql'); var MySQL; var MySQLMap;
	Use 			= require('diet-use'); use = false;
	Demand 			= require('demand');
	Next			= require('nextjs');
	SFTP			= require('secureftp');
	
	// Include Library Modules
	serial 			= require('./library/serial'); // serial() + hexid()
	Head			= require('./library/head'); 
	jsmin			= require('./library/jsmin').minify;
	webConsole		= require('./library/webConsole');
	require('./library/date');
	require('./library/parse');
	require('./library/inflection');
	//cssmin  		= require('cssmin').cssmin;
		
	exports.setup = function(options, parent){
		 var app 		= this;
		 app.options 	= options;
		 
		// ERROR handler
		if(!options.failOnError){
			process.on('uncaughtException', function(err) {
			  	if(isset(options.onError)){
			  		options.onError(err)
			  	} else {
			  		console.log(err.stack);
			  	}
			});		
		}
		
		// Request Types Registration Holder
		var all 		= false;
		var extensions  = {};
		var domains  	= {};
				
		// SET process title
		//process.title = (options.title || options.domain) + ' (node)';
		
		var serverEvents = {};
		function registerServerEvents(server){}
		
		function matchWithARegex(request, response){
			// !!! Do not use [g] operator for the regex because match can't 
			// parse it into multiple parts with [g] set [i] is enough!
			
			var domain_registry = domains[request.url.host];
			
			if(domain_registry){
				var type = domain_registry.regexes[request.method];
				
				for(var i = 0; i < type.length; i++){	
					var regex_registry = type[i];
					var check = request.url.pathname.match(regex_registry[1]);
					if(check){
						// Generate Params from Regex
						request.params = [];
						var i = 0;
						for(var i = 0; i < check.length; i++){
							try{
								request.params[i] = decodeURIComponent(check[i]);
							} catch (error) {
								request.params[i] = null;
							}
							
						}
						
						response.setHeader('Content-Type', 'text/html; charset=utf-8');
						
						if(isset(regex_registry[4])){
							var install_domain = regex_registry[4];
							request.extent 	  = regex_registry[4];
						} else {
							var mysql_options = app.options.mysql;
						}
						
						if(regex_registry[3] != -1){
							request.matchedRegexFunction = function(request, response){
								return mysql_instance(regex_registry[0], request, response, regex_registry[2], regex_registry[3], domain_registry);
							};
						} else {
							request.matchedRegexFunction = regex_registry[2];
						}
						return true;
						break;
					}
				}
			}
		}
		
		// Reverse Proxy Settings
		if(!isset(app.options.proxy)){ app.options.proxy = undefined; }
		
		// Create The Server Object
		if(!isset(app.options.https)){ 
			// Define default HTTP port
			if(!app.options.port) app.options.port = 80; 
			
			// Create Non-secure Server
			var server = http.createServer(function(request, response){
				httpHandler(request, response, 'http');
			}).listen(app.options.port, app.options.proxy);
			
			registerServerEvents(server);
	
		} else {
			// Define default HTTPS port
			if(!app.options.port) app.options.port = 443; 
			
			// Get Keys from Certificate Files
			var keys = {};
			
			// Required app.options
			keys.key  = fs.readFileSync(app.options.https.key) 
			keys.cert = fs.readFileSync(app.options.https.cert)
			
			// Optional Ca (Intermediate Certificate)
			if(isset(app.options.https.ca)){ keys.ca = fs.readFileSync(app.options.https.ca) } 
			
			// Create Secure Server
			var server = https.createServer(keys, function(request, response){
				httpHandler(request, response, 'https');
			}).listen(app.options.port, app.options.proxy);
			
			registerServerEvents(server);
		}
		
		function httpHandler(request, response, http_type){
			
			// Print Errors to Browser
			process.on('uncaughtException', function(err) { 
				response.end(
					'<!doctype html/><html><head><title>Error</title></head><body><div style="font-family:monaco; font-size:13px; line-height:18px;">'
				+		err.stack.replace(/\n/gi, '<div style=""> </div>').replace(/\s\s\s\s/gi, '<div style="margin-left:40px; float:left; height:18px; clear:both;"> </div>')
				+	'</div></body></html>');
			});
			
			// URL
			request.url = url.parse(http_type + '://' + request.headers.host + request.url);
				
			// IP
			request.ip = parse.IP(request);
			
			// Queries
			request.query = parse.Queries(request);
			
			// GET mime type from url IF it's a file request not a page request
			var mime_type = path.extname(request.url.pathname).substr(1).toLowerCase();
			
			// Render and Setup Cookies
			if(!isset(mime_type)){
				setup_cookies(request, response);
			}
			
			// Create Redirection Method
			response.redirect = function(path, statusCode){
				if(path == 'back') { path = request.headers.referer || '/'; }
				if(path == 'home') { path = '/'; }
				response.statusCode = (!statusCode) ? 303 : statusCode;
				response.setHeader('Location', path);
				response.end();
			}
			
			// Register domain from url
			var domain_registry = domains[request.url.host];
			
			// Assign Domain App Options to this Request Instance
			// mainly for responseHTML
			var domainApp = merge(app, domain_registry);	
			
			// Forms: Check & Sanitize
			request.passed		= true;
			request.errors		= {};
			
			request.cid 		= uniqid();
			
			if(isset(domain_registry)){
				domainApp 			= merge(domainApp, domain_registry.options);
				domainApp.options 	= merge(domainApp.options, domain_registry.options);
				domainApp.ect 		= domainApp.app.ect;
				request.domainApp 	= domainApp;
				request.demand 		= Demand(request, response, domainApp.app);
				if(!isset(domain_registry.all)){ 
					next() 
				} else { 
					domain_registry.all(request, response, function(){ 
						next(); 
					}); 
				}
			} else {
				app.notFoundHandler(request, response, 'domain not found');
			}
			
			
			
			function next(){
			
				if(request.method == 'OPTIONS'){ request.method = 'POST'; }
				
				// CHECK if the request is for a subdomain
				var domain_registry_match = (domain_registry) 
					? domain_registry.reg[request.method][request.url.pathname] 
					: false ;
					
				// Custom Page Handler
				if(isset(domain_registry_match)){
					domain_registry_match(request, response);
				
				// Static File Handler
				} else if(!app.options.proxy && request.method == 'GET' && isset(mimes[mime_type]) ){
				
					var path_name = request.url.pathname;
		
					if(mime_type == 'js'){ 
						path_name = path_name.substr(0, path_name.length-2) + 'client'; 
					}
					
					if(path_name.match('/:/') && extensions[extension_root]){
						var split = path_name.split('/:/');
						var extension_root = split[0].substr(1);
						var file_path = split[1];
						var file_path = extensions[extension_root].public +'/'+ file_path;
					} else {
						var file_path = (domain_registry) 
							? domains[request.url.host].options.public + path_name
							: app.options.public + path_name;
					}
					var next = new Next(2, continueProcess);
					var vars = {};
					inspectFile(file_path, function(data){ vars.data = data; next(); });
					readFile(file_path, function(stats){ vars.stats = stats; next(); });
					function continueProcess(){
						response.statusCode = 200;
						if(vars.stats && vars.data){
							var data = vars.data;
							
							var max_age = app.options.cacheTime || 604800 ;
							var since = new Date(request.headers['if-modified-since']).getTime();
							var last_modified = new Date(vars.stats.mtime).getTime();
							
							response.setHeader('Last-modified', vars.stats.mtime);
							response.setHeader('Cache-Control', 'max-age='+max_age+'');
							response.setHeader('Content-Type', mimes[mime_type]);
							
							if(mime_type == 'jpg' || mime_type == 'jpeg' || mime_type == 'png' || mime_type == 'png' || mime_type == 'ico' || mime_type == 'gif'){
								response.setHeader('Vary', 'Accept-Encoding');
								if(last_modified <= since){
									response.statusCode = 304;
									response.end();
								} else {
									response.end(data);
								}
							} else if(mime_type == 'js' || mime_type == 'css'){
								response.setHeader('Content-encoding', 'gzip');
								response.setHeader('Vary', 'Accept-Encoding');
								//response.setHeader('Accept-Encoding', 'gzip,deflate');
								//gzip(data, function(e,d){ response.end(d); });
								zlib.gzip(data, function(error, result){
									response.setHeader('Content-Length', result.length);
									response.end(result);
								});
								
							} else if(mime_type == 'html'){
								//response.setHeader('Content-encoding', 'gzip');
								var path = app.options.public.replace(app.options.path, '');
								//var data = html(path+request.url.pathname, request, response, false, app.options);
								response.setHeader('Content-Type', 'text/plain');
								response.end(fs.readFileSync(request.domainApp.path + path+request.url.pathname).toString('utf8'));
							} else {
								response.end(data);
							}
						} else {
							request.domainApp.app.notFoundHandler(request, response, 'file not found');
						}
					}
						
				// Dynamic Page Handler (regular expression) 
				} else if(matchWithARegex(request, response)) {
					response.html = new ResponseHtml(request, response, request.domainApp);

					var content_type = request.headers['content-type'];
					var multipart = (isset(content_type)) 
						? content_type.indexOf('multipart/form-data') 
						: -1 ;
					
					// NON-MULTIPART request
					if(multipart == -1){
						request.body = '';
						request.on('data', function(data){
							request.body += data;
						});
						request.on('end', function(){
							request.body = query.parse(request.body);
							if(isset(request.body.json)){
								request.body = hook(request.body, duri(JSON.parse(request.body.json)));
							}
							request.matchedRegexFunction(request, response);
						});
						
					// MULTIPART request
					} else {
						request.matchedRegexFunction(request, response);
					}
				// No Page Found
				} else {
					request.domainApp.app.notFoundHandler(request, response, 'page not found');
				}
			}
				
		}
		app.install = function(App, install_options){
			
			// CREATE use path
			App.use = new Use(install_options.path);
			App = merge(App, install_options);
			
			// SETUP domain url skeleton
			domains[install_options.domain] = {
				all: false,
				reg: {
					GET: [],
					POST: []
				},
				regexes: {
					GET: [],
					POST: []
				},
				options	: install_options,
				app		: App,
			};
			var install_domain = domains[install_options.domain];
			App.clone = function(newApp){
				domains[newApp.domain] = merge(install_domain, {});
				domains[newApp.domain].options = newApp;
			}
			
			// MYSQL
			if(isset(install_options.mysql)){
				MySQL = new MySQLClient(install_options.mysql);
				
				if(!isset(install_options.mysql.disable_map)){
					var mysql_namespace = install_options.mysql.namespace || 'mysql';
					MySQL.map(function(map){
						global[mysql_namespace] = MySQLMap = map;
						finished_mysql_mapping();
					});
				}
			} else {
				finished_mysql_mapping();
			}
			
			function finished_mysql_mapping(){
				// SETUP application dictionary
				App.dictionary = Dictionary.setup(app);
				
				// CREATE new mysql connection
				App.db = function(callback, req, res, custom_db){
					
					var db 			= custom_db || App.mysql.database;
					var request 	= req || {};
					var response 	= res || {};
					var client 		= new MySQLClient(App.mysql);
					client.connect(function(mysqlObject, error){
						// Append MySQL Error to MySQL Object
						mysqlObject.error = error;
						
						// MySQL Query Wrapper
						var wrapper = mysql_wrapper(request, response, mysqlObject, MySQLMap);
						callback(wrapper);
					}, db);
				}
				
				// Setup Accounts API
				App = Accounts(App);
				
				// START header function
				if(isset(install_options.mysql)){
					if(isset(install_options.header)) {
						install_options.header();
					};
				}
			}
			
			// Server Listeners (connection, upgrade, close etc...)	
			App.update = function(callback){ server.on('upgrade', callback); }
			
			// All - Run function on all requests
			App.all = function(callback){ domains[install_options.domain].all = callback; }
			
			// Get Module with MySQL and Head
			App.get = function(path, callback, custom_db){
				
				if(typeof path == 'string'){
					install_domain.reg.GET[path] = function(request, response){
						
						response.html = new ResponseHtml(request, response, App);
						
						mysql_instance(App, request, response, callback, custom_db, domains[request.url.host]);
					}
				} else {
					//console.log('APP GET');
					//console.log(install_options);
					install_domain.regexes.GET.push([App, path, callback, custom_db, install_domain]);
				}
			}
			
			// Get Module WITHOUT MySQL
			App.get.simple = function(path, callback){
				if(typeof path == 'string'){
					install_domain.reg.GET[path] = function(request, response){
						response.html = new ResponseHtml(request, response, App);
						callback(request, response);
					}
				} else {
					install_domain.regexes.GET.push([App, path, callback, -1, install_domain]);
				}
			}
			
			// Post Module WITH MySQL
			App.post = function(path, callback, custom_db){
				if(typeof path == 'string'){
					install_domain.reg.POST[path] = function(request, response){
						response.html = new ResponseHtml(request, response, App);
						request.body = '';
						request.on('data', function(data){
							request.body += data;
						});
						request.on('end', function(){
							request.body = query.parse(request.body);
							
							if(isset(request.body.json)){
								request.body = hook(request.body, JSON.parse(request.body.json));
							}
							mysql_instance(App, request, response, callback, custom_db, domains[request.url.host]);
						});
						
					}
				} else {
					install_domain.regexes.POST.push([App, path, callback, custom_db, install_domain]);
				}
			}
			
			// Post Module WITHOUT MySQL
			App.post.simple = function(path, callback, disableBodyParsing){
				if(typeof path == 'string'){
					install_domain.reg.POST[path] = function(request, response){
						response.html = new ResponseHtml(request, response, App);
						if(!isset(disableBodyParsing)){
							request.body = '';
							request.on('data', function(data){
								request.body += data;
							});
							request.on('end', function(){
								request.body = query.parse(request.body);
								if(isset(request.body.json)){
									request.body = hook(request.body, duri(JSON.parse(request.body.json)));
								}
								callback(request, response);
							});
						} else {
							callback(request, response);
						}
					}
				} else {
					install_domain.regexes.POST.push([App, path, callback, -1, install_domain]);
				}
			}
			
			
			App.head = function(callback){
				App.headFunction = callback;
			}
			
			if(!isset(install_options.mysql)){
				var gs 				= App.get.simple;
				var ps 				= App.post.simple;
				App.post 			= ps;
				App.post.simple 	= ps;
				App.get 		 	= gs;
				App.get.simple  	= gs;
			}
			App.notFound = function(callback){
				console.log('App.notFound');
				App.notFoundCallback = callback;
			}
			
			
			// 404 page handling
			App.notFoundHandler = function(request, response, message){
				if(isset(App.notFoundCallback) && request.domainApp){
					//
					var mime_type = path.extname(request.url.pathname).substr(1).toLowerCase();
					
					// SETUP cookies
					// this is required because static files like images don't have cookies
					if(!isset(request.cookies)){ setup_cookies(request, response) }
					
					mysql_instance(App, request, response, function(req, res, mysql){
						response.statusCode = 404;
						response.message = message;
						response.html = new ResponseHtml(req, res, App);
						App.notFoundCallback(req, res, mysql, message);
					}, false, domains[request.url.host]);
					
				} else {
					response.statusCode = 404;
					response.end(message);
				}
			}
			
			// require ect
			App.ect = require('ect')({ 
				root : install_options.public + '/', 
				ext : '.html', 
				open: '{{', 
				close: '}}', 
				watch: true 
			});
			
			App.dictionary = Dictionary.setup(App.options);
			
			// WWW redirection
			App.www = function(enable){
				if(!enable){
					// TURN www TO NON www
					var www = App.subdomain(App, { 'domain': 'www.'+App.options.domain });
					www.all(function(request, response, next){
						response.redirect('http://' + App.options.domain + request.url.path);
					});
				} else {
					// TURN NON www TO www
					var www = App.subdomain(App, { 'domain': App.options.domain.slice(4) });
					www.all(function(request, response, next){
						response.redirect('http://' + App.options.domain + request.url.path);
					});
				}
			}
			
			/*
				subdomain options:
				- domain : subdomain ex: http://custom_domain.mes.io
				- path	 : system path to the root path ex: /root/mes/
				- public : system path to the public files, ex: /root/mes/public
				- init	 : the init script, ex: server.js (optional)
				- mysql	 : mysql connection informations
			*/
			App.subdomain = function(application, domain_options){
				
				//subdomains[domain_options.domain] = domain_options;
				var custom_app = merge(application, {});
				custom_app = app.install(custom_app, domain_options);
				custom_app.spawn = function(){
					if(!domain_options.init){
						require(domain_options.path + '/server.js');
					} else {
						require(domain_options.path + '/' + domain_options.init);
					}
				};
				custom_app.options = domain_options;
				return custom_app;
			};
			
			
			
			// RETURN App Object
			return App;
		}
		app = app.install(app, options);
		
		// WebConsole
		
		if(isset(app.options.webConsole)){
			/*
			app.webConsole = webConsole(app);
			
			function NewError(event){
				
				return function(){
					if(arguments.length > 1){
						var message = '';
						for(index in arguments){ 
							if(index > 0) message += ' <span class="dash">—</span> ';
							var value = (typeof arguments[index] == 'object') ? JSON.stringify(arguments[index]) : arguments[index] ;
							message += value; 
						}
					} else {
						var message = (typeof arguments[0] == 'object') ? JSON.stringify(arguments[0]) : arguments[0];
					}
					var error = new Error(message);
					console.info('\n', app.webConsole.comet);
					
					app.webConsole.comet.push({}, {}, {}, { 
						type 		: 'message', 
						listeners	: 'home', 
						event		: event,
						message		: message,
						stack		: error.stack,
						private		: { noSubmit: true }
					});
				}
			}
			global.console.log 		= new NewError('log');
			global.console.trace 	= new NewError('trace');
			global.console.error 	= new NewError('error');
			global.console.warn 	= new NewError('warn');
			*/
		}
		
		use = new Use(options.path);
		
		
		
			
		/*
			extend_options:
			- root	 : href extension ex: http://mes.io/root_here
			- path	 : system path to the root path ex: /root/mes/
			- public : system path to the public files, ex: /root/mes/public
			- init	 : the init script, ex: server.js (optional)
			- mysql	 : mysql connection informations
		*/
		app.extend = function(application, extend_options){
			extensions[extend_options.root] = extend_options;
			return {
				spawn: function(){
					if(!extend_options.init){
						require(extend_options.path + '/server.js');
					} else {
						require(extend_options.path + '/' + extend_options.init);
					}
				},
				// Get Module with MySQL
				get: function(path, callback, custom_db){
					if(typeof path == 'string'){
						reg.GET[path] = function(request, response){
							response.html = new ResponseHtml(request, response, app);
							mysql_instance(app, request, response, callback, custom_db, extend_options);
						}
					} else {
						regexes.GET.push([path, callback, custom_db, extend_options]);
					}
				},
				
				// Post Module WITH MySQL
				post : function(path, callback, custom_db){
					if(typeof path == 'string'){
						reg.POST[path] = function(request, response){
							response.html = new ResponseHtml(request, response, app);
							request.body = '';
							request.on('data', function(data){
								request.body += data;
							});
							request.on('end', function(){
								request.body = query.parse(request.body);
								if(isset(request.body.json)){
									request.body = hook(request.body, duri(JSON.parse(request.body.json)));
								}
								mysql_instance(app, request, response, callback, custom_db, extend_options);
							});
							
						}
					} else {
						regexes.POST.push([extend_options.path + path, callback, custom_db, extend_options]);
					}
				}
			}
		}
		
		
		if(!isset(app.options.customStartMessage)){
			var proxyMessage = (isset(app.options.proxy)) ? ' with proxy on ' + app.options.proxy : '' ;
			// Send Start Message
			if(!isset(app.options.https)){ 
				console.log('Application started on port ' + app.options.port + proxyMessage);
			} else {
				console.log('(https) Application started on port ' + app.options.port + proxyMessage);
			}
		} else {
			console.log(app.options.customStartMessage);
		}
		
		app = hook(app, app.options);
		
		
		
		// IF www is inside the option.domains then 
		// redirect every NON www URLs to www URLs
		if(app.options.domain.indexOf('www') == 0){
			app.www(true);
		
		// IF www is NOT inside the option.domains then 
		// redirect every www URLs to NON www URLs
		} else {
			app.www(false);
		}
		
		// DENIE requests
		/*
			With this function you can hide your project 
			and allow only specific people to accces it.
			
			## Parameters:
			+ whitelist: Can be 3 types
				+ 'first': Grant access only for the IP of that first visited after the server started 
				+ Array: An array of IP adresses
					+ ex: ['128.0.0.1', '128.0.0.2', '128.0.0.3']
				+ IP: A single IP address in a string
					+ ex: '128.0.0.1'
			
			+ callback: function which returns:
				+ request: a Request Object
				+ response: a Response Object
				+ access_allowed: run this function if you still want to allow the client to access the page
			
		*/
		app.first_ip 	   = null;
		app.denie_requests = function(whitelist, callback){
			app.all(function(request, response, access_allowed){
				request.client = visitor(request);
				// Allow first IP
				if(whitelist == 'first'){
					if(!app.first_ip){ app.first_ip = request.ip;  }
					if(request.ip != app.first_ip){
						callback(request, response, access_allowed);
					} else {
						access_allowed();
					}
					
				// Allow multiple IP's with an array
				} else if (typeof whitelist == 'object') {
					if(!inArray(request.ip, whitelist)){
						callback(request, response, access_allowed);
					} else {
						access_allowed();
					}
					
				// Allow a single IP
				} else if (typeof whitelist == 'string') {
					if(request.ip != whitelist){
						callback(request, response, access_allowed);
					} else {
						access_allowed();
					}
					
				} else {
					throw 'Error with app.denie_requests: Whitelist should be an IP, an array of IP\'s or \'first\'. ';
				}
			});
		}
		
		app.domain_redirect = function(domain_from, domain_to){
			// CREATE subdomain instance for `domain_from` path
			var domain = app.subdomain(app, {
				path 	: '/',
				domain	: domain_from
			});
			
			// REMOVE `/` from the end of `domain_to`
			var domain_to = domain_to[domain_to.length-1] == '/' 
				? domain_to.slice(0, domain_to.length-1) : domain_to;
			
			// REDIRECT all get requests from `domain_from` to `domain_to`
			domain.get.simple(/(.+)/, function(request, response){
				response.redirect(domain_to+request.params[1]);
			});
		}
			
		// RETURN Module
		return app;
		
	};
	
	/**
		@param request http request
		@param response http response
		@param callback assynchronous callback 
		@param custom_db you can specify a custom database name, the default is what you add in the application options
		@param mysql_options a json object containing these mysql options: host, user, password, database
		@param custom_map custom mapping
	*/
	mysql_instance = function(app, request, response, callback, custom_db, install_domain, custom_map){
		var map = custom_map || MySQLMap;
		
		if(isset(install_domain.options.mysql) && MySQL){
			var db = true;
			if(isset(custom_db)){
				if(custom_db.length > 0){
					db = custom_db;
				}
			} else if(isset(install_domain.options.mysql.database)) {
				var db = install_domain.options.mysql.database;
			}
						
			// Connect to MySQL
			MySQL.connect(function(mysqlObject, error){
				
				// Append MySQL Error to MySQL Object
				mysqlObject.error = error;
				
				// MySQL Query Wrapper
				var mysql_object = mysql_wrapper(request, response, mysqlObject, map);
					//mysql_object = hook(mysql_object, MySQLMap);
				
				new Head({
					// basic
					app				: install_domain,
					headFunction	: app.headFunction,
					dictionary		: app.dictionary,
					options			: install_domain.options,
					request			: request,
					response		: response,
					mysql			: mysql_object,
					// user
					getUserBy		: install_domain.getUserBy,
					// meta
					charset			: install_domain.charset,
					title			: install_domain.title,
					description		: install_domain.description,
					keywords		: install_domain.keywords,
					author			: install_domain.author,
					// defaults
					default_home	: install_domain.default_home,
					language		: install_domain.options.language,
					callback: function(locals, echo){
						response.head = locals;
						response.echo = echo;
						callback(request, response, mysql_object);
					}
				});
				
			}, db);
		} else {
			console.trace('Warning! mysql instance was called without mysql_options in application.js');
		}
		
		
	}

	
	
	ResponseHtml = function(request, response, app){
		return function(path, locals){
			
			var htmlParserOptions = (!isset(request.extent)) ? app.options : request.extent ;
			var path = (path) ? path : 'html/index.html';
			if(!app.renderer != 'ect'){
				app.ect.render(path, response.head, function (error, html) {
					if(!isset(error)){ 
						finish(html);
					} else {
						console.log(error);
						if(isset(error.stack)){
							var regex = new RegExp(''+path+':([0-9]):([0-9])','gi');
							var m = error.stack.match(regex);
							var stack_trace = '<div id="html-error-stack"><h2>Stack trace</h2>'+error.stack+'</div>';
						} else {
							var stack_trace = '';
						}
						
						try { 
							var inScriptLine = m[0].split(':')[1]-1; 
							var lineMessage = '';
						} catch (error) { 
							var lineMessage = '';
						}
						
						if(isset(error.location)){
							var lines = ' starting at  line '+error.location.first_line + ' and ending at line '+ error.location.last_line;
						} else {
							var lines = '';
						}
						
						response.end('<!doctype html>'
								+'<html>'
								+	'<head><title>ERROR</title></head>'
								+	'<style>*{margin:0; padding:0;}'
								+	'#html-error-location{ font-family: Monaco, Helvetica Neue, Helvetica, Arial !important; width:auto !important; font-size:24px !important; background: #444 !important; padding: 10px 20px !important; border-bottom: 1px solid black !important; color: white !important; border-radius: 5px 5px 0 0 !important; text-shadow: 0 1px 1px #000 !important; word-wrap: break-word !important;}'
								+	'#html-error-message{ font-size:19px !important; background:#ffda48; padding: 10px 20px; border-radius:0 0 5px 5px; }'
								+	'#html-error-stack{ background:#FFF !important; padding: 10px 18px 20px 18px !important; border:1px solid #ccc !important; margin-top: 20px !important; border-radius: 5px !important; }'
								+	'#html-error-stack h2{ border-bottom:1px solid #ddd !important; margin-bottom:15px !important; padding-bottom:5px !important;}'
								+	'#html-error-datetime{ font-size:12px; text-transform:uppercase; margin:10px; color:#888;float:left;} '
								+	'</style>'
								+	'<body>'
								+		'<div style=" background: #FFF repeat !important; z-index: 1000000 !important; position:absolute !important; top:0 !important; bottom:0 !important; left:0 !important; right:0 !important; font-family: Monaco, Helvetica Neue, Helvetica, Arial !important; font-size:16px !important; padding:40px !important;  ">'
								+			'<h1 id="html-error-location">Error in '+path + ' '+ lineMessage + '</h1>'
								+			'<h2 id="html-error-message">'+error.message+lines+'</h2>'
								+			stack_trace
								+ 			'<div id="html-error-datetime"> Node error in HTML - '+new Date()+'</div>'
								+		'</div>'
								+	'</body>'
								+'</html>');
				    }
				});
			} else {
				app.renderer(path, request, response, locals, htmlParserOptions, finish);
			}
			
			function finish(data){
				response.setHeader('Content-encoding', 'gzip');
				response.setHeader('Content-Type', 'text/html; charset=utf-8');
				zlib.gzip(data, function(error, result){
					response.setHeader('Content-Length', result.length);
					response.end(result);
				});
			}
		}
	};
	
	// SETUP cookies with sid(session id)
	setup_cookies = function(request, response){
		var cookies 		= Cookies(request, response);
		request.cookies 	= cookies[0];
		response.cookies 	= cookies[1];
		
		// SET session id
		if(!isset(request.cookies.sid)){
			response.cookies.set('sid', uniqid(), {
				time		: [365,0,0],
				httpOnly	: true,
				path		: '/'
			});
		}
	}
	
	function inspectFile(file_path, callback){
		fs.readFile(file_path, function(error, data){
			if(error){ data = 0 }
			callback(data);
		});
	}
	
	function readFile(file_path, callback){
		fs.stat(file_path, function(error, stats){
			if(error){ stats = 0 }
			callback(stats);
		});
	}
	
	// Mime database
	mimes = {
	  "3gp": "video/3gpp",
	  a: "application/octet-stream",
	  ai: "application/postscript",
	  aif: "audio/x-aiff",
	  aiff: "audio/x-aiff",
	  asc: "application/pgp-signature",
	  asf: "video/x-ms-asf",
	  asm: "text/x-asm",
	  asx: "video/x-ms-asf",
	  atom: "application/atom+xml",
	  au: "audio/basic",
	  avi: "video/x-msvideo",
	  bat: "application/x-msdownload",
	  bin: "application/octet-stream",
	  bmp: "image/bmp",
	  bz2: "application/x-bzip2",
	  c: "text/x-c",
	  cab: "application/vnd.ms-cab-compressed",
	  cc: "text/x-c",
	  chm: "application/vnd.ms-htmlhelp",
	  "class": "application/octet-stream",
	  com: "application/x-msdownload",
	  conf: "text/plain",
	  cpp: "text/x-c",
	  crt: "application/x-x509-ca-cert",
	  css: "text/css",
	  csv: "text/csv",
	  cxx: "text/x-c",
	  deb: "application/x-debian-package",
	  der: "application/x-x509-ca-cert",
	  diff: "text/x-diff",
	  djv: "image/vnd.djvu",
	  djvu: "image/vnd.djvu",
	  dll: "application/x-msdownload",
	  dmg: "application/octet-stream",
	  doc: "application/msword",
	  dot: "application/msword",
	  dtd: "application/xml-dtd",
	  dvi: "application/x-dvi",
	  ear: "application/java-archive",
	  eml: "message/rfc822",
	  eps: "application/postscript",
	  exe: "application/x-msdownload",
	  f: "text/x-fortran",
	  f77: "text/x-fortran",
	  f90: "text/x-fortran",
	  flv: "video/x-flv",
	  "for": "text/x-fortran",
	  gem: "application/octet-stream",
	  gemspec: "text/x-script.ruby",
	  gif: "image/gif",
	  gz: "application/x-gzip",
	  h: "text/x-c",
	  hh: "text/x-c",
	  htm: "text/html",
	  html: "text/html",
	  ico: "image/vnd.microsoft.icon",
	  ics: "text/calendar",
	  ifb: "text/calendar",
	  iso: "application/octet-stream",
	  jar: "application/java-archive",
	  java: "text/x-java-source",
	  jnlp: "application/x-java-jnlp-file",
	  jpeg: "image/jpeg",
	  jpg: "image/jpeg",
	  js: "application/javascript",
	  json: "application/json",
	  less: "text/css",
	  log: "text/plain",
	  m3u: "audio/x-mpegurl",
	  m4v: "video/mp4",
	  man: "text/troff",
	  manifest: "text/cache-manifest",
	  markdown: "text/markdown",
	  mathml: "application/mathml+xml",
	  mbox: "application/mbox",
	  mdoc: "text/troff",
	  md: "text/markdown",
	  me: "text/troff",
	  mid: "audio/midi",
	  midi: "audio/midi",
	  mime: "message/rfc822",
	  mml: "application/mathml+xml",
	  mng: "video/x-mng",
	  mov: "video/quicktime",
	  mp3: "audio/mpeg",
	  mp4: "video/mp4",
	  mp4v: "video/mp4",
	  mpeg: "video/mpeg",
	  mpg: "video/mpeg",
	  ms: "text/troff",
	  msi: "application/x-msdownload",
	  odp: "application/vnd.oasis.opendocument.presentation",
	  ods: "application/vnd.oasis.opendocument.spreadsheet",
	  odt: "application/vnd.oasis.opendocument.text",
	  ogg: "application/ogg",
	  p: "text/x-pascal",
	  pas: "text/x-pascal",
	  pbm: "image/x-portable-bitmap",
	  pdf: "application/pdf",
	  pem: "application/x-x509-ca-cert",
	  pgm: "image/x-portable-graymap",
	  pgp: "application/pgp-encrypted",
	  pkg: "application/octet-stream",
	  pl: "text/x-script.perl",
	  pm: "text/x-script.perl-module",
	  png: "image/png",
	  pnm: "image/x-portable-anymap",
	  ppm: "image/x-portable-pixmap",
	  pps: "application/vnd.ms-powerpoint",
	  ppt: "application/vnd.ms-powerpoint",
	  ps: "application/postscript",
	  psd: "image/vnd.adobe.photoshop",
	  py: "text/x-script.python",
	  qt: "video/quicktime",
	  ra: "audio/x-pn-realaudio",
	  rake: "text/x-script.ruby",
	  ram: "audio/x-pn-realaudio",
	  rar: "application/x-rar-compressed",
	  rb: "text/x-script.ruby",
	  rdf: "application/rdf+xml",
	  roff: "text/troff",
	  rpm: "application/x-redhat-package-manager",
	  rss: "application/rss+xml",
	  rtf: "application/rtf",
	  ru: "text/x-script.ruby",
	  s: "text/x-asm",
	  sgm: "text/sgml",
	  sgml: "text/sgml",
	  sh: "application/x-sh",
	  sig: "application/pgp-signature",
	  snd: "audio/basic",
	  so: "application/octet-stream",
	  svg: "image/svg+xml",
	  svgz: "image/svg+xml",
	  swf: "application/x-shockwave-flash",
	  t: "text/troff",
	  tar: "application/x-tar",
	  tbz: "application/x-bzip-compressed-tar",
	  tci: "application/x-topcloud",
	  tcl: "application/x-tcl",
	  tex: "application/x-tex",
	  texi: "application/x-texinfo",
	  texinfo: "application/x-texinfo",
	  text: "text/plain",
	  tif: "image/tiff",
	  tiff: "image/tiff",
	  torrent: "application/x-bittorrent",
	  tr: "text/troff",
	  ttf: "application/x-font-ttf",
	  txt: "text/plain",
	  vcf: "text/x-vcard",
	  vcs: "text/x-vcalendar",
	  vrml: "model/vrml",
	  war   : "application/java-archive",
	  wav   : "audio/x-wav",
	  webm: "video/webm",
	  woff: "application/x-font-woff",
	  wma: "audio/x-ms-wma",
	  wmv: "video/x-ms-wmv",
	  wmx: "video/x-ms-wmx",
	  wrl: "model/vrml",
	  wsdl: "application/wsdl+xml",
	  xbm: "image/x-xbitmap",
	  xhtml: "application/xhtml+xml",
	  xls: "application/vnd.ms-excel",
	  xml: "application/xml",
	  xpm: "image/x-xpixmap",
	  map: "text/plain",
	  xsl: "application/xml",
	  xslt: "application/xslt+xml",
	  yaml: "text/yaml",
	  yml: "text/yaml",
	  zip: "application/zip"
	};
	
	//} MULTI CORE END
	
	
	