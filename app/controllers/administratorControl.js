var hash=require('./hash.js');
var adminModel= require('../models/administrator.js');
var session = require('express-session');

exports.update=function(req,res){

    var oldPassword= req.body.oldPassword;
    var password= req.body.NewPassword;
    var passwordConfirm= req.body.repeatPassword;

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
    res.render('profile');
    return;
}


    if(hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)){
        var passwordHashed= hash.hashPassword(password);
        var checkPass=administratorControl.updatePassword(passwordHashed,req.session.utente.utente.Email);
        checkPass.then(function (result){
           if(result!= null) req.session.utente.utente=result;
            res.cookie('updatePassEff','1');

            res.render('profile');
        }) 
    }

    
}

    exports.view= function(req, res){
    res.render('profile');

}
