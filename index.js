require('sugar')
var hosts   = {}
var servers = {}
var Server  = require('./models/server')
var Router  = require('./models/router')
function App(path){
	this.path       = path
	this.dir        = this.path.match(/([^\/]*)\/*$/)[1]
	this.hosts      = hosts
	this.listen     = new Server(this, hosts, servers)
	this.get        = new Router('get'     , 'method' , this)
	this.post       = new Router('post'    , 'method' , this)  
	this.head       = new Router('head'    , 'method' , this)  
	this.put        = new Router('put'     , 'method' , this)  
	this.delete     = new Router('delete'  , 'method' , this) 
	this.patch      = new Router('patch'   , 'method' , this)
	this.trace      = new Router('trace'   , 'method' , this)
	this.options    = new Router('options' , 'method' , this)
	this.header     = new Router('header'  , 'api'    , this)
	this.footer     = new Router('footer'  , 'api'    , this) 
	this.missing    = new Router('missing' , 'api'    , this) 
	this.error      = new Router('error'   , 'api'    , this) 
	return this
}
module.exports = function(){
	return new App(require('path').dirname(require('callsite')()[1].getFileName()))
}
require('colors'); process.stdout.write('\u001B[2J\u001B[0;0f'+' ➭ Diet '.inverse+(' ('+JSON.parse(require('fs').readFileSync(__dirname+'/package.json').toString()).version+') ☺\n http://dietjs.com/').dim+'\n\n')