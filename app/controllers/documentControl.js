var studentModel= require('../models/student.js');
var session = require('express-session');
const fs = require('fs');
console.log("I'm inside documentControl");

exports.idHandler = function(req,res) {

  
  console.log("Starting ID file handler...");

  var email = req.session.utente.utente.Email;
  var file = req.body.form;
  console.log(file);
 
}

exports.cvHandler = function(req,res) {

  
  console.log("Starting CV file handler...");
  var email = req.session.utente.utente.Email;
  
}

  exports.IDEraser = function(req, res) {

    console.log("Starting ID eraser...");
    
    var email = req.session.utente.utente.Email;
    
    console.log("Inside IDErase, value of email in session data:"+email);

    return new Promise(function(fulfill, reject){
      var deleted= studentModel.deleteStudentID(email);
      deleted.then(function(){
          fulfill();
      });
  });
    

  }

  exports.CVEraser = function(req, res) {

    console.log("Starting CV eraser...");

    var email = req.session.utente.utente.Email;

    var email = req.session.utente.utente.Email;
    
    console.log("Inside IDErase, value of email in session data:"+email);

    return new Promise(function(fulfill, reject){
      var deleted= studentModel.deleteStudentCV(email);
      deleted.then(function(){
          fulfill();
      });
  });



  }

  function redirect(res) {
  var path = require('path');
  res.sendFile(path.resolve('app/views/index.html'));
  return;
}
  



