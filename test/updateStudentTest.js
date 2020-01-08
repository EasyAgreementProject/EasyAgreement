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
        var req={body:{inputNameS : "Francesco",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:""}, session: {utente:{ utente: {Email: "f.califano@studenti.unisa.it"}}}}
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
        var req={body:{inputNameS : "",inputSurnameS: "Califano", inputCity:"", inputAddress:"", inputDegree:""}, session: {utente:{ utente: {Email:"f.califano@studenti.unisa.it"}}}}
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
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"Salerno", inputAddress:"", inputDegree:""}, session: {utente:{ utente: {Email: "f.califano@studenti.unisa.it"}}}}
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
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"Via delle Vie 122", inputDegree:"" },session: {utente:{ utente: {Email: "f.califano@studenti.unisa.it"}}}}
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
        var req={body:{inputNameS : "",inputSurnameS: "", inputCity:"", inputAddress:"", inputDegree:"Computer Science" },session: {utente:{ utente: {Email: "f.califano@studenti.unisa.it"}}}}
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
        var req={body:{inputOldPassword :"FraCalifano1",inputPassword:"marco97977", inputConfirmPassword:"marco97977" },session: {utente:{ utente: {Email:"f.califano@studenti.unisa.it",Password: { hash:"00bf23bde715bbc6659bf3167f23de79d2676f08307d66dc36b76e35fe8a5317d209235d864d51092563b388a88ce3023d8e10c86dbab60bbe2509a4a7c3b567d01fb670a0fc723854140ee409b43f29e6cb808ca63d070320c7f45c965cc6b00501df804bc378b9ea2102fd3f4d17e26e78bf52cc28838e9ff67e52d56e19adea05b992bcc9c3914a736e41d0c2a3e77288c91156e88e65d62b58646ec92a3fbacd2e2c0a09ef36d27bc81b9c943a0c784748011fa279997410e7c70f5f8e28b57b78761b6aaacee608807533848f32efbc22aa56ee1957f55e3dcd3e1e298218ad9fc411abe36510b729c86e494ac9fcf4ba11e04167c0c4e5ae7acc58940d815179a6c9423266704aeac73b6f2d6035bb0552a1c92dc796dd4836ad41f3097387220acb5d014f2e995eb6477996989a88e9eb997089e85838ae0b8d987b4de541fd08d3b776a7cb71d14c16798e16f10ba068d0bd0323cd861da9cc2938fb93150871d4fb473f330f68a8b8b63882b5d5208d9f17a3f4387684d19b96b1c9eeab8f65563aa0bd596cc7ba2d5a1ce238c474da3453a2b42ba6d2a767c8e750320034f42399a527558f7bd5970be87428478125412d738c9ce5921e62495bbaea0b28c7e9c682b915ab1799965e7a3a7f0ddaa5329d37bb617e1b7d11627bb4d251d054f6d8886bf888b484f041d1b477f7cf1ae9c91913f4f4e91e4ecc144f",salt:"Owb1eJtTmTR0UWASwmwFv0a3QS9jyWQ0r8SRopqnBLdcQVtJ5n2M4VYwA+1O/CHcpxDJE+eLJxo7U/8JEQlMI6f+7H1l4Qz3wGga6qYlZqz3WIQ+YGBp7+8RAeiErnBCVsMMgqCkpuwSNLU75b3n/A2Xy5M2xZTUONag9fdRyPJlEOsaWrefXg9BFtWXgK1/R1KECeFT1tTfVWO2mtNFnr1gYTnbNrJ7+uaROFhvQFJTZxT/T/NSTYL4vmlMmrTtTea975yah0kEz+5NMz8o/G1swcsq2LiHudJa5dKxNa3FM96BSJ+V574Ls1aALOEKblqp5f5/+r2XpoxuSqRJeg=="}}}}}
        var updateS=studentControl.updatePassword(req, res);
        updateS.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    



    
})