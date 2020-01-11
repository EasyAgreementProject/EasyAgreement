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

    it('Test for /login', function(done){
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

    it('Test for /index.html', function(done){
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

    it('Test for /saveStudent', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .post('/saveStudent')
                    .send({ 
                        inputAddress:"Via delle Foglie, 4",
                        inputWebSite:"www.google.it",
                        inputContactRecivingName:"Filomena Ferrucci",
                        inputContactRecivingPosition:"Responsabile",
                        inputMentorName:"Sara Cotto",
                        inputMentorPosition:"Direttrice",
                        inputName:"Danny",
                        inputSurname:"De Vito", 
                        inputDate:"22/04/1996", 
                        inputTelephone:"123456789", 
                        radio1:"F",
                        nationality:"Italiana", 
                        inputStudyCycle:"1st Cycle",
                        inputAcademicYear1:"19",
                        inputAcademicYear2:"20",
                        inputSubjectCode:"Informatica, 05121",
                        inputEmail:"d.devito@studenti.unisa.it",
                        inputDepartmentSending:"Informatica", 
                        inputContactName:"Filomena Ferrucci", 
                        inputContactSending:"f.ferrucci@unisa.it 123456789",
                        inputNameSector:"Informatica", 
                        inputDepartmentReciving:"Google", 
                        inputCountry:"America", 
                        inputSizeEnterprise:"300-500",
                        inputMentorInfo:"s.cotto@gmail.com 0987654321",
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
                        if(err) done(err)
                        .redirects(0)
                        expect(res).status(200)
                        done()
                    })
            })
    }, this.timeout(10000))

    it('Test for /compileStudent', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .post('/compileStudent')
                    .send({ 
                        inputAddress:"Via delle Foglie, 4",
                        inputWebSite:"www.google.it",
                        inputContactRecivingName:"Filomena Ferrucci",
                        inputContactRecivingPosition:"Responsabile",
                        inputMentorName:"Sara Cotto",
                        inputMentorPosition:"Direttrice",
                        inputName:"Danny",
                        inputSurname:"De Vito", 
                        inputDate:"22/04/1996", 
                        inputTelephone:"123456789", 
                        radio1:"F",
                        nationality:"Italiana", 
                        inputStudyCycle:"1st Cycle",
                        inputAcademicYear1:"19",
                        inputAcademicYear2:"20",
                        inputSubjectCode:"Informatica, 05121",
                        inputEmail:"d.devito@studenti.unisa.it",
                        inputDepartmentSending:"Informatica", 
                        inputContactName:"Filomena Ferrucci", 
                        inputContactSending:"f.ferrucci@unisa.it 123456789",
                        inputNameSector:"Informatica", 
                        inputDepartmentReciving:"Google", 
                        inputCountry:"America", 
                        inputSizeEnterprise:"300-500",
                        inputMentorInfo:"s.cotto@gmail.com 0987654321",
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
                        if(err) done(err)
                        expect(res).status(200)
                        expect(res).to.have.header('Content-Type', 'application/pdf');
                        done()
                    })
            })
    }, this.timeout(10000))

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

    it('Test for /saveAcademicTutor', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .post('/saveAcademicTutor')
                            .send({ 
                                inputCredits : "3",
                                vote : "interview", 
                                inputRadio1 : "Si",
                                inputRadio2 : undefined,
                                inputCredits2 : undefined,
                                inputRadio3 : undefined,
                                inputCheck2 : undefined, 
                                inputRadio4 : undefined,
                                inputRadio5 : undefined
                            })
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                done()
                            })
                        });
            })
    }, this.timeout(10000))

    it('Test for /fillFormRequest', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .get('/fillFormRequest')                            
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).to.be.json
                                done()
                            })
                        });
            })
    })

    it('Test for /compileAcademicTutor', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .post('/compileAcademicTutor')
                            .send({ 
                                inputCredits : "3",
                                vote : "interview", 
                                inputRadio1 : "Si",
                                inputRadio2 : undefined,
                                inputCredits2 : undefined,
                                inputRadio3 : undefined,
                                inputCheck2 : undefined, 
                                inputRadio4 : undefined,
                                inputRadio5 : undefined
                            })
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                expect(res).to.have.header('Content-Type', 'application/pdf');
                                done()
                            })
                        });
            })
    }, this.timeout(10000))

    it('Test for /saveExternalTutor', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .post('/saveExternalTutor')
                            .send({
                                inputRadio1 : "No", 
                                inputAmount : undefined, 
                                inputRadio2 : "No", 
                                inputContribution : undefined, 
                                inputWeeks : "4", 
                                inputRadio3 : "No"
                            })
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                done()
                            })
                        });
            })
    }, this.timeout(10000))

    it('Test for /compileExternalTutor', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .post('/compileExternalTutor')
                            .send({
                                inputRadio1 : "No", 
                                inputAmount : undefined, 
                                inputRadio2 : "No", 
                                inputContribution : undefined, 
                                inputWeeks : "4", 
                                inputRadio3 : "No"
                            })
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                expect(res).to.have.header('Content-Type', 'application/pdf');
                                done()
                            })
                        });
            })
    }, this.timeout(10000))

    it('Test for /getRequest', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        done()
                    });
            })
    })

    it('Test for /getAllRequestVersions', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .get('/getAllRequestVersions')                            
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).to.be.json
                                done()
                            })
                        });
            })
    })

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
                        expect(res).to.be.string
                        done()
                    })
            })
    })

    it('Test for /uploadID', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .post('/uploadID')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    it('Test for /uploadCV', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .post('/uploadCV')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    it('Test for /fileviewID', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .post('/fileviewID')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        expect(res).to.have.header('Content-Type', 'application/pdf');
                        done()
                    })
            })
    })

    it('Test for /fileviewCV', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .post('/fileviewCV')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        expect(res).to.have.header('Content-Type', 'application/pdf');
                        done()
                    })
            })
    })
    
    it('Test for /fileviewIDRequest', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .post('/fileviewIDRequest')                            
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                expect(res).to.have.header('Content-Type', 'application/pdf');
                                done()
                            })
                        });
            })
    })

    it('Test for /fileviewCVRequest', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequest')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.status(302)
                        agent
                            .post('/fileviewCVRequest')                            
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                expect(res).to.have.header('Content-Type', 'application/pdf');
                                done()
                            })
                        });
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

})