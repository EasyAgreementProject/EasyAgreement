var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var learningAgreementControl = require('./app/controllers/learningAgreementControl');
var cookieParser = require('cookie-parser');

//Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/app/views/compileLAStudent.html"))
});

app.get('/fillForm', function(req, res) {
    var getData = learningAgreementControl.getData(req.query.student);
    getData.then(function(data) {
        if (data) {
            res.send(data);
        }
    })
});

app.post('/compileStudent', function(req, res) {
    var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCicle, 
                req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactSending, 
                req.body.inputNameSector, req.body.inputDepartmentReciving, req.body.inputWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, req.body.inputContactReciving, 
                req.body.inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed, 
                req.body.inputKnoledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel, req.body.inputDateCompilation, 
                req.body.inputContactName, req.body.inputContactReciving];
    var sendStudent = learningAgreementControl.sendLaStudent(data);
    sendStudent.then(function(la) {
        if(la) {
            var document = la.document;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
            document.pipe(res)
        }
        else {
            res.send("Format error");
        }
    })
 });

app.get('/saveCompilation', function(req, res) {
    var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCicle, 
        req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactSending, 
        req.body.inputNameSector, req.body.inputDepartmentReciving, req.body.inputWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, req.body.inputContactReciving, 
        req.body.inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed, 
        req.body.inputKnoledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel, req.body.inputDateCompilation, 
        req.body.inputContactName, req.body.inputContactReciving];
    var saveStudent = learningAgreementControl.saveLaStudent(data);
    saveStudent.then(function(file) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
        file.pipe(res)
    });
});

app.listen(8080, function() {
    console.log('EasyAgreement Platform listening on port 3000!');
});