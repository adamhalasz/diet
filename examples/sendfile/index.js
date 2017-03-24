// Create server
var server = require('../../')
var app = server()
app.listen(5000)

// Register a route that sends the image relative to this folder
app.get('/', function($){
	console.log('Sending file', '/image.png')
    $.sendFile('./image.png')
})

// Register a route that sends the image with a specific path
app.get('/full', function($){
	console.log('Sending file', app.path+'/image.png')
    $.sendFile(app.path+'/image.png')
})

// Register a route that sends the image with a specific path
app.get('/html', function($){
	console.log('Sending html file','./index.html')
    $.sendFile('./index.html')
})