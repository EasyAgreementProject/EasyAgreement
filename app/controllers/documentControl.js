var hash=require('./hash.js');

var studentModel= require('../models/student.js');
var fs = require('fs');
var formidable = require('formidable');

exports.pdf= function(req, res){

  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
    });
  }
