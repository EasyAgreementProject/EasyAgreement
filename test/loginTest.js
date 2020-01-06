var chai= require('chai');
var chaiHttp= require('chai-http');
var app = require('../app/controllers/loginControl');
chai.use(chaiHttp);
var expect=chai.expect;



describe('Login  unit testing...', function() {

    it( 'testing method loginControl - TC_ARM_1.1.1 & TC_ARM_1.2.1 & TC_ARM_1.3.1 & TC_ARM_1.4.1', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m@a", password : "" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });


    it( 'testing method loginControl - TC_ARM_1.1.2 & TC_ARM_1.2.2 & TC_ARM_1.3.2 & TC_ARM_1.4.2', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m?a", password : "" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });


    it( 'testing method loginControl - TC_ARM_1.1.3', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.ciano4@unisa.it", password : "123456789" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.2.3', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.ciano4@unisa.it", password : "123456789" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.3.3', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.ciano4@unisa.it", password : "123456789" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.4.3', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.ciano4@unisa.it", password : "123456789" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });


    it( 'testing method loginControl - TC_ARM_1.1.4 & TC_ARM_1.2.4 & TC_ARM_1.3.4 & TC_ARM_1.4.4', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.ciano4@unisa.it", password : "Marco1" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.1.5 & TC_ARM_1.2.5 & TC_ARM_1.3.5 & TC_ARM_1.4.5', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.ciano4@unisa.it", password : "M%rc&199" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });


    it( 'testing method loginControl - TC_ARM_1.1.6', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "g.mosconi@studenti.unisa.it", password : "ciaociaoooo" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.2.6', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "l.nebiolo@unisa.it", password : "ciaociaoooo" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.3.6', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "f.costa@gmail.com", password : "deeeeeeee" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.4.6', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "a.marino@unisa.it", password : "andreaaaaa" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.1.7', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "g.mosconi@studenti.unisa.it", password : "MoscGermano1" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/index.html');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.2.7', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "m.bianco@unisa.it", password : "BiaMarco1" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/index.html');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.3.7', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "s.brignolo@gmail.com", password : "silvia345" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/index.html');
            done();


        });

    });

    it( 'testing method loginControl - TC_ARM_1.4.7', function(done) {
        chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username : "a.marino@unisa.it", password : "andrea123" })
        .end(function(err,res) {

            if(err) return done(err);
            expect(res).to.redirectTo('http://localhost:8080/index.html');
            done();


        });

    });


});


