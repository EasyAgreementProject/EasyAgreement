var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var Binary = require('mongodb').Binary

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'
/**
 * This module represents a Learning Agreement
 * @module LearningAgreement 
 */
class LearningAgreement {
  constructor () {
    this.filling = null
    this.document = null
    this.studentID = null
    this.state = null
    this.date = null
  }
  /**
   * This method sets the Learing Agreement's filling
   * @param {JSON} filling
   */
  setFilling (filling) {
    this.filling = filling
  }

  /**
   * This method gets the Learning Agreement's filling
   * @returns {JSON}
   */
  getFilling () {
    return this.filling
  }

  /**
   * This method sets the Learing Agreement's document
   * @param {ReadableStream} document
   */
  setDocument (document) {
    this.document = document
  }

  /**
   * This method gets the Learning Agreement's document
   * @returns {ReadableStream}
   */
  getDocument () {
    return this.document
  }

  /**
   * This method sets the Learning Agreement's student's email
   * @param {String} state
   */
  setStudentID (studentID) {
    this.studentID = studentID
  }

  /**
   * This method gets the Learning Agreement's student's email
   * @returns {String}
   */
  getStudentID () {
    return this.studentID
  }

  /**
   * This method sets the Learing Agreement's state
   * @param {String} state
   */
  setState (state) {
    this.state = state
  }

  /**
   * This method gets the Learning Agreement's state
   * @returns {String}
   */
  getState () {
    return this.state
  }

  /**
   * This method sets the Learing Agreement's date
   * @param {String} date
   */
  setDate (date) {
    this.date = date
  }

  /**
   * This method gets the Learning Agreement's date
   * @returns {String}
   */
  getDate () {
    return this.date
  }
  /**
   * This method inserts a new Learning Agreement and handles the versioning process
   * @param {LearningAgreement} learningAgreement - The Learnign Agreement object to insert
   */
  static insertLearningAgreement (learningAgreement) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        var insertData = {}
        var get = LearningAgreement.getLearningAgreement(learningAgreement.getStudentID())
        get.then(function (result) {
          if (result && ((!result.document && learningAgreement.getState().startsWith('Salvato')) || (result.document && learningAgreement.getState().startsWith('In valutazione')))) {
            learningAgreement._id = new ObjectID()
            learningAgreement.version = result.version
            var updateDataPr = LearningAgreement.updateData(learningAgreement.getStudentID(), learningAgreement.getFilling())
            updateDataPr.then(function () {
              resolve()
            })
          } else if (!result && learningAgreement.getState().startsWith('Salvato')) {
            learningAgreement._id = new ObjectID()
            dbo.collection('current_LearningAgreement').insertOne(learningAgreement, function (err) {
              if (err) throw err
              resolve()
            })
          } else if (result && result.document && result.version) {
            insertData.file_data = Binary(learningAgreement.document)
            learningAgreement.document = insertData
            result._id = new ObjectID()
            learningAgreement.version = result.version + 1
            var del = LearningAgreement.deleteLearningAgreement(learningAgreement.getStudentID())
            del.then(function () {
              dbo.collection('current_LearningAgreement').insertOne(learningAgreement, function (err) {
                if (err) throw err
              })

              dbo.collection('LearningAgreement_revision').insertOne(result, function (err) {
                if (err) throw err
              })
              resolve()
            })
          } else if (result && learningAgreement.getState().startsWith('Inviato')) {
            insertData.file_data = Binary(learningAgreement.document)
            learningAgreement.document = insertData
            result._id = new ObjectID()
            learningAgreement.version = 1
            del = LearningAgreement.deleteLearningAgreement(learningAgreement.getStudentID())
            del.then(function () {
              dbo.collection('current_LearningAgreement').insertOne(learningAgreement, function (err) {
                if (err) throw err
                resolve()
              })
            })
          } else if (!result) {
            insertData.file_data = Binary(learningAgreement.document)
            learningAgreement.document = insertData
            learningAgreement._id = new ObjectID()
            learningAgreement.version = 1
            dbo.collection('current_LearningAgreement').insertOne(learningAgreement, function (err) {
              if (err) throw err
              resolve()
            })
          }
        })
      })
    })
  }

  /**
   * This method retrieves a specific (current) Learning Agreement
   * @param {String} studentID - The student's email
   * @returns {LearningAgreement} - The current Learning Agreement
   */
  static getLearningAgreement (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('current_LearningAgreement').findOne({ studentID: studentID }, function (err, result) {
          if (err) throw err
          db.close()
          resolve(result)
        })
      })
    })
  }

  /**
   * This method updates the state of a (current) Learning Agreement
   * @param {String} studentID - The student's email
   * @param {String} state - The new state
   */
  static updateState (studentID, state) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('current_LearningAgreement').updateOne({ studentID: studentID }, { $set: { state: state } }, function (err, result) {
          if (err) throw err
          db.close()
          resolve()
        })
      })
    })
  }

  /**
   * Thi method updates the filling data of the student's Learning Agreement
   * @param {String} studentID 
   * @param {JSON} data 
   */
  static updateData (studentID, data) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('current_LearningAgreement').updateOne({ studentID: studentID }, { $set: { filling: data } }, function (err, result) {
          if (err) throw err
          db.close()
          resolve()
        })
      })
    })
  }

  /**
   * This method deletes a Learning Agreement
   * @param {String} studentID - The student's email
   */
  static deleteLearningAgreement (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('current_LearningAgreement').deleteOne({ studentID: studentID }, function (err) {
          if (err) throw err
          db.close()
          resolve()
        })
      })
    })
  }

  /**
   * gets older versions of a Learning Agreement
   * @param {String} studentID - The student's email
   * @returns {Array} The list of the requests
   */
  static getOldVersions (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('LearningAgreement_revision').find({ studentID: studentID }).toArray(function (err, result) {
          if (err) throw err
          db.close()
          resolve(result)
        })
      })
    })
  }

  /**
   * This method gets the ReadableStream of a LearningAgreement's version selected
   * @param {String} v - The Lerning Agreement's version
   * @param {String} email - The student's email
   * @returns {ReadableStream} - The Readable stream of the Learning Agreement
   */
  static getPdf (v, email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        if (v) {
          dbo.collection('LearningAgreement_revision').findOne({ version: Number(v), studentID: email }, function (err, result) {
            if (err) throw err
            if (result) {
              db.close()
              resolve(result)
            } else {
              dbo.collection('current_LearningAgreement').findOne({ version: Number(v), studentID: email }, function (err, result) {
                if (err) throw err
                if (result) {
                  db.close()
                  resolve(result)
                }
              })
            }
          })
        } else {
          dbo.collection('current_LearningAgreement').findOne({ studentID: email }, function (err, result) {
            if (err) throw err
            if (result) {
              db.close()
              resolve(result)
            }
          })
        }
      })
    })
  }
}

module.exports = LearningAgreement
