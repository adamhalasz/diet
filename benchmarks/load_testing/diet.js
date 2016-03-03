var server = require('diet')
var app = server()
app.listen(7777)
app.get('/', function($){ 
	$.end('Hello World\n') 
})