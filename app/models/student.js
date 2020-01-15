var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Student {
  /**
     * Constructor of Student
     * @constructor
     */
  constructor () {
    this.StudentID = null
    this.DegreeCourse = null
    this.Address = null
    this.City = null
    this.Email = null
    this.Surname = null
    this.Name = null
    this.CV = null
    this.IDCard = null
    this.Password = null
  }

  /**
     * Get StudentID
     * @returns {String}- return StudentID
     */
  getStudentId () {
    return this.StudentID
  }

  /**
     * Get Name
     * @returns {String}- return name
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
     * Get password
     * @returns {Object}- return password
     */
  getPassword () {
    return this.Password
  }

  /**
     * Get email
     * @returns {String} - return email
     */
  getEmail () {
    return this.Email
  }

  /**
     * Get city
     * @returns {String}-  return city
     */
  getCity () {
    return this.City
  }

  /**
     * Get Degree Course
     * @returns {string} - return degree course
     */
  getDegreeCourse () {
    return this.DegreeCourse
  }

  /**
     * Get Identity cart
     * @returns {File} - return identity cart
     */
  getIdentityCard () {
    return this.IDCard
  }

  /**
     * Get Curriculum Vitae
     * @returns {File} - return Curriculum vitae
     */
  getCurriculumVitae () {
    return this.CV
  }

  /**
     * Get address
     * @returns {String} - return address
     */
  getAddress () {
    return this.Address
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
     * Set password
     * @param {Object} password - password
     */
  setPassword (password) {
    this.Password = password
  }

  /**
     * Set email
     * @param {String} email - email
     */
  setEmail (email) {
    this.Email = email
  }

  /**
     * Set city
     * @param {String} city - city
     */
  setCity (city) {
    this.City = city
  }

  /**
     * Set degree course
     * @param {String} degree_course - degree course
     */
  setDegreeCourse (degree_course) {
    this.DegreeCourse = degree_course
  }

  /**
     * Set identity card
     * @param {File} identity_card - identity card
     */
  setIdentityCard (identity_card) {
    this.IDCard = identity_card
  }

  /**
     * Set curriculum vitae
     * @param {File} curriculum_vitae - curriculum vitae
     */
  setCurriculumVitae (curriculum_vitae) {
    this.CV = curriculum_vitae
  }

  /**
     * Set address
     * @param {String} address - address
     */
  setAddress (address) {
    this.Address = address
  }

  /**
     * Set studentID
     * @param {String} studentID - studentID
     */
  setStudentID (studentID) {
    this.StudentID = studentID
  }

  /**
 * Insert student in database
 * @param {Object} student - student object
 * @returns {Promise} - return promise
 */
  static insertStudent (student) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection('Student').insertOne(student, function (err) {
          if (err) throw err
          resolve()
          db.close()
        })
      })
    })
  }

  /**
 * Find student by StudentID
 * @param {String} studentID- studentID
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
  static findByMatricola (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Student').findOne({ StudentID: studentID }, function (err, result) {
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
 * Find student by email
 * @param {String} email- email
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
  static findExistByEmail (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Student').findOne({ Email: email }, function (err, result) {
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
 * check if exist student by email
 * @param {String} email- email
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
  static findByEmail (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Student').findOne({ Email: email }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var student = new Student()
            student.setName(result.Name)
            student.setSurname(result.Surname)
            student.setDegreeCourse(result.DegreeCourse)
            student.setAddress(result.Address)
            student.setCity(result.City)
            student.setEmail(result.Email)
            student.setCurriculumVitae(result.CV)
            student.setIdentityCard(result.IDCard)
            student.setPassword(result.Password)
            student.setStudentID(result.StudentID)
            resolve(student)
          } else {
            resolve(null)
          }
          db.close()
        })
      })
    })
  }

   /**
   * This method updates student's Curriculum Vitae by id
   * @param {String} email - student's email
   * @param {String} id - student's id
   * 
   */
  static updateStudentCV (email, id) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err
      var dbo = db.db(dbName)
      dbo.collection('Student').updateOne({ Email: email }, { $set: { CV: ObjectID(id) } }, function (err, result) {
        if (err) throw err
        db.close()
      })
    })
  }

  /**
   * This method updates student's IDCard by id
   * @param {String} email - student's email
   * @param {String} id - student's id
   * 
   */
  static updateStudentIDCard (email, id) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err
      var dbo = db.db(dbName)
      dbo.collection('Student').updateOne({ Email: email }, { $set: { IDCard: ObjectID(id) } }, function (err, result) {
        if (err) throw err
        db.close()
      })
    })
  }

   /**
   * This method retrieves CV's student
   * @param {String} email - student's email
   * @returns 
   */
  static retrieveStudentCV (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Student').findOne({ Email: email }, function (err, result) {
          if (err) reject(err)
          resolve(result.CV)
          db.close()
        })
      })
    })
  }

  /**
   * This method retrieves IDCard's student
   * @param {String} email - student's email
   */
  static retrieveStudentIDCard (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Student').findOne({ Email: email }, function (err, result) {
          if (err) reject(err)
          resolve(result.IDCard)
          db.close()
        })
      })
    })
  }

  /**
 * update params of student
 * @param {Object} student - Student's Object
 * @param {String} emailv - Student's email
 * @returns {Object} - Returns the updated student if result != null, else it returns null
 *
 */
  static updateStudent (student, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        var myquery = { Email: emailv }
        var newvalues = {}
        if (student.Name != null) newvalues.Name = student.Name
        if (student.Surname != null) newvalues.Surname = student.Surname
        if (student.Address != null) newvalues.Address = student.Address
        if (student.City != null) newvalues.City = student.City
        if (student.DegreeCourse != null) newvalues.DegreeCourse = student.DegreeCourse
        dbo.collection('Student').updateOne(myquery, { $set: newvalues }, function (err, res) {
          if (err) throw err
          dbo.collection('Student').findOne({ Email: emailv }, function (err, result) {
            if (err) reject(err)
            if (result != null) {
              var student = new Student()
              student.setName(result.Name)
              student.setSurname(result.Surname)
              student.setDegreeCourse(result.DegreeCourse)
              student.setAddress(result.Address)
              student.setCity(result.City)
              student.setEmail(result.Email)
              student.setCurriculumVitae(result.CV)
              student.setIdentityCard(result.IDCard)
              student.setPassword(result.Password)
              student.setStudentID(result.StudentID)
              db.close()
              resolve(student)
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
 * update password of student
 * @param {String} password - Student's password
 * @param {String} emailv - Student's email
 * @returns {Object} - Returns the updated password of student if result != null, else it returns null
 *
 */
  static updatePassword (password, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        var myquery = { Email: emailv }
        var newvalues = { $set: { Password: password } }
        dbo.collection('Student').updateOne(myquery, newvalues, function (err, res) {
          if (err) reject(err)
        })
        dbo.collection('Student').findOne({ Email: emailv }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var student = new Student()
            student.setName(result.Name)
            student.setSurname(result.Surname)
            student.setDegreeCourse(result.DegreeCourse)
            student.setAddress(result.Address)
            student.setCity(result.City)
            student.setEmail(result.Email)
            student.setCurriculumVitae(result.CV)
            student.setIdentityCard(result.IDCard)
            student.setPassword(result.Password)
            student.setStudentID(result.StudentID)
            db.close()
            resolve(student)
          } else {
            db.close()
            resolve(null)
          }
        })
      })
    })
  }

  /**
 * Retrieve all students
 *
 * @returns {promise} - return promise
 */
  static RetrieveAll () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)

        dbo.collection('Student').find({}).sort({ Name: 1 }).toArray(function (err, result) {
          if (err) throw err
          resolve(result)
          db.close()
        })
      })
    })
  }

  /**
   * This method deletes CurriculumVitae's student
   * @param {String} email - student's email
   * @returns {Promise} - return a promise
   */
  static deleteStudentCV (email) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err
      var dbo = db.db(dbName)
      dbo.collection('Student').updateOne({ Email: email }, { $set: { CV: null } }, function (err, result) {
        if (err) throw err
        db.close()
      })
    })
  }

  /**
   * This method deletes IDCard's student
   * @param {String} email - student's email
   * @returns {Promise} - return a promise
   */
  static deleteStudentID (email) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err
      var dbo = db.db(dbName)
      dbo.collection('Student').updateOne({ Email: email }, { $set: { IDCard: null } }, function (err, result) {
        if (err) throw err
        db.close()
      })
    })
  }
}

module.exports = Student
