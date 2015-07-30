var server = require('../../')
var app = server({ silent: true });
app.listen(80)
app.listen(8000)
app.get('/', function($){
    $.end('silent hello world from ' + $.headers.host);
})