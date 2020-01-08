const assert = require('chai').assert;
var requestControl = require('../app/controllers/requestControl');
var compileControl = require('../app/controllers/learningAgreementControl');

describe('Field test for requestControl', function(){
    
    it.only('Testing method sendLaStudent - TC_LAM_1.62', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st Cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli3@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci - Responsabile', 'Michela Bertolotto - Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting',
                    'Knowledge of the tools', 'english', 'A1'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNotNull(la);
        });
    });   
    
    it.only('Testing method generateRequest', function(){
        var input = ['v.volpicelli3@studenti.unisa.it', 'f.ferrucci@unisa.it'];
        var generateRequestPr = requestControl.generateRequest(input);
        generateRequestPr.then(function(request) {
            assert.isNull(request);
        });
    });

    it.only('Testing method getAlRequests', function(){
        var input = ['f.ferrucci@unisa.it'];
        var getRequestPr = requestControl.getAllRequests(input);
        getRequestPr.then(function(request) {
            assert.isNotNull(request);
        });
    });

    it.only('Testing method getRequestDetails', function(){
        var input = ['v.volpicelli3@studenti.unisa.it'];
        var getRequestPr = requestControl.getRequestDetails(input);
        getRequestPr.then(function(request) {
            assert.isNotNull(request);
        });
    });

    it.only('Testing method getRequest', function(){
        var input = ['v.volpicelli3@studenti.unisa.it'];
        var getRequestPr = requestControl.getRequest(input);
        getRequestPr.then(function(request) {
            assert.isNotNull(request);
        });
    });

    it.only('Testing method updateExternalTutor', function(){
        var input = ['v.volpicelli3@studenti.unisa.it', 'm.berto@gmail.com'];
        var updateTutorPr = requestControl.updateExternalTutor(input);
        updateTutorPr.then(function(request) {
            assert.isTrue(request);
        });
    });
});