var hash=require('./hash.js');
var studentModel= require('../models/student.js');
var academicTutorModel= require('../models/academicTutor.js');
var externalTutorModel= require('../models/externaltutor.js');
var administratorModel= require('../models/administrator.js');
var session = require('express-session');

exports.update=function(req,res){

        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var email= req.body.inputEmail;
        var matricola= req.body.inputMatricola;
        var citta= req.body.inputCity;
        var indirizzo= req.body.inputAddress;
        var corso= req.body.inputDegree;
        




//Form validation
var isRight=true;

if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
    res.cookie('errStudentName','1');
    isRight=false;
}

if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
    res.cookie('errStudentSurname','1');
    isRight=false;
}

if((email==null) || (email.length<=21) || (!/^[a-z]\.[a-z]+[0-9]*\@studenti.unisa.it/.test(email))){
    res.cookie('errStudentEmail','1');
    isRight=false;
}

if((citta==null) || (citta.length<=2) || (!/^[A-Za-z\s]+$/.test(citta))){
    res.cookie('errStudentCity','1');
    isRight=false;
}

if((indirizzo==null) || (indirizzo.length<=6) || (!/^[A-Za-z0-9,\s]+$/.test(indirizzo))){
    res.cookie('errStudentAddress','1');
    isRight=false;
}

if((corso==null) || (corso.length<=1) || (!/^[A-Za-z\s]+$/.test(corso))){
    res.cookie('errStudentCorso','1');
    isRight=false;
}



if(!isRight){
    var path = require('path');
    res.render('profile');
        return;
}

//hashing e salt of password
       //var passwordHashed=hash.hashPassword(password);

        //Create student object
        
        var studente=new studentModel();
        studente.setCity(citta);
        studente.setDegreeCourse(corso);
        studente.setEmail(email);
        studente.setName(name);
        studente.setSurname(surname);
        studente.setAddress(indirizzo);
        studente.setStudentID(matricola);

        
       var checkS=studentModel.updateStudent(studente,req.session.utente.utente.Email);
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
                var checkE=studentModel.findExistByEmail(email);

                checkE.then(function(result){
                    if(!result){
                        //res.cookie('errAlreadyReg','1');
                        var path = require('path');
                        res.sendFile(path.resolve('app/views/index.html'));
                        return;
                    }
                    if(result){
                        //Save student in database
                        studentModel.updateStudent(studente);

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
