var server = require('../../')
var app = server()
app.listen("http://127.0.0.1:8000")
app.listen("http://127.0.0.1:9000")
app.get('/', function($){
    $.end('hello world from '+$.headers.host);
})