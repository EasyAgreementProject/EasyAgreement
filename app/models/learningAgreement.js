var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

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

    static insertLearningAgreement(learningAgreement) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if(err) throw err;
                console.log("Connected successfully to server!");  
                var dbo = db.db(dbName);
                var get = LearningAgreement.getLearningAgreement(learningAgreement.getStudentID());
                get.then(function(result){
                    console.log("Learning Agreeement per lo StudentID: "+learningAgreement.getStudentID()+" = "+result)
                    if(result) {
                        result._id = new ObjectID();
                        learningAgreement.version = result.version+1;
                        var del = LearningAgreement.deleteLearningAgreement(learningAgreement.getStudentID());
                        del.then(function() {
                            dbo.collection("current_LearningAgreement").insertOne(learningAgreement, function(err) {
                                if(err) throw err;
                                console.log("Learning Agreement inserted correctly! (Other versions were found)");                            
                            });

                            dbo.collection("LearningAgreement_revision").insertOne(result, function(err) {
                                if(err) throw err;
                                console.log("Learning Agreement inserted correctly!");
                                db.close();
                            }); 
                        })
                    }
                    else {
                        learningAgreement.version = 1;
                        dbo.collection("current_LearningAgreement").insertOne(learningAgreement, function(err) {
                            if(err) throw err;
                            console.log("Learning Agreement inserted correctly! (No other versions were found)");
                        });
                    }
                })
                fulfill();
            });
        });
    }

    static getLearningAgreement(studentID) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").findOne({"studentID":studentID}, function(err, result) {
                    if(err) throw err;
                    console.log("Learning Agreement search completed! "+result+" StudentID = "+studentID);
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    static deleteLearningAgreement(studentID) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").deleteOne({"studentID":studentID}, function(err) {
                    if(err) throw err;
                    console.log("Learning Agreement deleted correctly!");
                    db.close();
                    fulfill();
                });
            });
        });
    }
}

module.exports = LearningAgreement