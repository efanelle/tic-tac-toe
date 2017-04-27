'use strict';
var express = require('express');
var path = require('path')
var app = express();
// setting port
var port = process.env.PORT || 8080;
// serving static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, function() {
  console.log('Go witness the magic at http://localhost:' + port);
})