var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Hello World");
    var a = 1;
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 3000!');
});