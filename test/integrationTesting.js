var chai = require('chai');
var chaiHttp = require('chai-http');
var expect= chai.expect;
chai.use(chaiHttp);
var hash= require('../app/controllers/hash');

describe('Field test for server.js', function() {

    
  
    it('Testing get login.html', function(done) {
        var studPass="DannyDeVito1";
        studPass=hash.hashPassword(studPass);
        chai

            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: studPass})
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
            
                expect(res).to.not.be.null
                done()
            })
    })

    it('Testing to viewLa', function(done){
        chai
            .request('http://localhost:8080')
            .get('/viewLA.html')
            .end(function(err, res){
                if(err) return done(err)
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
                expect(res).to.not.be.null
                done()
            })
    })

  
/*
    it('Testing to getAllVersion', function(done){
        chai
            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) return done(err)
               chai
                  .request('http://localhost:8080')
                  .post('/fillfForm')
                  .end(function(err, res){
                         expect(res).to.not.be.null
                         done()
                  })
            })
    })

    it('Testing to getAllRequestVersions', function(done){
        chai
            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) return done(err)
               chai
                  .request('http://localhost:8080')
                  .post('/fillfForm')
                  .end(function(err, res){

                        console.log(res);
                         expect(res).to.not.be.null
                         done()
                  })
            })
    })

    */

   it('Testing to fillForm', function(done){
    chai
        .request('http://localhost:8080')
        .post('/login')
        .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) return done(err)
           chai
              .request('http://localhost:8080')
              .get('/fillForm')
              .end(function(err, res){
                     expect(res).to.not.be.null
                     done()
              })
        })
})

    it('Testing to fillFormRequest', function(done){
        chai
            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) return done(err)
               chai
                  .request('http://localhost:8080')
                  .get('/fillFormRequest')
                  .end(function(err, res){
                         expect(res).to.not.be.null
                         done()
                  })
            })
    })

    it('Testing to getStatus', function(done){
        chai
            .request('http://localhost:8080')
            .post('/login')
            .send({username:"d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) return done(err)
               chai
                  .request('http://localhost:8080')
                  .get('/getStatus')
                  .end(function(err, res){
                         expect(res).to.not.be.null
                         done()
                  })
            })
    })

    it('Testing to compileStudent', function(done){
        chai
            .request('http://localhost:8080')
            .post('/compileStudent')
            .send({ 
                inputAddress:"Via delle Foglie, 4",
                inputWebSite:"www.google.it",
                inputContactRecivingName:"Filomena Ferrucci",
                inputContactRecivingPosition:"Responsabile",
                inputMentorName:"Michela Bertolotto",
                inputMentorPosition:"Direttrice",
                inputName:"Veronica",
                inputSurname:"Volpicelli", 
                inputDate:"22/04/1996", 
                inputTelephone:"123456789", 
                radio1:"F",
                nationality:"Italiana", 
                inputStudyCycle:"1st Cycle",
                inputAcademicYear1:"19",
                inputAcademicYear2:"20",
                inputSubjectCode:"Informatica, 05121",
                inputEmail:"v.volpicelli1@studenti.unisa.it",
                inputDepartmentSending:"Informatica", 
                inputContactName:"Filomena Ferrucci", 
                inputContactSending:"f.ferrucci@unisa.it 123456789",
                inputNameSector:"Informatica", 
                inputDepartmentReciving:"Google", 
                inputCountry:"America", 
                inputSizeEnterprise:"300-500",
                inputMentorInfo:"m.berto@gmail.com 0987654321",
                inputDateFrom:"06/2020",
                inputDateTo:"06/2021", 
                inputHourWork:"8", 
                inputTitle:"Us Academy", 
                inputDetailed:"Learning of Modern and Advanced Technologies",
                inputKnowledge:"Use of MongoDB, Mocha and Chai",
                inputMonitoring:"Weekly meeting", 
                inputEvaluation:"Knowledge of the tools", 
                inputLenguage:"english", 
                inputLenguageLevel:"B2"
            })
            .end(function(err, res){
                if(err) return done(err)
                expect(res).to.not.be.null
                done()
            })
    })
    
})