//Unit Testing with Mocha and Chai For login

var expect = require('chai').expect;
var app = require('../app/controllers/loginControl');
var request = require('supertest');

const userCredentials = {
  email: 'g.musso@unisa.it',
  password: 'temp'
}

var authenticatedUser = request.agent(app);
before(function(done){
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/login');
      done();
    });
});
