var express = require('express');
var app = express();
var pdfFiller = require('pdffiller');
var fs = require('fs');
app.get('/learningAgreementControl', function (req, res) {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF =  "pdf/Filled_LA.pdf";
    var data = {
        "Header name" : "Veronica Volpicelli",
        "Last name (s)" : "Volpicelli",
        "First name (s)": "Veronica",
        "Date of Birth" : "22/04/1996",
        "Nationality":"Italiana",
        "Sex" : "F",
        "Academic year1":"19",
        "Academic year2":"20",
        "Study Cycle" : "1st cycle",
        "Subject area, Code":"Informatica, 05121",
        "Phone" : "0123456789",
        "E-mail" : "v.volpicelli4@studenti.unisa.it",
        "Sending Department":"Informatica",
        "Contact person name / position":"Filomena Ferrucci",
        "Contact person Email / Phone":"f.ferrucci@unisa.it",
        "Name Sector":"Non lo so",
        "Receiving Department":"Boh",
        "Address, website":"www.nonoloso.it",
        "Country":"Nessuna",
        "Size of enterprise":"Ma che è",
        "Mentor name / position":"Michela Bertolotto",
        "Mentor Email / Phone":"9876543210",
        "from":"12/2019",
        "till":"06/2020",
        "Number of working hours for week":"8",
        "Traineeship Title":"Non ho voglia di fare l'università",
        "Detailed programme of the traineeship period": "Non ho fatto un c.... per tutto il periodo",
        "Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship":"Imparare a fare la pizza",
        "Monitoring plan":"Non so cosa dovrebbe essere",
        "Evaluation plan":"Come per il monitoring plan",
        "language competence":"english",
        "The trainee signature": "Veronica Volpicelli",
        "The trainee date":"08/12/2019"
    };

    pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) { 
        if (err) throw err;
        console.log("In callback (we're done).");
        //send Filled PDF to Client side
        var file = fs.createReadStream('pdf/Filled_LA.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=LA.pdf');
        file.pipe(res);
    });

});