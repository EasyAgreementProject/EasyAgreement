var hash=require('./hash.js');
var externalTutorModel= require('../models/externaltutor.js');
var session = require('express-session');

exports.update=function(req,res){

        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var email= req.body.inputEmail;
        var organization= req.body.inputOrganization;
        




//Form validation
var isRight=true;

if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
    res.cookie('errexternalTutorName','1');
    isRight=false;
}

if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
    res.cookie('errexternalTutorSurname','1');
    isRight=false;
}

if((email==null) || (email.length<=21) || (!/^[a-z]\.[a-z]+[0-9]*\@unisa.it/.test(email))){
    res.cookie('errexternalTutorEmail','1');
    isRight=false;
}

if((organization==null) || (organization.length<=1) || (!/^[A-Za-z]+$/.test(organization))){
    res.cookie('errOrganizationName','1');
    isRight=false;
}



if(!isRight){
    var path = require('path');
    res.render('profile');
    return;
}

//hashing e salt of password
       //var passwordHashed=hash.hashPassword(password);

        //Create externalTutor object
        
        var externalTutor=new externalTutorModel();
    
        externalTutor.setEmail(email);
        externalTutor.setName(name);
        externalTutor.setSurname(surname);
        externalTutor.setOrganization(organization);

      
        console.log("sono qui"+ JSON.stringify(session.utente.utente.Email));
        
       externalTutorModel.updateexternalTutor(externalTutor);
        /*
        checkM.then(function(result){
            if(!result){
                console.log("EMAIL UGUALE A QUELLA PRECEDENTE!");
                res.cookie('errAlreadyReg','1');
                var path = require('path');
                res.sendFile(path.resolve('app/views/index.html'));
                return;
            }
            if(result){
                var checkE=externalTutorModel.findExistByEmail(email);

                checkE.then(function(result){
                    if(!result){
                        //res.cookie('errAlreadyReg','1');
                        var path = require('path');
                        res.sendFile(path.resolve('app/views/index.html'));
                        return;
                    }
                    if(result){
                        //Save externalTutor in database
                        externalTutorModel.updateexternalTutor(externalTutore);

                        //redirect
                        res.cookie('regEff','1');
                        var path = require('path');
                        res.sendFile(path.resolve('app/views/index.html'));
                        return;
                    }
                })
            }
        }) 


    }

    */
}

    exports.view= function(req, res){


    res.render('profile');

}
