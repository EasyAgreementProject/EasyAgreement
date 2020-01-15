var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Notification {
  /**
     * Constructor of notification
     * @constructor
     */
  constructor () {
    this.associatedID = null
    this.text = null
    this.date = null
  }

  // getter methods
  /**
   * @return associateID
   */
  getAssociateID () {
    return this.associatedID
  }

  /**
   * @return text
   */
  getText () {
    return this.text
  }
  /**
   * @return date
   */
  getDate () {
    return this.date
  }

  // setter methods

  /**
   * set text
   * @param {String} text 
   */
  setText (text) {
    this.text = text
  }

  /**
   * set date
   * @param {String} date 
   */
  setDate (date) {
    this.date = date
  }

  /**
   * set associateID
   * @param {String} associatedID 
   */
  setAssociatedID (associatedID) {
    this.associatedID = associatedID
  }

  /**
   * This method inserts a notification 
   * @param {Object} notification 
   * @return {Promise} - return a promise
   */
  static insertNotification (notification) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Notification').insertOne(notification, function (err, result) {
          if (err) reject(err)
          resolve(result.insertedId)
          db.close()
        })
      })
    })
  }

  /**
   * This method removes a notification 
   * @param {String} notificationID - the id of notification
   * @return {Promise} - return a promise
   */
  static removeNotification (notificationID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Notification').deleteOne({ _id: ObjectID(notificationID) }, function (err, result) {
          if (err) reject(err)
          resolve()
          db.close()
        })
      })
    })
  }

  /**
   * This method retrieves the notifications
   * @param {String} associatedID 
   * @returns {Promise} - return a promise
   */
  static retrieveAll (associatedID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Notification').find({ associatedID: associatedID }).toArray(function (err, result) {
          if (err) reject(err)
          resolve(result)
          db.close()
        })
      })
    })
  }

  /**
 * This method changes the message cache
 * @param {String} associatedID - The notification's id
 * @param {Boolean} value - The state cache value
 * @returns {Object} - The update result
  */
  static changeStateCache (associatedID, value) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Cache').findOne({ associatedID: associatedID }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            dbo.collection('Cache').updateOne({ associatedID: associatedID }, { $set: { bool: value } }, function (err, result) {
              if (err) reject(err)
              db.close()
              resolve()
            })
          } else {
            dbo.collection('Cache').insertOne({ associatedID: associatedID, bool: value }, function (err, result) {
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
 * @param {String} associatedID - The notification's id
 * @returns {Array} - The notification cache
 */
  static getStateCache (associatedID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Cache').findOne({ associatedID: associatedID }, function (err, result) {
          if (err) reject(err)
          if (result != null) resolve(result.bool)
          else resolve(null)
        })
      })
    })
  }
}

module.exports = Notification
