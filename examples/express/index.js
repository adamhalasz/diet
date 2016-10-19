var server = require('../../')
var app = server()
app.listen('http://localhost:8086/')     // Listen on Localhost

// Require the DIREKTSPEED Servers express-middelware module 
// as dssrv is based on Diet.JS and configure it
var myExpressApp = require('express-middelware')(require('./express.js'))

// You can Modify your express app and access it
// usefull if you use myExpressApp.attach $.eapp() later in process
// only needed for complex scenarios
myExpressApp.eapp.use(function(req,res,next) {
    console.log('I GOT USED!')
})

// myExpressApp.use uses directly the express app or middelware and then returns processing to Diet.JS or DIREKTSPEED Server
app.get('/', 
    myExpressApp.use,
    function($){
        $.end('Diet.JS + ' + $.response.values) // -> Diet.JS + Express
})