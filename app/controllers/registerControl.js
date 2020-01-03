var hash=require('./hash.js');

var studentModel= require('../models/student.js');
var academicTutorModel= require('../models/academicTutor.js');

/**
 * Function for sign up
 * 
 * @param {Http} req - request
 * @param {Http} res - response
 */
exports.signup= function(req, res){
    return new Promise(function(fulfill, reject){

    if(req.body.radioAccount=="studente"){
        //Get parameter from form
        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var email= req.body.inputEmail;
        var matricola= req.body.inputMatricola;
        var citta= req.body.inputCity;
        var indirizzo= req.body.inputAddress;
        var corso= req.body.inputCourse;
        var password= req.body.inputPassword;
        var passwordConfirm= req.body.inputConfirmPassword;

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

        if((matricola==null) || (matricola.length<=9) || (!/^[0-9]+$/.test(matricola))){
            res.cookie('errStudentMatricola','1');
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

        if((password==null) || (password.length<=7) || (!/^[A-Za-z0-9]+$/.test(password))){
            res.cookie('errPassword','1');
            isRight=false;
        }

        if(passwordConfirm!=password){
            res.cookie('errPasswordConfirm','1');
            isRight=false;
        }

        if(!isRight){
            fulfill(false);
        }

        //hashing e salt of password
        var passwordHashed=hash.hashPassword(password);

        //Create student object
        
        var studente=new studentModel();
        studente.setCity(citta);
        studente.setDegreeCourse(corso);
        studente.setEmail(email);
        studente.setName(name);
        studente.setSurname(surname);
        studente.setAddress(indirizzo);
        studente.setPassword(passwordHashed);
        studente.setStudentID(matricola);

        //Check if already exist
        var checkM=studentModel.findByMatricola(matricola);

        checkM.then(function(result){
            if(!result){
                res.cookie('errAlreadyReg','1');
                fulfill(false);
            }
            if(result){
                var checkE=studentModel.findExistByEmail(email);

                checkE.then(function(result){
                    if(!result){
                        res.cookie('errAlreadyReg','1');
                        fulfill(false);
                    }
                    if(result){
                        //Save student in database
                        studentModel.insertStudent(studente);

                        //redirect
                        res.cookie('regEff','1');
                        fulfill(true);
                    }
                })
            }
        })        

    }
    else if(req.body.radioAccount=="tutorAccademico"){
        //Get parameter from form
        var name= req.body.inputNameT;
        var surname= req.body.inputSurnameT;
        var email= req.body.inputEmailT;
        var department= req.body.inputDepartmentT;
        var password= req.body.inputPassword;
        var passwordConfirm= req.body.inputConfirmPassword;

        //Form validation
        isRight=true;
        if((name==null) || (name.length<=1) || (!/^[A-Za-z]+$/.test(name))){
            res.cookie('errTutorName','1');
            isRight=false;
        }
        
        if((surname==null) || (surname.length<=1) || (!/^[A-Za-z]+$/.test(surname))){
            res.cookie('errTutorSurname','1');
            isRight=false;
        }

        if((email==null) || (email.length<=12) || (!/^[a-z]\.[a-z]+[0-9]*\@unisa.it/.test(email))){
            res.cookie('errTutorEmail','1');
            isRight=false;
        }

        if((department==null) || (department.length<=1) || (!/^[A-Za-z0-9\s]+$/.test(department))){
            res.cookie('errTutorDepartment','1');
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
            fulfill(false);
        }

        //hashing e salt of password
        var passwordHashed=hash.hashPassword(password);

        //Create academic tutor object
        var tutorAccademico= new academicTutorModel();
        tutorAccademico.setSurname(surname);
        tutorAccademico.setName(name);
        tutorAccademico.setDepartment(department);
        tutorAccademico.setEmail(email);
        tutorAccademico.setPassword(passwordHashed);

        //check if exist
        var check=academicTutorModel.findByEmail(email);

        check.then(function(result){
            if(!result){
                res.cookie('errAlreadyReg','1');
                fulfill(false);
            }
            if(result){
                //Save academic tutor in database
                academicTutorModel.insertAcademicTutor(tutorAccademico);

                //redirect
                res.cookie('regEff','1');
                fulfill(true);
            }
        })   
    }
});
}
