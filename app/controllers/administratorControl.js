var hash=require('./hash.js');
var adminModel= require('../models/administrator.js');
var extutorModel= require('../models/externaltutor.js');
var organizationModel= require('../models/hostorganization.js');


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
        return new Promise(function(fulfill, reject){

        var erasmusCode = req.body.inputErasmusCode;
        var faculty = req.body.inputFacolta;
        var address = req.body.inputAddress;
        var orgSize = req.body.inputSize;
        var country = req.body.inputCountry;
        var contact = req.body.inputContacts;
        var name= req.body.inputNameT;


         
        var isRight=true;

        if((erasmusCode==null) || (erasmusCode.length<=5) || (!/^[A-Za-z0-9]+$/.test(erasmusCode))){
            res.cookie('errErasmusCode','1');
            isRight=false;
        }
     
    
        if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
            res.cookie('errTutorName','1');
            isRight=false;
        }

        if((faculty==null) || (faculty.length<=1) || (!/^[A-Za-z]+$/.test(faculty))){
            res.cookie('errFaculty','1');
            isRight=false;
        }

        if((address==null) || (address.length<=6) || (!/^[A-Za-z0-9,\s]+$/.test(address))){
            res.cookie('errStudentAddress','1');
            isRight=false;
        }
    
        if((contact==null) || (contact.length<=7)){
            res.cookie('errContactName','1');
            isRight=false;
        }
    
        if((country==null) || (country.length<=1) || (!/^[A-Za-z0-9\s]+$/.test(country))){
            res.cookie('errCountryName','1');
            isRight=false;
        }

        if((orgSize==null) || (!/^[0-9\s]+$/.test(orgSize))){
            res.cookie('errSize','1');
            isRight=false;
        }
    
    
        if(!isRight){
            fulfill(false);
            return;
        }
    
       
        //Create host organization object
        var organizzazioneEsterna= new organizationModel();
        organizzazioneEsterna.setContacts(contact);
        organizzazioneEsterna.setName(name);
        organizzazioneEsterna.setCountry(country);
        organizzazioneEsterna.setOrgSize(orgSize);
        organizzazioneEsterna.setAddress(address);
        organizzazioneEsterna.setFaculty(faculty);
        organizzazioneEsterna.setErasmusCode(erasmusCode);

       
    
        
        var checkE=organizationModel.findByName(name);
    
                    checkE.then(function(result){
                        if(!result){
                            res.cookie('errAlreadyRegH','1');
                            fulfill(false);
                            return;
                        }
                        if(result){
                            //Save student in database
                            adminModel.addHostOrg(organizzazioneEsterna);
    
                            //redirect
                            res.cookie('insertHEff','1');
                            fulfill(true);
                            return;
                        }
                    })
                });
}

exports.deleteHostOrg=function(req,res){

//waiting for frontend
}



exports.addExtTutor=function (req,res) {
    return new Promise(function(fulfill, reject){

    var name= req.body.inputNameEx;
    var surname = req.body.inputSurnameEx;
    var email = req.body.inputEmailEx;
    var password = req.body.inputPassword;
    var repassword = req.body.inputRePassword;
    var organization = req.body.inputOrganizationEx;

    var isRight=true; 
    if (password != repassword) {

        
        isRight=false;

    }

    isRight=true;
    if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
        res.cookie('errExTutorName','1');
        isRight=false;
    }
    
    if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
        res.cookie('errExTutorSurname','1');
        isRight=false;
    }

    if((email==null) || (email.length<=12) || (!/^[a-z]\.[a-z]+[0-9]*\@unisa.it/.test(email))){
        res.cookie('errExTutorEmail','1');
        isRight=false;
    }

    if((organization==null) || (organization.length<=1) || (!/^[A-Za-z0-9\s]+$/.test(organization))){
        res.cookie('errExOrganizationName','1');
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

    //Create external tutor object
    var tutorEsterno= new extutorModel();
    tutorEsterno.setSurname(surname);
    tutorEsterno.setName(name);
    tutorEsterno.setOrganization(organization);
    tutorEsterno.setEmail(email);
    tutorEsterno.setPassword(passwordHashed);


    
    var checkE=extutorModel.findByEmailA(email);

                checkE.then(function(result){
                    if(!result){
                        res.cookie('errAlreadyRegEx','1');
                        fulfill(false);
                        return;
                    }
                    if(result){
                        //Save student in database
                        adminModel.addExtTutor(tutorEsterno);

                        //redirect
                        res.cookie('insertEff','1');
                        fulfill(true);
                        
                    }
                })
            });


}

exports.retrieveAllTutor= function(req,res) {

        var retValue = extutorModel.RetrieveAll();
        retValue.then(function(result){

            fulfill(result);
            
        })


}

exports.retrieveAllHostOrg = function(req,res) {

    var retValue=organizationModel.retrieveAll();

    retValue.then(function(result){

        fulfill(result);
        
    })


}

    


