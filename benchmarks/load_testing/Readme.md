# AB Load Testing Comparison between Vanilla Node, Diet.js and Express.js

![enter image description here](http://i.imgur.com/gLcGupJ.png)

## The Environment

- The tests were measured using the Apache Benchmark (AB) 
- The AB tests were issued from a Retina 5K, 27-inch, Late 2015 iMac (3.2 GHz Intel Core i5, 8 GB 1867 MHz DDR3, Mac OS X 10.11.1) from San Jose, CA.
- The hosting server was hosted by digital ocean in San Francisco. (CentOS 6.5 x64 / 512 MB Memory / 20 GB Disk / SFO1)
- The node version was v5.7.0

## The AB Command:
```
ab -c 100 -n 2000 http://IP_ADDRESS:7777/
```

## The Test
The servers just display a basic `Hello World\n` message with their respective basic hello world example.


**The Vanilla Server:**
Node version: v5.7.0
```js
const http = require('http');

const hostname = '0.0.0.0';
const port = 7777;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**The Diet Server:**
Diet version: 0.10.2

```js
var server = require('diet')
var app = server()
app.listen(7777)
app.get('/', function($){ 
	$.end('Hello World\n') 
})
```

**The Express Server:**
Express version: 4.13.4
```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

app.listen(7777, function () {
  console.log('Example app listening on port 7777!');
});
```

## The Results

**Vanilla:**

1. Time per request:       388.878 [ms] (mean)
2. Time per request:       391.750 [ms] (mean)
3. Time per request:       260.624 [ms] (mean)
4. Time per request:       373.198 [ms] (mean)
5. Time per request:       301.676 [ms] (mean)
6. Time per request:       473.549 [ms] (mean)
7. Time per request:       299.097 [ms] (mean)

Average time per request: **355.53** ms

**Diet:**

1. Time per request:       348.933 [ms] (mean)
2. Time per request:       345.201 [ms] (mean)
3. Time per request:       540.506 [ms] (mean)
4. Time per request:       390.346 [ms] (mean)
5. Time per request:       364.944 [ms] (mean)
6. Time per request:       444.005 [ms] (mean)
7. Time per request:       452.907 [ms] (mean)

Average time per request: **412.40** ms

**Express:**

1. Time per request:       418.982 [ms] (mean)
2. Time per request:       417.123 [ms] (mean)
3. Time per request:       538.215 [ms] (mean)
4. Time per request:       415.463 [ms] (mean)
5. Time per request:       415.463 [ms] (mean)
6. Time per request:       378.557 [ms] (mean)
7. Time per request:       681.284 [ms] (mean)

Average time per request: **466.44** ms

### The Results
- Vanilla Node is **14.8112% faster** than Diet
- Vanilla Node is **26.8937% faster** than Express
- Diet is **12.298% faster** than Express


### Running the tests
To run the tests you'll have to install `diet and express` on the host machine:
```
# install diet
npm install diet

# install express
npm install express
```

and run the tests (separately):
```
# run vanilla node server
node node.js

# run diet server
node diet.js

# run express server
node express.js
```

then run the ab test from your testing machine:
```
ab -c 100 -n 2000 http://IP_ADDRESS:7777/
```

