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
  getAssociateID () {
    return this.associatedID
  }

  getText () {
    return this.text
  }

  getDate () {
    return this.date
  }

  // setter methods

  setText (text) {
    this.text = text
  }

  setDate (date) {
    this.date = date
  }

  setAssociatedID (associatedID) {
    this.associatedID = associatedID
  }

  static insertNotification (notification) {
    return new Promise(function (fulfill, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Notification').insertOne(notification, function (err, result) {
          if (err) reject(err)
          console.log('Notification inserted correctly!')
          fulfill(result.insertedId)
          db.close()
        })
      })
    })
  }

  static removeNotification (notificationID) {
    return new Promise(function (fulfill, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Notification').deleteOne({ _id: ObjectID(notificationID) }, function (err, result) {
          if (err) reject(err)
          console.log('Notification removed correctly!')
          fulfill()
          db.close()
        })
      })
    })
  }

  static retrieveAll (associatedID) {
    return new Promise(function (fulfill, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        console.log('Connected successfully to server!')
        var dbo = db.db(dbName)
        dbo.collection('Notification').find({ associatedID: associatedID }).toArray(function (err, result) {
          if (err) reject(err)
          fulfill(result)
          db.close()
        })
      })
    })
  }

  static changeStateCache (associatedID, value) {
    return new Promise(function (fulfill, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Cache').findOne({ associatedID: associatedID }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            dbo.collection('Cache').updateOne({ associatedID: associatedID }, { $set: { bool: value } }, function (err, result) {
              if (err) reject(err)
              db.close()
              fulfill()
            })
          } else {
            dbo.collection('Cache').insertOne({ associatedID: associatedID, bool: value }, function (err, result) {
              if (err) reject(err)
              db.close()
              fulfill()
            })
          }
        })
      })
    })
  }

  static getStateCache (associatedID) {
    return new Promise(function (fulfill, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Cache').findOne({ associatedID: associatedID }, function (err, result) {
          if (err) reject(err)
          if (result != null) fulfill(result.bool)
          else fulfill(null)
        })
      })
    })
  }
}

module.exports = Notification
