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

    setFilling(filling) {
        this.filling = filling;
    }

    getFilling() {
        return this.filling;
    }

    setDocument(document) {
        this.document = document;
    }
    
    getDocument() {
        return this.document;
    }

    setStudentID(studentID) {
        this.studentID = studentID;
    }
    
    getStudentID() {
        return this.studentID;
    }

    setState(state) {
        this.state = state;
    }
    
    getState() {
        return this.state;
    }

    setDate(date) {
        this.date = date;
    }

    getDate() {
        return this.date;
    }

    insertLearningAgreement(learningAgreement) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("LearningAgreement").insertOne(learningAgreement, function(err) {
                    if(err) throw err;
                    console.log("Learning Agreement inserted correctly!");
                    fulfill();
                    db.close();
                });
            });
        });
    }

}

module.exports = LearningAgreement