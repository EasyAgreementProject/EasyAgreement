var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'
/**
 * This module represents the Request object
 * @module Request
 */
class Request {
  constructor () {
    this.studentID = null
    this.academicTutorID = null
    this.externalTutorID = null
    this.learningAgreementID = null
  }

  /**
   * This method sets the Request's Student email
   * @param {String} studentID 
   */
  setStudentID (studentID) {
    this.studentID = studentID
  }
  /**
   * This method gets the Request's Student email
   * @returns {String}
   */
  getStudentID () {
    return this.studentID
  }

  /**
   * This method sets the Request's Academic Tutor email
   * @param {String} academicTutorID 
   */
  setAcademicTutorID (academicTutorID) {
    this.academicTutorID = academicTutorID
  }

  /**
   * This method gets Request's Academic Tutor email
   * @returns {String}
   */
  getAcademicTutorID () {
    return this.academicTutorID
  }

  /**
   * This method sets the Request's External Tutor email
   * @param {String} externalTutorID 
   */
  setExternalTutorID (externalTutorID) {
    this.externalTutorID = externalTutorID
  }

  /**
   * This method gets Request's External Tutor email
   * @returns {String}
   */
  getExternalTutorID () {
    return this.externalTutorID
  }

  /**
   * This method sets the Learning Agreement associated to the Request
   * @param {String} learningAgreementID 
   */
  setLearningAgreementID (learningAgreementID) {
    this.learningAgreementID = learningAgreementID
  }
  /**
   * This method gets the Learning Agreement associate to the Request
   * @returns {String}
   */
  getLearningAgreementID () {
    return this.learningAgreementID
  }

  /**
   * This method inserts a new Request in the database
   * @param {Request} request - The Request object to insert
   */
  static insertRequest (request) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('Request').insertOne(request, function (err) {
          if (err) throw err
          db.close()
          resolve()
        })
      })
    })
  }

  /**
   * This method retrieves a specific Request
   * @param {String} studentID - The student's email
   * @returns {Request} - The Request found
   */
  static getRequest (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('Request').findOne({ studentID: studentID }, function (err, result) {
          if (err) throw err
          db.close()
          resolve(result)
        })
      })
    })
  }

  /**
   * This method retireves all the requests for a specific tutor
   * @param {String} tutorID - The academic or external tutor's email
   * @returns {Array} - The list of the requests
   */
  static getAllRequests (tutorID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('Request').find({ $or: [{ academicTutorID: tutorID }, { externalTutorID: tutorID }] }).toArray(function (err, result) {
          if (err) throw err
          db.close()
          resolve(result)
        })
      })
    })
  }

  /**
   * This method deletes a student's request
   * @param {String} studentID - The student's email
   */
  static deleteRequest (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('Request').deleteOne({ studentID: studentID }, function (err) {
          if (err) throw err
          db.close()
          resolve()
        })
      })
    })
  }
  
  /**
   * This method updates the external tutor of a request
   * @param {String} student - The student's email
   * @param {String} tutor - The external tutor's email
   */
  static updateExternalTutor (studentID, tutorID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('Request').updateOne({ studentID: studentID }, { $set: { externalTutorID: tutorID } }, function (err, result) {
          if (err) throw err
          db.close()
          resolve()
        })
      })
    })
  }
}

module.exports = Request
