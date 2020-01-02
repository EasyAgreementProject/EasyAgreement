var MongoClient = require('mongodb').MongoClient;

//Database URL
const url="mongodb://localhost:27017/easyagreement";

//Database name
const dbName="easyagreement";

class Notification {
    /**
     * Constructor of notification
     * @constructor
     */
    constructor(){
        this.notificationID=null;
        this.associatedID=null;
        this.text=null;
        this.date=null;
    }

    //getter methods

    getNotificationID(){
        return this.notificationID;
    }

    getAssociateID(){
        return this.associatedID;
    }

    getText(){
        return this.text;
    }

    getDate(){
        return this.date;
    }

    //setter methods

    setText(text) {
        this.text=text;
    }

    setDate(date) {
        this.date=date;
    }

    static insertNotification(notification) {    
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Notification").insertOne(notification, function(err, result) {
                    if(err) reject(err);
                    console.log("Notification inserted correctly!");
                    fulfill(result.insertedId);
                    db.close();
                });
            });
        });
    }

    static removeNotification(notificationID) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Notification").deleteOne({_id: ObjectID(notificationID)}, function(err, result) {
                    if(err) reject(err);
                    console.log("Notification removed correctly!");
                    fulfill();
                    db.close();
                });
            });
        });
    }

    static retrieveAll(associatedID) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Notification").find({"associateID": associatedID}).toArray(function(err, result) {
                    if(err) reject(err);
                    fulfill();
                    db.close();
                });
            });
        });
    }
}