var pdfFiller = require('pdffiller');
var fs = require('fs');
var LA = require('../models/learningAgreement.js');
var learningAgreement = new LA();

exports.sendLaStudent = function() {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF =  "pdf/Filled_LA.pdf";
    var data = {
        //"Header name" : input[0]+input[1],
        //"Last name (s)" : input[1],
        //"First name (s)": input[0],
        //"Date of birth" : input[2],
        //"Nationality":input[5],
        //"Sex [M/F]" : input[4],
        "Academic year1":"19",
        "Academic year2":"20",
        //"Study cycle" : input[6],
        "Subject area, Code":"Informatica, 05121",
        //"Phone" : input[3],
        "E-mail" : "v.volpicelli4@studenti.unisa.it",
        "Sending Departement":"Informatica",
        "Contact person name":"Filomena Ferrucci",
        "Contact person E-mail / phone": "958304953",
        "Contact person name / position":"Filomena Ferrucci",
        "Receiving contact person e-mail phone":"f.ferrucci@unisa.it",
        "Name Sector":"Non lo so",
        "Receiving Department":"Boh",
        "Address, website":"www.nonoloso.it",
        "Country":"Nessuna",
        "Size of enterprise":"Ma che è",
        "Mentor name / position":"Michela Bertolotto",
        "Mentor e-mail / phone":"9876543210",
        "from":"12/2019",
        "till":"06/2020",
        "Number of working hours for week":"8",
        "Traineeship title":"Non ho voglia di fare l'università",
        "Detailed programme of the traineeship period": "Non ho fatto un c.... per tutto il periodo",
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship":"Imparare a fare la pizza",
        "Monitoring plan":"Non so cosa dovrebbe essere",
        "Evaluation plan":"Come per il monitoring plan",
        "language competence":"english",
        //"The trainee signature": input[0]+input[1],
        "The trainee date":"08/12/2019"
    };
  
    return new Promise(function (fulfill, reject) {          
        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) { 
            if (err)
                throw err;
            else {
                console.log("PDF create successfully!");
                //send Filled PDF to Client side
                var file = fs.createReadStream('pdf/Filled_LA.pdf');
                learningAgreement.setFilling(data);
                learningAgreement.setDocument(file);
                learningAgreement.setStudentID(data["E-mail"]);
                learningAgreement.setState("sumbitted");
                learningAgreement.setDate(data["The trainee date"]);
              
                var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
                insertLearningAgreementPr.then(function() {
                    fulfill(learningAgreement);
                });
                
            }
        });
    })
}

exports.saveLaStudent = function() {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF =  "pdf/Filled_LA.pdf";
    var data = {
        //"Header name" : input[0]+input[1],
        //"Last name (s)" : input[1],
        //"First name (s)": input[0],
        //"Date of birth" : input[2],
        //"Nationality":input[5],
        //"Sex [M/F]" : input[4],
        "Academic year1":"19",
        "Academic year2":"20",
        //"Study cycle" : input[6],
        "Subject area, Code":"Informatica, 05121",
        //"Phone" : input[3],
        "E-mail" : "v.volpicelli4@studenti.unisa.it",
        "Sending Departement":"Informatica",
        "Contact person name":"Filomena Ferrucci",
        "Contact person E-mail / phone": "958304953",
        "Contact person name / position":"Filomena Ferrucci",
        "Receiving contact person e-mail phone":"f.ferrucci@unisa.it",
        "Name Sector":"Non lo so",
        "Receiving Department":"Boh",
        "Address, website":"www.nonoloso.it",
        "Country":"Nessuna",
        "Size of enterprise":"Ma che è",
        "Mentor name / position":"Michela Bertolotto",
        "Mentor e-mail / phone":"9876543210",
        "from":"12/2019",
        "till":"06/2020",
        "Number of working hours for week":"8",
        "Traineeship title":"Non ho voglia di fare l'università",
        "Detailed programme of the traineeship period": "Non ho fatto un c.... per tutto il periodo",
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship":"Imparare a fare la pizza",
        "Monitoring plan":"Non so cosa dovrebbe essere",
        "Evaluation plan":"Come per il monitoring plan",
        "language competence":"english",
        //"The trainee signature": input[0]+input[1],
        "The trainee date":"08/12/2019"
    };
  
    return new Promise(function (fulfill, reject) {          
        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) { 
            if (err)
                throw err;
            else {
                console.log("PDF create successfully!");
                //send Filled PDF to Client side
                var file = fs.createReadStream('pdf/Filled_LA.pdf');
                learningAgreement.setFilling(data);
                learningAgreement.setDocument(null);
                learningAgreement.setStudentID(data["E-mail"]);
                learningAgreement.setState(null);
                learningAgreement.setDate(data["The trainee date"]);
              
                var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
                insertLearningAgreementPr.then(function() {
                    fulfill(file);
                });
                
            }
        });
    })
}