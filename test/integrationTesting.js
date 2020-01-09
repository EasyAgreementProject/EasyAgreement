var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = require('supertest');
const app = require('../server.js')


describe('Field test for server.js', function() {

    it.only('Testing get compileLAStudent.html', function(done) {
        request(app).get("/compileLAStudent.html")
            .expect(200)
            .expect(/Compilazione Learning Agreement/);
            done();
    });

    it.only('Testing get viewLA.html', function(done) {
        request(app).get("/viewLA.html")
            .expect(200)
            .expect(/Learning Agreement/);
            done();
    });

    it.only('Testing get gestioneDocumenti.html', function(done) {
        request(app).get("/gestioneDocumenti.html")
            .expect(200)
            .expect(/Gestione Documenti/);
            done();
    });

    it.only('Testing get login.html', function(done) {
        request(app).get("/")
            .expect(200)
            .expect(/Login/);
            done();
    });

    it.only('Testing get compileStudent', function(done) {
        request(app).post("/compileStudent")
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
                inputEmail:"v.volpicelli4@studenti.unisa.it",
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
            .expect('Content-Type', 'application/pdf')
            done();
    });

    it.only('Testing get compileLAExternalTutor.html' , function(done) {
        request(app).get("/compileLAExternalTutor.html")

            .expect(200)
            .expect(/Compilazione Learning Agreement/)
            done();
    });

    it.only('Testing get compileLAAcademicTutor.html' , function(done) {
        request(app).get("/compileLAAcademicTutor.html")
            .expect(200)
            .expect(/Compilazione Learning Agreement/)
            done();
    });

    it.only('Testing get viewRequest.html' , function(done) {
        request(app).get("/viewRequest.html")
            .expect(200)
            .expect(/Dettagli Richiesta/)
            done();
    });

    it.only('Testing get request.html' , function(done) {
        request(app).get("/request.html")

            .expect(200)
            .expect(/Richiesta/)
            done();
    });


    it.only('Testing getRequest.html' , function(done) {
        request(app).get("/getRequest.html")
            
            .expect('Location', /\/viewRequest.html/, done)
            
    });



    

});