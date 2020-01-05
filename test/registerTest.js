var chai= require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect=chai.expect;

describe('Field test for registerControl', function(){

    it('Testin method registerControl - TC_ARM_2.1.1', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "M"})
            .end(function(err, res){
                if(err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.2', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marc*"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.3', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname: "C"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.4', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname: "Cian%"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.5', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.c@studenti.unisa.it"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.6', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@gmail.com"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.7', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.popovic@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Informatica", inputConfirmPassword:"MarcoCiano98"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.8', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "123"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.9', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "123456789M"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.10', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "0512134231",  inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Informatica", inputConfirmPassword:"MarcoCiano98"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.11', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"Mak"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.12', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"Mak&&*a"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.13', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Sa"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.14', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Sa19"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.15', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Ap"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.16', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appi*o"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.17', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"I" })
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.18', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Infor%ai*" })
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    });

    it('Testin method registerControl - TC_ARM_2.1.19', function(done){
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "studente", inputName: "Marco", inputSurname:"Ciano", inputEmail:"m.ciano4@studenti.unisa.it", inputMatricola: "1111111111", inputPassword:"MarcoCiano98", inputCity:"Salerno", inputAddress:"Via Appia, 16", inputCourse:"Informatica", inputConfirmPassword:"MarcoCiano98" })
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/index.html');
                done();
            });
    });

    it('Testin method RegisterControl - TC_ARM_2.2.1', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "A"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.2', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Al*ss%o"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.3', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "A"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.4', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambr%s!"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    
    it('Testin method RegisterControl - TC_ARM_2.2.5', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.a@unisa.it"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    })
    
    it('Testin method RegisterControl - TC_ARM_2.2.6', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@gmail.com"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.7', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "s.risso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "Informatica", inputConfirmPassword:"AlessioAmb98"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.8', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "Aless"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.9', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "Alessio&5*"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.10', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "I"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.11', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "Inf98*"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/signup.html');
                done();
            });
    
    });
    
    it('Testin method RegisterControl - TC_ARM_2.2.12', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/signup')
            .send({radioAccount: "tutorAccademico", inputNameT: "Alessio", inputSurnameT: "Ambruoso", inputEmailT: "a.ambruoso@unisa.it", inputPassword: "AlessioAmb98", inputDepartmentT: "Informatica", inputConfirmPassword:"AlessioAmb98"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.redirectTo('http://localhost:8080/index.html');
                done();
            });
    
    });

});