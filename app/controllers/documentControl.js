var studentModel= require('../models/student.js');
var formidable = require('formidable');
var session = require('express-session');
console.log("I'm inside");

exports.docHandler = function(err,req,res) {

  if (err) throw err;
  console.log("Starting handler...");
  var currSess=json.stringify(req.session.utente);
  var email = currSess.Email;
  console.log("Session data retrieval is ok");
  var form = new formidable.IncomingForm();
  form.keepExtensions=true;
  form.multiples=false;
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    

    studentModel.updateStudentCV(email, req.files);
    


  });
}

  exports.IDEraser = function(request, response) {

    
    
    console.log(currSess);
    var email = currSess.Email;
    studentModel.deleteStudentID(email);
    redirect(response);



  }

  exports.CVEraser = function(err, request, response) {

    if (err) throw err;
    var currSess=request.session.utente;
    var email = currSess.Email;
    studentModel.deleteStudentCV(email);
    redirect(response);



  }

  function redirect(res) {
  var path = require('path');
  res.sendFile(path.resolve('app/views/index.html'));
  return;
}
  



