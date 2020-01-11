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

  var getResponseCookies = function(response) {

    var cookies = {};
    response.cookies.split(';').forEach(function(cookie) {
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

    it('Test for /disapproveAcademicTutor', function(done){
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
                            .post('/disapproveAcademicTutor')
                            .send({
                                msg : "Compilazione errata"
                            })
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200) 
                                done()
                            })
                        });
            })
    }, this.timeout(10000))

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
            .send({username: "s.cotto@gmail.com", password: "sara1234"})
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

    it('Test for /disapproveExternalTutor', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "s.cotto@gmail.com", password: "sara1234"})
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
                            .post('/disapproveExternalTutor')
                            .send({
                                msg : "Compilazione errata"
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
            .send({username: "s.cotto@gmail.com", password: "sara1234"})
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

    it('Test for /getRequests', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getRequests')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
                        done()
                    });
            })
    })

    it('Test for /getDetails', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "f.ferrucci@unisa.it", password: "FerFilomena1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getDetails')
                    .redirects(0)
                    .query({student: "d.devito@studenti.unisa.it"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.be.json
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

    it('Test for /getRequestVersions', function(done){
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
                            .get('/getRequestVersions')      
                            .query({inputVersion : "1"})                      
                            .end(function(err, res){
                                if(err) done(err)
                                expect(res).status(200)
                                expect(res).to.have.header('Content-Type', 'application/pdf');
                                done()
                            })
                        });
            })
    })

    it('Test for /getVersions', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/getVersions')
                    .query({inputVersion : "1"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        expect(res).to.have.header('Content-Type', 'application/pdf');
                        done()
                    })
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

    it('Test for /updateProfile for External Tutor', function(done){
        agent
            .post('/login')
            .send({username: "a.gentile@yahoo.it", password: "angelo678"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).status(200)
                agent
                    .post('/updateProfile')
                    .send({inputNameE: 'Marco', inputSurnameE: 'Borrelli', inputOrganization: 'Sony'})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.cookie('updateEff')
                        done()
                    })
            })
    })

    it('Test for /updateProfile for Academic Tutor', function(done){
        agent
            .post('/login')
            .send({username: "p.penna@unisa.it", password: "PenPaola1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).status(200)
                agent
                    .post('/updateProfile')
                    .send({inputNameAc: 'Antonio', inputSurnameAc: 'Borrelli', inputDepartmentT: 'Economia'})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.cookie('updateEff')
                        done()
                    })
            })
    })


    
    it('Test for /updateProfile for Student', function(done){
        agent
            .post('/login')
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).status(200)
                agent
                    .post('/updateProfile')
                    .send({inputNameS: "Marco", inputSurnameS: "Borrelli", inputCity: "Milano", inputAddress: "Via Pigno 13", inputDegree: "Informatica"})
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.cookie('updateEff')
                        done()
                    })
            })
    })

    

    it('Test for /profile', function(done){
        agent
            .post('/login')
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).status(200)
                agent
                    .get('/profile')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).status(200)
                        done()
                    })
            })
    })

    /*it.only('Test for /logout', function(done){
        agent
            .post('/login')
            .redirects(0)
            .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.cookie('logEff')
                agent
                    .get('/logout')
                    .end(function(err, res){
                        if(err) done(err)
                        expect(res).to.have.cookie('logoutEff')
                        done()login
    */

   it('Test for /logout', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/logout')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('logoutEff')
                    done()
                })
        })
})

it('Test for /signup for Student', function(done){
    agent
        .post('/signup')
        .redirects(0)
        .send({radioAccount: 'studente', inputName: 'Mario', inputSurname: 'Cianino', inputEmail: 'm.ciano98@studenti.unisa.it', inputMatricola: '1111111111', inputPassword: 'MarcoCiano98', inputCity: 'Salerno', inputAddress: 'Via Appia, 16', inputCourse: 'Informatica', inputConfirmPassword: 'MarcoCiano98' })
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('regEff')
            done()
        })

    })


it('Test for get /', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /signpup for Academic', function(done){
    agent
        .post('/signup')
        .redirects(0)
        .send({radioAccount:'tutorAccademico', inputNameT: 'Alessia', inputSurnameT: 'Amoroso', inputEmailT: 'a.ambruoso99@unisa.it', inputPassword: 'AlessioAmb98', inputDepartmentT: 'Informatica', inputConfirmPassword: 'AlessioAmb98' })
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('regEff')
            done()
        })
})

it('Test for /addHostOrg', function(done){
    agent
        .post('/login')
        .send({username: "f.intrieri@unisa.it", password: "filip123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).status(200)
            agent
                .get('/addHostOrg')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /addHostOrgF', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "f.intrieri@unisa.it", password: "filip123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/addHostOrgF')
                .send({inputErasmusCode:'peppo201', inputFacolta: 'ComputerScience' , inputAddress:'via firenze 41',inputSize:'110', inputCountry:'Germania', inputContacts:'0818933344', inputNameT:'SoftwareApple'})
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('insertHEff')
                    done()
                })
        })
})

it('Test for /addExtTutor', function(done){
    agent
        .post('/login')
        .send({username: "f.intrieri@unisa.it", password: "filip123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).status(200)
            agent
                .get('/addExtTutor')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /addExtTutorF', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "f.intrieri@unisa.it", password: "filip123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/addExtTutorF')
                .send({inputNameEx: 'Marco', inputSurnameEx: 'Esposito' , inputEmailEx:'peppe9@hotmail.it',inputOrganizationEx:'Tcc', inputPassword:'ciaociaociao1', inputRePassword:'ciaociaociao1'})
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('insertEff')
                    done()
                })
        })
})

it('Test for /deleteHostOrg', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "f.intrieri@unisa.it", password: "filip123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/deleteHostOrg')
                .send({erasmus:"sams9797"})
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    
                    expect(res).to.deep.include({"text" : "true"})
                    
                    done()
                })
        })
})

it('Test for /deleteExTutor', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "f.intrieri@unisa.it", password: "filip123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/deleteExTutor')
                .send({email:"a.lombardo@libero.it"})
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.deep.include({"text" : "true"})
                    done()
                })
        })
})



it('Test for /compileLaExternalTutor.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/compileLAExternalTutor.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})


it('Test for /compileLAAcademicTutor.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/compileLAAcademicTutor.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /viewRequest.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/viewRequest.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /request.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/request.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /signup.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/signup.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /header.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/header.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /sidebar.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/sidebar.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})

it('Test for /footer.html', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: "d.devito@studenti.unisa.it", password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .get('/footer.html')
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).status(200)
                    done()
                })
        })
})





it('Test for getCVState/', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: 'd.devito@studenti.unisa.it', password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/getCVState')
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.deep.include({"text" : "true"})
                    done()
                })
        })
})


it('Test for /getIDState', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: 'd.devito@studenti.unisa.it', password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/getIDState')
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.deep.include({"text" : "true"})
                    done()
                })
        })
})


it('Test for /deleteCV', function(done){ //va fixato
    agent
        .post('/login')
        .redirects(0)
        .send({username: 'd.devito@studenti.unisa.it', password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/deleteCV')
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    
                    
                    if( getResponseCookies(res)['DeletedCV']=='1'){ done()} 
                    else if(getResponseCookies(res)['notDeletedCV']=='1') {done()}
                    else {console.log('UNHANDLED ENDPOINT ERROR ON DELETECV:'+JSON.stringify(res))}


                        

                    
                })
        })
})


it('Test for /deleteID', function(done){ //va fixato
    agent
        .post('/login')
        .redirects(0)
        .send({username: 'd.devito@studenti.unisa.it', password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/deleteID')
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    
                    if(getCookies(res)['DeletedID']=='1'){ done()} 
                    else if(getCookies(res)['notDeletedID']=='1') {done()}
                    else {console.log('UNHANDLED ENDPOINT ERROR ON DELETEID:'+JSON.stringify(res))}

                    })
                
        })
})

it('Test for /getConnectedUser', function(done){
    agent
        .post('/login')
        .redirects(0)
        .send({username: 'd.devito@studenti.unisa.it', password: "DannyDeVito1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).to.have.cookie('logEff')
            agent
                .post('/getConnectedUser')
                .redirects(0)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.deep.include({"City" : "Milano"})
                    done()
                })
        })
})


it('Test for /updatePassword for Student', function(done){
    agent
        .post('/login')
        .send({username: "f.vitolo@studenti.unisa.it", password: "VitoFerdi1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).status(200)
            agent
                .post('/updatePassword')
                .send({inputOldPassword: 'VitoFerdi1', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997'})
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('updatePassEff')
                    done()
                })
        })
})

it('Test for /updatePassword for Admin', function(done){
    agent
        .post('/login')
        .send({username: "a.marino@unisa.it", password: "andrea123"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).status(200)
            agent
                .post('/updatePassword')
                .send({inputOldPassword: 'andrea123', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997'})
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('updatePassEff')
                    done()
                })
        })
})

it('Test for /updatePassword for Academic Tutor', function(done){
    agent
        .post('/login')
        .send({username: "s.risso@unisa.it", password: "RisSimone1"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).status(200)
            agent
                .post('/updatePassword')
                .send({inputOldPassword: 'RisSimone1', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997'})
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('updatePassEff')
                    done()
                })
        })
})

it('Test for /updatePassword for External Tutor', function(done){
    agent
        .post('/login')
        .send({username: "a.lombardo@libero.it", password: "alberto987"})
        .end(function(err, res){
            if(err) done(err)
            expect(res).status(200)
            agent
                .post('/updatePassword')
                .send({inputOldPassword: 'alberto987', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997'})
                .end(function(err, res){
                    if(err) done(err)
                    expect(res).to.have.cookie('updatePassEff')
                    done()
                })
        })
})

})