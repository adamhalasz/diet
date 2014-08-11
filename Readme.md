# **Diet**
Diet is a tiny, fast, beautiful and extensible web application framework for node.js

![Diet.js on launch][1]

## **Why another framework?**
I believe most of frameworks for node.js (and other languages as well) are not straight forward when it comes to learn and extend them. Diet has a long way to go as well, but I believe it will help many developers to understand and design more complex server architectures with much less effort which is the goal of node.js after all.

## **What does diet do?**

 - **The Plugin Framework** helps to write more reusable middlewares.
 - The **`$` Signal Argument**  is a combination of the request and response object. You can access the signal argument in every route and plugin. The signal helps to connect and send data between plugins/modules.
 - **URL Routing** - Simple & Dynamic.
 - **Domain Routing** - Supports subdomains & any domain
 - Includes **[Sugar.js][2]** that extends native objects with helpful methods.  

## **Install**
```
npm install diet 
```

## **Hello World!**
```js
require('diet');
var app = new App();
app.domain('http://localhost:8000/');
app.start();
app.get('/', function($){ 
    $.end('Hello World!'); 
});
```

# **Plugin Directory**
We have a list of plugins categorized by their purpose in the wiki: 
https://github.com/adamhalasz/diet/wiki/Plugins

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


## **Hello HTML!**
![Complete Hello World example with HTML Template][3]

Setup a new project in **/project/index.js**
```js
// Require Diet
require('diet');

// New App
var app = new App();

// Domain
app.domain('http://localhost:8000/');

// Load HTML Parser Plugin
app.plugin('diet-ect', { alias: 'html' });

// Start the App
app.start();

// Listen on GET /
app.get('/', function($){
	$.data.page = 'home';
	$.html();
});
```
And write an HTML view in **/project/static/index.html**
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Hello World</title>
	</head>
	<body>
		<h1>Hello World</h1>
		Welcome to the <b>{{-this.page}}</b> page.
	</body>
</html> 
```

# **Signal ($)**
The signal argument is used in the context of *Routes* and *Plugins*. It's an object containing important methods that help to serve requests. The signal argument also allows easy data transmission between plugins.

## **Example**
```js
require('diet');

app = new App();
app.plugin('plugin_name');
app.start('http://localhost:8000/');   

app.get('/ ', function($){  // <-- the `$` sign is the signal argument
    $.end('hello world');
});
```

## **Signal Methods**

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
    path: '/' };
```

#### **$.query** - *object*
JSON Parsed querystring
```js
// http://example.com/?query=value
$.query = { query: 'value' };
```

#### **$.params** - *object*
URL params from dynamic page routes like `/user/:id`
```js
// GET http://example.com/user/eddie
$.params = { id: 'eddie' };
```

#### **$.data** - *object*
an object used in html templates and `$.json()` responses
```js
$.data = {};
```

#### **$.body** - *object*
JSON Parsed POST body data
```js
// POST http://example.com/?message=hello
$.body = { message: 'hello' };
```

#### **$.headers** - *object*
An array of all headers.
```js
$.headers = { host: 'example.com',
  connection: 'keep-alive',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
  'accept-encoding': 'gzip,deflate,sdch',
  'accept-language': 'en-US,en;q=0.8,da;q=0.6,hu;q=0.4',
  cookie: 'id=999' };
```

#### **$.header** - *function*
Get or Set Headers. The second argument is for SET, if left empty it's GET. 
```js
$.header('cookie')                    // GET `cookie` -> 'id=999'
$.header('content-type', 'text/html') // SET `content-type` to `text/html`
```

#### **$.redirect** - *function*
Redirect the request to a different path. `path` is requried, `statusCode` is optional.
```js
// api
$.redirect(path, statusCode);
```
**Redirect to a Path**
```js
$.redirect('/to/some/path');        // internal redirect 
$.redirect('http://google.com/');   // external redirect
```
**Redirect Home**
```js
// redirect to home
$.redirect('home');
```
```js
// is the same as
$.redirect('/');
```
**Redirect Back**
```js
// redirect back
$.redirect('back');
```
```js
// is the same as
$.redirect($.request.headers.referer);
```

#### **$.method** - *string*
A string that you can use to check the method of the request. It's either GET or POST.
```js
// GET http://example.com/
$.method // -> GET

// POST http://example.com/publish
$.method // -> POST
```

#### **$.end** - *function*
A function that ends the response and send back data to the requesting device.
```js
app.get('/', function($){
    $.end('end response');
});
```

#### **$.multipart** - *boolean*
Check if a POST request's enctype is is multipart or not. The value is a boolean: `true` or `false`.

#### **$.noRoute** - *boolean*
Check if a request has a matching registered route from `app.get` or `app.post`. The value is a boolean: `true` or `false`.



# **Routing**
The global signal is a Function Object. As a function you can use it to setup your applications routes. 

## **Simple Routing**
Diet supports `get` and `post` methods.
```js
// examples
app.get('/', ...);            // GET  http://example.com/
app.get('/about', ...);       // GET  http://example.com/about
app.get('/articles', ...);    // GET  http://example.com/articles
app.post('/article', ...);      // POST http://example.com/article
```

## **Dynamic Routing**
Diet supports Sinatra/Express like dynamic routing. Everything in the route path after `:` is passed to `$.params` with the name you provided.

### **Get user by id**
As you can see `:id` becomes `$.params.id` which holds the value from the URL.
```js
app.get('/user/:id', function($){
    $.end('User is ' + $.params.id); 
});
// http://example.com/user/adam
// -> User is adam
```

### **Get calendar by date**
You can have **multiple params** in a route, each is assigned to the `$.params` object with the parameter name you provide.
```js
// Calendar Date
app.get('/calendar/:month/:day/:year', function($){
    var message = $.params.month ',' + $.params.day + ',' + $.params.year;
    $.end(message);
});
// http://example.com/calendar/05/10/2014
// -> 05,10,2014
```

### **Get a list with a view option**
If you add `?` after the param such as `:view?` it becomes optional.
```js
app.get('/list/:view?', function($){
    if($.params.view == 'gallery'){
        $.end('Display #Gallery View'); 
    } else {
        $.end('Display #List View');
    }
    
});
// http://example.com/list
// -> Display #List View

// http://example.com/list/gallery
// -> Display #Gallery View
```

# **Domains**
In some cases you might want to serve multiple domains/sub-domains from the same node.js application. Diet handles this beautifully by calling a new instance of `App` and setting a domain upon starting it with `app.domain(yourDomain)`


## **Example Usage:**
```js
var app = new App();
app.domain('http://yourDomain.com/'); // <-- ! full url required
app.start();
```
## **More Examples:**
```js
// Diet
require('diet');

// Main Domain
var app = new App();
app.domain('http://example.com/');
app.start();
app.get('/', function($){
	$.end('hello world ');
});

// Sub Domain
var sub = new App();
sub.domain('http://subdomain.example.com/');
sub.start();
sub.get('/', function($){
	$.end('hello world at sub domain!');
});

// Other Domain
var other = new App();
other.domain('http://other.com/');
other.start();
other.get('/', function($){
	$.end('hello world at other domain');
});
```

## **Domain Methods**
Each domain inherits these methods:
```js
// include a plugin
app.plugin('plugin_name', configObject); // config is optional
```
```js
// enable debug mode. `false` by default.
app.debug = true; 
```
```js
// path of your application. `process.cwd()` by default
app.path;
```
```js
// Start App
app.start(async_callback); // callback is optional
```
```js
// Set Domain
app.domain(domainURL); 

// domainURL should be a full url containing the protocol http or https 
// and the / at the end like "http://example.com/"

// domainURL can also be a Node.js URL Object such as
{
    host: "nodejs.org"
    hostname: "nodejs.org"
    origin: "http://nodejs.org"
    port: 80,
    protocol: "http:"
}
```
```js
// route http(s) requests
app.get('/path', pluginA, pluginB .., function($){ ... });
app.post('/path', pluginA, pluginB .., function($){ ... });

// the first argument is the path. 
// the last argument is your custom ending function
// any argument between the first and last is a local plugin
```

# **Writing Diet Plugins**
Plugins are middlewares that act as a bridge between modules and help write much more efficient Object Oriented code. Plugins are essentially regular node.js functions or modules that follow a standard mostly based on diet's `$` *(signal)* argument.

#### **The 3 Types of Plugins**
Plugins may be all or at least one of these types:

- **Onload** plugin
- **Global** plugin
- **Local** plugin
	
## **Onload Plugins**
Onload plugins *run code right away after the plugin was initialized*. The use cases of onload plugins are very handy when you want to configure your plugin, preprocess some data, load/update caches, schedule/execute background tasks etc.

**An Example Plugin:**
```js  
// project/example.js
module.exports.onload = function($){ 
    console.log('hello world!');
    $.return();
}
```
```js
// project/index.js
require('diet');
app = new App();
app.plugin('example.js'); // -> hello world!
app.start('http://localhost:8000/');

```
## **Global Plugins**
Global plugins run on all incoming HTTP requests/routes. Global plugins can be handy when you need certain functionalities in all or a specific type of routes for example sessions & static file handling.

**Example Plugin:**
```js
// project/example.js
var path = require('path');
module.exports.global = function($){
    this.extension = path.extname($.url.href);
    $.return(this);
}
```
```js
// project/index.js
require('diet');

app = new App();
app.plugin('example.js');
app.start('http://localhost:8000/');

app.get('/', function($){
    $.end('Extension is ' + $.example.extension);
});

app.get('/image.jpg', function($){
    $.end('Extension is ' + $.example.extension);
});
```
```
// terminal
curl 'http://localhost:8000/'
-> Extension is undefined

curl 'http://localhost:8000/image.jpg'
-> Extension is .jpg
```

## **Local Plugins**
Local plugins run on specified routes. Local plugins are handy for organizing your code for optimization, so each plugin is required only when it is actually needed.

**Example Local Plugin as a Module:**
```js
// project/example.js
module.exports.local = function($){
    this.name = 'Adam';
    this.age = 20;
    $.return(this);
}
```
```js
// project/index.js
require('diet');
app = new App();
var person = app.plugin('example.js');
app.start('http://localhost:8000/');

app.get('/', person, function($){
    $.end('Hi I am ' + $.person.name + ', '  + $.person.age + ' old.');
    // -> Hi I am Adam, 20 years old.
});
```

**Example Local Plugin as a Function:**
Local plugins can also be created as functions
```js
// project/index.js
require('diet');

// Create New App
app = new App();

// Start App
app.start('http://localhost:8000/');

// Define Local Plugin
function person($){
    this.name = 'Adam';
    this.age = 20;
    $.return(this);
}

// Use person in GET / route
app.get('/', person, function($){
    $.end('Hi I am, ' + $.person.name + ', '  + $.person.age + ' old');
    // -> Hi I am Adam, 20 years old.
});
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


  [1]: http://i.imgur.com/rTAMJF0.png
  [2]: http://sugarjs.com/
  [3]: http://i.imgur.com/M8I3Dp0.png
