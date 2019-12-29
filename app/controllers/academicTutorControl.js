var hash=require('./hash.js');
var academicTutorModel= require('../models/academicTutor.js');
var session = require('express-session');

exports.update=function(req,res){

        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var email= req.body.inputEmail;
        var department= req.body.inputDepartment;
        




//Form validation
var isRight=true;

if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
    res.cookie('erracademicTutorName','1');
    isRight=false;
}

if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
    res.cookie('erracademicTutorSurname','1');
    isRight=false;
}

if((email==null) || (email.length<=21) || (!/^[a-z]\.[a-z]+[0-9]*\@unisa.it/.test(email))){
    res.cookie('erracademicTutorEmail','1');
    isRight=false;
}

if((department==null) || (department.length<=1) || (!/^[A-Za-z]+$/.test(department))){
    res.cookie('errDepartmentName','1');
    isRight=false;
}



if(!isRight){
    var path = require('path');
    res.render('profile');
    return;
}

//hashing e salt of password
       //var passwordHashed=hash.hashPassword(password);

        //Create academicTutor object
        
        var academicTutor=new academicTutorModel();
    
        academicTutor.setEmail(email);
        academicTutor.setName(name);
        academicTutor.setSurname(surname);
        academicTutor.setDepartment(department);

      
        console.log("sono nel accademic");
        var checkS=academicTutorModel.updateAcademicTutor(academicTutor,req.session.utente.utente.Email);
        res.setHeader('Content-Type', 'text/html');
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
        res.setHeader('Content-Type', 'text/html');


    res.render('profile');

}
