exports.signup= function(req){
    if(document.getElementById("studentRadio").checked){
        var name= req.body.inputName;
        var surname= req.body.inputSurname;
        var email= req.body.inputEmail;
        var matricola= req.body.inputMatricola;
        var citta= req.body.inputCity;
        var indirizzo= req.body.inputAddress;
        var corso= req.body.inputCourse;
        var password= req.body.inputPassword;
        var passwordConfirm= req.body.inputConfirmPassword;
    }
    else if(document.getElementById("tutorAccRadio").checked){
        var name= req.body.inputNameT;
        var surname= req.body.inputSurnameT;
        var email= req.body.inputEmailT;
        var department= req.body.inputDepartmentT;
        var password= req.body.inputPassword;
        var passwordConfirm= req.body.inputConfirmPassword;
    }
}