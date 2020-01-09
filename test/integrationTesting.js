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
            done();
    });
});