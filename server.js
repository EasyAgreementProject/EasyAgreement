var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var documentControl = require('./app/controllers/documentControl.js');
var learningAgreementControl = require('./app/controllers/learningAgreementControl');
var cookieParser = require('cookie-parser');
var signupControl= require('./app/controllers/registerControl.js');
var loginControl= require('./app/controllers/loginControl');
var studentControl= require('./app/controllers/studentControl');
var academicTutorControl= require('./app/controllers/academicTutorControl');
var externalTutorControl= require('./app/controllers/externalTutorControl');
var administratorControl= require('./app/controllers/administratorControl');


var messageControl= require('./app/controllers/messageControl');
var requestControl = require('./app/controllers/requestControl');
var notificationControl= require('./app/controllers/notificationControl');
var bodyParser= require('body-parser');
var session = require('express-session');
const io = require('socket.io')(3000)
app.set('view engine', 'ejs');
var formidable = require('formidable');
var ssn; // Session variable

var connectedClients={};
var notificationClients={};

//Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(cookieParser());

app.set('views', path.join(__dirname, '/app/views'));
app.engine('html', require('ejs').renderFile);

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

app.get('/gestioneDocumenti.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/app/views/gestioneDocumenti.html"))
});

app.get('/viewLA.html', function(req, res){
   res.sendFile(path.join(__dirname + "/app/views/viewLA.html"))
});

app.get('/getAllVersions', function(req, res) {
  var getVersionsPr = learningAgreementControl.getAllVersions(req.session.utente.utente.Email);
  getVersionsPr.then(function(data) {
      if (data) {
          res.send(data);
      }
  })
});

app.get('/gestioneDocumenti.html', function(req, res) {

    res.sendFile(path.join(__dirname + "/app/views/gestioneDocumenti.html"))
});

/*
app.get('/fillForm', function(req, res) {
    var getData = learningAgreementControl.getData(req.session.utente.utente.Email);
    console.log("Student = "+req.session.utente.utente.Email);
    getData.then(function(data) {
        if (data) {
            res.send(data);
        }
    })
});
*/
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
    var inputAddressWebSite = req.body.inputAddress+" "+req.body.inputWebSite;
    var inputContactReciving = req.body.inputContactRecivingName+" - "+req.body.inputContactRecivingPosition;
    var inputMentor = req.body.inputMentorName+" - "+req.body.inputMentorPosition;
    var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCycle,
        req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactName, req.body.inputContactSending,
        req.body.inputNameSector, req.body.inputDepartmentReciving, inputAddressWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, inputContactReciving,
        inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed,
        req.body.inputKnowledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel
    ];
    var sendStudentPr = learningAgreementControl.sendLaStudent(data, res);
    sendStudentPr.then(function(dw) {
        if (dw) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
            dw.pipe(res)
        } else {
            res.sendFile(path.join(__dirname + "/app/views/compileLAStudent.html"));
        }
    })
});

app.post('/compileAcademicTutor', function(req, res) {
  var data = [req.body.inputCredits, req.body.vote, req.body.inputRadio1, req.body.inputRadio2, req.body.inputCredits2, req.body.inputRadio3,
      req.body.inputCheck2, req.body.inputRadio4, req.body.inputRadio5, req.session.data.data["E-mail"] //To change with email of student request 
  ];
  var sendTutorPr = learningAgreementControl.sendLaAcademicTutor(data, res);
  sendTutorPr.then(function(dw) {
      if (dw) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
          dw.pipe(res)
      } else {
          res.sendFile(path.join(__dirname + "/app/views/compileLAAcademicTutor.html"));
      }
  })
});

app.post('/compileExternalTutor', function(req, res) {
  var data = [req.body.inputRadio1, req.body.inputAmount, req.body.inputRadio2, req.body.inputContribution, req.body.inputWeeks, req.body.inputRadio3, req.session.data.data["E-mail"]]; 
  var sendTutorPr = learningAgreementControl.sendLaExternalTutor(data, res);
  sendTutorPr.then(function(dw) {
      if (dw) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf');
          dw.pipe(res)
      } else {
          res.sendFile(path.join(__dirname + "/app/views/compileLAExternalTutor.html"));
      }
  })
});

app.post('/saveStudent', function(req, res) {
  var inputAddressWebSite = req.body.inputAddress+" "+req.body.inputWebSite;
  var inputContactReciving = req.body.inputContactRecivingName+" - "+req.body.inputContactRecivingPosition;
  var inputMentor = req.body.inputMentorName+" - "+req.body.inputMentorPosition;
  var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCycle,
      req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactName, req.body.inputContactSending,
      req.body.inputNameSector, req.body.inputDepartmentReciving, inputAddressWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, inputContactReciving,
      inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed,
      req.body.inputKnowledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel
  ];
    var saveStudent = learningAgreementControl.saveLaStudent(data);
    saveStudent.then(function() {
      res.render(path.join(__dirname + "/app/views/index.ejs"));
    });
});

app.post('/saveAcademicTutor', function(req, res) {
  var data = [req.body.inputCredits, req.body.vote, req.body.inputRadio1, req.body.inputRadio2, req.body.inputCredits2, req.body.inputRadio3,
    req.body.inputCheck2, req.body.inputRadio4, req.body.inputRadio5, null //To change with email of student request 
  ];
  var saveTutor = learningAgreementControl.saveLaAcademicTutor(data);
  saveTutor.then(function() {
    res.render(path.join(__dirname + "/app/views/index.ejs"));
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

app.post('/saveExternalTutor', function(req, res) {
  var data = [req.body.inputRadio1, req.body.inputAmount, req.body.inputRadio2, req.body.inputContribution, req.body.inputWeeks, req.body.inputRadio3, null]; //To change with email of student request
  var saveTutor = learningAgreementControl.saveLaExternalTutor(data);
  saveTutor.then(function() {
    res.render(path.join(__dirname + "/app/views/index.ejs"));
  });
});

app.post('/disapproveAcademicTutor', function(req, res) {
  var disapproveTutorPr = learningAgreementControl.disapproveAcademicTutor(req.session.utente.utente.Email, req.body.msg);
  disapproveTutorPr.then(function() {
    res.render(path.join(__dirname + "/app/views/index.ejs"));
  });
});

app.post('/disapproveExternalTutor', function(req, res) {
  var disapproveTutorPr = learningAgreementControl.disapproveExternalTutor(req.session.utente.utente.Email, req.body.msg);
  disapproveTutorPr.then(function() {
    res.render(path.join(__dirname + "/app/views/index.ejs"));
  });
});

app.get('/getVersions', function(req, res) {
  var getVersionsPr = learningAgreementControl.getAllVersions(req.session.utente.utente.Email);
  getVersionsPr.then(function(data) {
      if (data && req.query.inputVersion) {
        console.log("Version id = "+req.query.number)
        var getVersionPr = learningAgreementControl.getVersion(req.query.inputVersion, req.session.utente.utente.Email);
        getVersionPr.then(function(la) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename = LA_V_'+req.query.inputVersion+'.pdf');
          console.log("Tornato da tutto");
          la.pipe(res);
        })
    }
  })
});

app.get('/', function (req, res) {
  ssn=req.session;
  res.sendFile("/app/views/login.html",{root:__dirname});
});

app.get('/compileLAExternalTutor.html', function (req, res) {
  res.sendFile("/app/views/compileLAExternalTutor.html",{root:__dirname});
});

app.get('/addExternalTutor.html', function (req, res) {
  res.sendFile("/app/views/admin/addExternalTutor.html",{root:__dirname});
});

app.get('/addHost.html', function (req, res) {
  res.sendFile("/app/views/admin/addHost.html",{root:__dirname});
});

app.get('/infoHost.html', function (req, res) {
  res.sendFile("/app/views/admin/infoHost.html",{root:__dirname});
});

app.get('/infoTutorExternal.html', function (req, res) {
  res.sendFile("/app/views/admin/infoTutorExternal.html",{root:__dirname});
});

app.get('/viewExternalTutor&Host.html', function (req, res) {
  res.sendFile("/app/views/admin/viewExternalTutor&Host.html",{root:__dirname});
});

app.get('/compileLAAcademicTutor.html', function (req, res) {
  res.sendFile("/app/views/compileLAAcademicTutor.html",{root:__dirname});
});

app.get('/viewRequest.html', function (req, res) {
  res.render("viewRequest.ejs");
});

app.get('/request.html', function (req, res) {
  res.sendFile("/app/views/request.html",{root:__dirname});
});

app.get('/getRequests', function(req, res){
  var getRequestsPr = requestControl.getAllRequests('f.ferrucci@unisa.it'); //req.session.utente.utente.Email
  getRequestsPr.then(function(result){    
    res.send(result);
  })
})

app.get('/getDetails', function(req, res) {
  res.send(req.session.data);
});

app.get('/getRequest', function(req, res){
  var getDetailsPr = requestControl.getRequestDetails(req.query.student);
  getDetailsPr.then(function(details) {
    req.session.data = details;
    res.redirect("viewRequest.html");
  })
});

app.get('/signup.html', function (req, res) {
  res.sendFile("/app/views/signup.html",{root:__dirname});
});

app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/easyAgreement.html', function (req, res) {
  res.render("easyAgreement.ejs");
});

app.get('/header.html', function (req, res) {
  res.render("header.ejs");
});

app.get('/sidebar.html', function (req, res) {
  res.render("sidebar.ejs");
});

app.get('/footer.html', function (req, res) {
  res.render("footer.ejs");
});

app.post('/signup', function(req, res) {
  var signupUser=signupControl.signup(req, res);
  signupUser.then(function(result){
    if(result){
      res.redirect('/');
    }
    else{
      res.redirect('/signup.html');
    }
  });
});

app.post('/updateProfile', function(req, res) {
  if(req.session.utente == null){
    res.redirect("/");
  }
  else{
     if(req.session.utente.type=="student"){
         var updateS=studentControl.update(req, res);
         updateS.then(function(){
          res.render('profile');
         });
      }
     else
      if(req.session.utente.type=="academicTutor"){
          var updateA=academicTutorControl.update(req, res);
          updateA.then(function(){
          res.render('profile');
          });
      }else if(req.session.utente.type=="externalTutor"){
              var updateE=externalTutorControl.update(req, res);
              updateE.then(function(){
              res.render('profile');
              });
           
      }
  }
});

app.post('/updatePassword',function(req,res){

if(req.session.utente == null)
  
  res.redirect("/");
else{
  if(req.session.utente.type=="student"){
  var updateS=studentControl.updatePassword(req, res);
  updateS.then(function(result){
    if(result==true)
     res.render('profile');
   else
     res.render('profile');

  });
}
 else
  if(req.session.utente.type=="academicTutor"){
    var updateAc=academicTutorControl.updatePassword(req, res);
    updateAc.then(function(result){
      if(result==true)
       res.render('profile');
     else
       res.render('profile');

    });
}
 else
 if(req.session.utente.type=="externalTutor"){
           var updateE=externalTutorControl.updatePassword(req, res);
           updateE.then(function(result){
            if(result==true)
             res.render('profile');
           else
             res.render('profile');
 
          });
        }
  else
    if(req.session.utente.type=="admin"){
          var updateA=administratorControl.update(req, res);
          updateA.then(function(){
           res.render('profile');
         });
       }
}
});

app.post('/login', function(request, response){
  var UserLogin= loginControl.login(request,response);
});
/*
app.get('/profile', function (request, response) {
    response.render('profile');
});*/

app.get('/profile', function (request, response) {
  if(request.session.utente == null){
    response.redirect("/");
  }
  else
  {  response.render('profile');
    
  }
    
});




app.get('/logout',function(req,res){
  var utente = req.session.utente;
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.cookie('logoutEff','1');
      console.log("sessione eliminata");

      res.redirect("/");
    }
  });
});

app.post('/uploadID', function(request, response){
  console.log("Before documentControl...");
  var docManager=documentControl.idHandler(request,response);
  console.log("After document control, in server...");
  res.sendFile("/app/views/gestioneDocumenti.html", {root:__dirname});
  
});

app.post('/uploadCV', function(request, response){
  console.log("Before documentControl...");
  var docManager=documentControl.cvHandler(request,response);
  console.log("After document control, in server...");
  res.sendFile("/app/views/gestioneDocumenti.html", {root:__dirname});
  
});

app.post('/deleteCV', function(request, response){
  var docManager=documentControl.CVEraser(request,response);
  res.sendFile("/app/views/gestioneDocumenti.html", {root:__dirname});
});

app.post('/deleteCD', function(request, response){
  var docManager=documentControl.IDEraser(request, response);
  res.sendFile("/app/views/gestioneDocumenti.html", {root:__dirname});
});

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!');
});

io.on('connection', socket => {
  socket.on('subscribe', function(sender) {
    connectedClients[sender]=socket.id;
    socket.username=sender;
  });
  socket.on('send-chat-message', function(message){
    var result= messageControl.refreshMessageCache(message.recipientID, message.senderID, true);
    socket.broadcast.to(connectedClients[message.recipientID]).emit('chat-message', socket.username, message);
  });

  socket.on('subscribe-notification', function(receiver){
    notificationClients[receiver]= socket.id;
    socket.username=receiver;
  });
  socket.on('send-notification', function(notification){
    var id=notificationControl.insertNotification(notification);
    var result=notificationControl.refreshNotificationCache(notification.associatedID, true);
    id.then(function(result){
      notification._id=result;
      socket.broadcast.to(notificationClients[notification.associatedID]).emit('receive-notification', socket.username, notification);
    });
  });
})

app.post('/getConnectedUser', function (req, res){
  res.json(req.session.utente);
});

app.post('/getContacts', function (req, res){
  messageControl.getAllContacts(req.body.type, res);
});

app.post('/getMessages', function(req, res){
  messageControl.getAllMessages(req.body.sender, req.body.recipient, res);
});

app.post('/saveMessage', function(req, res){
  messageControl.saveMessage(req.body.message, res);
});

app.post('/removeMessage', function(req, res){
  messageControl.removeMessage(req.body.messageID, res);
});

app.post('/updateMessage', function(req, res){
  messageControl.updateMessage(req.body.messageID, req.body.text, res);
});

app.post('/searchUser', function(req, res){
  messageControl.searchUser(req.body.type, req.body.search, res);
});

app.post('/getAllNotifications', function(req, res){
  notificationControl.getAllNotification(req.body.email, res);
});

app.post('/removeNotification', function(req, res){
  notificationControl.removeNotification(req.body.notificationID, res);
});

app.post('/insertNotification', function(req, res){
  notificationControl.insertNotification(req.body.notifica, res);
});

app.post('/getReceivedNotification', function(req, res){
  var prom= notificationControl.getNotificationCacheState(req.body.sender);
  prom.then(function(result){
    if(result)  res.json(true);
    else  res.json(false);
  });
});

app.post('/setReceivedNotification', function(req, res){
  var prom= notificationControl.refreshNotificationCache(req.body.sender, false);
  prom.then(function(result){
    res.json(result);
  });
});

app.post('/getReceivedMessage', function(req, res){
  var prom= messageControl.getAllCache(req.body.sender);
  prom.then(function(result){
    var allSenders=[];
    for(var i=0; result[i]!=null; i++){
      allSenders.push(result[i].senderID);
    }
    res.json(allSenders);
  });
});

app.post('/setReceivedMessage', function(req, res){
  var prom= messageControl.refreshMessageCache(req.body.sender, req.body.receiver, false);
  prom.then(function(result){
    res.json(result);
  });
})

app.get('/addHostOrg', function(req,res){

res.render('admin/insorg');

});

app.post('/addHostOrgF', function(req, res) {
  var administratorAddHost=administratorControl.addHostOrg(req,res);
  administratorAddHost.then(function(result){
    if(result== true){
      console.log("result=true");
      res.render('admin/insorg');
    }
    else{
      console.log("result=false");

      res.render('admin/insorg');
    }
  });
});

app.get('/addExtTutor', function(req,res) { 

  res.render('admin/instutor');

});

app.post('/addExtTutorF', function(req, res) {
  var administratorAddTutor=administratorControl.addExtTutor(req,res);
  administratorAddTutor.then(function(result){
    if(result== true){
      console.log("result=true");
      res.render('admin/instutor');
    }
    else{
      console.log("result=false");

      res.render('admin/instutor');
    }
  });
});
/*
app.post('/deleteExtOrg', function(req,res){ //waiting for frontend

  var action=adminControl.deleteHostOrg(req,res);
  res.sendFile('');
  
  });

  

  app.post('/deleteExtTutor', function(req,res){ //waiting for frontend

    var action=adminControl.deleteExtTutor(req,res);
    res.sendFile('');
    
    });

  */