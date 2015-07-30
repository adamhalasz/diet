var server = require('../../')
var app = server()
app.listen(3000)
app.get('/', function($){
    $.end('hello world!');
})