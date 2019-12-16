var express = require('express');
var app = express();
var pdfFiller = require('pdffiller');
var fs = require('fs');

exports.compileLaStudent = function(data) {
    var sourcePDF = "pdf/Template_LA.pdf";
    var destinationPDF =  "pdf/Filled_LA.pdf";

    return new Promise(function (fulfill, reject) {           
        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) { 
            if (err)
                throw err;
            else {
                console.log("In callback (we're done).");
                //send Filled PDF to Client side
                var file = fs.createReadStream('pdf/Filled_LA.pdf');
                fulfill(file);
            }
        });
    })
}