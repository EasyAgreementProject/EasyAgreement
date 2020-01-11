var chai=require('chai')
var chaiHttp= require('chai-http')
chai.use(chaiHttp)
var expect= chai.expect
var app = require('../server')
var agent = chai.request.agent(app);

//se avete bisogno di testare i cookie dopo un redirect o un rendere, scrivere nel .end if(getCookies(res.request)['Nome_Cookie']=='valoreCookie0){ done()}
var getCookies = function(request) {
    var cookies = {};
    request.cookies.split(';').forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
  };

describe('Integration Testing', function(){

    it.only('Test for /login', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                done()
            })
    })

    it.only('Test for /index.html', function(done){
        agent
            .post('/login')
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).status(200)
                agent
                    .get('/index.html')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    it.only('Test for /easyAgreement.html', function(done){
        agent
            .post('/login')
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).status(200)
                agent
                    .get('/easyAgreement.html')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })
    
    it('Test for /compileLAStudent.html', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/compileLAStudent.html')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    it('Test for /viewLA.html', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/viewLA.html')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    //bisogna prima inserire altre versioni oppure fallisce logicamente
    it('Test for /getAllVersions', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getAllVersions')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
                        done()
                    })
            })
    })

    //bisogna prima generare la richiesta oppure fallisce logicamente
    it('Test for /getAllRequestVersions', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getAllRequestVersions')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
                        done()
                    })
            })
    })

    it('Test for /gestioneDocumenti.html', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/gestioneDocumenti.html')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    //veronica volpicelli questi 3 non so da cosa dipendono prima, comunque bisogna eseguire prima le dipendenze
it('Test for /fillForm', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/fillForm')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
                        done()
                    })
            })
    })

    it('Test for /fillFormRequest', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/fillFormRequest')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
                        done()
                    })
            })
    })

    it('Test for /getStatus', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getStatus')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
                        done()
                    })
            })
    })

})