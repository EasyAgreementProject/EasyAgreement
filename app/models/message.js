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
  
  /**
   * @returns {String} - return senderID
   */
  getSenderID () {
    return this.senderID
  }

  /**
   * @returns {String} - return recipientID
   */
  getRecipientID () {
    return this.recipientID
  }

  /**
   * @returns {String} - return text
   */
  getText () {
    return this.text
  }

  /**
   * @returns {String} - return date
   */
  getDate () {
    return this.date
  }

  // setter method
  
  /**
   * set text
   * @param {String} text
   */
  setText (text) {
    this.text = text
  }

  /**
   * set date
   * @param {string} date 
   */
  setDate (date) {
    this.date = date
  }

  /**
   * set senderID
   * @param {string} sender 
   */
  setSenderID (sender) {
    this.senderID = sender
  }

  /**
   * set recipientID
   * @param {String} recipient 
   */
  setRecipientID (recipient) {
    this.recipientID = recipient
  }

  /**
   * This method inserts the message 
   * @param {Object} message - the message to insert
   * @returns {Promise} - return a promise
   */
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

  /**
   * This method removes the message 
   * @param {Object} message - the message to remove
   * @returns {Promise} - return a promise
   */
  static removeMessage (messageID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Message').deleteOne({ _id: ObjectID(messageID) }, function (err) {
          if (err) reject(err)
          db.close()
          resolve()
        })
      })
    })
  }

  /**
   * This method update the message 
   * @param {String} id - the id of message
   * @param {value} value - new text
   * @returns {Promise} - return a promise
   */
  static updateMessage (id, value) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Message').updateOne({ _id: ObjectID(id) }, { $set: { text: value } }, function (err, result) {
          if (err) reject(err)
          db.close()
          resolve()
        })
      })
    })
  }

  /**
   * This method gets the chat between two users
   * @param {String} senderID - chat's sender 
   * @param {String} recipientID - chat's recipient
   * @returns {Promise} - return a promise
   */
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
        })
        dbo.collection('Message').find({ senderID: recipientID, recipientID: senderID }).toArray(function (err, result) {
          if (err) reject(err)
          recipientMesssages = result
          resolve({ sender: senderMessages, recipient: recipientMesssages })
          db.close()
        })
      })
    })
  }

  /**
 * This method refreshes the message cache
 * @param {String} receiverID - The receiver's id
 * @param {String} senderID - The sender's id
 * @param {Boolean} value - The state cache value
 * @returns {Object} - The update result
  */
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

  /**
 * This method gets all cache of message
 * @param {String} receiverID - The receiver's email
 * @returns {Array} - The message cache
 */
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
