var studentModel= require('../models/student.js');
var session = require('express-session');
console.log("I'm inside");

exports.idHandler = function(err,req,res) {

  if (err) throw err;
  console.log("Starting ID file handler...");
 
}

exports.cvHandler = function(err,req,res) {

  if (err) throw err;
  console.log("Starting CV file handler...");
  
}

  exports.IDEraser = function(request, response) {

    
    
    var email = request.session.utente.Utente.Email;
    studentModel.deleteStudentID(email);
    redirect(response);

  }

  exports.CVEraser = function(err, request, response) {

    if (err) throw err;
    var currSess=request.session.utente.utente.Email;
    var email = currSess.Email;
    studentModel.deleteStudentCV(email);
    redirect(response);



  }

  function redirect(res) {
  var path = require('path');
  res.sendFile(path.resolve('app/views/index.html'));
  return;
}
  



