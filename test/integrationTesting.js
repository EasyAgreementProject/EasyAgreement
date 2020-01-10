var chai = require('chai');
var chaiHttp = require('chai-http');
var expect= chai.expect;
chai.use(chaiHttp);


describe('Field test for server.js', function() {

  
    it('Testing get login.html', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) return done(err)
                expect(res).to.not.be.null
                done()
            })
    });

    it('Testing to index', function(done){
        chai
            .request('http://localhost:8080')
            .get('/index.html')
            .end(function(err, res){
                if(err) return done(err)
                console.log(res)
                expect(res).to.not.be.null
                done()
            })
    })

    it('Testing to compileLaStudent', function(done){
        chai
            .request('http://localhost:8080')
            .get('/compileLAStudent.html')
            .end(function(err, res){
                if(err) return done(err)
                console.log(res)
                expect(res).to.not.be.null
                done()
            })
    })

  

    it('Testing to fillForm', function(done){
        chai
            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) return done(err)
               chai
                  .request('http://localhost:8080')
                  .post('/login')
                  .end(function(err, res){
                         expect(res).to.not.be.null
                         done()
                  })
            })
    })
})