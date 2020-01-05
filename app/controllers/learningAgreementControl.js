var pdfFiller = require('pdffiller');
var fs = require('fs');
var LA = require('../models/learningAgreement.js');
var requestControl = require('./requestControl.js');
var learningAgreement = new LA();
//const Readable = require('stream').Readable;

exports.sendLaStudent = function(input, res) {
    let random = parseInt(Math.random()*10000);
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF = "pdf/Filled_LA_"+random+".pdf";
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
        let validatePr = exports.validateDataStudent(data, res);
        validatePr.then(function(result) {
            console.log(""+data);
            if (result) {
                pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
                    if (err)
                        throw err;
                    else {
                        console.log("PDF create successfully!");
                        //send Filled PDF to Client side                        
                        var file = fs.readFileSync('pdf/Filled_LA_'+random+'.pdf');
                        var download = fs.createReadStream('pdf/Filled_LA_'+random+'.pdf');
                        fs.unlink('pdf/Filled_LA_'+random+'.pdf', function(err){
                            if (err) throw err;
                        });

                        var pos = data["Contact person Email / Phone"].indexOf(" ");
                        var email = data["Contact person Email / Phone"].substring(0, pos);

                        var generateRequestPr = requestControl.generateRequest(data["E-mail"], email);
                        generateRequestPr.then(function(result, err) {
                            if (err) throw err;
                            if(result) {
                                learningAgreement.setFilling(data);
                                learningAgreement.setDocument(file);
                                learningAgreement.setStudentID(data["E-mail"]);
                                learningAgreement.setState("Submitted");
                                learningAgreement.setDate(data["The trainee date"]);

                                var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
                                insertLearningAgreementPr.then(function() {
                                    fulfill(download);
                                });
                            }
                            else {
                                if(res) res.cookie("errRequest", "1");
                                console.log("Request already sent!");
                                fulfill();
                            }
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
        //send Filled PDF to Client side
        learningAgreement.setFilling(data);
        learningAgreement.setDocument(null);
        learningAgreement.setStudentID(data["E-mail"]);
        learningAgreement.setState(null);
        learningAgreement.setDate(data["The trainee date"]);

        let insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
        insertLearningAgreementPr.then(function() {
            fulfill();
        });            
    })
}

exports.sendLaAcademicTutor = function(input, res) {
    let random = parseInt(Math.random()*10000);
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF = "pdf/Filled_LA_"+random+".pdf";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    return new Promise(function(fulfill, reject) {
        var email;
        if(!input[9]) email = "v.volpicelli4@studenti.unisa.it";
        else email = input[9];
        var getDataPr = exports.getData(email);
        getDataPr.then(function(data) {        
            //Traineeship embedded in the curriculum
            data["Award"] = input[0];
            switch (input[1]) {
                case "certificate":
                    data["Traineeship certificate"] = "X";
                    break;
                case "report":
                    data["Final report"] = "X";
                    break;
                case "interview":
                    data["Interview"] = "X";
                    break;
            }
            switch (input[2]) {
                case "Si":
                    data["Europass Mobility Document Yes"] = "X";
                    break;
                case "No":
                    data["Europass Mobility Document No"] = "X";
                    break;
            }
            //Traineeship voluntary
            switch (input[3]) {
                case "Si":
                    data["Award ECTS credits Yes"] = "X";
                    break;
                case "No":
                    data["Award ECTS credits No"] = "X";
                    break;
            }

            data["If yes, please indicate the number of ECTS credits"] = input[4];

            switch (input[5]) {
                case "Si":
                    data["Give a grade Yes"] = "X";
                    break;
                case "No":
                    data["Give a grade No"] = "X";
                    break;
            }
        
            switch (input[6]) {
                case "certificate":
                    data["Traineeship certificate1"] = "X";
                    break;
                case "report":
                    data["Final report1"] = "X";
                    break;
                case "interview":
                    data["Interview1"] = "X";
                    break;
            }

            switch (input[7]) {
                case "Si":
                    data["Record the traineeship in the trainee's Transcript of Records Yes"] = "X";
                    break;
                case "No":
                    data["Record the traineeship in the trainee's Transcript of Records No"] = "X";
                    break;
            }

            switch (input[8]) {
                case "Si":
                    data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = "X";
                    break;
                case "No":
                    data["Record the traineeship in the trainee's Europass Mobility Document No"] = "X";
                    break;
            }

            data["Academic Tutor sign"] = data["Contact person name"];      
            data["Academic Tutor date"] = today; 
            data["International Departemental Coordinator sign"] = data["Contact person name"];  
            data["International Departemental Coordinator date"] = today;
                        
            let validatePr = exports.validateDataAcademicTutor(data, res);
            validatePr.then(function(result) {
                if (result) {                   
                    pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
                        if (err)
                            throw err;
                        else {
                            console.log("PDF create successfully!");
                            //send Filled PDF to Client side                        
                            var file = fs.readFileSync('pdf/Filled_LA_'+random+'.pdf');
                            var download = fs.createReadStream('pdf/Filled_LA_'+random+'.pdf');
                            fs.unlink('pdf/Filled_LA_'+random+'.pdf', function(err){
                                if (err) throw err;
                            });

                            pos = data["Mentor e-mail / phone"].indexOf(" ");
                            var email2 = data["Mentor e-mail / phone"].substring(0, pos);

                            var updateTutorPr = requestControl.updateExternalTutor(email, email2);
                            updateTutorPr.then(function() {
                                learningAgreement.setFilling(data);
                                learningAgreement.setDocument(file);
                                learningAgreement.setStudentID(data["E-mail"]);
                                learningAgreement.setState("Approved from Academic Tutor");
                                learningAgreement.setDate(data["Academic Tutor date"]);

                                var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
                                insertLearningAgreementPr.then(function() {
                                    fulfill(download);
                                });
                            })
                            
                        }
                    })
                } else {
                    fulfill(null);
                }
            });

        })
    });
}

exports.saveLaAcademicTutor = function(input, res) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    return new Promise(function(fulfill, reject) {
        var email;
        if(!input[9]) email = "v.volpicelli4@studenti.unisa.it";
        else email = input[9];
        var getDataPr = exports.getData(email); //input9
        getDataPr.then(function(data) {        
            //Traineeship embedded in the curriculum
            data["Award"] = input[0];
            switch (input[1]) {
                case "certificate":
                    data["Traineeship certificate"] = "X";
                    break;
                case "report":
                    data["Final report"] = "X";
                    break;
                case "interview":
                    data["Interview"] = "X";
                    break;
            }
            switch (input[2]) {
                case "Si":
                    data["Europass Mobility Document Yes"] = "X";
                    break;
                case "No":
                    data["Europass Mobility Document No"] = "X";
                    break;
            }
            //Traineeship voluntary
            switch (input[3]) {
                case "Si":
                    data["Award ECTS credits Yes"] = "X";
                    break;
                case "No":
                    data["Award ECTS credits No"] = "X";
                    break;
            }

            data["If yes, please indicate the number of ECTS credits"] = input[4];

            switch (input[5]) {
                case "Si":
                    data["Give a grade Yes"] = "X";
                    break;
                case "No":
                    data["Give a grade No"] = "X";
                    break;
            }
        
            switch (input[6]) {
                case "certificate":
                    data["Traineeship certificate1"] = "X";
                    break;
                case "report":
                    data["Final report1"] = "X";
                    break;
                case "interview":
                    data["Interview1"] = "X";
                    break;
            }

            switch (input[7]) {
                case "Si":
                    data["Record the traineeship in the trainee's Transcript of Records Yes"] = "X";
                    break;
                case "No":
                    data["Record the traineeship in the trainee's Transcript of Records No"] = "X";
                    break;
            }

            switch (input[8]) {
                case "Si":
                    data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = "X";
                    break;
                case "No":
                    data["Record the traineeship in the trainee's Europass Mobility Document No"] = "X";
                    break;
            }

            data["Academic Tutor sign"] = data["Contact person name"];      
            data["Academic Tutor date"] = today; 
            data["International Departemental Coordinator sign"] = data["Contact person name"];  
            data["International Departemental Coordinator date"] = today;
                        
            console.log("PDF create successfully!");
            //send Filled PDF to Client side                        
            
            learningAgreement.setFilling(data);
            learningAgreement.setDocument(null);
            learningAgreement.setStudentID(data["E-mail"]);
            learningAgreement.setState(null);
            learningAgreement.setDate(data["Academic Tutor date"]);

            var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
            insertLearningAgreementPr.then(function() {
                fulfill();
            });                        
        });
    });
}

exports.sendLaExternalTutor = function(input, res) {
    let random = parseInt(Math.random()*10000);
    let sourcePDF = "pdf/Template_LA.pdf";
    let destinationPDF = "pdf/Filled_LA_"+random+".pdf";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    return new Promise(function(fulfill, reject) {
        var email;
        if(!input[6]) email = "v.volpicelli4@studenti.unisa.it";
        else email = input[6];
        var getDataPr = exports.getData(email); //input[6]
        getDataPr.then(function(data) {        
            switch(input[0]) {
                case "Si": 
                    data["financial support Yes"] = "X";
                    break;
                case "No":
                    data["financial support No"] = "X";
            }

            data["if financial support Yes"] = input[1];

            switch(input[2]) {
                case "Si": 
                    data["The trainee will receive a contribution in kind for his/her traineeship Yes"] = "X";
                    break;
                case "No":
                    data["The trainee will receive a contribution in kind for his/her traineeship No"] = "X";
            }
 
            data["If yes, please specify"] = input[3];
            data["Traineeship Certificate by"] = input[4];

            switch(input[5]) {
                case "Si": 
                    data["Is the trainee covered by the accident insurance Yes"] = "X";
                    break;
                case "No":
                    data["Is the trainee covered by the accident insurance No"] = "X";
            }

            var pos = data["Contact person name / position"].indexOf("-");
            var name = data["Contact person name / position"].substring(0, pos-1);
            var position = data["Contact person name / position"].substring(pos+2);         

            pos = data["Contact person Email / Phone"].indexOf(" ");
            var email = data["Contact person Email / Phone"].substring(0, pos);
            var phone = data["Contact person Email / Phone"].substring(pos);

            data["Responsible person sending Name"] = name;
            data["Responsible person sending Phone number"] = phone;
            data["Responsible person sending Function"] = position;
            data["Responsible person sending E-mail"] = email;

            pos = data["Mentor name / position"].indexOf("-");
            name = data["Mentor name / position"].substring(0, pos-1);;
            position = data["Mentor name / position"].substring(pos+2);

            pos = data["Mentor e-mail / phone"].indexOf(" ");
            email = data["Mentor e-mail / phone"].substring(0, pos);
            phone = data["Mentor e-mail / phone"].substring(pos);

            data["Responsible person receiving Name"] = name;
            data["Responsible person receiving Phone number"] = phone;
            data["Responsible person receiving Function"] = position;
            data["Responsible person receiving E-mail"] = email;
            data["The receiving organization sign"] = name;
            data["The receiving organization date"] = today;

            let validatePr = exports.validateDataExternalTutor(data, res);
            validatePr.then(function(result) {
                if (result) {
                    pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
                        if (err)
                            throw err;
                        else {
                            console.log("PDF create successfully!");
                            //send Filled PDF to Client side                        
                            var file = fs.readFileSync('pdf/Filled_LA_'+random+'.pdf');
                            var download = fs.createReadStream('pdf/Filled_LA_'+random+'.pdf');
                            fs.unlink('pdf/Filled_LA_'+random+'.pdf', function(err){
                                if (err) throw err;
                            });
                            learningAgreement.setFilling(data);
                            learningAgreement.setDocument(file);
                            learningAgreement.setStudentID(data["E-mail"]);
                            learningAgreement.setState("Approved from External Tutor");
                            learningAgreement.setDate(data["The receiving organization date"]);

                            var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
                            insertLearningAgreementPr.then(function() {
                                fulfill(download);
                            });

                        }
                    })
                } else {
                    fulfill(null);
                }
            });

        })
    });
}

exports.saveLaExternalTutor = function(input, res) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    return new Promise(function(fulfill, reject) {
        var email;
        if(!input[6]) email = "v.volpicelli4@studenti.unisa.it";
        else email = input[6];
        var getDataPr = exports.getData(email);
        getDataPr.then(function(data) {        
            switch(input[0]) {
                case "Si": 
                    data["financial support Yes"] = "X";
                    break;
                case "No":
                    data["financial support No"] = "X";
            }

            data["if financial support Yes"] = input[1];

            switch(input[2]) {
                case "Si": 
                    data["The trainee will receive a contribution in kind for his/her traineeship Yes"] = "X";
                    break;
                case "No":
                    data["The trainee will receive a contribution in kind for his/her traineeship No"] = "X";
            }
 
            data["If yes, please specify"] = input[3];
            data["Traineeship Certificate by"] = input[4];

            switch(input[5]) {
                case "Si": 
                    data["Is the trainee covered by the accident insurance Yes"] = "X";
                    break;
                case "No":
                    data["Is the trainee covered by the accident insurance No"] = "X";
            }

            learningAgreement.setFilling(data);
            learningAgreement.setDocument(null);
            learningAgreement.setStudentID(data["E-mail"]);
            learningAgreement.setState(null);
            learningAgreement.setDate(data["Academic Tutor date"]);

            var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement);
            insertLearningAgreementPr.then(function() {
                fulfill(); 
            });           
        })
    });
}

exports.disapproveAcademicTutor = function(student, msg) {
    return new Promise(function(fulfill, reject) {
        var email;
        if(!student) email = "v.volpicelli4@studenti.unisa.it";
        else email = student;
        console.log("Getting data for student: " + student);
        getLearningAgreementPr = LA.getLearningAgreement(email);
        getLearningAgreementPr.then(function(result, err) {
            if (err) throw err;
            console.log("Searching done!");
            if(result) {
                var state = "Disapprovato dal Tutor Accademico per il motivo: "+msg;
                var updateStatePr = LA.updateState(student, state);
                updateStatePr.then(function() {
                    fulfill(); 
                    
                });
            }
        });
    });
}

exports.disapproveExternalTutor = function(student, msg) {
    return new Promise(function(fulfill, reject) {
        console.log("Getting data for student: " + student);
        var email;
        if(!student) email = "v.volpicelli4@studenti.unisa.it";
        else email = student;
        getLearningAgreementPr = LA.getLearningAgreement(email);
        getLearningAgreementPr.then(function(result, err) {
            if (err) throw err;
            console.log("Searching done!");
            if(result) {
                var state = "Disapprovato dal Tutor Esterno per il motivo: "+msg;
                var updateStatePr = LA.updateState(student, state);
                updateStatePr.then(function() {
                    fulfill(); 

                });  
            }
        });
    });
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
    let random = parseInt(Math.random()*10000);
    return new Promise(function(fulfill, reject) {
        getPdfPr = LA.getPdf(id, email);
        getPdfPr.then(function(result, err) {
            if (err) throw err;
            console.log("Getting version with id= "+id);
            fs.writeFile('pdf/Old_LA_'+random+'.pdf', result.document.file_data.buffer ,function(err){                        
                if (err) throw err;                
                console.log('Sucessfully saved!');
                var file = fs.createReadStream('pdf/Old_LA_'+random+'.pdf');
                fs.unlink('pdf/Old_LA_'+random+'.pdf', function(err){
                    if (err) throw err;
                });
                /*const s = new Readable();
                s._read = function noop() {};
                s.push(result.document.file_data.buffer);
                s.push(null);
                console.log(s);*/
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

exports.validateDataStudent = function(data, res) {
    return new Promise(function(fulfill, reject) {
        console.log("Begin...");
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)? *$/.test(data["Header name"]))) {
            if(res) {
                res.cookie("errName", "1");
                res.cookie("errSurname", "1");
            }
            console.log("Header Name wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ *$/.test(data["Last name (s)"]))) {
            if(res) res.cookie("errSurname", "1");
            console.log("Last name wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( {1}[A-za-zà-ù]+)? *$/.test(data["First name (s)"]))) {
            if(res) res.cookie("errName", "1");
            console.log("Name wrong!");
            fulfill(false);
        }
        if (!(/^(\d{4}(-|\/)((0)?[0-9]|(1)?[0-2]){1}(-|\/)([0-2]?[0-9]|(3)?[0-1]){1}|([0-2]?[0-9]|(3)?[0-1]){1}(-|\/){1}((0)?[0-9]|(1)?[0-2]){1}(-|\/){1}\d{4})$/.test(data["Date of birth"]))) {
            if(res) res.cookie("errDate", "1");
            console.log("birth date wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ *$/.test(data["Nationality"]))) {
            if(res) res.cookie("errNationality", "1");
            console.log("nationality wrong!");
            fulfill(false);
        }
        if (!(/^(M|F)/.test(data["Sex [M/F]"]))) {
            if(res) res.cookie("errSex", "1");
            console.log("sex wrong!");
            fulfill(false);
        }
        if (!(/^\d{2} *$/.test(data["Academic year1"]))) {
            if(res) res.cookie("errAcademicYear1", "1");
            console.log("ac1 wrong!");
            fulfill(false);
        }
        if (!(/^\d{2} *$/.test(data["Academic year2"]))) {
            if(res) res.cookie("errAcademicYear2", "1");
            console.log("ac2 wrong!");
            fulfill(false);
        }
        if (!(/^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$/.test(data["Study cycle"]))) {
            if(res) res.cookie("errStudyCicle", "1");
            console.log("study cycle wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+\,{1} ?\d+ *$/.test(data["Subject area, Code"]))) {
            if(res) res.cookie("errSubjectCode", "1");
            console.log("subject area code wrong!");
            fulfill(false);
        }
        if (!(/^\d{1,10} *$/.test(data["Phone"]))) {
            if(res) res.cookie("errTelephone", "1");
            console.log("phone wrong!");
            fulfill(false);
        }
        if (!(/^[a-z]{1}\.{1}[a-z]{2,}\d{1,}@{1}(studenti.unisa.it){1} *$/.test(data["E-mail"]))) {
            if(res) res.cookie("errEmail", "1");
            console.log("email student wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)* *$/.test(data["Sending Departement"]))) {
            if(res) res.cookie("errDepartmentSending", "1");
            console.log("sending department wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)? *$/.test(data["Contact person name"]))) {
            if(res) res.cookie("errContactName", "1");
            console.log("contact person name wrong!");
            fulfill(false);
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10} *$/.test(data["Contact person Email / Phone"]))) {
            if(res) res.cookie("errContactSending", "1");
            console.log("contact email phone wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù])? - [A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data["Contact person name / position"]))) {
            if(res) res.cookie("errContactReciving", "1");
            console.log("contact person name position wrong! "+data["Contact person name / position"]);
            fulfill(false);
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10} *$/.test(data["Receiving contact person e-mail phone"]))) {
            if(res) res.cookie("errContactSending", "1");
            console.log("receiving contact person email phone wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data["Name Sector"]))) {
            if(res) res.cookie("errNameSector", "1");
            console.log("name sector wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data["Receiving Department"]))) {
            if(res) res.cookie("errDepartmentReciving", "1");
            console.log("receiving department wrong!");
            fulfill(false);
        }
        if (!(/^[\w ,\.()']+ ?(,|\/)? (http(s)?:\\\\)?www\.\w+\.(\w+\.)*\w{2,3} *$/.test(data["Address, website"]))) {
            if(res) res.cookie("errAddressWebSite", "1");
            console.log("address website wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data["Country"]))) {
            if(res) res.cookie("Country wrong", "1");
            console.log("country wrong!");
            fulfill(false);
        }
        if (!(/^\d+( ?[- \/] ?\d+)? *$/.test(data["Size of enterprise"]))) {
            if(res) res.cookie("SerrSizeEnterprise", "1");
            console.log("size of enterprise wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù])? - [A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data["Mentor name / position"]))) {
            if(res) res.cookie("errMentor", "1");
            console.log("mentor name position wrong!");
            fulfill(false);
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10} *$/.test(data["Mentor e-mail / phone"]))) {
            if(res) res.cookie("errMentorInfo", "1");
            console.log("mentor email phone wrong!");
            fulfill(false);
        }
        if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4} *$/.test(data["from"]))) {
            if(res) res.cookie("errDateFrom", "1");
            console.log("from wrong!");
            fulfill(false);
        }
        if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4} *$/.test(data["till"]))) {
            if(res) res.cookie("errDateTo", "1");
            console.log("till wrong!");
            fulfill(false);
        }
        if (!(/^\d{1,2}$/.test(data["Number of working hours for week"]))) {
            if(res) res.cookie("errHourWork", "1");
            console.log("working hours wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù,'à-ù0-9]+( [A-za-zà-ù,'à-ù0-9]+)* *$/.test(data["Traineeship title"]))) {
            if(res) res.cookie("errTitle", "1");
            console.log("traineeship title wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data["Detailed programme of the traineeship period"]))) {
            if(res) res.cookie("errDetailed", "1");
            console.log("detailed programme wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data["Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship"]))) {
            if(res) res.cookie("errKnowledge", "1");
            console.log("knowledge wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data["Monitoring plan"]))) {
            if(res) res.cookie("errMonitoring", "1");
            console.log("monitoring plan wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data["Evaluation plan"]))) {
            if(res) res.cookie("errEvaluation", "1");
            console.log("evaluation plan wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ *$/.test(data["language competence"]))) {
            if(res) res.cookie("errLenguage", "1");
            console.log("language wrong! "+data["language competence"]);
            fulfill(false);
        }
        if (!data["A1"] && !data["A2"] && !data["B1"] && !data["B2"] && !data["C1"] && !data["A2"]) {
            if(res) res.cookie("errLenguage", "1");
            console.log("language level wrong!");
            fulfill(false);
        }
        if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)? *$/.test(data["The trainee signature"]))) {
            if(res) res.cookie("errName", "1");
            console.log("trainee signature wrong!");
            fulfill(false);
        }
        if (!(/^(\d{4}(-|\/)((0)?[0-9]|(1)?[0-2]){1}(-|\/)([0-2]?[0-9]|(3)?[0-1]){1}|([0-2]?[0-9]|(3)?[0-1]){1}(-|\/){1}((0)?[0-9]|(1)?[0-2]){1}(-|\/){1}\d{4})$/.test(data["The trainee date"]))) {
            if(res) res.cookie("errDate", "1");
            console.log("today date wrong!");
            fulfill(false);
        } else {
            console.log("All okay");
            fulfill(true);
        }
    });
}

exports.validateDataAcademicTutor = function(data, res) {
    return new Promise(function(fulfill, reject) {
        console.log("Begin...");
                
        if (data["Award"] && (data["Traineeship certificate"] || data["Final report"] || data["Interview"]) && (data["Europass Mobility Document Yes"] || data["Europass Mobility Document No"])) {
            if(data["Award ECTS credits Yes"] || data["Award ECTS credits No"] || data["If yes, please indicate the number of ECTS credits"] || data["Give a grade Yes"] || data["Give a grade No"] ||
            data["Traineeship certificate1"] || data["Final report1"] || data["Interview1"] || data["Record the traineeship in the trainee's Transcript of Records Yes"] ||
            data["Record the traineeship in the trainee's Transcript of Records No"] || data["Record the traineeship in the trainee's Europass Mobility Document Yes"] || data["Record the traineeship in the trainee's Europass Mobility Document No"]) {
                if(res) res.cookie("errCompileOnlyOne", "1");
                console.log("Compile only form one! "+data["Award"]+" "+data["Traineeship certificate"]+" "+data["Europass Mobility Document Yes"]+" "+data["Award ECTS credits Yes"]);
                if (!(/^\d{1,2}$/.test(data["Award"]))) {
                    if(res) res.cookie("errAward", "1");
                    console.log("Award wrong!");
                    fulfill(false);        
                }                 
                fulfill(false);    
            }
            fulfill(true);
        }
        else if ((data["Award ECTS credits Yes"] || data["Award ECTS credits No"]) && data["If yes, please indicate the number of ECTS credits"] && (data["Give a grade Yes"] || data["Give a grade No"]) &&
        (data["Traineeship certificate1"] || data["Final report1"] || data["Interview1"]) && (data["Record the traineeship in the trainee's Transcript of Records Yes"] ||
        data["Record the traineeship in the trainee's Transcript of Records No"]) && (data["Record the traineeship in the trainee's Europass Mobility Document Yes"] || data["Record the traineeship in the trainee's Europass Mobility Document No"])) {
            if(data["Award"] || data["Traineeship certificate"] || data["Final report"] || data["Interview"] || data["Europass Mobility Document Yes"] || data["Europass Mobility Document No"]) {
                if(res) res.cookie("errCompileOnlyOne", "1");
                console.log("Compile only form two!");
                if (data["Award ECTS credits Yes"] && !(/^\d{1,2}$/.test(data["If yes, please indicate the number of ECTS credits"]))) {
                    if(res) res.cookie("errNumberCredits", "1");
                    console.log("Number of ECTS credits wrong!");
                    fulfill(false);               
                }
                if (data["Give a grade Yes"] && (!data["Traineeship certificate1"] && !data["Final report1"] && !data["Interview1"])) {
                    if(res) res.cookie("errMissingFields", "1");
                    console.log("Missing fields!");
                    fulfill(false);         
                }              
                fulfill(false);                
            }     
            fulfill(true);   
        }

        else if (data["Award ECTS credits No"] && !data["If yes, please indicate the number of ECTS credits"]) {
            console.log("Number of ECTS credits not asked!");
            fulfill(true);               
        }    
        else if (data["Give a grade No"] && (!data["Traineeship certificate1"] && !data["Final report1"] && !data["Interview1"])) {
            console.log("Grade not asked!");
            fulfill(true);               
        }
        else {
            if(res) res.cookie("errMissingFields", "1");
            console.log("Missing fields!");
            fulfill(false); 
        }
    });
}

exports.validateDataExternalTutor = function(data, res) {
    return new Promise(function(fulfill, reject) {
        console.log("Begin...");
        if (data["financial support Yes"] == "X" && !data["if financial support Yes"]) {
            if(res) res.cookie("errFinancialSupport", "1");
            console.log("Missing financial support!");
            fulfill(false);
        }

        if (data["The trainee will receive a contribution in kind for his/her traineeship Yes"] == "X" && !data["If yes, please specify"]) {
            if(res) res.cookie("errContribution", "1");
            console.log("Missing contribution!");
            fulfill(false); 
        }

        if ((!data["financial support Yes"] && !data["financial support No"]) || (!data["The trainee will receive a contribution in kind for his/her traineeship Yes"] && !data["The trainee will receive a contribution in kind for his/her traineeship No"])) {
            if(res) res.cookie("errMissingFields", "1");
            console.log("Missing fields!");
            fulfill(false); 
        }

        if (!(/^\d*(,\d+)?€? *$/.test(data["if financial support Yes"]))) {
            if(res) res.cookie("errFinancialSupport", "1");
            console.log("Financial support wrong!");
            fulfill(false); 
        }

        if (!(/^[\wà-ù\.,"' ]* *$/.test(data["If yes, please specify"]))) {
            if(res) res.cookie("errContribution", "1");
            console.log("Contribution wrong!");
            fulfill(false); 
        }

        if (!(/^[0-5]{1} *$/.test(data["Traineeship Certificate by"]))) {
            if(res) res.cookie("errWeeks", "1");
            console.log("Traineeship certificate wrong! = "+data["Traineeship Certificate by"]);
            fulfill(false); 
        }
        else {
            console.log("All okay");
            fulfill(true);
        }
    });
}
