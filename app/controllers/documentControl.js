var studentModel= require('../models/student.js');
var formidable = require('formidable');


exports.docHandler = function(err,req,res) {

  if (err) throw err;
  var currSess=json.stringify(req.session.utente);
  var email = currSess.Email;
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
