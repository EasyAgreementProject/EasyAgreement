var hash=require('./hash.js');
var academicTutorModel= require('../models/academicTutor.js');
var session = require('express-session');

exports.update=function(req,res){
        
        
        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var department= req.body.inputDepartment;
        
        var academicTutor=new academicTutorModel();




//Form validation
var isRight=true;

if(name.length != 0){
    if(!(/^[A-Za-z]+$/.test(name)) || name.length<=1){
        res.cookie('errexternalTutorName','1');
        isRight=false;
    }
    else
        academicTutor.setName(name);
}
   

if(surname.length != 0){
if(!(/^[A-Za-z]+$/.test(surname)) || surname.length<=1){
    res.cookie('errexternalTutorSurname','1');
    isRight=false;
    }
    else
        academicTutor.setSurname(surname);
}


if( department.length != 0){
    if(!(/^[A-Za-z]+$/.test(department)) ||  department.length<=1){
    res.cookie('errDepartmentName','1');
    isRight=false;
}
else
    academicTutor.setDepartment(department);
}




if(!isRight){
    var path = require('path');
    console.log("errore!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.render('profile');
    return;
}

    
      
        console.log("sono nel accademic: stampo sessione: "+ JSON.stringify(req.session.utente.utente.E_mail)+"stampo academic tutor"+JSON.stringify(academicTutor));
        var checkS=academicTutorModel.updateAcademicTutor(academicTutor,req.session.utente.utente.E_mail);

        checkS.then(function(result){
            if(result!= null)
            {
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
    
        var checkS=academicTutorModel.updatePassword(passwordHashed,req.session.utente.utente.E_mail);
        checkS.then(function(result){
            req.session.utente.utente=result;
            res.cookie('updatePassEff','1');
            res.render('profile');
        })
    }
}

    exports.view= function(req, res){
        console.log("sono nel accademic VIEW: stampo sessione: "+ JSON.stringify(req.session.utente.utente.E_mail));

    res.render('profile');

}
