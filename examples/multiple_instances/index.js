var server = require('../../')
var app = server({ silent: true })
app.listen(7000)
app.get('/', function($){
    $.end('hello world from '+$.headers.host);
})

var app2 = server({ silent: true })
app2.listen(8000)
app2.get('/', function($){
    $.end('hello world from '+$.headers.host);
})