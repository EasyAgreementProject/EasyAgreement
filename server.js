var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var learningAgreementControl = require('./app/controllers/learningAgreementControl');

//Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/app/views/compileLAStudent.html"))
});

app.get('/fillForm', function(req, res) {
    var getData = learningAgreementControl.getData(req.query.student);
<<<<<<< HEAD
    getData.then(function(data) {
        if (data) {
=======
    getData.then(function(data){
        if(data) {
            console.log("Sex: "+data["Sex [M/F]"]+"    Birth: "+data["Date of birth"]);
>>>>>>> daedeaf4870062c0b192eee6b970c75f15aa0841
            res.send(data);
        }
    })
});

app.get('/compileStudent', function(req, res) {
    // var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCicle, req.body.inputAcademicYear, req.body.inputCode, req.body.inputEmail];
    var sendStudent = learningAgreementControl.sendLaStudent();
    sendStudent.then(function(la) {
        var document = la.document;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
        document.pipe(res)
    });
    sendStudent.catch(function() {
        res.send('error');
    })
});

app.get('/saveCompilation', function(req, res) {
    var saveStudent = learningAgreementControl.saveLaStudent();
    saveStudent.then(function(file) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
        file.pipe(res)
    });
});

app.listen(8080, function() {
    console.log('EasyAgreement Platform listening on port 3000!');
});