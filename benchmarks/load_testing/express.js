var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

app.listen(7777, function () {
  console.log('Example app listening on port 7777!');
});