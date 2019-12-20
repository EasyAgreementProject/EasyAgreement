var pdfFiller = require('pdffiller');
var fs = require('fs');
var LA = require('../models/learningAgreement.js');
var learningAgreement = new LA();

exports.sendLaStudent = function() {
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF =  "pdf/Filled_LA.pdf";
    let data = {
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
                let file = fs.createReadStream('pdf/Filled_LA.pdf');
                learningAgreement.setFilling(data);
                learningAgreement.setDocument(null);
                learningAgreement.setStudentID(data["E-mail"]);
                learningAgreement.setState(null);
                learningAgreement.setDate(data["The trainee date"]);
              
                let insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
                insertLearningAgreementPr.then(function() {
                    fulfill(file);
                });
                
            }
        });
    })
}

exports.getData = function(student) {
    return new Promise(function (fulfill, reject) {
            console.log("Getting data for student: "+student);
            getLearningAgreementPr = LA.getLearningAgreement(student);
            getLearningAgreementPr.then(function(result) {
                console.log("Searching done!");
                fulfill(result.filling);
        });
    });
}

exports.validateData = function(data) {
    return new Promise(function (fulfill, reject) {
        if (data["Header name"].test("/^[A-Z|a-z]+\s{1}[A-Z|a-z]+(\s{1}[A-Z|a-z]+)?$/") &&
            data["Last name (s)"].test("/^[A-Z|a-z]+$/") &&
            data["First name (s)"].test("/^[A-Z|a-z]+(\s{1}[A-Z|a-z]+)?$/") &&
            data["Date of birth"].test("/^([0-2][0-9]|(3)[0-1]){1}\/{1}((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/") &&
            data["Nationality"].test("/^[A-Z|a-z]+$/") &&
            data["Sex [M/F]"].test("/^(M|F)/") &&
            data["Academic year1"].test("/^\d{2}$/") &&
            data["Academic year2"].test("/^\d{2}$/") &&
            data["Study cycle"].test("/^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$/") &&
            data["Subject area, Code"].test("/?[A-Z|a-z]+,{1}\s?\d+$/") &&
            data["Phone"].test("/^\d{1,10}$/") &&
            data["E-mail"].test("/^[a-z]{1}\.{1}[a-z]{3,}\d{1,2}@{1}(studenti.unisa.it){1}$/") &&
            data["Sending Departement"].test("/^[A-Z|a-z]+$/") &&
            data["Contact person name"].test("/^[A-Z|a-z]+\s{1}[A-Z|a-z]+(\s{1}[A-Z|a-z]+)?$/") &&
            data["Contcat person E-mail / phone"].test("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s{1}\/?\s?\d{9,10}$/") &&
            data["Contact person name / position"].test() &&
            data["Receiving contact person e-mail phone"].test("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s{1}\/?\s?\d{9,10}$/") &&
            data["Name Sector"].test("/^[A-Z|a-z]+$/") &&
            data["Receiving Department"].test("/^[A-Z|a-z]+$/") &&
            data["Address, website"].test("/^\w$/") &&
            data["Country"].test("/^[A-Z|a-z]+$/") &&
            data["Size of enterprise"].test("/^\d$/") &&
            data["Mentor name / position"].test("/^\w$/") &&
            data["Mentor e-mail / phone"].test("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s{1}\/?\s?\d{9,10}$/") &&
            data["from"].test("/^{1}((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/") &&
            data["till"].test("/^{1}((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/") &&
            data["Number of working hours for week"].test("/^\d{2}$/") &&
            data["Traineeship title"].test("/^\w$/") &&
            data["Detailed programme of the traineeship period"].test("/^\w$/") &&
            data["Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship"].test("/^\w$/") &&
            data["Monitoring plan"].test("/^\w$/") &&
            data["Evaluation plan"].test("/^\w$/") &&
            data["language competence"].test("/^[A-Z|a-z]+$/") &&
            data["The trainee signature"].test("/^[A-Z|a-z]+\s{1}[A-Z|a-z]+(\s{1}[A-Z|a-z]+)?$/") &&
            data["The trainee date"].test("/^([0-2][0-9]|(3)[0-1]){1}\/{1}((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/")) {
                
            }
    });
}