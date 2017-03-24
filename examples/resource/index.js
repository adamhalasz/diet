// Create server
var server = require('../../')
var app = server()
app.listen(5000)

app.resource('/user/:id?')
   .get(function($){ $.end('GET user ' + $.params.id) })
   .post(function($){ $.end('POST user ' + $.params.id) })
   .put(function($){ $.end('PUT user ' + $.params.id) })
   .delete(function($){ $.end('DELETE user ' + $.params.id) })

var book = app.resource('/book/:id?')
    book.get(function($){ $.end('GET book ' + $.params.id) })
    book.post(function($){ $.end('POST book ' + $.params.id) })
    book.put(function($){ $.end('PUT book ' + $.params.id) })
    book.delete(function($){ $.end('DELETE book ' + $.params.id) })
    
