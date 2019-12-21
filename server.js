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
    getData.then(function(data) {
        if (data) {
            res.send(data);
        }
    })
});

app.get('/compileStudent', function(req, res) {
    var data = [req.query.inputName, req.query.inputSurname, req.query.inputDate, req.query.inputTelephone, req.query.radio1, req.query.nationality, req.query.inputStudyCicle, 
                req.query.inputAcademicYear1, req.query.inputAcademicYear2, req.query.inputSubjectCode, req.query.inputEmail. req.query.inputDepartmentSending, req.query.inputContactSending, 
                req.query.inputNameSector, req.query.inputDepartmentReciving, req.query.inputWebSite, req.query.inputCountry, req.query.inputSizeEnterprise, req.query.inputContactReciving, 
                req.query.inputMentor, req.query.inputMentorInfo, req.query.inputDateFrom, req.query.inputDateTo, req.query.inputHourWork, req.query.inputTitle, req.query.inputDetailed, 
                req.query.inputKnoledge, req.query.inputMonitoring, req.query.inputEvaluation, req.query.inputLenguage, req.query.inputLenguageLevel, req.query.inputDateCompilation];
    var sendStudent = learningAgreementControl.sendLaStudent(data);
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
    var data = [req.query.inputName, req.query.inputSurname, req.query.inputDate, req.query.inputTelephone, req.query.radio1, req.query.nationality, req.query.inputStudyCicle, 
        req.query.inputAcademicYear1, req.query.inputAcademicYear2, req.query.inputSubjectCode, req.query.inputEmail. req.query.inputDepartmentSending, req.query.inputContactSending, 
        req.query.inputNameSector, req.query.inputDepartmentReciving, req.query.inputWebSite, req.query.inputCountry, req.query.inputSizeEnterprise, req.query.inputContactReciving, 
        req.query.inputMentor, req.query.inputMentorInfo, req.query.inputDateFrom, req.query.inputDateTo, req.query.inputHourWork, req.query.inputTitle, req.query.inputDetailed, 
        req.query.inputKnoledge, req.query.inputMonitoring, req.query.inputEvaluation, req.query.inputLenguage, req.query.inputLenguageLevel, req.query.inputDateCompilation];
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