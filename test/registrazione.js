//Unit Testing with Mocha and Chai For Registration

var expect = require('chai').expect;
var app = require('../app/controllers/registerControl');
var request = require('supertest');

const academicTutorCredentials = {
  email: 's.amideo@unisa.it',
  password: 'gigino',
  surname: "Amideo",
  name: "Salvatore",
  department: "Informatica"
}


var authenticatedUser = request.agent(app);
before(function(done){
  authenticatedUser
    .post('/signup')
    .send(academicTutorCredentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/app/views/signup.html');
      done();
    });
});
