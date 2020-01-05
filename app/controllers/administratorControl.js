var hash=require('./hash.js');
var adminModel= require('../models/administrator.js');
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

    var path = require('path');
    res.redirect("profile");
    return;
}

if(hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)){
    var passwordHashed= hash.hashPassword(password);
    var checkPass=adminModel.updatePassword(passwordHashed,req.session.utente.utente.Email);
    checkPass.then(function (result){
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

    


