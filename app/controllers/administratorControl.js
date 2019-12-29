var hash=require('./hash.js');
var adminModel= require('../models/administrator.js');
var session = require('express-session');

exports.update=function(req,res){

        var password= req.body.inputPassword;
        




//Form validation
var isRight=true;

if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
    res.cookie('erradminName','1');
    isRight=false;
}

if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
    res.cookie('erradminSurname','1');
    isRight=false;
}

if((email==null) || (email.length<=1) || (!/^[a-z]\.[a-z]+[0-9]*\@^[a-z]/.test(email))){
    res.cookie('erradminEmail','1');
    isRight=false;
}







if(!isRight){
    var path = require('path');
    res.render('profile');
    return;
}

//hashing e salt of password
       //var passwordHashed=hash.hashPassword(password);

        //Create admin object
        
        var admin=new adminModel();
    
        admin.setEmail(email);
        admin.setName(name);
        admin.setSurname(surname);
        

      
        console.log("sono qui"+ JSON.stringify(session.utente.utente.Email));
        var checkS=administratorControl.updateAdministrator(admin,req.session.utente.utente.Email);
        res.render('profile');
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
                var checkE=adminModel.findExistByEmail(email);

                checkE.then(function(result){
                    if(!result){
                        //res.cookie('errAlreadyReg','1');
                        var path = require('path');
                        res.sendFile(path.resolve('app/views/index.html'));
                        return;
                    }
                    if(result){
                        //Save admin in database
                        adminModel.updateadmin(admine);

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
