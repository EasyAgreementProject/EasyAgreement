var hash=require('./hash.js');

exports.signup= function(req, res){
    if(req.body.radioAccount=="studente"){
        //prelevo variabili da form
        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var email= req.body.inputEmail;
        var matricola= req.body.inputMatricola;
        var citta= req.body.inputCity;
        var indirizzo= req.body.inputAddress;
        var corso= req.body.inputCourse;
        var password= req.body.inputPassword;
        var passwordConfirm= req.body.inputConfirmPassword;

        //Validazione dei form
        if((name==null) || (name.length<=1) || (!new RegExp("^[A-Za-z]+$").test(name))){
            res.cookie('errStudentName','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }
        
        if((surname==null) || (surname.length<=1) || (!new RegExp("^[A-Za-z]+$").test(surname))){
            res.cookie('errStudentSurname','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((email==null) || (email.length<=20) || (!new RegExp("^[a-z]\.[a-z]+[1-9]*\@studenti.unisa.it").test(email))){
            res.cookie('errStudentEmail','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((matricola==null) || (matricola.length<=9) || (!new RegExp("^[0-9]+$").test(matricola))){
            res.cookie('errStudentMatricola','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((citta==null) || (citta.length<=2) || (!new RegExp("^[A-Za-z\s]*").test(citta))){
            res.cookie('errStudentCity','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((indirizzo==null) || (indirizzo.length<=2) || (!new RegExp("^[A-Za-z0-9,\s]*").test(indirizzo))){
            res.cookie('errStudentAddress','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((corso==null) || (corso.length<=1) || (!new RegExp("^[A-Za-z\s]*").test(corso))){
            res.cookie('errStudentCorso','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((password==null) || (password.length<=7) || (!new RegExp("^[A-Za-z0-9\s]+$").test(password))){
            res.cookie('errPassword','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if(passwordConfirm!=password){
            res.cookie('errPasswordConfirm','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        var passwordHashed=hash.hashPassword(password);

        var studente={
            Name : name,
            Surname: surname,
            Email: email,
            Matricola: matricola,
            City: citta,
            Address: indirizzo,
            Corso: corso,
            Password: passwordHashed
        };

    }
    else if(req.body.radioAccount=="tutorAccademico"){
        var name= req.body.inputNameT;
        var surname= req.body.inputSurnameT;
        var email= req.body.inputEmailT;
        var department= req.body.inputDepartmentT;
        var password= req.body.inputPassword;
        var passwordConfirm= req.body.inputConfirmPassword;

        if((name==null) || (name.length<=1) || (!new RegExp("^[A-Za-z]+$").test(name))){
            res.cookie('errTutorName','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }
        
        if((surname==null) || (surname.length<=1) || (!new RegExp("^[A-Za-z]+$").test(surname))){
            res.cookie('errTutorSurname','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((email==null) || (email.length<=10) || (!new RegExp("^[a-z]\.[a-z]+[1-9]*\@unisa.it").test(email))){
            res.cookie('errTutorEmail','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((department==null) || (department.length<=1) || (!new RegExp("^[A-Za-z0-9\s]*").test(email))){
            res.cookie('errTutorDepartment','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if((password==null) || (password.length<=7) || (!new RegExp("^[A-Za-z0-9\s]+$").test(password))){
            res.cookie('errPassword','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        if(passwordConfirm!=password){
            res.cookie('errPasswordConfirm','1');
            var path = require('path');
            res.sendFile(path.resolve('app/views/signup.html'));
        }

        var passwordHashed=hash.hashPassword(password);

        var tutorAccademico={
            Name: name,
            Surname: surname,
            Email: email,
            Department: department,
            Password: passwordHashed
        };
    }
}