## v0.9.2 - 2015 February
- Support for `options`, `put`, `head`, `patch`, `trace` and `delete` HTTP methods
- Added `app.put`
- Added `app.head`
- Added `app.patch`
- Added `app.delete`
- Added `app.trace`
- Added `app.options`
- Fixed body parsing mechanism. Every route's body is parsed that has a Content-Type or Transfer-Encoding Header. According to rfc2616-sec4


## v0.9.1 - 2014 December - Security Patch
- 100% Unit Test Coverage
- Build coverage with TravisCI
- Fixed a bug that didn't allow to create https server with other ports than 80

## v0.9.0 - 2014 December - Major Release
- Completely rewritten source code
- New website with better documentation
- Dropped the `plugin system`
- Introduced `middleware`
- Introduced `app.error` for error handling
- Introduced `app.missing` for not found pages
- Introduced `app.header` for global middleware at the beginning of routes
- Introduced `app.footer` for global middleware at the end of routes
- `app.failure` replaced `app.error`
- Changed app.error to record errors instead of ending the response
- Fixed many bugs

## v0.8.6 - 2014 October
- Fixed a bug that caused starting an HTTPS server in failure with port 80

## v0.8.5 - 2014 September
- Better Docs

## v0.8.4 - 2014 September
- support for safe asynchronous error handling. replaced try catch with domains
- setting `signal.passed` to false also stops the plugin chain just as `signal.data.passed`

## v0.8.3 - 2014 September
- fixed a bug in the chain. when `signal.data.passed` is `false` and `$.end()` is called the chain stops and other listeners on the same route will not be called.
- calling `$.error()` from now on sets `$.passed` to `false`

## v0.8.2 - 2014 September
- updated `readme`


## v0.8.1 - 2014 September
- added `app.server`
- cleaned up unnecessary `console.logs`


## v0.8.0 - 2014 September - **Major Release**
- Unit Test Coverage 100%
- Deprecated `new App` now `require('diet')` returns a server object
- Replaced the `querystring` module with the new `diet-qs`
- Added new signal method `$.send` to appending to the response message 
- Added new signal method `$.chain` to allow adding plugins to the plugin chain on the fly.
- Added chainable commands like `require('diet').server().start().get('/')`
- Changed the Plugin framework
	- Removed `module.exports.onload` listener
	- Added `module.parent.return()` instead
	- Added `module.parent.options` to access the plugin options
	- Added `module.parent.app` to access the calling application
- Extended documentation
- Added `examples`
- Fixed every known bug

## v0.7.x - 2014 August
- Started Unit Testing
- Fixed several bugs
- Better documentation
- Extended the `Signal $`	

## v0.6.x - 2014 Summer
- Changed `new Domain` to `new App`
- Extended the `Signal $`
- Fixed several bugs
- Better documentation

## v0.5.x - 2014 Spring - **Major Release**
- **Rewrote diet completely from the ground up**
- Introducing` Plugins`
- Introducing the `new Domain` function
- Introducing the `Signal $`
- Introducing Sinatra like `Router`
- MIT Licensed

## v0.4.0 - 2013 Winter - 2014 Winter
- Separated the code into several modules
	- Upload into diet-upload
	- Cookies into diet-cookies
	- Accounts into diet-accounts
	- Request into diet-request
	- Comet into diet-comet
	- Dictionary into diet-dictionary
	- tasks	into diet-tasks
	- MySQL into diet-mysql
	- Use into diet-use
	- Next into nextjs
- Fixed Several Bugs

## v0.3.x - v0.4.0 2013 Spring & Summer - **Major Release**
- Fixed several bugs 

## v0.2.5 - Started on 2013 Februray 20 - Winter
- app.dictionary introduced
- response.head introduced
- response.html now includes arguments from response.head as a default
- stand alone dictionary module
- Improved html/form module with inside labels
- comet.onExit introduced
- cheerio introduced for html manipulation

## v0.2.4 - Started on 2013 Junuary 23 - Winer
- Cross file locals introduced inside the `html` module
- Echo is now not part of the `html` module
- Introduced app.notFound for 404 error routing
- Introduced auto app.www 
- Introduced app.denie_requests
- Introduced app.domain_redirect
- public folder now can have any name because .html is 
	no longer requires "/public" as the public folder's name 
	instead uses the custom one specified in app.options.public

## v0.2.3 - Started on 2012 October 3 - Fall
- MySQL data mapping
- MySQL is now based on the mysql.js javascript module
- MySQL API drastically changed
- Better form handling logic with `check` module
- Improved overall stability


## v0.2.2 - Started on 2012 - Spring
- Added subdomain support with app.subdomain()
- Better cookie set


## v0.2.1 - Started on 2011 - Winter
- Extension Apps with app.extend();
	for a site which requires additional embeddable systems to improve it's customer experience, for example a forum, feedback or blog system
- Very Simple Image Processing API with ImageMagick


## v0.2.0 - Started on 2011 October 31 - Fall - **Major Release**
- Easy HTTP/HTTPS server creation
- Advanced Route Handling 
	- With Manual URL handling (ex: /home, /about, /work)
	- With Dynamic URL Handling (ex: /posts/9874, /user/john)
- Static File Handler
- Advanced HTML with Node Module
	- With automatic .html to html with node integration
	- With Object Logger
	- With Advanced Error Tracking
- Included Mysql Manager
- Included Cookie Manager
- Included HTML Upload Module
- Included Async Module 
- Included Extension Modules ex: isset() 
- Stand alone HTTP Router - dropped expressjs
- Stand alone HTML Parser - dropped jade

## v0.1.0 - Started on 2011 June 1 - Summer
- mysql support for express
- based on express and jade 