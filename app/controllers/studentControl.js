var hash=require('./hash.js');
var studentModel= require('../models/student.js');
var academicTutorModel= require('../models/academicTutor.js');
var externalTutorModel= require('../models/externaltutor.js');
var administratorModel= require('../models/administrator.js');
var session = require('express-session');

exports.update=function(req,res){

        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var matricola= req.body.inputMatricola;
        var citta= req.body.inputCity;
        var indirizzo= req.body.inputAddress;
        var corso= req.body.inputDegree;
        

        var studente=new studentModel();



//Form validation
var isRight=true;
if(name.length!=0 ){
    if(!(/^[A-Za-z]+$/.test(name)) || name.length<=1){
        res.cookie('errStudentName','1');
        isRight=false;
    }
    else{
        studente.setName(name);
    }
}



if(surname.length!=0){
    console.log("sono nell if del diverso null cognome: "+ JSON.stringify(surname));
    if (!(/^[A-Za-z]+$/.test(surname))){
      console.log("Sono entrato nel cookie cognome");
        res.cookie('errStudentSurname','1');
        isRight=false;
    }
    else
    {if(surname.length>1)
        studente.setSurname(surname);

    }
}

if(citta.length!=0){
 if(!(/^[A-Za-z\s]+$/.test(citta))){
    res.cookie('errStudentCity','1');
    isRight=false;
    }
else
{     if(surname.length>1)
        studente.setCity(citta);
}

}

if(indirizzo.length!=0){
if (!(/^[A-Za-z0-9,\s]+$/.test(indirizzo))){
        res.cookie('errStudentAddress','1');
        isRight=false;
    }else{
        if(indirizzo.length>=7)
    studente.setAddress(indirizzo);
    }
}

if(corso.length!=0) {
    if(!(/^[A-Za-z\s]+$/.test(corso))){
      res.cookie('errStudentCorso','1');
     isRight=false;
    }
    else{if(corso.length>2)
        studente.setDegreeCourse(corso);
    }
}



if(!isRight){
    var path = require('path');
    res.render('profile');
        return;
}


       

        var checkS=studentModel.updateStudent(studente,req.session.utente.utente.Email);
        checkS.then(function(result){
            if(result!=null){
                req.session.utente.utente=result;
            }
            res.cookie('updateEff','1');
            res.render('profile');
        });
}

exports.updatePassword=function(req,res){

    var oldPassword= req.body.oldPassword;
    var password= req.body.newPassword;
    var passwordConfirm= req.body.repeatPassword;

    if((password==null) || (password.length<=7) || (!/^[A-Za-z0-9]+$/.test(password))){
        res.cookie('errPassword','1');
        console.log("errore pass!!!!");
        isRight=false;
    }

    if(passwordConfirm!=password){
        res.cookie('errPasswordConfirm','1');
        console.log("password diverse !!!");
        isRight=false;
    }

    if(hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)){
        var passwordHashed= hash.hashPassword(password);
    
        var checkS=studentModel.updatePassword(passwordHashed,req.session.utente.utente.Email);
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
