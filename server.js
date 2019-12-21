var express = require('express');
var app = express();
var signupControl= require('./app/controllers/registerControl.js');
var bodyParser= require('body-parser');
var cookieParser= require('cookie-parser');

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function (req, res) {
    res.sendFile('app/views/signup.html',{root: __dirname});
});

app.post('/signup', function(req, res) {
  var signupUser=signupControl.signup(req, res);
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!');
});