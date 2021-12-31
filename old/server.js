const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const props = require('./public/props.js');
const assets = require("./assets");

var PORT = process.argv[2];
if(!PORT)
  PORT = 8585;

const app = express();
app.use("/assets", assets);

app.use(bodyParser.json()); 
app.use(express.static('public'));

const listener = app.listen(process.env.PORT || PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});