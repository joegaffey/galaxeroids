var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var props = require('./public/props.js');

var PORT = process.argv[2];
if(!PORT)
  PORT = 8585;

app.use(bodyParser.json()); 
app.use(express.static('public'));


var listener = app.listen(process.env.PORT || PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
