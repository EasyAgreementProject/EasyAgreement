const expect = require('chai').expect;
var requestControl = require('../app/controllers/requestControl');
var compileControl = require('../app/controllers/learningAgreementControl');

describe('Field test for requestControl', function(){
    
    it('Test method generateRequest', function(done){
        var student={ "StudentID" : "0512178654",
        "DegreeCourse" : "Computer Science",
        "Address" : "Via delle Vie 127",
        "City" : "San Cipriano Picentino",
        "Email" : "g.carpentieri1@studenti.unisa.it",
        "Surname" : "Carpentieri",
        "Name" : "Giovanni",
        "CV"   : null,
        "IDCard" : null,
        "Password" :"CarpGiovanni1"
       };
       var academicTutor={ "E_mail":"g.musso@unisa.it" , "Password":"MusGiuseppe1", "Surname":"Musso" ,"Name":"Giuseppe","Department":"Informatica"};
       var generate= requestControl.generateRequest(student, academicTutor);
       generate.then(function(result){
            expect(result).to.be.not.null;
            done();
       })
    })

});