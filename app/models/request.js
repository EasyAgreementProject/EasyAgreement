var MongoClient = require('mongodb').MongoClient;

//Database URL
const url = "mongodb://localhost:27017/easyagreement";

//Database name
const dbName = "easyagreement";

class Request {

    constructor() {
        this.studentID = null;
        this.academicTutorID = null;
        this.externalTutorID = null;
        this.learningAgreementID = null;
    }

    setStudentID(studentID) {
        this.studentID = studentID;
    }

    getStudentID() {
        return this.studentID;
    }

    setAcademicTutorID(academicTutorID) {
        this.academicTutorID = academicTutorID;
    }

    getAcademicTutorID() {
        return this.academicTutorID;
    }

    setExternalTutorID(externalTutorID) {
        this.externalTutorID = externalTutorID;
    }

    getExternalTutorID() {
        return this.externalTutorID;
    }

    setLearningAgreementID(learningAgreementID) {
        this.learningAgreementID = learningAgreementID;
    }

    getLearningAgreementID() {
        return this.learningAgreementID;
    }

    static insertRequest(request) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Request").insertOne(request, function(err) {
                    if (err) throw err;
                    console.log("Request insert completed!");
                    db.close();
                    fulfill();
                });
            });
        });
    }

    static getRequest(studentID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Request").findOne({ "studentID": studentID }, function(err, result) {
                    if (err) throw err;
                    console.log("Request search completed! " + result + " StudentID = " + studentID);
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    static getAllRequests(tutorID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Request").find({ $or: [{"academicTutorID": tutorID}, {"externalTutorID": tutorID }]}).toArray(function(err, result) {
                    if (err) throw err;
                    console.log("Request search completed! " + result + " TutorID = " + tutorID);
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    static deleteRequest(studentID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Request").insertOne({ "studentID": studentID }, function(err) {
                    if (err) throw err;
                    console.log("Request delete completed! StudentID = " + studentID);
                    db.close();
                    fulfill();
                });
            });
        });
    }

    static updateExternalTutor(studentID, tutorID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Request").updateOne({ "studentID": studentID }, {$set: {"externalTutorID": tutorID}}, function(err, result) {
                    if (err) throw err;
                    console.log("Request update completed! Tutor = " + tutorID + " StudentID = " + studentID);
                    db.close();
                    fulfill();
                });
            });
        });
    }
}

module.exports = Request;