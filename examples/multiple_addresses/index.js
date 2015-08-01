// create app
var server = require('../../')
var app = server()

// listen on multiple addresses
// note: root access is required for port 80

// empty defition
app.listen()  

// just the hostname
app.listen("http://localhost/")     

// full url with ip
app.listen("http://127.0.0.1:7000")

// full url with hostname
app.listen("http://localhost:8000")

// just the port
app.listen(9000)

// object definition
app.listen({ 
	protocol: 'http:',
	hostname: 'localhost',
	host: 'localhost:9500',
	port: '9500'
});

// Route for "HTTP GET /" 
app.get('/', function($){
    $.end('hello world from '+$.headers.host);
})

var app2 = server()
app2.listen("http://test.local.com/");
app2.get('/', function($){ $.end('hey') }) 