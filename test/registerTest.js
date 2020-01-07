var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var registerControl=require('../app/controllers/registerControl');

describe('Field test for registerControl', function(){

    it('Testin method registerControl - TC_ARM_2.1.1', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "M"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.2', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marc*"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.3', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname: "C"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.4', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname: "Cian%"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.5', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.c@studenti.unisa.it"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.6', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@gmail.com"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.7', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.popovic@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Informatica", inputConfirmPassword:"MarcoCiano98"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.8', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "123"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.9', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "123456789M"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.10', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "0512134231",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Informatica", inputConfirmPassword:"MarcoCiano98"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.11', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"Mak"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.12', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"Mak&&*a"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.13', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Sa"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.14', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Sa19"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.15', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Ap"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.16', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appi*o"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.17', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"I"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.18', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Infor%ai*"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method registerControl - TC_ARM_2.1.19', function(done){
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Informatica", inputConfirmPassword:"MarcoCiano98"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testin method RegisterControl - TC_ARM_2.2.1', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "A"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.2', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Al*ss%o"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.3', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "A"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.4', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambr%s!"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.5', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.a@unisa.it"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    })
    
    it('Testin method RegisterControl - TC_ARM_2.2.6', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@gmail.com"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.7', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "s.risso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "Informatica", inputConfirmPassword:"AlessioAmb98"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.8', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "Aless"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.9', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "Alessio&5*"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.10', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "I"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.11', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "Inf98*"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.12', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "Informatica", inputConfirmPassword:"AlessioAmb98"}}
        var register=registerControl.signup(req, res);
        register.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
});