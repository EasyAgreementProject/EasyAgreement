var studentModel= require('../models/student.js');
var formidable = require('formidable');
console.log("I'm inside");

exports.docHandler = function(err,req,res) {

  if (err) throw err;
  console.log("Starting handler...");
  var currSess=json.stringify(req.session.utente);
  var email = currSess.Email;
  console.log("Session data retrieval is ok");
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    studentModel.updateStudentCV(email, files);
    


  });


  exports.docEraser = function(req, res) {

    if (err) throw err;
    var currSess=req.session.utente;
    var email = currSess.Email;
    



  }
  


}
