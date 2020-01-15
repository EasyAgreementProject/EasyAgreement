var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class AcademicTutor {
  /**
     * Academic Tutor Class Model
     * @constructor
     */
  constructor () {
    this.E_mail = null
    this.Password = null
    this.Surname = null
    this.Name = null
    this.Department = null
  }

  /**
     * Get email
     * @returns {string}- return email
     */
  getEmail () {
    return this.E_mail
  }

  /**
     * Get password
     * @returns {Object}- return password
     */
  getPassword () {
    return this.Password
  }

  /**
     * Get surname
     * @returns {String}- return surname
     */
  getSurname () {
    return this.Surname
  }

  /**
     * Get Name
     * @returns {String}- return name
     */
  getName () {
    return this.Name
  }

  /**
     * Get Department
     * @returns {String}- return department
     */
  getDepartment () {
    return this.Department
  }

  /**
     * Set email
     * @param {String} email- email
     */
  setEmail (email) {
    this.E_mail = email
  }

  /**
     * Set password
     * @param {Object} password- password
     */
  setPassword (password) {
    this.Password = password
  }

  /**
     * Set surname
     * @param {String} surname - surname
     */
  setSurname (surname) {
    this.Surname = surname
  }

  /**
     * Set name
     * @param {String} name - name
     */
  setName (name) {
    this.Name = name
  }

  /**
     * Set department
     * @param {String} department - department
     */
  setDepartment (department) {
    this.Department = department
  }

  /**
 * Insert academic tutor
 * @param {Object} AcademicTutor- object of academic tutor
 * @returns {Promise} - return a promise
 */
  static insertAcademicTutor (AcademicTutor) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('AcademicTutor').insertOne(AcademicTutor, function (err) {
          if (err) throw err
          resolve()
          db.close()
        })
      })
    })
  }

  /**
 * Find academic tutor by email
 * @param {String} email- email of tutor
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
  static findByEmail (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('AcademicTutor').findOne({ E_mail: email }, function (err, result) {
          if (err) reject(err)
          if (result) {
            resolve(false)
          } else {
            resolve(true)
          }
          db.close()
        })
      })
    })
  }

  /**
 * Retrieve academic tutor by email
 * @param {String} email- email of tutor
 * @returns {Object} - return academic tutor if exist, else null
 */
  static RetrieveByEmail (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('AcademicTutor').findOne({ E_mail: email }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var academicTutor = new AcademicTutor()
            academicTutor.setName(result.Name)
            academicTutor.setSurname(result.Surname)
            academicTutor.setEmail(result.E_mail)
            academicTutor.setDepartment(result.Department)
            academicTutor.setPassword(result.Password)
            resolve(academicTutor)
          } else {
            resolve(null)
          }
          db.close()
        })
      })
    })
  }

  /**
 * Retrieve all accademic tutor
 *
 * @returns {promise} - return promise
 */
  static RetrieveAll () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('AcademicTutor').find({}).sort({ Name: 1 }).toArray(function (err, result) {
          if (err) reject(err)
          resolve(result)
          db.close()
        })
      })
    })
  }

  /**
 * update params of academic tutor
 * @param {Object} academicTutor - Academic Tutor's object
 * @param {String} emailv - Academic Tutor's email
 * @returns {Object} - Returns the updated academic tutor if result != null, else it returns null
 *
 */
  static updateAcademicTutor (academicTutor, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        var myquery = { E_mail: emailv }
        var newvalues = {}
        if (academicTutor.Name != null) newvalues.Name = academicTutor.Name
        if (academicTutor.Surname != null) newvalues.Surname = academicTutor.Surname
        if (academicTutor.Department != null) newvalues.Department = academicTutor.Department
        dbo.collection('AcademicTutor').updateOne(myquery, { $set: newvalues }, function (err, res) {
          if (err) throw err
          dbo.collection('AcademicTutor').findOne({ E_mail: emailv }, function (err, result) {
            if (err) reject(err)
            if (result != null) {
              var academicTutor = new AcademicTutor()
              academicTutor.setName(result.Name)
              academicTutor.setSurname(result.Surname)
              academicTutor.setEmail(result.E_mail)
              academicTutor.setDepartment(result.Department)
              academicTutor.setPassword(result.Password)
              resolve(academicTutor)
            } else {
              db.close()
              resolve(null)
            }
          })
        })
      })
    })
  }

  static updatePassword (password, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        var myquery = { E_mail: emailv }
        var newvalues = { $set: { Password: password } }
        dbo.collection('AcademicTutor').updateOne(myquery, newvalues, function (err, res) {
          if (err) reject(err)
        })
        dbo.collection('AcademicTutor').findOne({ E_mail: emailv }, function (err, result) {
          if (err) { reject(err) }
          if (result != null) {
            var academicTutor = new AcademicTutor()
            academicTutor.setName(result.Name)
            academicTutor.setEmail(result.E_mail)
            academicTutor.setSurname(result.Surname)
            academicTutor.setDepartment(result.Department)
            academicTutor.setPassword(result.Password)

            db.close()
            resolve(academicTutor)
          } else {
            db.close()
            resolve(null)
          }
        })
      })
    })
  }
}
module.exports = AcademicTutor
