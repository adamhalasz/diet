[![Diet.js](http://imgur.com/3LBDJRB.png)](https://dietjs.com/) 

Fast, plugin based, easy to use HTTP(s) framework for [node][1]

[![Build Status](http://img.shields.io/travis/adamhalasz/diet.svg?style=flat)](https://travis-ci.org/adamhalasz/diet) [![NPM](http://img.shields.io/npm/v/diet.svg?style=flat)](https://www.npmjs.org/package/diet) [![Downloads](http://img.shields.io/npm/dm/diet.svg?style=flat)](https://www.npmjs.org/package/diet) [![Coveralls](http://img.shields.io/coveralls/adamhalasz/diet.svg?style=flat)](https://coveralls.io/r/adamhalasz/diet)


```js
var server = require('diet')

var app = new server()
app.domain('http://localhost:8000/')
app.start()

app.get('/', function($){
	$.end('Hello World!')
})

// curl http://localhost:8000/ → Hello World!
```

```js
// 1 line http server
node -p "require('diet').server(8000).start().get('/', function($){ $.end('yo') });"
```


## **Why another framework?**

#### **Only for HTTP/HTTPS**
Diet helps to build web server logic faster & eaiser, and nothing more. 

#### **Easy Configuration**
Many common use cases are simplified as much as it was possible. For example, using HTTPS, hosting multiple domains, parsing headers, querystring, post body etc...

#### **Standardized Middleware Structure**
Diet has middlewares just like express.js, the difference is in how modules are connected and used in the Router. Diet allows easier module configuration and modules can be chained. Modules designed for diet are called  `Plugins`.

#### **Easy to Learn**
Diet has a simple API and a wide range of Examples and Tutorials are currently in progress.

#### **Tiny & Fast**
Diet's source code is only 554 lines.

## **Tutorials & Examples**
Check out the wiki on github for an expanding list of helpful articles, tutorials and examples:
https://github.com/adamhalasz/diet/wiki

## **Features**
#### **Plugins** 
Diet has a very powerful modular middleware structure for it's `Router`. Middlewares in diet allow unlimited series of modules to work together by manipulating and passing data towards the `plugin chain`. 

**An example GET Route** 
assuming `db`, `session` and `protected` is already defined:
```js
app.get('/settings', db, session, protected, function($){
    $.data.page = 'settings'
    $.html()
})
```
- `the first argument` of a route is the **Path**. Everything after the Path is a *plugin middleware* that forms a *plugin chain*

- `db` instruct this route to create a database connection 
- `session` grabs the account from the database with the session cookie
- `protected` makes sure the user is logged in. if not redirects the user to `GET /accounts/login`
- `the last argument` terminates the request by sending back the *settings* html page.

#### **URL Routing**
Smart & easy to use sinatra like routing.
```js 
app.get('/page/about' ...)
app.get('/users/:id/'...)
app.post('/upload'...)
```

#### **Multiple Domain Support**
Diet can host multiple websites/domains from the same node.js server.

#### **Helpers**
Includes **[Sugar.js][3]** to extend native objects with helpful methods.  

## **Install**
```
npm install diet 
```

# **Plugin Directory**
We have a list of plugins categorized by their purpose in the wiki: 
https://github.com/adamhalasz/diet/wiki/Plugin-Directory

### **Officially Supported Diet Plugins**

| Plugin | Category | Github Docs | Install |
| :------------ | :------------ | :------------ | :------------ |
| **diet-ect**       | HTML Templates       |       http://git.io/q4rxng | npm install diet-ect     	|
| **diet-static**    | Static Files         |       http://git.io/TMliZw | npm install diet-static	|
| **diet-mysql**     | Database             |       http://git.io/qDgntw | npm install diet-mysql	|
| **diet-mongo**     | Database             |       http://git.io/7nrOOA | npm install diet-mongo	|
| **diet-mongoose**  | Database             |       http://git.io/XG95jA | npm install diet-mongoose	|
| **diet-mail**      | Email                |       http://git.io/_Ymgkg | npm install diet-mail 	|
| **diet-cookies**   | Cookies              |       http://git.io/0FIk4A | npm install diet-cookies 	|
| **diet-auth**   | Authentication              |       http://git.io/HDwgJg | npm install diet-auth 	|



## **Hello HTML!**
![Complete Hello World example with HTML Template][4]

Setup a new project in **/project/index.js**
```js
// Require Diet
var server = require('diet')

// Create an App
var app = new server()

// Set Domain
app.domain('http://localhost:8000/')

// Load the HTML Template Engine
app.plugin('diet-ect', { alias: 'html' })	

// Start the App
app.start()

// Listen on GET /
app.get('/', function($){
	$.data.page = 'home'
	$.html()
})
```
And write an HTML view in **/project/static/index.html**
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Hello World</title>
	</head>
	<body>
		<h1>Hello World on the <u>{{-this.page}}</u> page!</h1>
	</body>
</html>
```

# **Signal ($)**
With the default node.js you would have the `request` and `response` arguments in your callback when using `http.createServer()`. 

Diet combines these two objects into a single one then adds and fixes some commonly used methods in a more meaningful way for everyday use.

The signal (`$`) of each route can also be extended with `Plugins`. Plugins work together seamlessly in diet because the signal (`$`) object allows to pass data between plugins while keeping plugin namespaces in the signal (`$`) object. When multiple plugins are assigned to a route they form a `plugin chain`. The plugin chain is the key to write much less code and still achieve complex tasks. 

The handy signal object can be accessed in all the  `Routes` and `Plugins` as the first argument as you can see on the examples.



## **Example**
```js
var server = require('diet')

app = new server()
app.domain('http://localhost:8000/')
app.plugin('yo')
app.start()   

app.get('/ ', yo, function($){  // <-- `$` the dollar sign is the signal object
    $.end($.yo.sender + ' says ' + $.yo.message) // -> John says Yo!
})
```

## **Signal Methods**
This is a list of methods that you can access and use

| Method | Type | Description |
| :------------ | :------------ | :------------  
| **$.url**     | Object        | JSON Parsed `request.url`
| **$.query**   | Object        | JSON Parsed querystring
| **$.params**  | Object        | URL params from dynamic page routes like `/user/:id`
| **$.data**    | Object       | used in `html templates` and `$.json()` responses
| **$.body**    | Object        | JSON Parsed POST body data
| **$.headers** | Object        | An object of all the headers.
| **$.header(get, set)**     | Function        | Get or Set Headers. The second argument is for SET, if left empty it's GET.
| **$.redirect(path, statusCode)**     | Function        | Redirect the request to a different path. `path` is requried, `statusCode` is optional.
| **$.end(message)**     | Function        | End the response with an optional `message` 
| **$.chain()**     | Function        | Create a plugin chain manually on the fly inside a route 
| **$.method**     | String        | The method of the request it's eiher GET or POST
| **$.multipart**     | Boolean        | Check if a POST request's enctype is is multipart or not. The value is a boolean: `true` or `false`. 
| **$.noRoute**     | Boolean        | Check if a request has a matching registered route from `app.get` or `app.post`. The value is a boolean: `true` or `false`.

#### **$.url** - *object*
JSON Parsed `request.url`
```js
$.url = { 
    protocol: 'http:',
    slashes: true,
    host: 'example.com',
    hostname: 'example.com',
    href: 'http://example.com/',
    pathname: '/',
    path: '/' }
```

#### **$.query** - *object*
JSON Parsed querystring
```js
// http://example.com/?query=value
$.query = { query: 'value' }
```

#### **$.params** - *object*
URL params from dynamic page routes like `/user/:id`
```js
// GET http://example.com/user/eddie
$.params = { id: 'eddie' }
```

#### **$.data** - *object*
an object used in html templates and `$.json()` responses
```js
$.data = {}
```

#### **$.body** - *object*
JSON Parsed POST body data
```js
// POST http://example.com/?message=hello
$.body = { message: 'hello' }
```

#### **$.headers** - *object*
An object of all headers.
```js
$.headers = { host: 'example.com',
  connection: 'keep-alive',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
  'accept-encoding': 'gzip,deflate,sdch',
  'accept-language': 'en-US,en;q=0.8,da;q=0.6,hu;q=0.4',
  cookie: 'id=999' }
```

#### **$.header(get, set)** - *function*
Get or Set Headers. The second argument is for SET, if left empty it's GET. 
```js
$.header('cookie')                    // GET `cookie` -> 'id=999'
$.header('content-type', 'text/html') // SET `content-type` to `text/html`
```

#### **$.redirect(path, statusCode)** - *function*
Redirect the request to a different path. `path` is requried, `statusCode` is optional.

**Redirect to a Path**
```js
$.redirect('/to/some/path')        // internal redirect 
$.redirect('http://google.com/')   // external redirect
```
**Redirect Home**
```js
// redirect to home
$.redirect('home')
```
```js
// is the same as
$.redirect('/')
```
**Redirect Back**
```js
// redirect back
$.redirect('back')
```
```js
// is the same as
$.redirect($.request.headers.referer)
```

#### **$.method** - *string*
A string that you can use to check the method of the request. It's either GET or POST.
```js
// GET http://example.com/
$.method // -> GET

// POST http://example.com/publish
$.method // -> POST
```

#### **$.end(message)** - *function*
A function that ends the response and send back data to the requesting device.
```js
app.get('/', function($){
    $.end('end response')
})
```

#### **$.chain()** - *function*
Creates a plugin chain manually on the fly inside a route. This is useuful when you would like a create shortcut plugin that runs several other ones.

##### **Methods**
| Method | Description |
| :------------ | :------------  
| **chain.plugin(pluginName, pluginPath)**         | Add a plugin to the chain
| **chain.load(readyCallback)**         | Load the plugins into the chain in one-by-one after each other. readyCallback runs when all the plugins are ready. 

```js
app.get('/', function($){
	var chain = new $.chain()
	chain.plugin('db', app.db)
	chain.plugin('session', app.session)
	chain.plugin('notifications', app.alerts)
	chain.load(function(){
		$.end())
	})
})
```

#### **$.multipart** - *boolean*
Check if a POST request's enctype is is multipart or not. The value is a boolean: `true` or `false`.

#### **$.noRoute** - *boolean*
Check if a request has a matching registered route from `app.get` or `app.post`. The value is a boolean: `true` or `false`.



# **Routing**
Routing is the method that we describe when we pre-register a response to an anticipated incoming request from a client like a web browser, mobile or desktop app. In other words Routing is the way to prepare your app for the battle.

In this section I'm going to discuss the 2 supported `http methods`,  `get` and `post` and show examples of `simple routing` and `dynamic` routing using the `path` argument.

## **Simple Routing**
Diet supports the `get` and `post`  routing methods.
```js
app.get('/', ...)            
// curl http://example.com/

app.get('/about', ...)       
// curl  http://example.com/about

app.get('/article/:id', ...)    
// curl http://example.com/articles/89934

app.post('/profile', ...)     
// curl -X POST http://example.com/profile
```

## **Dynamic Routing**
Diet supports Sinatra like dynamic routing. Everything in the route path after `:` is passed to `$.params` with the name you provided.

### **Get user by id**
As you can see `:id` becomes `$.params.id` which holds the value from the URL.
```js
app.get('/user/:id', function($){
    $.end('User is ' + $.params.id) 
})
// http://example.com/user/adam
// -> User is adam
```

### **Get calendar by date**
You can have **multiple params** in a route, each is assigned to the `$.params` object with the parameter name you provide.
```js
// Calendar Date
app.get('/calendar/:month/:day/:year', function($){
    var message = $.params.month ',' + $.params.day + ',' + $.params.year
    $.end(message)
})
// http://example.com/calendar/05/10/2014
// -> 05,10,2014
```

### **Get a list with a view option**
If you add `?` after the param such as `:view?` it becomes optional.
```js
app.get('/list/:view?', function($){
    if($.params.view == 'gallery'){
        $.end('Display #Gallery View') 
    } else {
        $.end('Display #List View')
    }
    
})
// http://example.com/list
// -> Display #List View

// http://example.com/list/gallery
// -> Display #Gallery View
```

## **When to use GET or POST?**

#### **The GET Method**
HTTP GET promotes URI addressability so, designers should adopt it for safe operations such as simple queries. 

- GET requests can be cached
- GET requests remain in the browser history
- GET requests can be bookmarked
- GET requests should never be used when dealing with sensitive data
- GET requests have length restrictions
- GET requests should be used only to retrieve data

#### **The POST Method**
POST is appropriate for other types of applications where a user request has the potential to change the state of the resource (or of related resources).

- POST requests are never cached
- POST requests do not remain in the browser history
- POST requests cannot be bookmarked
- POST requests have no restrictions on data length

Check out [W3C](http://www.w3.org/2001/tag/doc/whenToUseGet.html) for more details:

## **Domains with `new server()`**

### **Single Domain:**
```js
var app = new server()
app.domain('http://yourDomain.com/') // <-- ! full url required
app.start()
```
### **Multiple Domains on the same and different Ports:**
In some cases you might want to serve multiple domains with the same node.js application. Diet handles this beautifully. 
```js
// Diet
var server = require('diet')

// Main Domain
var app = new server()
app.domain('http://example.com/')
app.start()
app.get('/', function($){
	$.end('hello world ')
})

// Sub Domain
var sub = new server()
sub.domain('http://subdomain.example.com/')
sub.start()
sub.get('/', function($){
	$.end('hello world at sub domain!')
})

// Other Domain
var other = new server()
other.domain('http://other.com/')
other.start()
other.get('/', function($){
	$.end('hello world at other domain')
})
```

## **Methods returned by `new server()`**

| Method | Description |
| :------------ | :------------  
| **app.plugin('plugin_name', config)**         | includes a plugin, config is an optional object
| **app.start(callback)**         | Starts the application by loading plugins and launchung the HTTP(S) Server. callback is optional
| **app.domain(url)**         | Specifiy the domain your server will listen to. `url` can be a URL string or Node.js URL Object
| **app.get(path, plugins...)**         | Register a GET Route
| **app.post(path, plugins...)**         | Register a POST Route
| **app.path**         | The system path to your application. It is `process.cwd()` by default
| **app.server**         | The returne value of `http.createServer` and `https.createServer`


**Example for app.domain()**
```js
// Set Domain
app.domain(url) 

// `url` should be a full URL containing the protocol http or https 
// and the / at the end like:
// "http://example.com/"

// `url` can also be a Node.js URL Object such as
{
    hostname: "nodejs.org"
    origin: "http://nodejs.org"
    port: 80,
    protocol: "http:"
}
```

# **Writing Diet Plugins**
Writing diet plugins are almost identical to writing node.js modules except plugins have a different require method and are directly connected to Routes.

To effectively demonstrate this we'll create a very simple bank application. The bank will have a `name` and a `vault`. We'll fill the vault with `6 money` when the application starts.


#### **1) Part 1: Require Plugins:**
You can register plugins with `app.plugin()`. Plugins are only initialized after `app.start()` was executed. 
```js
// cd ~/yourProject
var server = require('diet')
var app = new server()
app.domain('http://localhost:8000/')

// require the bank plugin from the node_modules folder
app.plugin('bank', { name: 'John Doe', vault: 6 })

// start the application
app.start()
```

#### **2) Part 2: Accessing custom options from the source code of the plugin:**
```js
// cd ~/yourProject/node_modules/bank
var options = module.parent.options;

// let's see how much money the bank has
// prints -> The "John Doe Bank" has $6
console.log(' # The "'+ options.name +' Bank"'
		    + ' has $'+ options.vault ) 
    

// then we need to return the plugin
module.parent.return() 
```

#### **3) Part 3: Create a Global Plugin for all routes:**
Everyone who visits the app will be able to see and change the value of the vault with the `deposit` and `withdraw` methods.

Let's extend our bank plugin with a `global` function inside `exports.onload`:
```js
// cd ~/yourProject/node_modules/bank
// Note: `module.parent.app` and `module.parent.options` are stored in memory
var options = module.parent.options;

exports.global = function($){
	// this creates a new instance 
	// of the $.bank in visitors route
	this.name = options.name
	this.vault = options.vault
	this.deposit = function(amount){
		options.vault += parseInt(amount)
	}
	this.withdraw = function(amount){
		options.vault -= parseInt(amount)
	}
	$.return(this)
}

module.parent.return()
```
Now that we created the plugin we can access the `$.bank` in all Routes of the `app`. Let's extend our *index.js* file with some `Routes` so visitors can `see` the vault and `withdraw`/ `deposit` virtual money.
```js
// cd ~/yourProject/index.js
var server = require('diet')
var app = new server()

// setup domain
app.domain('http://localhost:8000/')

// use the bank plugin
app.plugin('bank', { name: 'John Doe', vault: 6 })

// start the application
app.start()

// instruct our app to
// print 'The "Y Bank" owns $X'
// upon visiting /
app.get('/', function($){
	$.end('The "'+ $.bank.name +' Bank" ' + 'has $'+ $.bank.vault)
})

// instruct our app to
// deposit X amount of money into the vault 
// upon visiting /banks/deposit/10 
app.get('/bank/deposit/:amount', function($){
	$.bank.deposit($.params.amount)
	$.redirect('home')
})

// instruct our app to
// withdraw X amount of money from the vault
// upon visiting /banks/withdraw/5  
app.get('/bank/withdraw/:amount', function($){
	$.bank.withdraw($.params.amount)
	$.redirect('home')
})
```
And we're done! Navigate to your project's folder in your terminal and run the application:
```bash
# bash screen 1
cd ~/yourProject/
node index.js
```

Now open another terminal screen and let's test the app:
```bash
# bash screen 2
curl "http://localhost:8000/"
// The "John Doe Bank" has $6

curl -L "http://localhost:8000/bank/deposit/8"
// The "John Doe Bank" has $14

curl -L "http://localhost:8000/bank/widthraw/4"
// The "John Doe Bank" has $10

```
Sweet! I admit it's a pretty retarded bank app, but hey I hope at least you've got some of the ideas behind the `global plugins`.

#### **3) Part 4: Create a Local Plugin:**

Local plugins are only used in specified routes. Let's create a `currency converter` plugin that we'll use in the  `/convert/:currency` route.

The converter plugin will use `$.bank.vault` from the `bank` plugin. We can do this because global plugins always load first, before the local plugins.

```js
// cd ~/yourProject/node_modules/convert
exports.local = function($){
	// The bank's balance is in USD
	// I'll use today's (September 19, 2014)
	// exchange rate 
	if($.params.currency == 'EUR'){
		this.amount = $.bank.vault * 0.77;
		this.symbol = '€';
		
	} else if ($.params.currency == 'GBP'){
		this.amount = $.bank.vault * 0.60;
		this.symbol = '£'
	}
	$.return(this)
}

module.parent.return()

```
Now let's add the `convert` plugin and the route `/convert/:currency` to *index.js*
```js
// use the convert plugin with a reference
var convert = app.plugin('convert')

// instruct our app to
// print 'The "Y Bank" owns X(symbol) Z.'
// upon visiting /
app.get('/convert/:currency', convert, function($){
	$.end('The "'+ $.bank.name +' Bank" '
	    + 'has '+ $.convert.symbol + $.convert.amount)
})
```

Voila! Let's test this. First run the app:
```bash
# bash screen 1
cd ~/yourProject/
node index.js
```

Then test the new Plugin & Route:
```bash
# bash screen 2
curl "http://localhost:8000/convert/EUR"
// The "John Doe Bank" has €7.7

curl "http://localhost:8000/convert/GBP"
// The "John Doe Bank" has £6

```



# **Todos**
Upcoming updates and features:
https://github.com/adamhalasz/diet/wiki/Todos

# **License**
(The MIT License)

Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


  [1]: http://nodejs.org/
  [2]: http://i.imgur.com/rTAMJF0.png
  [3]: http://sugarjs.com/
  [4]: http://i.imgur.com/GY90YJd.png