var server = require('../../')
var app = server()
    .listen(5000)
    .get('/')
    .get('/second')

app.onAny(function(value){
    var path = value && value.route ? 'path='+value.route.path : '' ;
    
    if(path.indexOf('function') != -1){
        var path = value && value.method ? 'method='+value.method : 'method="unknown"'; 
    }
    
    var controller = value && value.controller ? 'controller='+value.controller : '' ;
    var url = value && value.signal && value.signal.url ? 'url="'+value.signal.url.href+'"' : '' ;
    
    console.log(' ... APP', url, 'event="' + this.event + '"', path, controller)
})  