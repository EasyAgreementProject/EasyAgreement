var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class externalTutor {
  /**
     * Constructor of external tutor
     * @constructor
     */
  constructor () {
    this.E_mail = null
    this.Password = null
    this.Surname = null
    this.Name = null
    this.Organization = null
  }

  /**
     * Get email
     * @returns {String} - return email
     */
  getEmail () {
    return this.E_mail
  }

  /**
     * Get password
     * @returns {Object} - return password
     */
  getPassword () {
    return this.Password
  }

  /**
     * Get name
     * @returns {String} - return name
     */
  getName () {
    return this.Name
  }

  /**
     * Get surname
     * @returns {String} - return surname
     */
  getSurname () {
    return this.Surname
  }

  /**
     * Get organization
     * @returns {String} - return organization
     */
  getOrganization () {
    return this.Organization
  }

  /**
     * Set email
     * @param {String} email - email
     */
  setEmail (email) {
    this.E_mail = email
  }

  /**
     * Set password
     * @param {Object} password - password
     */
  setPassword (password) {
    this.Password = password
  }

  /**
     * Set name
     * @param {String} name - name
     */

  setName (name) {
    this.Name = name
  }

  /**
     * Set surname
     * @param {String} surname - surname
     */
  setSurname (surname) {
    this.Surname = surname
  }

  /**
     * Set organization
     * @param {String} organization - organization
     */
  setOrganization (organization) {
    this.Organization = organization
  }

  static insertExternalTutor (externaltutor) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('ExternalTutor').insertOne(externaltutor, function (err) {
          if (err) throw err
          resolve()
          db.close()
        })
      })
    })
  }

  /**
 * Find external tutor by email
 * @param {String} email- email of tutor
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
  static findByEmail (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('ExternalTutor').findOne({ E_mail: email }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var extutor = new externalTutor()
            extutor.setEmail(result.E_mail)
            extutor.setPassword(result.Password)
            extutor.setSurname(result.Surname)
            extutor.setName(result.Name)
            extutor.setOrganization(result.Organization)
            resolve(extutor)
          } else {
            resolve(null)
          }
          db.close()
        })
      })
    })
  }

  /**
 * update params of external tutor
 * @param {Object} externaltutor - External Tutor's Object
 * @param {String} emailv - External Tutor's email
 * @returns {Object} - Returns the updated external tutor if result != null, else it returns null
 *
 */

  static updateExternalTutor (externaltutor, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        var myquery = { E_mail: emailv }
        var newvalues = {}
        if (externaltutor.Name != null) newvalues.Name = externaltutor.Name
        if (externaltutor.Surname != null) newvalues.Surname = externaltutor.Surname
        if (externaltutor.Organization != null) newvalues.Organization = externaltutor.Organization

        dbo.collection('ExternalTutor').updateOne(myquery, { $set: newvalues }, function (err, res) {
          if (err) throw err
          dbo.collection('ExternalTutor').findOne({ E_mail: emailv }, function (err, result) {
            if (err) reject(err)
            if (result != null) {
              var extutor = new externalTutor()
              extutor.setEmail(result.E_mail)
              extutor.setPassword(result.Password)
              extutor.setSurname(result.Surname)
              extutor.setName(result.Name)
              extutor.setOrganization(result.Organization)
              resolve(extutor)
            } else {
              db.close()
              resolve(null)
            }
          })
        })
      })
    })
  }

  /**
 * Retrieve all external tutor
 *
 * @returns {promise} - return promise
 */
  static RetrieveAll () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('ExternalTutor').find({}).toArray(function (err, result) {
          if (err) throw err
          resolve(result)
          db.close()
        })
      })
    })
  }

  /**
 * update password of external tutor
 * @param {String} password - External Tutor's password
 * @param {String} emailv - External tutor's email
 * @returns {Object} - Returns the updated password of external tutor if result != null, else it returns null
 *
 */

  static updatePassword (password, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        var myquery = { E_mail: emailv }
        var newvalues = { $set: { Password: password } }
        dbo.collection('ExternalTutor').updateOne(myquery, newvalues, function (err, res) {
          if (err) reject(err)
        })
        dbo.collection('ExternalTutor').findOne({ E_mail: emailv }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var externaltutor = new externalTutor()
            externaltutor.setName(result.Name)
            externaltutor.setSurname(result.Surname)
            externaltutor.setOrganization(result.Organization)
            externaltutor.setEmail(result.E_mail)
            externaltutor.setPassword(result.Password)

            db.close()
            resolve(externaltutor)
          } else {
            db.close()
            resolve(null)
          }
        })
      })
    })
  }

  static findByEmailA (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('ExternalTutor').findOne({ E_mail: email }, function (err, result) {
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

  static addExtTutor (ExtTutor) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('ExternalTutor').insertOne(ExtTutor, function (err) {
          if (err) throw err
          resolve()
          db.close()
        })
      })
    })
  }

  static deleteExTutor (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('ExternalTutor').findOneAndDelete({ E_mail: email }, function (err, result) {
          if (err) throw err
          if (result.value != null) {
            resolve(true)
          } else {
            resolve(false)
          }
          db.close()
        })
      })
    })
  }
}
module.exports = externalTutor
