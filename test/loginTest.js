var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var loginControl=require('../app/controllers/loginControl');


describe('Login  unit testing...', function() {

    it( 'testing method loginControl - TC_ARM_1.1.1 & TC_ARM_1.2.1 & TC_ARM_1.3.1 & TC_ARM_1.4.1', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m@a", password : "" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.1.2 & TC_ARM_1.2.2 & TC_ARM_1.3.2 & TC_ARM_1.4.2', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m?a", password : "" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });


    it( 'testing method loginControl - TC_ARM_1.1.3', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.ciano4@unisa.it", password : "123456789" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.2.3', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.ciano4@unisa.it", password : "123456789" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.3.3', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.ciano4@unisa.it", password : "123456789" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.4.3', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.ciano4@unisa.it", password : "123456789" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });


    it( 'testing method loginControl - TC_ARM_1.1.4 & TC_ARM_1.2.4 & TC_ARM_1.3.4 & TC_ARM_1.4.4', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.ciano4@unisa.it", password : "Marco1" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.1.5 & TC_ARM_1.2.5 & TC_ARM_1.3.5 & TC_ARM_1.4.5', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.ciano4@unisa.it", password : "M%rc&199" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });


    it( 'testing method loginControl - TC_ARM_1.1.6', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "g.mosconi@studenti.unisa.it", password : "ciaociaoooo" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.2.6', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "l.nebiolo@unisa.it", password : "ciaociaoooo" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.3.6', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "f.costa@gmail.com", password : "deeeeeeee" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.4.6', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "a.marino@unisa.it", password : "andreaaaaa" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.1.7', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "g.mosconi@studenti.unisa.it", password : "MoscGermano1" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.2.7', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "m.bianco@unisa.it", password : "BiaMarco1" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.3.7', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "s.brignolo@gmail.com", password : "silvia345" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method loginControl - TC_ARM_1.4.7', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{username : "a.marino@unisa.it", password : "andrea123" }}
        var login=loginControl.login(req, res);
        login.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

});


