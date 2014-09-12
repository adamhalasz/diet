require('diet');
require('colors')

describe('Test: App', function(){	
	it('new App()'.white+' - should create new App Instance listening on http://localhost:3000/'.grey, function(){
		var app = new App({debug: false});
		app.domain('http://localhost:3000/');
		app.start();
	})
});