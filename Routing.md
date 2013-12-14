# App Routing & Working with URL's 
How routing is done in the Application Framework.

## Route Types
Only `GET` and `POST` is supported for now. Each of these have a default mysql version and a simple one without mysql.

- **app.get**(path, callback)
- **app.get.simple**(path, callback) `get without mysql`
- **app.post**(path, callback)
- **app.post.simple**(path, callback) `post without mysql`

## What is the difference between `GET` and `POST`?
- GET is used where there are not too many headers and input from the client. Like serving pages and simple ajax requests.
- POST is used where clients send a lots of headers or input data. Like form handling, and file uploads and sometimes complex ajax requests.

## Why is there a simple version without mysql?
- Because mysql slows the loading process, and there are some uses cases where mysql is not needed at all, like  changing an httpOnly cookie.

## Route Arguments 
- **path**: 
	- Path always starts with `/`.
	- Simply `/` is the index of your website like `example.com`
	- You can use a string like `/about`, `/contact` for simple static routing.
	- You can use regular expressions for dynamic pages like: `/\/users/\/([a-zA-Z0-9_-])\/?/i` for users. Never use `g` operator only `i`.
	- You can access the id in the above regex inside `request.params`, under `request.params[1]`, `[0]` is the fully parsed regex.
- **callback** comes with 3 arguments:
	- **request**: This is an object that holds informations about the clients request, like the URL, IP, Cookies and many more.
	- **response**: This is an object which is used to send a response to the client. Think of it as a guide for your client, you can specify the statusCode here like 404 if the page is not found. You can manipulate headers and cookies and end the request with a data response using `response.end` or `repsonse.html`.
	- **mysql** `only if mysql is enabled`: it is a function what you can use to send custom queries and it is a mysql map too. [More on mysql here](https://bitbucket.org/adamhalasz/node.js-application-infrastructure/src/54080a665885/application/lib/mysql?at=master)
	
## Route callback: request
Holds everything that the original node.js request has and these special ones:

- **request.query**: The URL's querystring(`/?a=1&b=2`) in JSON `{a: 1, b: 2}`
- **request.params**: The URL's regex parts. In `/\/user/\/([a-zA-Z0-9_-])\/?/i`, `request.params[1]` is the user id.
- **request.body**: JSON based POST body
- **request.cookies**: Get cookies like this `request.cookies.user_id`
- **request.url**: Current url parsed into a JSON object
- **request.visitor**: Visitor informations (`*NRS` = not reliable source)
	- ip 			`(ex : 127.0.0.1)`
	- country 		`(ex : Hungary)`
	- countryCode 	`(ex : HUN)`
	- region 		`(ex : 16)`
	- city 			`(ex : Budapest)`, `*NRS`
	- latitude 		`(ex : 40.28329849243164)`, `*NRS`
	- longitude 	`(ex : 19.066699981689453)`, `*NRS`
	- continent 	`(ex : EU)`

## Route callback: response
Holds everything that the original node.js response has like:

- **response.setHeader**
- **response.end** 

And these special ones:

- **response.cookies** 
- **response.head** 
- **response.html**