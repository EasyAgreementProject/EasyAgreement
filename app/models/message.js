var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

//Database URL
const url = "mongodb://localhost:27017/local/Message";

//Database name
const dbName = "Message";

class Message {
    
    constructor(){
        this.messageID=null;
        this.senderID= null;
        this.recipientID= null;
        this.text= null;
        this.date=null;
    }

    //Getter methods
    /**
     * get messageID
     * @returns {getMessageID}
     */
    getMessageID(){
        return this.getMessageID;
    }

    /**
     * get senderID
     * @returns {getsenderID}: return senderID
     */
    getSenderID() {
        return this.senderID;
    }

     /**
     * get senderID
     * @returns {getrecipientID}: return recipientID
     */
    getRecipientID() {
        return this.recipientID;
    }

    /**
     * get text
     * @returns {getText}: return text
     */
    getText() {
        return this.text;
    }
    /**
     * get date
     * @returns {getDate}: return date
     */
    getDate() {
        return this.date;
    }
    

    //setter method
    /**
     * setText
     * @param {string} text - text
     */
    setText(text) {
        this.text=test;
    }
    /**
     * setDate
     * 
     * @param {string} date - date
     */
    setDate(date) {
        this.date=date;
    }

    /**
     * insert  message in database
     * @param {object} message 
     * @returns {Promise}: return promise
     */
    static insertMessage(message) {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {    
                if(err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").insertOne(message, function(err) {
                    if(err) throw err;
                    console.log("Message inserted correctly!");
                    fulfill();
                    db.close();
                });
            });
        });
    }

    /**
     * remove message in database
     * @param {object} message 
     * @returns {promise} : return promise
     */
    static removeMessage(message) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").deleteOne({"messageID": messageID}, function(err) {
                    if (err) throw err;
                    console.log("Message deleted");
                    db.close();
                    fulfill(result);
                });
            });
        });
    }

    /**
     * update message in database
     * @param {object} message 
     * @returns {promise} : return promise
     */
    static updateMessage(message,value) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").updateOne({"messageID": messageID},value, function(err,result) {
                    if(err) throw err;
                    console.log("Message updated");
                    db.close();
                    fulfill();
                });
            });
        }); 
    }
    /**
     * get text chat between two users
     * @param {string} senderID 
     * @param {string} recipientID 
     * @returns {promise}: return promise
     */
    static getTextChat(senderID, recipientID) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Message").find({ text: { "senderID": senderID, "RecipientId": recipientID }}).toArray(function(err) {
                    if (err) throw err;
                    dbo.collection("Message").find({text:{"recipientID": recipientID ,"senderID": senderID}}).toArray(function(err,result) {
                        if(err) throw err;
                        console.log("Chat is" + result);
                        db.close();
                        fulfill();
                    });
                    
                });
            });
        });
    }

    /**
     * sort all collection by Date 
     * @returns {promise}: return promise
     */
    static sortByDate() {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                console.log("Connected successfully to server!");
                var dbo = db.db(dbName);
                dbo.collection("Messagge").orders.find().sort({date: -1}), function (err, result) {
                    if(err) throw err;
                    console.log("messages are sorted:" + result);
                    db.close();
                    fulfill();
                }
        });
    });
    
    }

}
    
module.exports=Message;
