var express = require('express');
var app = express();
var path = require('path');
var learningAgreementControl = require('./app/controllers/learningAgreementControl');

//Loading static files from CSS and Bootstrap module
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/app/views/index.html"))
});

app.get('/compileStudent', function (req, res) {
  //TO DO send parameters from rquest to controller
  var compileStudent = learningAgreementControl.compileLaStudent();
  compileStudent.then(function(la) {
    var document = la.document;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
    document.pipe(res)
  });
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 3000!');
});