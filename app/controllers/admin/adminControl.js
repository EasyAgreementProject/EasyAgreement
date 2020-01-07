var adminModel= require('../../models/administrator.js');
var hash= require('../hash');

console.log('I\'m inside adminControl!');

exports.addHostOrg=function(req, res) {

        var erasmusCode = req.body.inputErasmusCode;
        var faculty = req.body.inputFacolta;
        var address = req.body.inputIndirizzo;
        var orgSize = req.body.inputSize;
        var country = req.body.inputCountry;
        var phone = req.body.inputTelephone;
        var name= req.body.inputName;

        var HostOrg= {

            "ErasmusCode"   : erasmusCode,
            "Faculty"       : faculty,
            "Address"       : address,
            "Size"          : orgSize,
            "Country"       : country,
            "Contacts"      : phone,
            "Name"          : name

        }


        return new Promise(function(fulfill, reject){
            var added= adminModel.addHostOrg(HostOrg);
            added.then(function(){
                fulfill();
            });
        });
    



    

}

exports.deleteHostOrg=function(req,res){

//waiting for frontend






}



exports.addExtTutor=function (req,res) {

    var name= req.body.inputName;
    var surname = req.body.inputSurname;
    var email = req.body.inputEmail;
    var password = req.body.inputPassword;
    var repassword = req.body.inputRePassword;
    var organization = req.body.inputOrganization;

    if (password != repassword) {

        
        return false;

    }

    var ExtTutor = {

        "E_mail"        : email,
        "Password"      : password,
        "Surname"       : surname,
        "Name"          : name,
        "Organization"  : organization
        
    }

    ExtTutor.Password=hash.hashPassword(ExtTutor.Password);

    return new Promise(function(fulfill, reject){
        var added= adminModel.addExtTutor(ExtTutor);
        added.then(function(){
            fulfill();
        });
    });


}
