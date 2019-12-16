var express = require('express');
var app = express();
var learningAgreementControl = require('./app/controllers/learningAgreementControl');
var learningAgreement = require('./app/models/learningAgreement');

app.get('/', function (req, res) {
    res.send("Hello World");
});

app.get('/compileStudent', function (req, res) {
  //TO DO send parameters from rquest to control
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