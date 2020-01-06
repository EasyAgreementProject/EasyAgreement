var Request = require('../models/request.js');
var learningAgreementControl = require('./learningAgreementControl.js')
var request = new Request();

exports.generateRequest = function(student, academicTutor) {
    return new Promise(function(fulfill, reject) {
        request.setStudentID(student);
        request.setAcademicTutorID(academicTutor);

        var getRequestPr = Request.getRequest(student);
        getRequestPr.then(function(result) {
            if(result) {
                getStatusPr = learningAgreementControl.getStatus(student);
                getStatusPr.then(function(state){
                    if(state.startsWith("Disapprovato")) {
                        var deleteRequestPr = Request.deleteRequest(student);
                        deleteRequestPr.then(function(){
                            var insertRequestPr = Request.insertRequest(request);
                            insertRequestPr.then(function(err) {
                                if (err) throw err;
                                fulfill(request);
                            });
                        });                        
                    }
                    else fulfill(null);
                });       
            }
            else {
                var insertRequestPr = Request.insertRequest(request);
                insertRequestPr.then(function(err) {
                    if (err) throw err;
                    fulfill(request);
                });
            }            
        });
    });
}

exports.getAllRequests = function (tutor) {
    return new Promise (function (fulfill, reject){
        var getRequestsPr = Request.getAllRequests(tutor);
        getRequestsPr.then(function(result){
            var requests = [];
            result.forEach(x => {
                var getDataPr = learningAgreementControl.getData(x['studentID']);
                getDataPr.then(function(data){                    
                    x['nome'] = data['Header name'];
                    var getStatePr = learningAgreementControl.getStatus(x['studentID']);
                    getStatePr.then(function(state) {
                        x['stato'] = state;
                        requests.push(x);
                        if(result.length == requests.length) {
                            fulfill(requests);
                        }
                    })
                })
            });
        })
    });
}

exports.getRequestDetails = function(student) {
    return new Promise (function(fulfill, reject){
        var getRequestPr = Request.getRequest(student);
        getRequestPr.then(function(request){
            var getDataPr = learningAgreementControl.getData(student);
            getDataPr.then(function(data) {
                request['data'] = data;
                getStatusPr = learningAgreementControl.getStatus(student);
                getStatusPr.then(function(state){
                    request['status'] = state;
                    fulfill(request);
                })
            })
        })
    });
}

exports.getRequest = function (student) {
    return new Promise (function (fulfill, reject){
        var getRequestPr = Request.getRequest(student);
        getRequestPr.then(function(result){
            fulfill(result);
        });
    });
}

exports.updateExternalTutor = function(student, tutor) {
    return new Promise (function (fulfill, reject){
        var getStatusPr = learningAgreementControl.getStatus(student);
        getStatusPr.then(function(result) {
            if(!result.startsWith("Approvato dal Tutor Accademico")) {
                var updateTutorPr = Request.updateExternalTutor(student, tutor);
                updateTutorPr.then(function(){
                    fulfill(true);
                });
            }
            else fulfill(false);
        });
    });
}
