var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

exports.insertLearningAgreement = function(learningAgreement) {
    return new Promise(function (fulfill, reject) {
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
            if(err) throw err;
            console.log("Connected successfully to server!");
            var dbo = db.db(dbName);
            dbo.collection("LearningAgreement").insertOne(learningAgreement, function(err) {
                if(err) throw err;
                console.log("Learing Agreement inserted correctly!");
                fulfill();
                db.close();
            });
        });
    });
}
