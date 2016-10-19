var server = require('../../')
var app = server()
app.listen('http://localhost:8086/')     // Listen on Localhost

// express.js
/* Example express app demonstrating internatl express routing inside the app 
var app = express();
app.use(function (req,res,next) {
    console.log('Nice', typeof req, typeof res, typeof next)
    res.values = 'Express'
    next()
})

app.use(function (req,res,next) {
    console.log('Nice2', typeof req, typeof res, typeof next)
    // res.end(res.values)
    next()
    
})
*/

// Require the DIREKTSPEED Servers express-middelware module 
// as dssrv is based on Diet.JS and configure it
var myExpressApp = require('express-middelware')(require('./express.js')
var attachExpressApp = myExpressApp.attachExpress
var useExpressApp = myExpressApp.useExpress

// useExpressApp adds the $.eapp to your signal then you can use it
// useExpressApp uses directly the express app or middelware and then returns processing to Diet.JS or DIREKTSPEED Server
app.get('/', attachExpressApp, function($){
    $.eapp()
}, useExpressApp
, function($){
    $.end('Diet.JS + ' + $.response.values) // -> Diet.JS + Express
})