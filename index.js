require('sugar')
var hosts 	= {}
var servers = {}
var Server 	= require('./models/server')
var Router 	= require('./models/router')
function App(path){
	this.path 		= path
	this.dir 		= this.path.match(/([^\/]*)\/*$/)[1]
	this.hosts 		= hosts
	this.listen 	= new Server(this, hosts, servers)
	this.get 		= new Router('get', this)
	this.post 		= new Router('post', this)
	this.header 	= new Router('header', this)
	this.footer 	= new Router('footer', this)
	this.missing 	= new Router('missing', this)
	this.error 		= new Router('error', this)
	return this
}
module.exports = function(){
	return new App(require('path').dirname(require('callsite')()[1].getFileName()))
}
require('colors'); process.stdout.write('\u001B[2J\u001B[0;0f'+' ➭ Diet '.inverse+(' ('+JSON.parse(require('fs').readFileSync(__dirname+'/package.json').toString()).version+') ☺\n http://dietjs.com/').dim+'\n\n')