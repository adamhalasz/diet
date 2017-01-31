// Require File System Module
var fs = require('fs')

// Require Diet
var server = require('../../index')

// Create Server Instance
var app = server()

// Listen on Port 8000
app.listen(8000)

// Register RouteHandler for "http://localhost:8000/"
app.get('/', function($){

	// set "Content-Type" header to "text/html"
	$.header('Content-Type', 'text/html')

	// Read file at ~/yourProject/index.html
    fs.readFile(__dirname+'/index.html',function(error, content){
    	// handle error
    	if(error) throw error;
    	
    	// Serve the file to the client
        $.end(content.toString())
    })
})