// Diet Server
var server = require('diet')
var app = server()
app.listen(8000)

// Socket.io
var io = require('socket.io')(app.server) // <-- use app.server 

// Listen on websocket connection
io.on('connection', function(socket){
    console.log(' ... socket.io: A USER CONNECTED');
});

// Route for "HTTP GET /"
app.get('/', function($){
    $.header('content-type', 'text/html');
    $.end( '<!DOCTYPE html>'
        + '<html>'
        + '<head>'
        +     '<title>Diet + Socket.io</title>'
        +     '<script src="/socket.io/socket.io.js"></script>'
        +     '<script>var socket = io();</script>'
        + '</head>'
        + '<body>'
        +     '<h1>check your console!</h1>'
        + '</body>'
        + '</html>');
});