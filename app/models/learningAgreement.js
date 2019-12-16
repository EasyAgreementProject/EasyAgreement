var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class LearningAgreement {

    constructor() {
        this.filling = null;
        this.document = null;
        this.studentID = null;
        this.state = null;
        this.date = null;
    }

    set filling(filling) {
        this.filling = filling;
    }

    get filling() {
        return this.filling;
    }

    set document(document) {
        this.document = document;
    }
    
    get document() {
        return this.document;
    }

    set studentID(state) {
        this.studentID = studentID;
    }
    
    get studentID() {
        return this.studentID;
    }

    set state(state) {
        this.state = state;
    }
    
    get state() {
        return this.state;
    }

    set date(date) {
        this.date = date;
    }

    get date() {
        return this.date;
    }
}

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