var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var studentControl=require('../app/controllers/studentControl');

describe('Field test for profileControl', function(){

    it( 'testing method studentControl - TC_PM_1.1.1', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "M",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it ('testing method studentControl - TC_PM_1.1.2', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "Ma%o",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

  it ('testing method studentControl - TC_PM_1.1.3', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "Marco",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:""}, session: {utente:{ utente: {Email: "m.borrelli18@studenti.unisa.it"}}}}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    

    it( 'testing method studentControl - TC_PM_1.1.4', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "B", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.5', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "B*o&", inputCity:"", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it ('testing method studentControl - TC_PM_1.1.6', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "Borrelli", inputCity:"", inputAddress:"", inputDegree:""}, session: {utente:{ utente: {Email: "m.borrelli18@studenti.unisa.it"}}}}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    }); 

    it( 'testing method studentControl - TC_PM_1.1.10', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"N", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.11', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"198", inputAddress:"", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it ('testing method studentControl - TC_PM_1.1.12', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"napolo", inputAddress:"", inputDegree:""}, session: {utente:{ utente: {Email: "m.borrelli18@studenti.unisa.it"}}}}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    }); 

    it( 'testing method studentControl - TC_PM_1.1.13', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"V", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.14', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"V198&2", inputDegree:"" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.15', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"via napoli 1", inputDegree:"" },session: {utente:{ utente: {Email: "m.borrelli18@studenti.unisa.it"}}}}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.16', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"l" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.17', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"Inf%*" }}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.18', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"degree course" },session: {utente:{ utente: {Email: "m.borrelli18@studenti.unisa.it"}}}}
        var updateS=studentControl.update(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.19', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword : "mbar",inputPassword: "", inputConfirmPassword:"" }}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.20', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword : "Mborrelli$$",inputPassword: "", inputConfirmPassword:"" }}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.21 ', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword : "Marcolino99",inputPassword: "", inputConfirmPassword:"" }}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.22', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword : "",inputPassword: "Ma", inputConfirmPassword:"" }}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });

    it( 'testing method studentControl - TC_PM_1.1.23', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword : "",inputPassword: "Marcob%&$!!”", inputConfirmPassword:"" }}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });
    
    it( 'testing method studentControl - password do not match', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword : "",inputPassword: "Marco1997", inputConfirmPassword:"Marco1998" }}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
                expect(result).to.not.be.null;
                done();
        });
    });

    it( 'testing method studentControl - change passw', function(done) {
        var res = mockHttp.createResponse();
        var req={body:{inputOldPassword :"Marco1997",inputPassword:"marco97977", inputConfirmPassword:"marco97977" },session: {utente:{ utente: {Email:"m.borrelli18@studenti.unisa.it",Password: { hash:"851eb0d9ad5fff39fedd03239bb7735a320e1cd99d707353931ed9892868561ebc92c8e07fab2d1ed06a8abfd39913584460324c3ae6a8826c439958e9f8f80c1698ef6e520ce8798b3da9aa9ece6ddc86f9da12113c9f5b9eb3bdaac1beed0176ec3d8663da5b85f64c37d7fc39a6bfe157ff70ec68127e165f318fecc23888975eaa8f5a10a2ead04547a671ea4d72ad1187714cc8dd846724ce5bf1076d8993aa9b594b1cfbdc0469f77011350616c4047d5c00e0d84e89e9bbf2d52cfa430494d7b7b15007065bdd628c7bcdaa704936a1c1df742b0a1040327812ae3d598fee8747374213cec2fec7f0b4e996cd641b4063cc9a3329351deb429fd7da6ca5f75b1fde616650f0898144e82d5ea2f1660ecd618aae942a71769a825350195470884e5bfd9b8b47dbeeec2fb926adc5283339fd304ca0578c1461cfda255834392602092cb9aa3983fb677bc03c1b8b7864878cb3a4b196a0c304cf2c13719cacad15b74820611d6909d93d80284b1fa2195d873961aaf23842227fa1c184a4884365400372eb85bd08a04c43ba5dbcbc93fb34a6e3f63ad54b0a78f872620a5a89d650085aa2a9c01a83f962712c1459c918871ace63a9056f54270d459290b108c4f602705dcbb36e8b0f6c33e6d910388d74f5f3ee0ac9efe6c06027c5b14bee6f16fb63a3ea8981dd541dfcfccb04698cc5c4792d971ec7e2eddbea81",salt:"vLrc35dadSCD30EQQ9yk1gm8EnFhT/KcFc21RMmfa0G6ZXq8dA0YbiYWIfj29wePenjvvTdqZcTvp9OHXb6JzYZC4/uM11KGEMX54grRVfJJVgI3RMrz4lBn5eWKhgsRX/ovDinHNPb8CJ/qIc3mNvK/pf/sQz3fBfcmM/uacSwQFqbIlATi7XbCgIikTPyajNepts2NZNuw7ah1pBpNbQ/T9kaSh7opBo6nN4ktv5O0avZeIr9QuxVoPsx580hOb2FwuB1ORtilM2wD9ve5RfwZpD2ZdjEGOBq+fql+CqbrSuZmy5TCv/S1QgzF9zxkFON7PGeyfKsHATQxu0jetA=="}}}}}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    



    
})