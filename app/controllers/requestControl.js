var Request = require('../models/request.js');
var request = new Request();

exports.generateRequest = function(student, academicTutor, externalTutor) {
    return new Promise(function(fulfill, reject) {
        request.setStudentID(student);
        request.setAcademicTutorID(academicTutor);
        request.setExternalTutorID(externalTutor);

        var getRequestPr = Request.getRequest(student);
        getRequestPr.then(function(result) {
            if(!result) {
                var insertRequestPr = Request.insertRequest(request);
                insertRequestPr.then(function(err) {
                    if (err) throw err;
                    fulfill(request);
                });
            }
            else {
                fulfill(null);
            }            
        });
    });
    
}