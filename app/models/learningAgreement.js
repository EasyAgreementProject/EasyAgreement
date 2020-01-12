var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var Binary = require('mongodb').Binary

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class LearningAgreement {
  constructor () {
    this.filling = null
    this.document = null
    this.studentID = null
    this.state = null
    this.date = null
  }

  setFilling (filling) {
    this.filling = filling
  }

  getFilling () {
    return this.filling
  }

  setDocument (document) {
    this.document = document
  }

  getDocument () {
    return this.document
  }

  setStudentID (studentID) {
    this.studentID = studentID
  }

  getStudentID () {
    return this.studentID
  }

  setState (state) {
    this.state = state
  }

  getState () {
    return this.state
  }

  setDate (date) {
    this.date = date
  }

  getDate () {
    return this.date
  }

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
