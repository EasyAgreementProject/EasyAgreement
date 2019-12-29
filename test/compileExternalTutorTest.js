const assert = require('chai').assert;
var compileControl = require('../app/controllers/learningAgreementControl');

describe('Field test for learningAgreementControl', function(){

    it('Testing method sendLaExternalTutor - TC_LAM_3.1', function(){
        var input = ['SA'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.2', function(){
        var input = ['Si', ''];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });
    
    it('Testing method sendLaExternalTutor - TC_LAM_3.3', function(){
        var input = ['Si', 'a'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.4', function(){
        var input = ['Si', '300', 'SA'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.5', function(){
        var input = ['Si', '300', 'Si', ''];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.6', function(){
        var input = ['Si', '300', 'Si', '&$£'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.7', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'SA'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.8', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'Si', '10'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.9', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'Si', '&%"£'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.10', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'Si', '5'];
        var SendLaExternalTutor = compileControl.SendLaExternalTutor(input);
        SendLaExternalTutor.then(function(la) {
            assert.isNotNull(la);
        });
    });
});
