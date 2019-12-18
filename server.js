var express = require('express');
var app = express();

app.use(express.static("public"));
app.use(express.static("node_modules"));

app.get('/', function (req, res) {
    res.sendFile('app/views/signup.html',{root: __dirname});
});

app.post('/signup', function(req, res) {
  var signupUser=signupControl.signup(req);
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!');
});