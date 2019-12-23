var pdfFiller = require('pdffiller');
var fs = require('fs');
var LA = require('../models/learningAgreement.js');
var learningAgreement = new LA();
const Readable = require('stream').Readable;

exports.sendLaStudent = function(input, res) {
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF = "pdf/Filled_LA.pdf";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    var data = {
        "Header name": input[0] + " " + input[1],
        "Last name (s)": input[1],
        "First name (s)": input[0],
        "Date of birth": input[2],
        "Nationality": input[5],
        "Sex [M/F]": input[4],
        "Academic year1": input[7],
        "Academic year2": input[8],
        "Study cycle": input[6],
        "Subject area, Code": input[9],
        "Phone": input[3],
        "E-mail": input[10],
        "Sending Departement": input[11],
        "Contact person name": input[12],
        "Contact person Email / Phone": input[13],
        "Contact person name / position": input[19],
        "Receiving contact person e-mail phone": input[13],
        "Name Sector": input[14],
        "Receiving Department": input[15],
        "Address, website": input[16],
        "Country": input[17],
        "Size of enterprise": input[18],
        "Mentor name / position": input[20],
        "Mentor e-mail / phone": input[21],
        "from": input[22],
        "till": input[23],
        "Number of working hours for week": input[24],
        "Traineeship title": input[25],
        "Detailed programme of the traineeship period": input[26],
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship": input[27],
        "Monitoring plan": input[28],
        "Evaluation plan": input[29],
        "language competence": input[30],
        "The trainee signature": input[0] + " " + input[1],
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
    console.log(data["Date of birth"] + "    " + data["The trainee date"]);
    switch (input[31]) {
        case "A1":
            data["A1"] = "X";
            break;
        case "A2":
            data["A2"] = "X";
            break;
        case "B1":
            data["B1"] = "X";
            break;
        case "B2":
            data["B2"] = "X";
            break;
        case "C1":
            data["C1"] = "X";
            break;
        case "C2":
            data["C2"] = "X";
            break;
        default:
            break;
    }

    return new Promise(function(fulfill, reject) {
        let validatePr = exports.validateData(data, res);
        validatePr.then(function(result) {
            if (result) {
                pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
                    if (err)
                        throw err;
                    else {
                        console.log("PDF create successfully!");
                        //send Filled PDF to Client side
                        var file = fs.readFileSync('pdf/Filled_LA.pdf');
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
            } else {
                fulfill(null);
            }
        });

    })
}

exports.saveLaStudent = function(input) {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF = "pdf/Filled_LA.pdf";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    var data = {
        "Header name": input[0] + " " + input[1],
        "Last name (s)": input[1],
        "First name (s)": input[0],
        "Date of birth": input[2],
        "Nationality": input[5],
        "Sex [M/F]": input[4],
        "Academic year1": input[7],
        "Academic year2": input[8],
        "Study cycle": input[6],
        "Subject area, Code": input[9],
        "Phone": input[3],
        "E-mail": input[10],
        "Sending Departement": input[11],
        "Contact person name": input[12],
        "Contact person Email / Phone": input[13],
        "Contact person name / position": input[19],
        "Receiving contact person e-mail phone": input[13],
        "Name Sector": input[14],
        "Receiving Department": input[15],
        "Address, website": input[16],
        "Country": input[17],
        "Size of enterprise": input[18],
        "Mentor name / position": input[20],
        "Mentor e-mail / phone": input[21],
        "from": input[22],
        "till": input[23],
        "Number of working hours for week": input[24],
        "Traineeship title": input[25],
        "Detailed programme of the traineeship period": input[26],
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship": input[27],
        "Monitoring plan": input[28],
        "Evaluation plan": input[29],
        "language competence": input[30],
        "The trainee signature": input[0] + " " + input[1],
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
    console.log(data["Date of birth"] + "    " + data["The trainee date"]);
    switch (input[31]) {
        case "A1":
            data["A1"] = "X";
            break;
        case "A2":
            data["A2"] = "X";
            break;
        case "B1":
            data["B1"] = "X";
            break;
        case "B2":
            data["B2"] = "X";
            break;
        case "C1":
            data["C1"] = "X";
            break;
        case "C2":
            data["C2"] = "X";
            break;
        default:
            break;
    }

    return new Promise(function(fulfill, reject) {
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
    return new Promise(function(fulfill, reject) {
        console.log("Getting data for student: " + student);
        getLearningAgreementPr = LA.getLearningAgreement(student);
        getLearningAgreementPr.then(function(result, err) {
            if (err) throw err;
            console.log("Searching done!");
            if(result) 
                fulfill(result.filling);
        });
    });
}

exports.getStatus = function(student) {
    return new Promise(function(fulfill, reject) {
        console.log("Getting data for student: " + student);
        getLearningAgreementPr = LA.getLearningAgreement(student);
        getLearningAgreementPr.then(function(result, err) {
            if (err) throw err;
            console.log("Searching done!");
            if(result) 
                fulfill(result.state);
        });
    });
}

exports.getVersion = function(id, email) {
    return new Promise(function(fulfill, reject) {
        getPdfPr = LA.getPdf(id, email);
        getPdfPr.then(function(result, err) {
            if (err) throw err;
            console.log("Getting version with id= "+id);
            fs.writeFile('LA.pdf', result.document.file_data.buffer ,function(err){
                let file = fs.createReadStream('LA.pdf');
                if (err) throw err;
                console.log('Sucessfully saved!');
                const s = new Readable();
                s._read = function noop() {};
                s.push(result.document.file_data.buffer);
                s.push(null);
                console.log(s);
                fulfill(file);
            });            
        });
    });
}

exports.getAllVersions = function(student) {
    return new Promise(function(fulfill, reject) {
        console.log("Getting data for student: " + student);
        getAllVersionsPr = LA.getOldVersions(student);
        getAllVersionsPr.then(function(result, err) {
            if (err) throw err;
            console.log("Searching done!");
            if(result) {                  
                getLearningAgreementPr = LA.getLearningAgreement(student);
                getLearningAgreementPr.then(function(la, err) {
                    if (err) throw err;
                    console.log("Searching done!");
                    if(la) {
                        result.push(la);
                        result.sort((a, b) => b.version - a.version);
                        fulfill(result);
                    }
                });
            }
        });
    });
}

exports.validateData = function(data, res) {
    return new Promise(function(fulfill, reject) {
        console.log("Begin...");
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["Header name"]))) {
            if(res) {
                if(res) res.cookie("errName", "1");
                if(res) res.cookie("errSurname", "1");
            }
            console.log("Header Name wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+$/.test(data["Last name (s)"]))) {
            if(res) res.cookie("errSurname", "1");
            console.log("Last name wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["First name (s)"]))) {
            if(res) res.cookie("errName", "1");
            console.log("Name wrong!");
            fulfill(false);
        }
        if (!(/^(\d{4}(-|\/)((0)[0-9]|(1)[0-2]){1}(-|\/)([0-2][0-9]|(3)[0-1]){1}|([0-2][0-9]|(3)[0-1]){1}(-|\/){1}((0)[0-9]|(1)[0-2]){1}(-|\/){1}\d{4})$/.test(data["Date of birth"]))) {
            if(res) res.cookie("errDate", "1");
            console.log("birth date wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+$/.test(data["Nationality"]))) {
            if(res) res.cookie("errNationality", "1");
            console.log("nationality wrong!");
            fulfill(false);
        }
        if (!(/^(M|F)/.test(data["Sex [M/F]"]))) {
            if(res) res.cookie("errSex", "1");
            console.log("sex wrong!");
            fulfill(false);
        }
        if (!(/^\d{2}$/.test(data["Academic year1"]))) {
            if(res) res.cookie("errAcademicYear1", "1");
            console.log("ac1 wrong!");
            fulfill(false);
        }
        if (!(/^\d{2}$/.test(data["Academic year2"]))) {
            if(res) res.cookie("errAcademicYear2", "1");
            console.log("ac2 wrong!");
            fulfill(false);
        }
        if (!(/^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$/.test(data["Study cycle"]))) {
            if(res) res.cookie("errStudyCicle", "1");
            console.log("study cycle wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+\,{1} ?\d+$/.test(data["Subject area, Code"]))) {
            if(res) res.cookie("errSubjectCode", "1");
            console.log("subject area code wrong!");
            fulfill(false);
        }
        if (!(/^\d{1,10}$/.test(data["Phone"]))) {
            if(res) res.cookie("errTelephone", "1");
            console.log("phone wrong!");
            fulfill(false);
        }
        if (!(/^[a-z]{1}\.{1}[a-z]{2,}\d{1,}@{1}(studenti.unisa.it){1}$/.test(data["E-mail"]))) {
            if(res) res.cookie("errEmail", "1");
            console.log("email student wrong!");
            fulfill(false);
        }
        if (!(/^\w+$/.test(data["Sending Departement"]))) {
            if(res) res.cookie("errDepartmentSending", "1");
            console.log("sending department wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["Contact person name"]))) {
            if(res) res.cookie("errContactName", "1");
            console.log("contact person name wrong!");
            fulfill(false);
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Contact person Email / Phone"]))) {
            if(res) res.cookie("errContactSending", "1");
            console.log("contact email phone wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù])?( ?\/|,)? {1}[A-za-zà-ù]+$/.test(data["Contact person name / position"]))) {
            if(res) res.cookie("errContactReciving", "1");
            console.log("contact person name position wrong!");
            fulfill(false);
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Receiving contact person e-mail phone"]))) {
            if(res) res.cookie("errContactSending", "1");
            console.log("receiving contact person email phone wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Name Sector"]))) {
            if(res) res.cookie("errNameSector", "1");
            console.log("name sector wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Receiving Department"]))) {
            if(res) res.cookie("errDepartmentReciving", "1");
            console.log("receiving department wrong!");
            fulfill(false);
        }
        if (!(/^[\w ,\.']+ ?(,|\/)? (http(s)?:\\\\)?www\.\w+\.(\w+\.)*\w{2,3}$/.test(data["Address, website"]))) {
            if(res) res.cookie("errAddressWebSite", "1");
            console.log("address website wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)*$/.test(data["Country"]))) {
            if(res) res.cookie("Country wrong", "1");
            console.log("country wrong!");
            fulfill(false);
        }
        if (!(/^\d+( ?[- \/] ?\d+)?$/.test(data["Size of enterprise"]))) {
            if(res) res.cookie("SerrSizeEnterprise", "1");
            console.log("size of enterprise wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ùà-ù]+ {1}[A-za-zà-ùà-ù]+( {1}[A-za-zà-ùà-ù])?( ?\/|,)? {1}[A-za-zà-ùà-ù]+$/.test(data["Mentor name / position"]))) {
            if(res) res.cookie("errMentor", "1");
            console.log("mentor name position wrong!");
            fulfill(false);
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10}$/.test(data["Mentor e-mail / phone"]))) {
            if(res) res.cookie("errMentorInfo", "1");
            console.log("mentor email phone wrong!");
            fulfill(false);
        }
        if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["from"]))) {
            if(res) res.cookie("errDateFrom", "1");
            console.log("from wrong!");
            fulfill(false);
        }
        if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4}$/.test(data["till"]))) {
            if(res) res.cookie("errDateTo", "1");
            console.log("till wrong!");
            fulfill(false);
        }
        if (!(/^\d{1,2}$/.test(data["Number of working hours for week"]))) {
            if(res) res.cookie("errHourWork", "1");
            console.log("working hours wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù,'à-ù0-9]+( [A-za-zà-ù,'à-ù0-9]+)*$/.test(data["Traineeship title"]))) {
            if(res) res.cookie("errTitle", "1");
            console.log("traineeship title wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Detailed programme of the traineeship period"]))) {
            if(res) res.cookie("errDetailed", "1");
            console.log("detailed programme wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship"]))) {
            if(res) res.cookie("errKnowledge", "1");
            console.log("knowledge wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Monitoring plan"]))) {
            if(res) res.cookie("errMonitoring", "1");
            console.log("monitoring plan wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)*$/.test(data["Evaluation plan"]))) {
            if(res) res.cookie("errEvaluation", "1");
            console.log("evaluation plan wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+$/.test(data["language competence"]))) {
            if(res) res.cookie("errLenguage", "1");
            console.log("language wrong! "+data["language competence"]);
            fulfill(false);
        }
        if (!data["A1"] && !data["A2"] && !data["B1"] && !data["B2"] && !data["C1"] && !data["A2"]) {
            if(res) res.cookie("errLenguage", "1");
            console.log("language level wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)?$/.test(data["The trainee signature"]))) {
            if(res) res.cookie("errName", "1");
            console.log("trainee signature wrong!");
            fulfill(false);
        }
        if (!(/^(\d{4}(-|\/)((0)[0-9]|(1)[0-2]){1}(-|\/)([0-2][0-9]|(3)[0-1]){1}|([0-2][0-9]|(3)[0-1]){1}(-|\/){1}((0)[0-9]|(1)[0-2]){1}(-|\/){1}\d{4})$/.test(data["The trainee date"]))) {
            if(res) res.cookie("errDate", "1");
            console.log("today date wrong!");
            fulfill(false);
        } else {
            console.log("All okay", "1");
            fulfill(true);
        }
    });
}