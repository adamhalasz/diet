// Create HTTP Server
var server = require('diet')
var app = server()
app.listen(3500)

// Setup Nunjucks
var nunjucks = require('nunjucks')
    nunjucks.configure(app.path+'/views', { autoescape: true, watch: true });

// Enable HTML Template
app.view('html', nunjucks.render)

// Route
app.get('/', function($){
    $.data.title = 'A nice list';
    $.data.items = [{ title: 'List Item 1' }, { title: 'List Item 2'}];
    $.end()
})