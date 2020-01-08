var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var studentControl=require('../app/controllers/studentControl');

describe('Field test for profileControl', function(){

    it( 'testing method studentControl - TC_ARM_1.1.1', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "M",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it ('testing method studentControl - TC_ARM_1.1.2', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "Ma%o",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.4', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "B", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.5', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "B*o&", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.10', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"N", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.11', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"198", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.13', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"V", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.14', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"V198&2", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.16', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"l" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_ARM_1.1.17', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"Inf%*" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });
})