var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;

//Database URL
const url = "mongodb://localhost:27017/easyagreement";

//Database name
const dbName = "easyagreement";

class Message {
    
    constructor(){
        this.messageID=null;
        this.senderID= null;
        this.recipientID= null;
        this.text= null;
        this.date= null;
    }

    //Getter methods

    getMessageID(){
        return this.getMessageID;
    }

    getSenderID() {
        return this.senderID;
    }

    getRecipientID() {
        return this.recipientID;
    }

    getText() {
        return this.text;
    }

    getDate(){
        return this.date;
    }

    //setter method

    setText(text) {
        this.text=test;
    }

    setDate(date){
        this.date= date;
    }

    setSenderID(sender){
        this.senderID= sender;
    }

    setRecipientID(recipient){
        this.recipientID=recipient;
    }


    static insertMessage(message) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").insertOne(message, function(err, result) {
                    if(err) reject(err);
                    console.log("Message inserted correctly!");
                    fulfill(result.insertedId);
                    db.close();
                });
            });
        });
    }

    static removeMessage(messageID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").deleteOne({_id: ObjectID(messageID)}, function(err) {
                    if (err) reject(err);
                    console.log("Message deleted");
                    db.close();
                    fulfill();
                });
            });
        });
    }

    static updateMessage(id,value) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").updateOne({_id: ObjectID(id)},{$set:{text: value}}, function(err,result) {
                    if(err) reject(err);
                    console.log("Message updated");
                    db.close();
                    fulfill();
                });
            });
        }); 
    }
    
    static getTextChat(senderID, recipientID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) reject(err);
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                var senderMessages=null;
                var recipientMesssages=null;
                dbo.collection("Message").find({ senderID: senderID, recipientID: recipientID }).toArray(function(err, result) {
                    if (err) reject(err);
                    senderMessages=result;
                });
                dbo.collection("Message").find({senderID: recipientID ,recipientID: senderID}).toArray(function(err,result) {
                    if(err) reject(err);
                    recipientMesssages=result;
                    fulfill({sender: senderMessages, recipient: recipientMesssages});
                    db.close();
                });
            });
        });
    }
}
    
module.exports=Message;
