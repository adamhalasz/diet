# **Diet**
Diet is a beautiful, minimalistic, extensible web application framework for node.

![Diet.js in action][1]
## **What does diet do?**

 - **Plugins** that extend your apps functionality.
 - **URL Routing**.
 - **Domain Routing**.
 - The **`$` Signal Argument**  is a combination of the request and response object. You can access the signal argument in every route and plugin. The signal helps to connect and send data between plugins/modules.


## **Hello World!**
```js
require('diet');

app = new Domain('http://localhost:8000/');
app.start();
app.get('/', function($){ 
    $.end('Hello World!'); 
});
```

## **Install**
`npm install diet `

# **Diet Plugins**
Plugins are middlewares that act as a bridge between modules and help write much more efficient Object Oriented code. Plugins are essentially regular node.js functions or modules that follow a standard based on diet's `$` *(signal)* argument.

#### **The 3 Types of Plugins**
Plugins may be all or at least one of these types:

- **Onload** plugin
- **Global** plugin
- **Local** plugin
	
## **Onload Plugins**
Onload plugins *run code right away after the plugin was initialized*. The use cases of onload plugins are very handy when you want to alter the configure the plugin, preprocess some data, load/update caches, schedule/execute background tasks etc.

**An Example Plugin:**
```js  
// project/example.js
module.exports.onload = function($){ 
    $.message = 'hello world!';
    $.return();
}
```
```js
// project/index.js
require('diet');
app = new Domain('http://localhost:8000/');
app.plugin('example.js');
app.start();

console.log(app.message); // -> hello world!
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

app = new Domain('http://localhost:8000/');
app.plugin('example.js');
app.start();

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
app = new Domain('http://localhost:8000/');
var person = app.plugin('example.js');
app.start();

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

app = new Domain('http://localhost:8000/');
app.start();

function person($){
    this.name = 'Adam';
    this.age = 20;
    $.return(this);
}

app.get('/', person, function($){
    $.end('Hi I am, ' + $.person.name + ', '  + $.person.age + ' old');
    // -> Hi I am Adam, 20 years old.
});
```

# **Signal ($)**
The signal argument is used in the context of *Routes* and *Plugins*.

## **Example**
```js
require('diet');

app = new Domain('http://localhost:8000/');
app.start(); 
app.plugin('plugin_name');
    
app.get('/ ', function($){  // <-- the `$` sign is the signal argument
    $.end('hello world');
});
```

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
In some cases you might want to serve multiple domains/sub-domains from the same node.js application. Diet handles this beautifully with the `Domain()` function. 


## **Example Usage:**
```js
var yourApp = new Domain('http://yourDomain.com/');
```
## **More Examples:**
```js
// Diet
require('diet');

// Main Domain
app = new Domain('http://example.com/');
app.start();
app.get('/', function($){
	$.end('hello world ');
});

// Sub Domain
sub = new Domain('http://subdomain.example.com/');
sub.start();
sub.get('/', function($){
	$.end('hello world at sub domain!');
});

// Other Domain
other = new Domain('http://other.com/');
other.start();
other.get('/', function($){
	$.end('hello world at other domain');
});
```

## **Domain Attributes**
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
// route http(s) requests
app.get('/path', pluginA, pluginB .., function($){ ... });
app.post('/path', pluginA, pluginB .., function($){ ... });

// the first argument is the path. 
// the last argument is your custom ending function
// any argument between the first and last is a local plugin
```


  [1]: http://i.imgur.com/qdhj18p.png