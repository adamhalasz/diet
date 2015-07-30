var server = require('../../')
var app = server()
app.listen(3000)
app.get('/', function($){
    $.header('content-type', 'text/html')
    $.end("<h1>Hello World!</h1>")
})