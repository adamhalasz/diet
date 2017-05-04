## v0.16.0 - May 5th, 2017
- Bug Fix: In error.js set `signal.responded` to `false` to allow custom error routes to use `$.end()`
- Bug Fix: In error.js check if `app.routes.error.length` is more than 0 to only iterate through custom error handlers if there are any. This allows passing the functionality to the default error handler page

## v0.15.0 - March 5th, 2017
- Introducing `app.host(location)` to allow handling hostnames and ports without creating a new server instance. It's useful when the hostname and port is changed by a proxy server. #73

## v0.14.1 - March 3rd, 2017
- Bugfix for `$.download` when calling `$.sendFile` send the proper encoding not the name. #67

## v0.14.0 - March 3rd, 2017
- Introducing `$.download(path, filename)` #67
- Download Test
- Multipart Example
- Download Example

## v0.13.0 - March 3rd, 2017
- Introducing the app.resource(path) class for grouping methods - inner functionality inspired by @luisvinicius167 's diet-group-router #32

## v0.12.0 - March 2rd, 2017
- Introducing signal.setHeader(key, value) to set a response header #61
- Introducing signal.getHeader(key) to return a response header #61
- Introducing signal.getRequestHeader(key) to return a request header #61
- Introducing signal.error(key) to return an error with a key #61
- Introducing signal.sendFile(path) to end a response with a file #69
- Introducing $.error('message') and $.error('stack') to allow better Error Exceptions handling with app.error(callback) 
- Added example for signal.error 
- Added example for signal.sendFile 

## v0.11.0 - March 2rd, 2017
- Replaced object.observe() with the new ES6 Proxy - Solves #42, #60, #72
- Only Support Node Version >= 6.4.0
- New MVC Test Suite

## v0.10.9 - January 31th, 2017
- Bug Fix: User decoreURIComponent on the signal.body
- New Example: Simple File Serving Example


## v0.10.8 - June 13th, 2016
- Upgrade `diet-qs` with the new `querystrings` module that fixes nested Query String to Array conversions.
- New Utils Controller
- Moved isset() into the Util Controller

## v0.10.6 - May 10th, 2016 
- Ports are now wildcards for every hostname. Listening on a Port (`app.listen(8000)`) will accept any Hostname request within that Port. Listening on a Hostname (`app2.listen('http://test.com:8000/')`) within that Port will have priority.

## v0.10.5 - April 29th, 2016 
- `Error.stack` not always present on Error in controllers/router.js by @demarius
- `initialized` is not constant in index.js (es6, strict mode fix)
- Replaced Native Object.observe with `object.observe` module to support observe in Node >= v6.0.0

## v0.10.4 - March 10th, 2016 
- Check if path contains query in Signal#redirect by @demarius

## v0.10.3 - v0.10.4 - 2016 March 3

## v0.10.4 - March 24th, 2016 
- Check if path contains query in Signal#redirect. Thanks @demarius

## v0.10.3 - March 24th, 2016 
>>>>>>> Stashed changes
- AB Load Testing Comparison between Vanilla Node, Diet.js and Express.js

## v0.10.2 - Feburary 17th, 2016 
- add second argument `isLast` to **$.end(yourData, isLast)**, **$.json(yourData, isLast)**, **$.success(yourData, isLast)** and **$.failure(yourData, isLast)**. Setting `isLast` to true will stop the execution of the middleware chain completely
```
    // usage
    $.end('hello world', true)
```

## v0.10.1 - January 25th, 2016 
- Check existence of app.routes and routes in hosts.js and iterator.js

## v0.10.0 - January 24th, 2016  - Major Release
- Drop support for Node versions below v4.2.4
- Middleware renamed to Controller
- Introducing ES6 Generator Controllers (`yield` and `*`)
- Introducing `app.controller` function method registering 
    - can be called as a normal function
    - creates a thunk around the controller for generators when called with yield
- Introducing `app.protocol(name, handler)`
- Introducing Server Event Handlers
  - `server.on(event, handler)`
  - `server.off(event, handler)`
  - `server.one(event, handler)`
  - `server.onAll(event, handler)`
  - `server.many(event, handler)`
  - `server.emit(event, handler)`
- Introducing App Event Handlers
    - `app.on(event, handler)`
    - `app.off(event, handler)`
    - `app.one(event, handler)`
    - `app.onAll(event, handler)`
    - `app.many(event, handler)`
    - `app.emit(event, handler)`
- Introducing Server Events
    - init
    - create (new app)
- Introducing App Events
    - listen
    - route.attach
    - route.start
    - route.end
    - route.controller.attach
    - route.controller.start
    - route.controller.iterate
    - route.controller.end
    - route.error
    - protocol.attach
- Add Examples for:
    - Events
    - Generators

## v0.9.23 - v0.9.26 - January 4th, 2016 
- Introducing `app.model()`
- Introducing `app.view()`
- Introducing `app.controller()`
- Added support for `yo` (generator-diet)
- Support for node 4.2.4, 5.3.0

## v0.9.22 - October 24th, 2015 
- Body/footer separation in host.js for clarity

## v0.9.21 - October 24th, 2015 
- Don't JSON stringify `$.failure()` and `$.success()` responses because `$.end()` does it too

## v0.9.19 - v0.9.20 - October 23, 2015 
- Fixed a https bug in host.js - if the port was undefined in the header it used 80. For https it should be 443. Now it's using the server's configuration to choose a default fallback protocol.

## v0.9.16 - v0.9.18 - October, 2015 
- Chainable Server Instance Creation, Listening and Routing. Now you can do stuff like:
```
server()
	.listen(8000)
	.get('/', function($){ $.end('hello world'); })
	.get('/other', function($){ $.end('hello other world') });
	.missing(function($){ $.end('404 :)') });
```
- Fixed bugs with `$.end`

## v0.9.8 - v0.9.16 - June - October, 2015 
- `$.end()` now serves JSON responses on requests where the `"x-requested-with"` == `"XMLHttpRequest"` or the `"Authorization"` header is set and contains `"Bearer"` or `"Token"` in it's value
- `$.end()` now accepts JSON objects as a value and sends it as a JSON response
- app.html now enables $.html as the default response when using $.end
- Added `$.html()` - by default it just sets the content-header to html - to ovewrite it set a handler for `$.htmlModule (input)` in your diet header modules 
- Bug Fixes
- Added Unit Tests for the new `$.end()` function

## v0.9.7 - June, 2015 
- Fixed a bug that didn't allow registering named addresses without a port

## v0.9.6 - June, 2015 
- Fixed a bug in server options that caused to display the diet header for every server instance

## v0.9.5 - June, 2015 
- A server instance now has an options attribute `server(options)`
- Added `options.silent` to server options which if set to `true` disables all logs generated by diet for that Server Instance

## v0.9.4 - June, 2015 
- Treat localhost addresses equally (127.0.0.1, 192.168.99.100, localhost)
- Listen on multiple addresses without redirects or host configs

## v0.9.3 - May, 2015 
- The body for POST and PUT methods now require the appropriate "Content-Type" header to be parsed. For URL encoded body "application/x-www-form-urlencoded" is required, for JSON requests "application/json". If no "Content-Type" is specified then $.body contains the raw body content.

## v0.9.2 - February, 2015 
- Support for `options`, `put`, `head`, `patch`, `trace` and `delete` HTTP methods
- Added `app.put`
- Added `app.head`
- Added `app.patch`
- Added `app.delete`
- Added `app.trace`
- Added `app.options`
- Fixed body parsing mechanism. Every route's body is parsed that has a Content-Type or Transfer-Encoding Header. According to rfc2616-sec4


## v0.9.1 - December, 2014  - Security Patch
- 100% Unit Test Coverage
- Build coverage with TravisCI
- Fixed a bug that didn't allow to create https server with other ports than 80

## v0.9.0 - December, 2014  - Major Release
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

## v0.8.6 - October, 2014 
- Fixed a bug that caused starting an HTTPS server in failure with port 80

## v0.8.5 - September, 2014 
- Better Docs

## v0.8.4 - September, 2014 
- support for safe asynchronous error handling. replaced try catch with domains
- setting `signal.passed` to false also stops the plugin chain just as `signal.data.passed`

## v0.8.3 - September, 2014 
- fixed a bug in the chain. when `signal.data.passed` is `false` and `$.end()` is called the chain stops and other listeners on the same route will not be called.
- calling `$.error()` from now on sets `$.passed` to `false`

## v0.8.2 - September, 2014 
- updated `readme`


## v0.8.1 - September, 2014 
- added `app.server`
- cleaned up unnecessary `console.logs`


## v0.8.0 - September, 2014 - Major Release
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

## v0.7.x - August, 2014 
- Started Unit Testing
- Fixed several bugs
- Better documentation
- Extended the `Signal $`	

## v0.6.x - Summer, 2014 
- Changed `new Domain` to `new App`
- Extended the `Signal $`
- Fixed several bugs
- Better documentation

## v0.5.x - Spring, 2014 - Major Release
- Rewrote diet completely from the ground up
- Introducing` Plugins`
- Introducing the `new Domain` function
- Introducing the `Signal $`
- Introducing Sinatra like `Router`
- MIT Licensed

## v0.4.0 - Winter, 2013 - Winter, 2014
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

## v0.3.x - v0.4.0 Spring & Summer 2013  - **Major Release**
- Fixed several bugs 

## v0.2.5 - Started on February 20, 2013  - Winter
- app.dictionary introduced
- response.head introduced
- response.html now includes arguments from response.head as a default
- stand alone dictionary module
- Improved html/form module with inside labels
- comet.onExit introduced
- cheerio introduced for html manipulation

## v0.2.4 - Started on January 23, 2013  - Winer
- Cross file locals introduced inside the `html` module
- Echo is now not part of the `html` module
- Introduced app.notFound for 404 error routing
- Introduced auto app.www 
- Introduced app.denie_requests
- Introduced app.domain_redirect
- public folder now can have any name because .html is 
	no longer requires "/public" as the public folder's name 
	instead uses the custom one specified in app.options.public

## v0.2.3 - Started on October 3, 2012  - Fall
- MySQL data mapping
- MySQL is now based on the mysql.js javascript module
- MySQL API drastically changed
- Better form handling logic with `check` module
- Improved overall stability


## v0.2.2 - Started on Spring, 2012
- Added subdomain support with app.subdomain()
- Better cookie set


## v0.2.1 - Started on Winter, 2011
- Extension Apps with app.extend();
	for a site which requires additional embeddable systems to improve it's customer experience, for example a forum, feedback or blog system
- Very Simple Image Processing API with ImageMagick


## v0.2.0 - Started on October 31, 2011 - Fall - Major Release
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

## v0.1.0 - Started on June 1, 2011 - Summer
- mysql support for express
- based on express and jade 