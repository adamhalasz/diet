var server = require('../../')
var app = server()
app.listen(3000)
app.get('/', function($){
    console.log('1st route', '1st middleware')
    $.end('hello world!', true); // <-- stop middleware chain
}, function(){
    console.log('1st route', '2nd middleware')
})

app.get('/', function(){
    console.log('2nd route', '1st middleware')
})