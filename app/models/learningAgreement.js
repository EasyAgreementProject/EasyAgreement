var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var Binary = require('mongodb').Binary;

//Database URL
const url = "mongodb://localhost:27017/easyagreement";

//Database name
const dbName = "easyagreement";

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
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                var insert_data = {};
                var get = LearningAgreement.getLearningAgreement(learningAgreement.getStudentID());
                get.then(function(result) {
                    console.log("Learning Agreeement per lo StudentID: " + learningAgreement.getStudentID() + " = " + result)
                    if (result && (!result.document || learningAgreement.getState().startsWith("Salvato") || learningAgreement.getState().startsWith("In valutazione"))) {
                        learningAgreement._id = new ObjectID();
                        learningAgreement.version = result.version;
                        var updateDataPr = LearningAgreement.updateData(learningAgreement.getStudentID(), learningAgreement.getFilling());
                        updateDataPr.then(function() {
                            db.close();
                            fulfill();
                        })
                    }
                    else if (!result && learningAgreement.getState().startsWith("Salvato")) {
                        learningAgreement._id = new ObjectID();
                        dbo.collection("current_LearningAgreement").insertOne(learningAgreement, function(err) {
                            if (err) throw err;
                            console.log("Learning Agreement inserted correctly! (No other versions were found)");
                            db.close();
                            fulfill();
                        });
                    } else if (result && result.document && result.version) {
                        insert_data.file_data = Binary(learningAgreement.document);
                        learningAgreement.document = insert_data
                        result._id = new ObjectID();
                        learningAgreement.version = result.version + 1;
                        var del = LearningAgreement.deleteLearningAgreement(learningAgreement.getStudentID());
                        del.then(function() {
                            dbo.collection("current_LearningAgreement").insertOne(learningAgreement, function(err) {
                                if (err) throw err;
                                console.log("Learning Agreement inserted correctly! (Other versions were found)");
                            });

                            dbo.collection("LearningAgreement_revision").insertOne(result, function(err) {
                                if (err) throw err;
                                console.log("Learning Agreement revision inserted correctly!");
                                db.close();
                                fulfill();
                            });
                        })
                    } else if (result && !result.version) {
                        insert_data.file_data = Binary(learningAgreement.document);
                        learningAgreement.document = insert_data
                        result._id = new ObjectID();
                        learningAgreement.version = 1;
                        var del = LearningAgreement.deleteLearningAgreement(learningAgreement.getStudentID());
                        del.then(function() {
                            dbo.collection("current_LearningAgreement").insertOne(learningAgreement, function(err) {
                                if (err) throw err;
                                console.log("Learning Agreement inserted correctly! (Saved version was found)");
                                db.close();
                                fulfill();
                            });
                        })
                    } else {
                        insert_data.file_data = Binary(learningAgreement.document);
                        learningAgreement.document = insert_data
                        learningAgreement._id = new ObjectID();
                        learningAgreement.version = 1;
                        dbo.collection("current_LearningAgreement").insertOne(learningAgreement, function(err) {
                            if (err) throw err;
                            console.log("Learning Agreement inserted correctly! (No other versions were found)");
                            db.close();
                            fulfill();
                        });
                    }
                })
            });
        });
    }

    static getLearningAgreement(studentID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").findOne({ "studentID": studentID }, function(err, result) {
                    if (err) throw err;
                    console.log("Learning Agreement search completed! " + result + " StudentID = " + studentID);
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    static updateState(studentID, state) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").updateOne({ "studentID": studentID }, {$set: {"state": state}}, function(err, result) {
                    if (err) throw err;
                    console.log("Learning Agreement update completed! State = " + state + " StudentID = " + studentID);
                    db.close();
                    fulfill();
                });
            });
        });
    }

    static updateData(studentID, data) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").updateOne({ "studentID": studentID }, {$set: {"filling": data}}, function(err, result) {
                    if (err) throw err;
                    console.log("Learning Agreement update completed! Data = " + data + " StudentID = " + studentID);
                    db.close();
                    fulfill();
                });
            });
        });
    }

    static deleteLearningAgreement(studentID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("current_LearningAgreement").deleteOne({ "studentID": studentID }, function(err) {
                    if (err) throw err;
                    console.log("Learning Agreement deleted correctly!");
                    db.close();
                    fulfill();
                });
            });
        });
    }

    static getOldVersions(studentID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("LearningAgreement_revision").find({ "studentID": studentID }).toArray(function(err, result) {
                    if (err) throw err;
                    console.log("Learning Agreement search completed! " + result + " StudentID = " + studentID);
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    static getPdf(v, email) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server! Versione = "+v+" Email = "+email);
                var dbo = db.db(dbName);
                if(v) {
                    dbo.collection("LearningAgreement_revision").findOne({ "version": Number(v), "studentID": email }, function(err, result) {
                        if (err) throw err;
                        if(result) {
                            console.log("Sono qui "+result)
                            db.close();
                            fulfill(result);                        
                        }
                        else {
                            dbo.collection("current_LearningAgreement").findOne({ "version": Number(v), "studentID": email }, function(err, result) {
                                if (err) throw err;
                                if(result) {
                                    console.log("Sono qui "+result)
                                    db.close();
                                    fulfill(result);                        
                                }
                            });
                        }
                    });
                }
                else {
                    dbo.collection("current_LearningAgreement").findOne({ "studentID": email }, function(err, result) {
                        if (err) throw err;
                        if(result) {
                            console.log("Sono qui "+result)
                            db.close();
                            fulfill(result);                        
                        }
                    });
                }
            });
        });
    }
}

module.exports = LearningAgreement;