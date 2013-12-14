# Dietjs (Dec 14 - STATUS: **Alpha**, under heavy development)

### Warning
I need a few days to make the framework work smoothly with the sub-modules in it's new environment. If it works for you then awesome! But please don't rely on it until the status is **Stable**.

### Install
```
npm install diet
```

### How to create a simple "Hello World!" website?
```javascript
// Require Framework
var Application = require('diet');

// Setup Application

app = new Application({
	'domain'	: 'localhost',
	'port'		: 80,
	'path'      : __dirname,
	'public'    : __dirname + '/resources',
	'mysql' 	: {
		host 	 : 'localhost',
		user 	 : 'your_username',
		password : 'your_password',
		database : 'your_database'
	}
});

app.get('/', function(request, response, mysql){
	response.end('Hello World!');
	mysql.end();
});
```

### Create a new app (NOT IMPLEMENTED YET)
```
diet create newApp
```
### Folder Structure
```
/comet
	index.js
/email
	index.js
	templates
		signup.txt
		signup.html
/resources
	html
		index.html
	images
	styles
	scripts
	fonts
/paths
	pages.js
	account.js
server.js
```	

### Running the app	
```
cd newApp
nodemon server.js
```

### Running the app as a service
```
	forever start -c nodemon server.js
```

### Diet Modules
- html
- accounts
- mysql
- upload
- demand
- next
- mail
- request
	