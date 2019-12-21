var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var cookieParser= require('cookie-parser');
var session = require('express-session');

var loginControl= require('./app/controllers/loginControl');


//Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({  
  secret: 'secret_session',  
  resave: false,  
  saveUninitialized: true    
})); 

app.use(function(req,res,next) {  
  res.locals.session = req.session;  
  next();   
});  

app.get('/', function (req, res) {
    res.sendFile("/app/views/login.html",{root:__dirname});
});

app.post('/login', function(request, response){
  var UserLogin= loginControl.login(request,response);
});


app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!');
});