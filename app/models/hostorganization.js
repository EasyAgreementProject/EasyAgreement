var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class HostOrganization {
  /**
     * Constructor of HostOrganization
     * @constructor
     */
  constructor () {
    this.ErasmusCode = null
    this.Faculty = null
    this.Address = null
    this.Size = null
    this.Country = null
    this.Contacts = null
    this.Name = null
  }

  /**
     * Get Erasmus Code
     * @returns {String} - return Erasmus_code
     */
  getErasmusCode () {
    return this.ErasmusCode
  }

  /**
     * Get Faculty
     * @returns {String} - return Faculty
     */
  getFaculty () {
    return this.Faculty
  }

  /**
     * Get Address
     * @returns {String} - return Address
     */
  getAddress () {
    return this.Address
  }

  /**
     * Get Size
     * @returns {String} - return Size
     */
  getOrgSize () {
    return this.Size
  }

  /**
     * Get Country
     * @returns {String} - return Country
     */
  getCountry () {
    return this.Country
  }

  /**
     * Get Contacts
     * @returns {String} - return Contacts
     */
  getContacts () {
    return this.Contacts
  }

  /**
     * Get Name
     * @returns {String} - return Name
     */
  getName () {
    return this.Name
  }

  /**
     * Set Erasmus Code
     * @param {String} erasmuscode - erasmus code
     */
  setErasmusCode (erasmuscode) {
    this.ErasmusCode = erasmuscode
  }

  /**
     * Set Faculty
     * @param {String} faculty - faculty
     */
  setFaculty (faculty) {
    this.Faculty = faculty
  }

  /**
     * Set Address
     * @param {String} address - address
     */
  setAddress (address) {
    this.Address = address
  }

  /**
     * Set Size
     * @param {String} size - size
     */
  setOrgSize (size) {
    this.Size = size
  }

  /**
     * Set Country
     * @param {String} country - country
     */
  setCountry (country) {
    this.Country = country
  }

  /**
     * Set Contacts
     * @param {String} contacts - contacts
     */
  setContacts (contacts) {
    this.Contacts = contacts
  }

  /**
     * Set Name
     * @param {String} name - name
     */
  setName (name) {
    this.Name = name
  }

  static findByEcode (erasmuscode) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('HostOrganization').findOne({ ErasmusCode: erasmuscode }, function (err, result) {
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

  static addHostOrg (HostOrg) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('HostOrganization').insertOne(HostOrg, function (err) {
          if (err) throw err
          resolve()
          db.close()
        })
      })
    })
  }

  static deleteHostOrg (erasmuscode) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('HostOrganization').findOneAndDelete({ ErasmusCode: erasmuscode }, function (err, result) {
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

  static retrieveAll () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('HostOrganization').find({}).toArray(function (err, result) {
          if (err) throw err
          resolve(result)
          db.close()
        })
      })
    })
  }

  static retrieveOne (id) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('HostOrganization').findOne({ ErasmusCode: id }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var host = new HostOrganization()
            host.setErasmusCode(result.ErasmusCode)
            host.setName(result.Name)
            host.setAddress(result.Address)
            host.setContacts(result.Contacts)
            host.setCountry(result.Country)
            host.setFaculty(result.Faculty)
            host.setOrgSize(result.Size)
            resolve(host)
          }
        })
      })
    })
  }
}

module.exports = HostOrganization
