![Diet Logo](http://i.imgur.com/Dasjkkp.png)

[![Build Status](http://img.shields.io/travis/adamhalasz/diet.svg?style=flat)](https://travis-ci.org/adamhalasz/diet) [![NPM](http://img.shields.io/npm/v/diet.svg?style=flat)](https://www.npmjs.org/package/diet) [![Downloads](http://img.shields.io/npm/dm/diet.svg?style=flat)](https://www.npmjs.org/package/diet) [![Coveralls](http://img.shields.io/coveralls/adamhalasz/diet.svg?style=flat)](https://coveralls.io/r/adamhalasz/diet)


[Diet](http://dietjs.com) is a tiny, fast and modular node.js web framework. Good for making fast & scalable apps and apis.
```javascript
var server = require('diet')

var app = server()
app.listen(8000)
app.get('/', function($){
    $.end('hello world')
})
```

## Features 
- Built for [virtual hosting](http://dietjs.com/tutorials/host#) 
- Request and Reponse combined into the [signal object ($)](http://dietjs.com/tutorials/signal#)
- Simple and Semantic Routing with [app.get](http://dietjs.com/api/server#app.get) and [app.post](http://dietjs.com/api/server#app.post) and other methods.
- [Middleware](http://dietjs.com/tutorials/router#middleware) Support
- [MVC](http://dietjs.com/api/server#app.model) (model-view-controller) Support
- [Header](http://dietjs.com/tutorials/router#header) and [footer](http://dietjs.com/tutorials/router#footer) routes for better global middleware structuring
- Support for ES6 Generator Middlewares/Controllers (new since v0.10)
- Asynchronous [error handling](http://dietjs.com/tutorials/router#error) with [app.error](http://dietjs.com/api/server#app.error) routes
- [404](http://dietjs.com/tutorials/router#missing) routing with [app.missing](http://dietjs.com/api/server#app.missing)
- [Very small](http://dietjs.com/resources/comparison#sloc), just ~550 sloc

## Install
```
npm install diet
```

## Website & Community
- **Website** : [http://dietjs.com](http://dietjs.com)
- Chat on [Gitter](https://gitter.im/adamhalasz/diet)
- Ask Questions on [Stackoverflow](http://stackoverflow.com/questions/ask)
- Report Issues on [Github](https://github.com/adamhalasz/diet/issues)
- Contribute to the Source code also on [Github](https://github.com/adamhalasz/diet)
- Download the latest official release from [NPM](https://www.npmjs.org/package/diet)

## Tutorials
- [Get Started](http://dietjs.com/tutorials/get_started)
- [Hosting](http://dietjs.com/tutorials/host)
- [Routing](http://dietjs.com/tutorials/router)
- [Signal](http://dietjs.com/tutorials/signal)
- [Modules](http://dietjs.com/tutorials/modules)

## API
- [Server](http://dietjs.com/api/server)
- [Signal: Request](http://dietjs.com/api/signal/request)
- [Signal: Response](http://dietjs.com/api/signal/response)

## Resources
- [Official Modules](http://dietjs.com/resources/modules)
- [Tests & Benchmarks](http://dietjs.com/resources/comparison)
- [Changelog](https://github.com/adamhalasz/diet/blob/master/Changelog.md)

## License
(The MIT License)

Copyright (c) 2014 Halász Ádám

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.