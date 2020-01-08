var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var administratorControl=require('../app/controllers/administratorControl');
var administratorModel=require('../app/models/administrator');


describe('Field test for administratorControl', function(){

it( 'testing method administratorControl - TC_PM_1.3.13', function(done) {
    var res = mockHttp.createResponse();
    var req={body:{inputOldPassword : "A",inputPassword: "", inputConfirmPassword:"" }}
    var updateE=administratorControl.update(req, res);
    updateE.then(function(result){
            expect(result).to.not.be.null;
            done();
    });
});

it( 'testing method administratorControl - TC_PM_1.3.14', function(done) {
    var res = mockHttp.createResponse();
    var req={body:{inputOldPassword : "Alessi%%",inputPassword: "", inputConfirmPassword:"" }}
    var updateE=administratorControl.update(req, res);
    updateE.then(function(result){
            expect(result).to.not.be.null;
            done();
    });
});

it( 'testing method administratorControl - TC_PM_1.3.15', function(done) {
    var res = mockHttp.createResponse();
    var req={body:{inputOldPassword : "Sara111",inputPassword: "", inputConfirmPassword:"" }}
    var updateE=administratorControl.update(req, res);
    updateE.then(function(result){
            expect(result).to.not.be.null;
            done();
    });
});

it( 'testing method administratorControl - TC_PM_1.3.16', function(done) {
    var res = mockHttp.createResponse();
    var req={body:{inputOldPassword : "",inputPassword: "Ma", inputConfirmPassword:"" }}
    var updateS=administratorControl.update(req, res);
    updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
    });
});

it( 'testing method administratorControl - TC_PM_1.3.17', function(done) {
    var res = mockHttp.createResponse();
    var req={body:{inputOldPassword : "",inputPassword: "Mat%", inputConfirmPassword:"" }}
    var updateS=administratorControl.update(req, res);
    updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
    });
});

it( 'testing method administratorControl - change passw', function(done) {
    
    var res = mockHttp.createResponse();
    var findByEmail=administratorModel.findByEmail("f.intrieri@unisa.it");
    findByEmail.then(function(result1){
        var req={body:{inputOldPassword :"filip123",inputPassword:"andrea97977", inputConfirmPassword:"andrea97977" },session: {utente:{ utente: {email:"f.intrieri@unisa.it",password: { salt:result1.getPassword().salt, hash:result1.getPassword().hash}}}}}
        var updateS=administratorControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });

    });
});
})