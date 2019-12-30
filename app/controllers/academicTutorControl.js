var hash=require('./hash.js');
var academicTutorModel= require('../models/academicTutor.js');
var session = require('express-session');

exports.update=function(req,res){
        
        
        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var department= req.body.inputDepartment;
        




//Form validation
var isRight=true;

if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
    console.log("errore5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.cookie('erracademicTutorName','1');
    isRight=false;
}

if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
    console.log("errore1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.cookie('erracademicTutorSurname','1');
    isRight=false;
}



if((department==null) || (department.length<=1) || (!/^[A-Za-z]+$/.test(department))){
    console.log("errore1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.cookie('errDepartmentName','1');
    isRight=false;
}



if(!isRight){
    var path = require('path');
    console.log("errore!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.render('profile');
    return;
}

//hashing e salt of password
       //var passwordHashed=hash.hashPassword(password);

        //Create academicTutor object
        
        var academicTutor=new academicTutorModel();
    
        academicTutor.setName(name);
        academicTutor.setSurname(surname);
        academicTutor.setDepartment(department);

      
        console.log("sono nel accademic: stampo sessione: "+ JSON.stringify(req.session.utente.utente.E_mail)+"stampo academic tutor"+JSON.stringify(academicTutor));
        var checkS=academicTutorModel.updateAcademicTutor(academicTutor,req.session.utente.utente.E_mail);
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
                var checkE=academicTutorModel.findExistByEmail(email);

                checkE.then(function(result){
                    if(!result){
                        //res.cookie('errAlreadyReg','1');
                        var path = require('path');
                        res.sendFile(path.resolve('app/views/index.html'));
                        return;
                    }
                    if(result){
                        //Save academicTutor in database
                        academicTutorModel.updateacademicTutor(academicTutore);

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
        console.log("sono nel accademic VIEW: stampo sessione: "+ JSON.stringify(req.session.utente.utente.E_mail));

    res.render('profile');

}
