var server = require('diet')
var qs = require('querystring')
var app = new server()
app.domain('http://localhost:9000')
app.start()

app.get('/', function($){
	$.header('content-type', 'text/html')
	$.send('<!DOCTYPE html>')
	$.send('<html>')
	$.send(		'<title>Diet: Body Example</title>')
	$.send(		'<meta charset="UTF-8"/>')
	$.send(		'<style>*{margin:0;padding:0;}body{ background:#eee; font-family:sans-serif} a{color:#01C;} h1{ font-size:41px; margin-bottom:10px; } a{  text-decoration:none; } a:hover{ text-decoration:underline;} input{ width:40px; text-align:center; border:1px solid #ccc; border-top:1px solid #aaa; padding: 7px 12px; font-size:14px; outline:none; margin-bottom:5px; } input[type="text"]:hover{ border:1px solid #999; } input[type="text"]:focus{ border:1px solid #36C;background:#36C; color:#FFF; } button{ background:#1D9469; color:#FFF; border:none; font-size:12px; font-weight:bold; padding:8px 15px; cursor:pointer; } button:hover{ background:#555; } form{ box-shadow: 3px 0px 3px rgba(0,0,0,0.1); text-align:right; float:left; display:inline; background:#fff; padding:60px; margin-right:60px;  } div{ display:inline; margin-left:40px;} div h3{ margin-top:60px; font-size:41px; font-weight:normal; color:#5E5E5E; } hr{ border:none; background:none; border-top:2px solid #ddd; } label{ color:#888; text-align:right; width: 120px; float:left; margin-right:15px; text-transform:uppercase; font-size:10px; font-weight:bold; margin-top: 11px; } .row{margin-top:4px;} code{ background:#1D9469; color:#FFF; font-size:14px; padding:40px; display:block; margin:20px 0; } p{ color:#999; font-size:10px; font-weight:bold; text-transform:uppercase; }</style>')
	$.send('</head>')
	$.send('<body>')
	$.send(		'<form action="/" method="POST">')
	$.send(			'<h1><a href="/">Form</a></h1>')
	$.send(			'<hr><br><button type="submit">Submit Form</button><br><br><hr><br>')
	$.send(			'<label>string (string):</label> <input type="text" name="string" value="hello" /><br><br>')
	$.send(			'<label>yes (boolean):</label> <input type="text" name="yes" value="true" /><br>')
	$.send(			'<label>no (boolean):</label> <input type="text" name="no" value="false" /><br><br>')
	
	$.send(			'<label>array:</label> <input type="text" name="array" value="1" /><br>')
	$.send(			'<label>array:</label> <input type="text" name="array" value="2" /><br><br>')
	
	$.send(			'<label>array[0]:</label> <input type="text" name="array2[0]" value="1" /><br>')
	$.send(			'<label>array[1]:</label> <input type="text" name="array2[1]" value="2" /><br><br>')
	
	$.send(			'<label class="row">object[a]:</label> <input type="text" name="object[a]" value="1" /><br>')
	$.send(			'<label class="row">object[a]:</label> <input type="text" name="object[a]" value="2" /><br><br>')
	$.send(			'<label>object[c][d]:</label> <input type="text" name="object[c][d]" value="3" /><br>')
	$.send(			'<label>object[c][e][f]:</label> <input type="text" name="object[c][e][f]" value="4" /><br><br>')
	$.send(			'<label>object2[g]:</label> <input type="text" name="object2[g]" value="5" /><br>')
	$.send(			'<label>object2[h][i]:</label> <input type="text" name="object2[h][i]" value="6" /><br>')
	$.send(			'<label>object2[j][k][l]:</label> <input type="text" name="object2[j][k][l]" value="7" /><br><br>')
	$.send(			'<hr><br><button type="submit">Submit Form</button><br><br><br><br>')
	$.send(		'</form>')
	
	if(Object.size($.query)){
		$.send('<div>')
		$.send(	'<h3>Success:</h3>')
		$.send(	'<p>The form was submitted & parsed successfully:</p>')
		$.send(		'<code>'+JSON.stringify($.query)+'</code>')
		
		
		$.send(	'<br><br><a href="/">Reset</a>')
		$.send('</div>')
	}
	$.send('<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>');
	$.send('</body>')
	$.send('</html>')
	
	$.end()
})

app.post('/', function($){
	console.log('AFTER POST');
	
	
	var first = $.qs.stringify($.body);
	console.log('FIRST STRINGIFY', first);
	
	
	first = $.qs.parse(first);
	console.log('THEN PARSE', first);
	
	first = $.qs.stringify(first)
	console.log('LASTLY STRINGIFY', first);
	
	console.log('AFTER BODY');
	$.redirect('/?'+$.qs.stringify($.body));
	
})