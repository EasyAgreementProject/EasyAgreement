var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var learningAgreementControl = require('./app/controllers/learningAgreementControl');
var cookieParser = require('cookie-parser');
var signupControl= require('./app/controllers/registerControl.js');
var loginControl= require('./app/controllers/loginControl');
var bodyParser= require('body-parser');
var session = require('express-session');

//Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({  
  secret: 'secret_session',  
  resave: false,  
  saveUninitialized: true    
})); 

app.use(function(req,res,next) {  
  res.locals.session = req.session;  
  next();   
}); 

app.get('/compileLAStudent.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/app/views/compileLAStudent.html"))
});

app.get('/viewLA.html', function(req, res){
    res.sendFile(path.join(__dirname + "/app/views/viewLA.html"))
});

app.get('/index.html', function(req, res){
  res.sendFile(path.join(__dirname + "/app/views/index.html"))
});

app.get('/getAllVersions', function(req, res) {
  var getVersionsPr = learningAgreementControl.getAllVersions('v.volpicelli4@studenti.unisa.it');
  getVersionsPr.then(function(data) {
      if (data) {
          res.send(data);
      }
  })
});

app.get('/fillForm', function(req, res) {
    var getData = learningAgreementControl.getData(req.session.utente.utente.Email);
    console.log("Student = "+req.session.utente.utente.Email);
    getData.then(function(data) {
        if (data) {
            res.send(data);
        }
    })
});

app.get('/getStatus', function(req, res) {
  var getStatus = learningAgreementControl.getStatus(req.session.utente.utente.Email);
  console.log("Student Status = "+req.session.utente.utente.Email);
    getStatus.then(function(status) {
        if (status) {
            console.log("Status = "+status);
            res.send(status);
        }
    })
});

app.post('/compileStudent', function(req, res) {
    var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCycle,
        req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactName, req.body.inputContactSending,
        req.body.inputNameSector, req.body.inputDepartmentReciving, req.body.inputAddressWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, req.body.inputContactReciving,
        req.body.inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed,
        req.body.inputKnowledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel
    ];
    var sendStudent = learningAgreementControl.sendLaStudent(data, res);
    sendStudent.then(function(la) {
        if (la) {
            var document = la.document;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
            document.pipe(res)
        } else {
            res.sendFile(path.join(__dirname + "/app/views/compileLAStudent.html"));
        }
    })
});

app.get('/saveCompilation', function(req, res) {
    var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCycle,
      req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactName, req.body.inputContactSending,
      req.body.inputNameSector, req.body.inputDepartmentReciving, req.body.inputAddressWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, req.body.inputContactReciving,
      req.body.inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed,
      req.body.inputKnowledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel
    ];
    var saveStudent = learningAgreementControl.saveLaStudent(data);
    saveStudent.then(function(file) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
        file.pipe(res);
    });
});

app.get('/getVersion', function(req, res) {
  var getVersionsPr = learningAgreementControl.getAllVersions('v.volpicelli4@studenti.unisa.it');
  getVersionsPr.then(function(data) {
      if (data && req.query.inputVersion) {
        console.log("Version id = "+req.query.number)
        var getVersionPr = learningAgreementControl.getVersion(req.query.inputVersion, 'v.volpicelli4@studenti.unisa.it');
        getVersionPr.then(function(la) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');        
          console.log("Tornato da tutto"); 
          var obj;
          while (null !== (obj = la.read())) {
            console.log(obj);
          }
          la.pipe(res);
        })        
        
    } else {
        res.sendFile(path.join(__dirname + "/app/views/viewLA.html"));
    }
  })
});

app.get('/', function (req, res) {
  res.sendFile("/app/views/login.html",{root:__dirname});
});

app.get('/signup.html', function (req, res) {
  res.sendFile("/app/views/signup.html",{root:__dirname});
});

app.post('/signup', function(req, res) {
  var signupUser=signupControl.signup(req, res);
});

app.post('/login', function(request, response){
  var UserLogin= loginControl.login(request,response);
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!');
});
