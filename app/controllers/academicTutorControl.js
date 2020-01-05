var hash=require('./hash.js');
var academicTutorModel= require('../models/academicTutor.js');
var session = require('express-session');

exports.update=function(req,res){
    return new Promise(function(fulfill, reject){

        
        var name= req.body.inputNameAc;
        var surname= req.body.inputSurnameAc;
        var department= req.body.inputDepartmentT;
        
        var academicTutor=new academicTutorModel();




//Form validation
var isRight=true;

if(name==null){
    res.cookie('erracademicTutorName','1');
    isRight=false;
}else{
    if(!(/^[A-Za-z]+$/.test(name)) || name.length<=2){
        res.cookie('erracademicTutorName','1');
        isRight=false;
    }else{
        academicTutor.setName(name);
    }
}

if(surname==null){
    res.cookie('erracademicTutorSurname','1');
    isRight=false;
    if(!(/^[A-Za-z]+$/.test(surname)) || surname.length<=2){
        res.cookie('erracademicTutorSurname','1');
        isRight=false;
    }else{
        academicTutor.setSurname(surname);
    }
}


if(department==null){
    res.cookie('errTutorDepartment','1');
    isRight=false;
}else{
    if(!(/^[A-Za-z]+$/.test(department)) ||  department.length<=2){
        res.cookie('errTutorDepartment','1');
        isRight=false;
    }else{
        academicTutor.setDepartment(department);
    }
}
    

if(!isRight){
    var path = require('path');
    res.redirect("profile");
    return;
}

        var checkS=academicTutorModel.updateAcademicTutor(academicTutor,req.session.utente.utente.E_mail);

        checkS.then(function(result){
            if(result!= null)
            {
                req.session.utente.utente=result;
                res.cookie('updateEff','1');
                fulfill();

            }
            else{

                reject();
            }
        });
        
    });
        
        

        
}

exports.updatePassword=function(req,res){
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

        console.log("stampa pass"+password+passwordConfirm);
        var path = require('path');
        res.redirect("profile");
        return;
    }

    if(hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)){
        var passwordHashed= hash.hashPassword(password);
    
        var checkS=academicTutorModel.updatePassword(passwordHashed,req.session.utente.utente.E_mail);
        checkS.then(function(result){
            if(result!= null){
                 req.session.utente.utente=result;
                 res.cookie('updatePassEff','1');
                 fulfill();
            }
            else
                reject();
             
          });
        }
        });
    }

