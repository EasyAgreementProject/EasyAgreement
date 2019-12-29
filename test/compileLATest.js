const assert = require('chai').assert;
var compileControl = require('../app/controllers/learningAgreementControl');

describe('Field test for learningAgreementControl', function(){
    
    it('Testing method sendLaStudent - TC_LAM_1.6', function(){
        var input = ['V'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.6', function(){
        var input = ['Veroni’4a'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.6', function(){
        var input = ['Veronica', 'V'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.6', function(){
        var input = ['Veronica', 'Volpicel’?%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    
    it('Testing method sendLaStudent - TC_LAM_1.6', function(){
        var input = ['Veronica', 'Volpicelli', '123as'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.6', function(){
        var input = ['Veronica', 'Volpicelli', '11/08/199787'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.7', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '1234567894739274035'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.8', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '1234ndkf'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.9', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'LA'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.10', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'L'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.11', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', '124'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.12', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'It'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.13', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st43565?&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.14', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.15', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '291'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.16', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '1%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.17', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '201'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.18', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '2%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.19', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'I'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.20', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Inf%?, 0mdw2'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.21', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v@studenti.unisa.it'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.22', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'm%6@unisa.it'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.23', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'I'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.24', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Inf&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.25', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'F'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.26', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferr&!'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.27', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f@unisa.it'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.28', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.f%rci&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.29', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'I'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.30', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', '%%%&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.31', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'G'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.32', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', '&%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.33', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'V'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.34', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', '&£”,http::$£'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.35', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
        'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'S'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.36', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', '&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.37', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '1'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.38', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', 'abc'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.39', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'F'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.40', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'F&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.41', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'M'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.42', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', '%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.43', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
        'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice', 'M@gmail.com'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.44', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice', 'M/$&£@gmail.com'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.45', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', 'mm'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.46', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', 'aa'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.47', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', 'abc'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.48', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'm'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.49', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', '&”%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.50', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'A'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.51', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', '“%&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.52', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'A'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.53', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', '&$%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.54', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'M'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });
    it('Testing method sendLaStudent - TC_LAM_1.55', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', '!%”'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.56', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting', 'A'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.57', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting', '%$'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.58', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting',
                    'Knowledge of the tools', 'e'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.59', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting',
                    'Knowledge of the tools', '$&%'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.60', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting',
                    'Knowledge of the tools', 'english', 'A1P'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.61', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting',
                    'Knowledge of the tools', 'english', '&'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaStudent - TC_LAM_1.62', function(){
        var input = ['Veronica', 'Volpicelli', '22/04/1996', '123456789', 'F', 'Italiana', '1st cycle', '19', '20', 'Informatica, 05121', 'v.volpicelli4@studenti.unisa.it', 'Informatica', 'Filomena Ferrucci',
                    'f.ferrucci@unisa.it 123456789', 'Informatica', 'Google', 'Via delle Foglie, 4 www.google.it', 'America', '300-500', 'Filomena Ferrucci, Responsabile', 'Michela Bertolotto, Direttrice',
                    'm.berto@gmail.com 0987654321', '06/2020', '06/2021', '8', 'Us Academy', 'Learning of Modern and Advanced Technologies', 'Use of MongoDB, Mocha and Chai', 'Weekly meeting',
                    'Knowledge of the tools', 'english', 'A1'];
        var sendStudent = compileControl.sendLaStudent(input);
        sendStudent.then(function(la) {
            assert.isNotNull(la);
        });
    }); 

    it('Testing method sendLaAcademicTutor - TC_LAM_2.1', function(){
        var input = [''];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.2', function(){
        var input = ['abc'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.3', function(){
        var input = ['2', null, null, 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.4', function(){
        var input = ['2', 'SA&'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.5', function(){
        var input = ['2', 'Certificato di tirocinio', null, 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.6', function(){
        var input = ['2', 'Certificato di tirocinio', 'SA%$'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.7', function(){
        var input = ['2', 'Certificato di tirocinio', 'Si', 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.8', function(){
        var input = ['2', 'Certificato di tirocinio', 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNotNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.9', function(){
        var input = [null, null, null, 'SA%'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.10', function(){
        var input = ['Si', null, null, 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.11', function(){
        var input = [null, null, null, 'Si', ''];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.12', function(){
        var input = [null, null, null, 'Si', 'abc'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.13', function(){
        var input = ['Si', null, null, 'Si', '3'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.14', function(){
        var input = [null, null, null, 'Si', '3', 'SA%'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.15', function(){
        var input = ['Si', null, null, 'Si', '3', 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.16', function(){
        var input = [null, null, null, 'Si', '3', 'Si', 'SA&'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.17', function(){
        var input = ['Si', null, null, 'Si', '3', 'Si', 'Certificato di tirocinio'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.18', function(){
        var input = [null, null, null, 'Si', '3', 'Si', 'Certificato di tirocinio', 'SA%'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.19', function(){
        var input = ['Si', null, null, 'Si', '3', 'Si', 'Certificato di tirocinio', 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.20', function(){
        var input = [null, null, null, 'Si', '3', 'Si', 'Certificato di tirocinio', 'Si', 'SA&'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.21', function(){
        var input = ['Si', null, null, 'Si', '3', 'Si', 'Certificato di tirocinio', 'Si', 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaAcademicTutor - TC_LAM_2.22', function(){
        var input = [null, null, null, 'Si', '3', 'Si', 'Certificato di tirocinio', 'Si', 'Si'];
        var sendLaAcademicTutor = compileControl.sendLaAcademicTutor(input);
        sendLaAcademicTutor.then(function(la) {
            assert.isNotNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.1', function(){
        var input = ['SA'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.2', function(){
        var input = ['Si', ''];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });
    
    it('Testing method sendLaExternalTutor - TC_LAM_3.3', function(){
        var input = ['Si', 'a'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.4', function(){
        var input = ['Si', '300', 'SA'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.5', function(){
        var input = ['Si', '300', 'Si', ''];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.6', function(){
        var input = ['Si', '300', 'Si', '&$£'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.7', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'SA'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.8', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'Si', '10'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.9', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'Si', '&%"£'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNull(la);
        });
    });

    it('Testing method sendLaExternalTutor - TC_LAM_3.9', function(){
        var input = ['Si', '300', 'Si', 'Buoni Pasto', 'Si', '5'];
        var sendLaExternalTutor = compileControl.sendLaExternalTutor(input);
        sendLaExternalTutor.then(function(la) {
            assert.isNotNull(la);
        });
    });

});