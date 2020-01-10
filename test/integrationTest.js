var chai=require('chai')
var chaiHttp= require('chai-http')
chai.use(chaiHttp)
var expect= chai.expect
var app = require('../server')
var agent = chai.request.agent(app);


describe('Integration Testing', function(){

    it('Test for /login', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                expect(res).to.have.cookie('logEff')
                done()
            })
    })

    it('Test for /index.html', function(done){
        agent
            .post('/login')
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                expect(res).status(200)
                agent
                    .get('/index.html')
                    .redirects(0)
                    .end(function(err, res){
                        console.log(res.request.cookies)
                        expect(res).to.have.header('Cookie', 'logEff')
                        done()
                    })
            })
    })

})