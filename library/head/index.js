/* 
	HEAD.js
	
	Arguments:
	- default_home	: default home page name (home)
	- language		: default language (english)
	
	- charset		: default charset (utf8)
	- author		: default author (null)
	- title			: default title (null)
	- description	: default description (null)
	- keywords		: default keywords (null)
	
	- request		: http request (required)
	- response		: http response (required)
	- mysql			: mysql object (required)
	
	- callback		: returns `locals` and `echo`
*/

module.exports = function(options){
	var dictionary  = options.dictionary || {};
	var cookies		= options.request.cookies || {};
	var requester 	= visitor(options.request);
	
	var locals = {
		// meta
		author		: options.author 		|| '',
		title		: options.title 		|| '',
		description	: options.description 	|| '',
		keywords	: options.keywords 		|| '',
		charset		: options.charset 		|| '',
		languages	: dictionary.languages 	|| [],
		
		// pages
		page		: options.default_home 	|| 'home',
		subpage		: '',
		
		// user 
		language 	: cookies.language 		|| options.language || 'english',
		getUserBy	: options.getUserBy 	|| 'session',
		getUserFrom	: options.getUserFrom 	|| 'users',
		getUserWith	: options.getUserWith 	|| function(){ return cookies.id },
		userCookie	: options.userCookie 	|| 'id',
		
		// client
		client 		: requester,
		
		// mysc
		cid			: options.request.cid,
		url			: options.request.url,
		cookies		: options.request.cookies,
		query		: options.request.query,
		ip			: options.request.ip,
		body		: options.request.body || {},
	};
	
	if(isset(options.headFunction)){
		var originalCallback = options.callback;
		options.callback = function(){
			options.headFunction(options, locals, locals.echo, function(locals){
				locals = merge(global, locals);
				originalCallback(locals, locals.echo);
			});
		}
	}
	
	// Default Anonymous User
	locals.user = requester;
	locals.account = false;
	
	// DICTIONARY printer
	if(isset(dictionary.length)){
		locals.echo = dictionary.echo(locals.language);
	} else {
		locals.echo = function(s) { return s; }
	}
	
	// ADD more options to the local html scope
	locals.add = function(new_object){
	    for(index in new_object){ 
	    	this[index] = new_object[index]; 
	    }
	}
	
	// LOGGED IN && mysql set
	if(isset(cookies[locals.userCookie]) && options.mysql){
		options.mysql[locals.getUserFrom].get(
			locals.getUserBy, 
			locals.getUserWith(options.request, options.response), 
		function(account, onerror){
			onerror();
			
			// RESOLVE user
			if(isset(account)){
				locals.account = new User(account[0]);
				options.callback(locals, locals.echo);

			// RESOLVE language
			} else if(!isset(locals.language) && !isset(account[0]) && options.mysql){
				
				languageByCountryCode(options.mysql, locals.countryCode, function(language){
					locals.language = language;
					locals.echo = dictionary.echo(locals.language);
					options.callback(locals, locals.echo);
				});
			} else if (!isset(account[0])) {
				options.callback(locals, locals.echo);
			}
		});
		
	// LOGGED OUT && mysql set
	} else if (options.mysql) {
		// RESOLVE language
		if(isset(locals.language)){
			options.callback(locals, locals.echo);
		} else if (options.mysql) {
			languageByCountryCode(options.mysql, locals.countryCode, function(language){
				locals.language = language;
				locals.echo = dictionary.echo(locals.language);
				options.callback(locals, locals.echo);
			});
		}
	} else {
		locals.language = 'english';
		options.callback(locals, locals.echo);
	}
}

User = function(user, full){
	// CONSTRUCT full name from first and last name
	user.full_name = user.first_name + ' ' + user.last_name;
	
	
	// GET avatar from db or gravatar
	/*var avatar = user.avatar;
	user.avatar = function(size, type){
		var size = isset(size) ? size : 50;
		var type = isset(type) ? type : 'identicon';
		if(isset(avatar)){
			var output = avatar;
			user.gravatar = false;
		} else {
			user.gravatar = true;
			var output = get_gravatar(user.email, size, type).replace(/&/gi, '&amp;');
		}
		
		return output;
	}*/
	
	// DELETE sensitive information
	if(!isset(full)){
		delete user.password;
		delete user.session;
	}
	return user;
}

get_gravatar = function(text, size, d) {
	return gravatar.url(text, {s: size, r: 'pg', d: d});
}

// GET LANGUAGE from CountryCode
languageByCountryCode = function(mysql, countryCode, callback){
	var countryCode = countryCode ? countryCode : 'US';
	// Select Country Row
	mysql('SELECT Code FROM world.Country WHERE code2 = \'' + countryCode + '\' LIMIT 1',
	function(country_rows, on_country_error, columns){
	 	// GET country name
	 	on_country_error('Errors at getCurrentLanguage getting the country');
	 	var country = country_rows[0];
		
		// SELECT Language Row from Country
		mysql('SELECT Language, isOfficial, Percentage FROM world.CountryLanguage WHERE countryCode = \'' + country.Code + '\' ORDER BY Percentage DESC',
		function(lang_rows, on_lang_error, columns){
			on_lang_error('Errors at getCurrentLanguage getting the language');
			callback(lang_rows[0].Language.toLowerCase());
		});
	});
};