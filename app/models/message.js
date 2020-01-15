var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Message {
  constructor () {
    this.senderID = null
    this.recipientID = null
    this.text = null
    this.date = null
  }

  // Getter methods
  getSenderID () {
    return this.senderID
  }

  getRecipientID () {
    return this.recipientID
  }

  getText () {
    return this.text
  }

  getDate () {
    return this.date
  }

  // setter method
  setText (text) {
    this.text = text
  }

  setDate (date) {
    this.date = date
  }

  setSenderID (sender) {
    this.senderID = sender
  }

  setRecipientID (recipient) {
    this.recipientID = recipient
  }

  static insertMessage (message) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Message').insertOne(message, function (err, result) {
          if (err) reject(err)
          resolve(result.insertedId)
          db.close()
        })
      })
    })
  }

  static removeMessage (messageID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Message').deleteOne({ _id: ObjectID(messageID) }, function (err, result) {
          if (err) reject(err)
          db.close()
          resolve(result.deletedCount)
        })
      })
    })
  }

  static updateMessage (id, value) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Message').updateOne({ _id: ObjectID(id) }, { $set: { text: value } }, function (err, result) {
          if (err) reject(err)
          db.close()
          resolve(result.matchedCount)
        })
      })
    })
  }

  static getTextChat (senderID, recipientID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        var senderMessages = null
        var recipientMesssages = null
        dbo.collection('Message').find({ senderID: senderID, recipientID: recipientID }).toArray(function (err, result) {
          if (err) reject(err)
          senderMessages = result
          dbo.collection('Message').find({ senderID: recipientID, recipientID: senderID }).toArray(function (err, result) {
            if (err) reject(err)
            recipientMesssages = result
            resolve({ sender: senderMessages, recipient: recipientMesssages })
            db.close()
          })
        })
      })
    })
  }

  static changeStateCache (receiverID, senderID, value) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Cache').findOne({ receiverID: receiverID, senderID: senderID }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            dbo.collection('Cache').updateOne({ receiverID: receiverID, senderID: senderID }, { $set: { boolean: value } }, function (err, result) {
              if (err) reject(err)
              db.close()
              resolve()
            })
          } else {
            dbo.collection('Cache').insertOne({ receiverID: receiverID, senderID: senderID, boolean: value }, function (err, result) {
              if (err) reject(err)
              db.close()
              resolve()
            })
          }
        })
      })
    })
  }

  static getAllCache (receiverID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Cache').find({ receiverID: receiverID }).toArray(function (err, result) {
          if (err) reject(err)
          var all = []
          if (result != null) {
            for (var i = 0; result[i] != null; i++) {
              if (result[i].boolean) all.push(result[i])
            }
          }
          resolve(all)
        })
      })
    })
  }
}

module.exports = Message
