"use strict";

var express = require("express");

var http = require("http");

var morgan = require("morgan");

var dishRouter = require('./routes/dishRouter');

var promoRouter = require('./routes/promoRouter');

var leaderRouter = require('./routes/leaderRouter');

var hostname = 'localhost';
var port = 3000;
var app = express();
app.use(morgan('dev'));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use(express["static"](__dirname + '/public'));
app.use(express.json());
app.use(function (req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1> This is a Express Server </h1></body></html>');
});
var server = http.createServer(app);
server.listen(port, hostname, function () {
  console.log("Server runningh at http://".concat(hostname, ":").concat(port));
});