# Diet
[http://dietjs.com/](http://dietjs.com/)

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
app = Application.setup({
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

### Recommended Folder Structure
```
/comet
	index.js
/email
	index.js
	/templates
		signup.txt
		signup.html
/resources
	/html
		index.html
	/images
	/styles
	/scripts
	/fonts
/paths
	pages.js
	account.js
server.js
```	

### Running the app
I recommend using `nodemon` to run the app so every time you save a file the server restarts. It makes the development much faster. 

Install nodemon with :
```
npm install nodemon -g
```
Then start with:
```
	nodemon server.js
```

### Running the app as a service
I recommend using `forever` to keep your app running all the time:
```
	npm install forever -g
```
Then start with:
```
	forever start -c nodemon server.js
```

### Diet Codex (Documentation and website coming soon...)
- Installation
- Concepts
- Syntax
- HTML Templates
- Page Routing
- Database
- Accounts
- Files
- Dictionary
- Notifications
- Email
- Tasks
- Misceleneous
	