var hash=require('./hash.js');
var externalTutorModel= require('../models/externaltutor.js');
var session = require('express-session');

exports.update=function(req,res){

        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var organization= req.body.inputOrganization;
        
        var externalTutor=new externalTutorModel();



//Form validation
var isRight=true;

if(name.length != 0){
    if(!(/^[A-Za-z]+$/.test(name)) || name.length<=1){
        res.cookie('errexternalTutorName','1');
        isRight=false;
    }
    else
        externalTutor.setName(name);
}
   

if(surname.length != 0){
if(!(/^[A-Za-z]+$/.test(surname)) || surname.length<=1){
    res.cookie('errexternalTutorSurname','1');
    isRight=false;
    }
    else
        externalTutor.setSurname(surname);
}


if(organization.length != 0){
    if(!(/^[A-Za-z]+$/.test(organization)) || organization.length<=1){
    res.cookie('errOrganizationName','1');
    isRight=false;
}
else
    externalTutor.setOrganization(organization);
}



if(!isRight){
    var path = require('path');
    res.render('profile');
    return;
}


        var checkS=externalTutorModel.updateExternalTutor(externalTutor,req.session.utente.utente.email);
 
        checkS.then(function(result){
            if(result!= null)
            {
                req.session.utente.utente=result;
            }
            res.cookie('updateEff','1');

            res.render('profile');
        });
        
 
        //res.cookie('updateOK','1');
        

}
exports.updatePassword=function(req,res){

    var oldPassword= req.body.oldPassword;
    var password= req.body.newPassword;
    var passwordConfirm= req.body.repeatPassword;

    if((password==null) || (password.length<=7) || (!/^[A-Za-z0-9]+$/.test(password))){
        res.cookie('errPassword','1');
    
        isRight=false;
    }

    if(passwordConfirm!=password){
        res.cookie('errPasswordConfirm','1');
        
        isRight=false;
    }

    if(hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)){
        var passwordHashed= hash.hashPassword(password);
    
        var checkS=externalTutorModel.updatePassword(passwordHashed,req.session.utente.utente.email);
        checkS.then(function(result){
            req.session.utente.utente=result;
            res.cookie('updatePassEff','1');
            res.render('profile');
        })
    }
}
    exports.view= function(req, res){


    res.render('profile');

}
