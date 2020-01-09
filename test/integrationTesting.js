var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = require('supertest');
const app = require('../server.js')


describe('Field test for server.js', function() {

    it.only('Testing get compileLAStudent.html', function(done) {
        request(app).get("/compileLAStudent.html")
            .expect(200)
            .expect(/Compilazione Learning Agreement/);
            done();
    });

    it.only('Testing get viewLA.html', function(done) {
        request(app).get("/viewLA.html")
            .expect(200)
            .expect(/Learning Agreement/);
            done();
    });

    it.only('Testing get gestioneDocumenti.html', function(done) {
        request(app).get("/gestioneDocumenti.html")
            .expect(200)
            .expect(/Gestione Documenti/);
            done();
    });

    it.only('Testing get login.html', function(done) {
        request(app).get("/")
            .expect(200)
            .expect(/Login/);
            done();
    });
});