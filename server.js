var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var learningAgreementControl = require('./app/controllers/learningAgreementControl');
var cookieParser = require('cookie-parser');
var signupControl= require('./app/controllers/registerControl.js');
var loginControl= require('./app/controllers/loginControl');
var studentControl= require('./app/controllers/studentControl');
var academicTutorControl= require('./app/controllers/academicTutorControl');
var externalTutorControl= require('./app/controllers/externalTutorControl');
var administratorControl= require('./app/controllers/administratorControl');


var bodyParser= require('body-parser');
var session = require('express-session');

//Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.get('/compileLAStudent.html', function(req, res) {
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
        file.pipe(res)
    });
});

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

app.get('/signup.html', function (req, res) {
  res.sendFile("/app/views/signup.html",{root:__dirname});
});

app.post('/signup', function(req, res) {
  var signupUser=signupControl.signup(req, res);
});

app.post('/updateProfile', function(req, res) {
  
 

    
         
     if(req.session.utente.type=="student")
         var updateS=studentControl.update(req, res);
        else
         if(req.session.utente.type=="academicTutor")
          var updateE=academicTutorControl.update(req, res);
        else
        if(req.session.utente.type=="externalTutor")
                  var updateE=externalTutorControl.update(req, res);
            


  
   
});

app.post('/login', function(request, response){
  var UserLogin= loginControl.login(request,response);
});


app.get('/profile', function (request, response) {
  if(request.session.utente == null)
  
    response.sendFile("/app/views/login.html",{root:__dirname});
  
  else
  {    if(request.session.utente.type=="student") 
             var viewFile= studentControl.view(request,response);
             else
                if(request.session.utente.type=="academicTutor")
               { 
                 var updateA=academicTutorControl.view(request, response);}
                 else
                  if(request.session.utente.type=="externalTutor")
                  var updateE=externalTutorControl.view(request, response);
                  
  }
    
});


app.get('/logout',function(req,res){
  var utente = req.session.utente;
  console.log(utente);
  req.session.destroy(function(err){
    if(err){
      console.log("ERRORE+ "+utente);
      console.log(err);
    }else{
      res.cookie('logoutEff','1');
      console.log("sessione eliminata");

      res.sendFile("/app/views/login.html",{root:__dirname});
    }
  });
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!');
});
