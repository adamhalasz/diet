// Create server
var server = require('../../')
var app = server()
app.listen(5000)

// Register a route that downloads the /image.png as diet_logo.png
app.get('/', function($){
    $.download('./image.png', 'diet_logo.png')
})