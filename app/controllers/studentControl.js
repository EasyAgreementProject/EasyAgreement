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
        studente.setName(name);
        studente.setSurname(surname);
        studente.setAddress(indirizzo);
       

        console.log("STAMPO GET: ", studente.getName());
        console.log("stampo sessione: "+JSON.stringify(req.session));
       var checkS=studentModel.updateStudent(studente,req.session.utente.utente.Email);
      
      //after update
       req.session.utente.utente.Name=studente.getName();
       req.session.utente.utente.City=studente.getCity();
       req.session.utente.utente.Surname=studente.getSurname();
       req.session.utente.utente.Address=studente.getAddress();
       req.session.utente.utente.DegreeCourse=studente.getDegreeCourse();

       //res.cookie('updateOK','1');
       res.render('profile');
       
        /*
        

    */
}

    exports.view= function(req, res){


    res.render('profile');

}
