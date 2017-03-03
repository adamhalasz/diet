var server = require("../../");

var app = server();

app.listen(3000);

app.get('/', function($){ $.sendFile('./index.html') })
app.post('/upload', function($){ $.end('multipart: ' + $.multipart) })

app.header(function($){
    console.log({
        url: $.url,
        method: $.method,
        body: $.body,
        multipart: $.multipart
    });

    $.header('Access-Control-Allow-Origin', '*');
    $.header('Access-Control-Allow-Headers', 'Content-Type');
    $.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    $.header('Access-Control-Allow-Credentials', true);
    
    $.return();
});