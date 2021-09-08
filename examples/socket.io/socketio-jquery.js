const app =  require('diet')();
app.listen(8000)
const io = require('socket.io')(app.server)

io.on('connection',  sock => {
 	sock.on('message', msg =>{
           console.log(msg);
           io.sockets.emit("message",msg);
	});
});

app.get('/', function($){
    $.header('content-type', 'text/html');
    $.end( '<!DOCTYPE html>'
        + '<html>'
        + '<head><meta http-equiv="content-type" content="text/html; charset=utf-8">'
        +     '<title>Diet + Socket.io</title>'
        +     '<script src="//cdn.bootcss.com/jquery/3.3.1/jquery.min.js" ></script>'
        +     '<script src="/socket.io/socket.io.js"></script>'
        +     '<script>var socket = io();</script>'
        + '</head>'
        + '<body><input name="msg" id="msg" ><button id="btn">send!</button><ul id="hist"></ul>'
		+     '<script>socket.on("message",function(msg){ $("#hist").append("<li>"+msg);});$("#btn").on("click",function(){ socket.send($("#msg").val());$("#msg").val("");});</script>'
        + '</body>'
        + '</html>');
});
 