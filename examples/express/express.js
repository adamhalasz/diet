var express = require('express')


/* Example express app demonstrating internatl express routing inside the app */
var eapp = express();
eapp.use(function (req,res,next) {
    console.log('Nice', typeof req, typeof res, typeof next)
    res.values = 'Express'
    next()
})

eapp.use(function (req,res,next) {
    console.log('Nice2', typeof req, typeof res, typeof next)
    // res.end(res.values)
    next()
    
})
module.exports = eapp