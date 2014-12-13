![Diet Logo](http://i.imgur.com/Dasjkkp.png)

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
- Easy Host Contoller (built in virtual host support)
- Simple and Semantic Routing with app.get and app.post
- Asynchronous Error Handling with app.error
- 404 Not Found routes with app.missing
- Middleware support for all routes
- Header and footer routes for global middlewares
- Very small, just 335 sloc

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

## License
(The MIT License)

Copyright (c) 2014 Halász Ádám

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
