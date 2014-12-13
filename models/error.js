var RouteIterator = require('./iterator')

function parseStackTrace(stacktrace){
	var lines = []
	stacktrace.forEach(function(line){
		lines.push(line
		.replace(/\</gi, '&lt;').replace(/\>/gi, '&gt;')
		.replace(/at\s([^\(\)]+)((:[0-9]+))/gi, '<span style="color:#B6B6B6; font-size:12px;">at</span> <span style="color:#a021a5;">$1$2</span>').replace(/at\s([^\(\)]+)\s/gi, function(all, match){
			var tags = match.split('.')
			tags[0] = '<span style="background:#F8F8F9; border:1px solid #D3D3D3; border-radius:3px; color:#333; padding:0 3px;">'+tags[0]+'</span>'
			return '<span style="color:#B6B6B6; font-size:12px;">at</span> <span style="color:#007f1f;">'+tags.join('<span style="color:#6a6dc5;">.</span>')+'</span> '
		}).replace(/\s\s\s\s/gi, '<div style="margin-left:30px; float:left; height:18px; clear:both;"> </div>').replace(/\(([^\)]+)\)/gi, '<span style="color:#E2E2E2;">(</span><span style="color:#a021a5;">"$1"</span><span style="color:#E2E2E2;">)</span>')
		)	
	})
	return lines.join('<div class="newLine" style="margin:3px 0;"> </div>')
}

function errorTemplate(signal, error){
	return 	'<div style="font-size:13px; line-height:18px;;">'
	+		'<div style="font-family: monaco, monospace, \'Lucida Console\'; clear:both;">' 
	+ 			'<h2 style="font-weight:normal;margin: 15px 0 13px 0;line-height: 14px;font-size: 14px;color: #E42616;"><span style="color: #FFFFFF;background: #EC5C50;padding: 2px 8px;border-radius: 3px;font-size: 12px;font-weight: bold;font-family: sans-serif;float: left;margin-top: -2px;margin-right: 9px;box-shadow: inset 0 0 1px rgba(0,0,0,.6);">'+ error.name +'</span> '+ error.message.replace(/\</gi, '&lt;').replace(/\>/gi, '&gt;') +'</h2>'
	+	((error.stack) ? parseStackTrace(error.stack.split('\n').splice(1)) : '')
	+	'</div>'
	+'</div>'	
	
}

module.exports = function(error, signal, app){
	signal.status(500)
	try {
		signal.fail.template = errorTemplate(signal, error)
		new RouteIterator(app.routes.error, signal, function(){ displayErrorPage(error) }, 'error')
	} catch (error) {
		displayErrorPage(error)
	}
	function displayErrorPage(error){
		if(signal.header('x-requested-with') != 'XMLHttpRequest'){
			signal.header('content-type', 'text/html; charset=UTF-8');
			signal.end('<!doctype html/><html><head><title>'+signal.statusCode+' '+signal.statusMessage+'</title></head><body><div style="padding: 0 25px;">'+'<h1 style="font-family: monaco, monospace, \'Lucida Console\';font-weight:lighter;font-size: 18px;margin: 25px 0 10px 0;color: #BDBDBD;">'+signal.statusCode+' '+signal.statusMessage+'</h1>' + errorTemplate(signal, error)+'</div></body></html>');
		} else {
			signal.header('content-type', 'text/plain');
			signal.end(error.stack);
		}
	}
}