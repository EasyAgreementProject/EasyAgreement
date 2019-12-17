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
        //Doesn't work, never goes in the if body because result is always null
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if(err) throw err;
                console.log("Connected successfully to server!");  
                var dbo = db.db(dbName);
                var get = learningAgreement.getLearningAgreement(learningAgreement.getStudentID());
                get.then(function(result){
                    console.log("Learning Agreeement per lo StudentID: "+learningAgreement.getStudentID()+" = "+result)
                    if(result) {
                        var del = learningAgreement.deleteLearningAgreement(learningAgreement.getStudentID());
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

    getLearningAgreement(studentID) {
        //Doesn't work as expected, always returns null
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").findOne({"StudentID":studentID}, function(err, result) {
                    if(err) throw err;
                    console.log("Learning Agreement search completed! "+result);
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    deleteLearningAgreement(studentID) {
        //Doesn't seemt to work either
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").deleteOne({"StudentID":studentID}, function(err) {
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