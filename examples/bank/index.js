// cd ~/yourProject/index.js
var server = require('diet')
var app = new server()

// setup domain
app.domain('http://localhost:8000/')

// use the bank plugin
app.plugin('bank', { name: 'John Doe', vault: 6 })

// use the convert plugin with a reference
var convert = app.plugin('convert')

// start the application
app.start()

// instruct our app to
// print 'The "Y Bank" owns X coins'
// upon visiting /
app.get('/', function($){
	$.end('The "'+ $.bank.name +' Bank" ' + 'has $'+ $.bank.vault)
})

// instruct our app to
// deposit X amount coins into the vault 
// upon visiting /banks/deposit/10 
app.get('/bank/deposit/:amount', function($){
	$.bank.deposit($.params.amount)
	$.redirect('home')
})

// instruct our app to
// withdraw X amount coins from the vault
// upon visiting /banks/withdraw/5  
app.get('/bank/withdraw/:amount', function($){
	$.bank.withdraw($.params.amount)
	$.redirect('home')
})

// instruct our app to
// print 'The "Y Bank" owns X(symbol) Z.'
// upon visiting /
app.get('/convert/:currency', convert, function($){
	$.end('The "'+ $.bank.name +' Bank" '
	    + 'has '+ $.convert.symbol + $.convert.amount + '.')
})