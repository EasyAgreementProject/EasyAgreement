var Request = require('../models/request.js');
var learningAgreementControl = require('./learningAgreementControl.js')
var request = new Request();

exports.generateRequest = function(student, academicTutor) {
    return new Promise(function(fulfill, reject) {
        request.setStudentID(student);
        request.setAcademicTutorID(academicTutor);

        var getRequestPr = Request.getRequest(student);
        getRequestPr.then(function(result) {
            if(!result) {
                var insertRequestPr = Request.insertRequest(request);
                insertRequestPr.then(function(err) {
                    if (err) throw err;
                    var d = new Date();
                    var data = {hour: d.getHours().toString().padStart(2,0), minutes: d.getMinutes().toString().padStart(2,0), seconds: d.getSeconds().toString().padStart(2,0),  day:d.getDate().toString().padStart(2,0), month: ((d.getMonth())+1).toString().padStart(2,0), year: d.getFullYear().toString()};
                    socket.emit('send-notification', {associatedID: academicTutor, text: {title: "Nuova richiesta ricevuta", text: "Lo studente "+student+" ha compilato il Learning Agreement"}, date: data});

                    fulfill(request);
                });
            }
            else {
                fulfill(null);
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
                        /*x['stato'] = state;
                        requests.push(x);
                        if(result.length == requests.length) {*/
                            fulfill(requests);
                        //}
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
                fulfill(request);
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
        var updateTutorPr = Request.updateExternalTutor(student, tutor);
        updateTutorPr.then(function(){
            /*var d = new Date();
            var data = {hour: d.getHours().toString().padStart(2,0), minutes: d.getMinutes().toString().padStart(2,0), seconds: d.getSeconds().toString().padStart(2,0),  day:d.getDate().toString().padStart(2,0), month: ((d.getMonth())+1).toString().padStart(2,0), year: d.getFullYear().toString()};
            socket.emit('send-notification', {associatedID: tutor, text: {title: "Nuova richiesta ricevuta", text: "Lo studente "+student+" ha compilato il Learning Agreement"}, date: data});
            */
            fulfill();
        });
    });
}
