var hash=require('./hash.js');
var adminModel= require('../models/administrator.js');
var extutorModel= require('../models/externaltutor.js');
var session = require('express-session');

exports.update=function(req,res){
    return new Promise(function(fulfill, reject){

    var oldPassword= req.body.inputOldPassword;
    var password= req.body.inputPassword;
    var passwordConfirm= req.body.inputConfirmPassword;

    var isRight=true;

    if((oldPassword==null) || (oldPassword.length<=7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))){
        res.cookie('errOldPassword','1');
        isRight=false;
    }

    if((password==null) || (password.length<=7) || (!/^[A-Za-z0-9]+$/.test(password))){
        res.cookie('errPassword','1');
        isRight=false;
    }

    if(passwordConfirm!=password){
        res.cookie('errPasswordConfirm','1');
        isRight=false;
    }

if(!isRight){

    fulfill(false);
    return;
}

if(hash.checkPassword(req.session.utente.utente.password.hash, req.session.utente.utente.password.salt, oldPassword)){
    var passwordHashed= hash.hashPassword(password);
    var checkPass=adminModel.updatePassword(passwordHashed,req.session.utente.utente.email);
    checkPass.then(function (result){
        if(result!= null){ 
            req.session.utente.utente=result;
            res.cookie('updatePassEff','1');
            fulfill(true);

           }
           else
            reject();

        });
        }
     });   
    }

    exports.addHostOrg=function(req, res) {

        var erasmusCode = req.body.inputErasmusCode;
        var faculty = req.body.inputFacolta;
        var address = req.body.inputIndirizzo;
        var orgSize = req.body.inputSize;
        var country = req.body.inputCountry;
        var phone = req.body.inputTelephone;
        var name= req.body.inputName;

        var HostOrg= {

            "ErasmusCode"   : erasmusCode,
            "Faculty"       : faculty,
            "Address"       : address,
            "Size"          : orgSize,
            "Country"       : country,
            "Contacts"      : phone,
            "Name"          : name

        }


        return new Promise(function(fulfill, reject){
            var added= adminModel.addHostOrg(HostOrg);
            added.then(function(){
                fulfill();
            });
        });
    



    

}

exports.deleteHostOrg=function(req,res){

//waiting for frontend






}



exports.addExtTutor=function (req,res) {
    return new Promise(function(fulfill, reject){

    var name= req.body.inputName;
    var surname = req.body.inputSurname;
    var email = req.body.inputEmail;
    var password = req.body.inputPassword;
    var repassword = req.body.inputRePassword;
    var organization = req.body.inputOrganization;

    if (password != repassword) {

        
        return false;

    }

    isRight=true;
    if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
        res.cookie('errTutorName','1');
        isRight=false;
    }
    
    if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
        res.cookie('errTutorSurname','1');
        isRight=false;
    }

    if((email==null) || (email.length<=12) || (!/^[a-z]\.[a-z]+[0-9]*\@unisa.it/.test(email))){
        res.cookie('errTutorEmail','1');
        console.log("HERE");
        isRight=false;
    }

    if((organization==null) || (organization.length<=1) || (!/^[A-Za-z0-9\s]+$/.test(organization))){
        res.cookie('errOrganizationName','1');
        isRight=false;
    }

    if((password==null) || (password.length<=7) || (!/^[A-Za-z0-9]+$/.test(password))){
        res.cookie('errPassword','1');
        isRight=false;
    }

    if(repassword!=password){
        res.cookie('errPasswordConfirm','1');
        isRight=false;
    }

    if(!isRight){
        fulfill(false);
        return;
    }

    //hashing e salt of password
    var passwordHashed=hash.hashPassword(password);

    //Create academic tutor object
    var tutorEsterno= new extutorModel();
    tutorEsterno.setSurname(surname);
    tutorEsterno.setName(name);
    tutorEsterno.setOrganization(organization);
    tutorEsterno.setEmail(email);
    tutorEsterno.setPassword(passwordHashed);


    
    var checkE=extutorModel.findByEmailA(email);

                checkE.then(function(result){
                    if(!result){
                        res.cookie('errAlreadyReg','1');
                        fulfill(false);
                        return;
                    }
                    if(result){
                        //Save student in database
                        adminModel.addExtTutor(tutorEsterno);

                        //redirect
                        res.cookie('regEff','1');
                        fulfill(true);
                        return;
                    }
                })
            });

}


    


