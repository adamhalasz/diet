// Create server
var server = require('../../')
var app = server()
app.listen(5000)

// Register a route calling an undefined function to throw an exception
app.get('/', function($){
    $.callUndefinedFunction()
})

// Handle Internal Server Errors
app.error(function($){
	$.send('Error')
	$.send('\n [Status Message]: ' + $.statusMessage)
	$.send('\n [Status Code]: ' + $.statusCode)
	$.send('\n [Error Message]: ' + $.error('message'))
	$.send('\n [Error Stack]: ' + $.error('stack'))
	$.end()
})