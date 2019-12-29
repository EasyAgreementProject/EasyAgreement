var academicModel= require('../models/academicTutor');
var externalModel= require('../models/externaltutor');
var studentModel= require('../models/student');

exports.getAllContacts= function(type, res){
    var users=null;
    if(type=="academic"){
        users=academicModel.RetrieveAll();
    }
    else if(type=="student"){
        users=studentModel.RetrieveAll();
    }
    else if(type=="external"){
        users=externalModel.RetrieveAll();
    }
    users.then(function(result){
        res.json(result);
    })
}

exports.getAllMessages= function(sender, receiver){

}

exports.saveMessage= function(message){

}

exports.updateMessage= function(message){

}

exports.removeMessage= function(message){

}

exports.getConnectedUser= function(req){
    return req.session.utente;
}