var server = require('../../')

var app = server()
app.listen('http://test.local.com')
app.get('/', function($){
    $.end('hello test!');
})

var app2 = server()
app2.listen('http://test2.local.com')
app2.get('/', function($){
    $.end('hello test2!');
})


var app3 = server()
app3.listen(80)
app3.get('/', function($){
    $.end('hello port 80!');
})