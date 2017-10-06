var express = require('express');
var app = express();

app.get('/', function (req, res, next) {
  res.send('Hello BME!');
});

var server = app.listen(3000, function () {
  console.log('Running on :3000');
});
