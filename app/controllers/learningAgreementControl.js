var pdfFiller = require('pdffiller');
var fs = require('fs');
var LA = require('../models/learningAgreement.js');
var learningAgreement = new LA();

exports.sendLaStudent = function(input, res) {
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF =  "pdf/Filled_LA.pdf";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd+"/"+mm+"/"+yyyy;
    var data = {
        "Header name" : input[0]+" "+input[1],
        "Last name (s)" : input[1],
        "First name (s)": input[0],
        "Date of birth" : input[2],
        "Nationality": input[5],
        "Sex [M/F]" : input[4],
        "Academic year1":input[7],
        "Academic year2":input[8],
        "Study cycle" : input[6],
        "Subject area, Code":input[9],
        "Phone" : input[3],
        "E-mail" : input[10],
        "Sending Departement": input[11],
        "Contact person name": input[31],
        "Contact person Email / Phone": input[12],
        "Contact person name / position": input[18],
        "Receiving contact person e-mail phone": input[12],
        "Name Sector":input[13],
        "Receiving Department":input[14],
        "Address, website":input[15],
        "Country":input[16],
        "Size of enterprise":input[17],
        "Mentor name / position":input[19],
        "Mentor e-mail / phone":input[20],
        "from":input[21],
        "till":input[22],
        "Number of working hours for week":input[23],
        "Traineeship title":input[24],
        "Detailed programme of the traineeship period": input[25],
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship":input[26],
        "Monitoring plan":input[27],
        "Evaluation plan":input[28],
        "language competence":input[29],
        "The trainee signature": input[0]+" "+input[1],
        "The trainee date": today
    };
    /*var data = {
        "Header name" : "Veronica Volpicelli",
        "Last name (s)" : "Volpicelli",
        "First name (s)": "Veronica",
        "Date of birth" : "22/04/1996",
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
        "Contact person Email / Phone": "f.ferrucci@unisa.it 1234456789",
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
        "B2":"X",
        "The trainee signature": "Veronica Volpicelli",
        "The trainee date":"08/12/2019"
    };*/
    console.log(data["Date of birth"]+"    "+data["The trainee date"]);
    switch("B2") {
        case "A1": data["A1"] = "X"; break;
        case "A2": data["A2"] = "X"; break;
        case "B1": data["B1"] = "X"; break;
        case "B2": data["B2"] = "X"; break;
        case "C1": data["C1"] = "X"; break;
        case "C2": data["C2"] = "X"; break;
        default: break;
    }
  
    return new Promise(function (fulfill, reject) {   
        let validatePr = exports.validateData(data, res);
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
                fulfill(null);
            }
        });
        
    })
}

exports.saveLaStudent = function(input) {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF =  "pdf/Filled_LA.pdf";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd+"/"+mm+"/"+yyyy;
    var data = {
        "Header name" : input[0]+" "+input[1],
        "Last name (s)" : input[1],
        "First name (s)": input[0],
        "Date of birth" : input[2],
        "Nationality": input[5],
        "Sex [M/F]" : input[4],
        "Academic year1":input[7],
        "Academic year2":input[8],
        "Study cycle" : input[6],
        "Subject area, Code":input[9],
        "Phone" : input[3],
        "E-mail" : input[10],
        "Sending Departement": input[11],
        "Contact person name": input[31],
        "Contact person Email / Phone": input[12],
        "Contact person name / position": input[18],
        "Receiving contact person e-mail phone": input[12],
        "Name Sector":input[13],
        "Receiving Department":input[14],
        "Address, website":input[15],
        "Country":input[16],
        "Size of enterprise":input[17],
        "Mentor name / position":input[19],
        "Mentor e-mail / phone":input[20],
        "from":input[21],
        "till":input[22],
        "Number of working hours for week":input[23],
        "Traineeship title":input[24],
        "Detailed programme of the traineeship period": input[25],
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship":input[26],
        "Monitoring plan":input[27],
        "Evaluation plan":input[28],
        "language competence":input[29],
        "The trainee signature": input[0]+" "+input[1],
        "The trainee date": today
    };
    /*var data = {
        "Header name" : "Veronica Volpicelli",
        "Last name (s)" : "Volpicelli",
        "First name (s)": "Veronica",
        "Date of birth" : "22/04/1996",
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
        "Contact person Email / Phone": "f.ferrucci@unisa.it 1234456789",
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
        "B2":"X",
        "The trainee signature": "Veronica Volpicelli",
        "The trainee date":"08/12/2019"
    };*/
    console.log(data["Date of birth"]+"    "+data["The trainee date"]);
    switch("B2") {
        case "A1": data["A1"] = "X"; break;
        case "A2": data["A2"] = "X"; break;
        case "B1": data["B1"] = "X"; break;
        case "B2": data["B2"] = "X"; break;
        case "C1": data["C1"] = "X"; break;
        case "C2": data["C2"] = "X"; break;
        default: break;
    }
  
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

exports.validateData = function(data, res) {
    return new Promise(function (fulfill, reject) {
        console.log("Begin...");
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["Header name"]))) {
                res.cookie("errName", "1");
                res.cookie("errSurname", "1");
                fulfill(false);
            }
        if (!(/^[A-za-zà-ù]+$/.test(data["Last name (s)"]))) {
                res.cookie("errSurname", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["First name (s)"]))) {
                res.cookie("errName", "1");
                fulfill(false);
            }
        if (!(/^(\d{4}(-|\/)((0)[0-9]|(1)[0-2]){1}(-|\/)([0-2][0-9]|(3)[0-1]){1}|([0-2][0-9]|(3)[0-1]){1}(-|\/){1}((0)[0-9]|(1)[0-2]){1}(-|\/){1}\d{4})$/.test(data["Date of birth"]))) {
                res.cookie("errDate", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+$/.test(data["Nationality"]))) {
                res.cookie("errNationality", "1");
                fulfill(false);
            }
            if (!(/^(M|F)/.test(data["Sex [M/F]"]))) {
                res.cookie("errSex", "1");
                fulfill(false);
            }
            if (!(/^\d{2}$/.test(data["Academic year1"]))) {
                res.cookie("errAcademicYear1", "1");
                fulfill(false);
            }
            if (!(/^\d{2}$/.test(data["Academic year2"]))) {
                res.cookie("errAcademicYear2", "1");
                fulfill(false);
            }
            if (!(/^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$/.test(data["Study cycle"]))) {
                res.cookie("errStudyCicle", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+\,{1} ?\d+$/.test(data["Subject area, Code"]))) {
                res.cookie("errSubjectCode", "1");
                fulfill(false);
            }
            if (!(/^\d{9,10}$/.test(data["Phone"]))) {
                res.cookie("errTelephone", "1");
                fulfill(false);
            }
            if (!(/^[a-z]{1}\.{1}[a-z]{2,}\d{1,}@{1}(studenti.unisa.it){1}$/.test(data["E-mail"]))) {
                res.cookie("errEmail", "1");
                fulfill(false);
            }
            if (!(/^\w+$/.test(data["Sending Departement"]))) {
                res.cookie("errDepartmentSending", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["Contact person name"]))) {
                res.cookie("errContactName", "1");
                fulfill(false);
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Contact person Email / Phone"]))) {
                res.cookie("errContactSending", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù])?( ?\/|,)? {1}[A-za-zà-ù]+$/.test(data["Contact person name / position"]))) {
                res.cookie("errContactReciving", "1");
                fulfill(false);
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Receiving contact person e-mail phone"]))) {
                res.cookie("errContactSending", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Name Sector"]))) {
                res.cookie("errNameSector", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Receiving Department"]))) {
                res.cookie("errDepartmentReciving", "1");
                fulfill(false);
            }
            if (!(/^[\w ,\.']+ ?(,|\/)? (http(s)?:\\\\)?www\.\w+\.(\w+\.)*\w{2,3}$/.test(data["Address, website"]))) {
                res.cookie("errAddressWebSite", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Country"]))) {
                res.cookie("Country wrong", "1");
                fulfill(false);
            }
            if (!(/^\d+( ?[- \/] ?\d+)?$/.test(data["Size of enterprise"]))) {
                res.cookie("SerrSizeEnterprise", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ùà-ù]+ {1}[A-za-zà-ùà-ù]+( {1}[A-za-zà-ùà-ù])?( ?\/|,)? {1}[A-za-zà-ùà-ù]+$/.test(data["Mentor name / position"]))) {
                res.cookie("errMentor", "1");
                fulfill(false);
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Mentor e-mail / phone"]))) {
                res.cookie("errMentorInfo", "1");
                fulfill(false);
            }
            if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["from"]))) {
                res.cookie("errDateFrom", "1");
                fulfill(false);
            }
            if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["till"]))) {
                res.cookie("errDateTo", "1");
                fulfill(false);
            }
            if (!(/^\d{1,2}$/.test(data["Number of working hours for week"]))) {
                res.cookie("errHourWork", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù,'à-ù0-9]+( [A-za-zà-ù,'à-ù0-9]+)*$/.test(data["Traineeship title"]))) {
                res.cookie("errTitle", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Detailed programme of the traineeship period"]))) {
                res.cookie("errDetailed", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship"]))) {
                res.cookie("errKnowledge", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Monitoring plan"]))) {
                res.cookie("errMonitoring", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Evaluation plan"]))) {
                res.cookie("errEvaluation", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+$/.test(data["language competence"]))){
                res.cookie("errLenguage", "1");
                fulfill(false);
            }
            if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["The trainee signature"]))) {
                res.cookie("errName", "1");
                fulfill(false);
            }
            if (!(/^(\d{4}(-|\/)((0)[0-9]|(1)[0-2]){1}(-|\/)([0-2][0-9]|(3)[0-1]){1}|([0-2][0-9]|(3)[0-1]){1}(-|\/){1}((0)[0-9]|(1)[0-2]){1}(-|\/){1}\d{4})$/.test(data["The trainee date"]))) {
                res.cookie("errDate", "1");
                fulfill(false);
            }
            else {
                res.cookie("All okay", "1");
                fulfill(true);
            }
    });
}
