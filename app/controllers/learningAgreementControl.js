var pdfFiller = require('pdffiller');
var fs = require('fs');
var LA = require('../models/learningAgreement.js');
var learningAgreement = new LA();

exports.sendLaStudent = function() {
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF =  "pdf/Filled_LA.pdf";
    let data = {
        "Header name" : "Veronica Volpicelli",
        "Last name (s)" : "Volpicelli",
        "First name (s)": "Veronica",
        "Date of birth" : "22/04/96",
        "Nationality":"Italiana",
        "Sex [M/F]" : "F",
        "Academic year1":"19",
        "Academic year2":"20",
        "Study cycle" : "1st cycle",
        "Subject area, Code":"Informatica, 05121",
        "Phone" : "123456789",
        "E-mail" : "v.volpicelli4@studenti.unisa.it",
        "Sending Departement":"Informatica",
        "Contact person name":"Filomena Ferrucci",
        "Contact person E-mail / phone": "f.ferrucci@unisa.it 1234456789",
        "Contact person name / position":"Filomena Ferrucci, Responsabile",
        "Receiving contact person e-mail phone":"f.ferrucci@unisa.it 123456789",
        "Name Sector":"Non lo so",
        "Receiving Department":"Boh",
        "Address, website":"Via non lo so, 12 www.nonoloso.it",
        "Country":"Nessuna",
        "Size of enterprise":"250",
        "Mentor name / position":"Michela Bertolotto Direttrice",
        "Mentor e-mail / phone":"m.berto@gmail.com 9876543210",
        "from":"12/2019",
        "till":"06/2020",
        "Number of working hours for week":"8",
        "Traineeship title":"Non ho voglia di fare l'università",
        "Detailed programme of the traineeship period": "Non ho fatto un c.... per tutto il periodo",
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship":"Imparare a fare la pizza",
        "Monitoring plan":"Non so cosa dovrebbe essere",
        "Evaluation plan":"Come per il monitoring plan",
        "language competence":"english",
        "The trainee signature": "Veronica Volpicelli",
        "The trainee date":"08/12/2019"
    };
  
    return new Promise(function (fulfill, reject) {   
        let validatePr = exports.validateData(data);
        validatePr.then(function(result){
            if(result) {
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
                })
            }
            else {
                reject();
            }
        });
        
    })
}

exports.saveLaStudent = function() {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF =  "pdf/Filled_LA.pdf";
    var data = {
        "Header name" : "input[0]+input[1]",
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
        "Size of enterprise":"250",
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
        let validatePr = exports.validateData(data);
        validatePr.then(function(result){  
            if(result) {
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
            }
        })
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
        console.log("Begin...");
        if ((/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["Header name"])) &&
            /^[A-za-zà-ù]+$/.test(data["Last name (s)"]) &&
            /^[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["First name (s)"]) &&
            /^[A-za-zà-ù]+$/.test(data["Nationality"]) &&
            /^(M|F)/.test(data["Sex [M/F]"]) &&
            /^\d{2}$/.test(data["Academic year1"]) &&
            /^\d{2}$/.test(data["Academic year2"]) &&
            /^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$/.test(data["Study cycle"]) &&
            /^[A-za-zà-ù]+\,{1} ?\d+$/.test(data["Subject area, Code"]) &&
            /^\d{1,10}$/.test(data["Phone"]) &&
            /^[a-z]{1}\.{1}[a-z]{3,}\d{1,2}@{1}(studenti.unisa.it){1}$/.test(data["E-mail"]) &&
            /^\w+$/.test(data["Sending Departement"]) &&
            /^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["Contact person name"]) &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Contact person E-mail / phone"]) &&
            /^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù])?( ?\/|,)? {1}[A-za-zà-ù]+$/.test(data["Contact person name / position"]) &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Receiving contact person e-mail phone"]) &&
            /^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Name Sector"]) &&
            /^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Receiving Department"]) &&
            /^[\w ,\.']+,? (http(s)?:\\\\)?www\.\w+\.(\w+\.)*\w{2,3}$/.test(data["Address, website"]) &&
            /^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Country"]) &&
            /^\d+( ?[- \/] ?\d+)?$/.test(data["Size of enterprise"]) &&
            /^[A-za-zà-ùà-ù]+ {1}[A-za-zà-ùà-ù]+( {1}[A-za-zà-ùà-ù])?( ?\/|,)? {1}[A-za-zà-ùà-ù]+$/.test(data["Mentor name / position"]) &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Mentor e-mail / phone"]) &&
            /^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["from"]) &&
            /^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["till"]) &&
            /^\d{1,2}$/.test(data["Number of working hours for week"]) &&
            /^[A-za-zà-ù,'à-ù0-9]+( [A-za-zà-ù,'à-ù0-9]+)*$/.test(data["Traineeship title"]) &&
            /^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$/.test(data["Detailed programme of the traineeship period"]) &&
            /^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$/.test(data["Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship"]) &&
            /^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$/.test(data["Monitoring plan"]) &&
            /^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)*$/.test(data["Evaluation plan"]) &&
            /^[A-za-zà-ù]+$/.test(data["language competence"]) &&
            /^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["The trainee signature"]) &&
            /^([0-2][0-9]|(3)[0-1]){1}\/{1}((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["The trainee date"])) {
                console.log("All okay!");
                fulfill(true);
            }
        else{
            console.log("Something's wrong!");
            fulfill(false);
        }
    });
}