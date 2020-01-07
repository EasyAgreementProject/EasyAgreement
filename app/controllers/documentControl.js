var studentModel= require('../models/student.js');
var session = require('express-session');
const fs = require('fs');

exports.idHandler = function(req,res) {

  
  console.log("Starting ID file handler...");
 
}

exports.cvHandler = function(req,res) {

  
  console.log("Starting CV file handler...");
  
}

  exports.IDEraser = function(req, res) {

    
    
    var email = req.session.utente.utente.Email;
    
    studentModel.deleteStudentID(email);
    

  }

  exports.CVEraser = function(req, res) {

    
    var temp=JSON.stringify(req.session.utente);
    console.log(JSON.stringify(req.session.utente));
    
    studentModel.deleteStudentCV(temp.Email);
    



  }

  function redirect(res) {
  var path = require('path');
  res.sendFile(path.resolve('app/views/index.html'));
  return;
}
  



