var hash = require('./hash.js')
var ExternalTutorModel = require('../models/externaltutor.js')
var OrganizationModel = require('../models/hostorganization.js')

exports.addHostOrg = function (req, res) {
  return new Promise(function (resolve, reject) {
    var erasmusCode = req.body.inputErasmusCode
    var faculty = req.body.inputFacolta
    var address = req.body.inputAddress
    var orgSize = req.body.inputSize
    var country = req.body.inputCountry
    var contact = req.body.inputContacts
    var name = req.body.inputNameT

    var isRight = true

    if ((erasmusCode == null) || (erasmusCode.length <= 3) || (!/^[A-Za-z0-9]+$/.test(erasmusCode))) {
      res.cookie('errErasmusCode', '1')
      isRight = false
    }

    if ((name == null) || (name.length <= 1) || (!/^[A-Za-z]+$/.test(name))) {
      res.cookie('errTutorName', '1')
      isRight = false
    }

    if ((faculty == null) || (faculty.length <= 1) || (!/^[A-Za-z]+$/.test(faculty))) {
      res.cookie('errFacolta', '1')
      isRight = false
    }

    if ((address == null) || (address.length <= 6) || (!/^[A-Za-z0-9,\s]+$/.test(address))) {
      res.cookie('errHAddress', '1')
      isRight = false
    }

    if ((contact == null) || (contact.length <= 7) || (!/(^[0-9]{9,10}$|[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]){1,}?)/.test(contact))) {
      res.cookie('errContatti', '1')
      isRight = false
    }

    if ((country == null) || (country.length <= 1) || (!/^[A-Za-z0-9\s]+$/.test(country))) {
      res.cookie('errCountryName', '1')
      isRight = false
    }

    if ((orgSize == null) || (orgSize == 0) || (!/^[0-9\s]+$/.test(orgSize))) {
      res.cookie('errSize', '1')
      isRight = false
    }

    if (!isRight) {
      resolve(false)
      return
    }

    // Create host organization object
    var organizzazioneEsterna = new OrganizationModel()
    organizzazioneEsterna.setContacts(contact)
    organizzazioneEsterna.setName(name)
    organizzazioneEsterna.setCountry(country)
    organizzazioneEsterna.setOrgSize(orgSize)
    organizzazioneEsterna.setAddress(address)
    organizzazioneEsterna.setFaculty(faculty)
    organizzazioneEsterna.setErasmusCode(erasmusCode)

    var checkE = OrganizationModel.findByEcode(erasmusCode)

    checkE.then(function (result) {
      if (!result) {
        res.cookie('errAlreadyRegH', '1')
        resolve(false)
        return
      }
      if (result) {
        // Save student in database
        OrganizationModel.addHostOrg(organizzazioneEsterna)
        resolve(true)
      }
    })
  })
}

exports.addExtTutor = function (req, res) {
  return new Promise(function (resolve, reject) {
    var name = req.body.inputNameEx
    var surname = req.body.inputSurnameEx
    var email = req.body.inputEmailEx
    var password = req.body.inputPassword
    var repassword = req.body.inputRePassword
    var organization = req.body.inputOrganizationEx

    var isRight = true
    if (password != repassword) {
      isRight = false
    }

    isRight = true
    if ((name == null) || (name.length <= 1) || (!/^[A-Za-z]+$/.test(name))) {
      res.cookie('errExTutorName', '1')
      isRight = false
    }

    if ((surname == null) || (surname.length <= 1) || (!/^[A-Za-z]+$/.test(surname))) {
      res.cookie('errExTutorSurname', '1')
      isRight = false
    }

    if ((email == null) || (email.length <= 6) || (!/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]){1,}?/.test(email))) {
      res.cookie('errExTutorEmail', '1')
      isRight = false
    }

    if ((organization == null) || (organization.length <= 1) || (!/^[A-Za-z0-9\s]+$/.test(organization))) {
      res.cookie('errExOrganizationName', '1')
      isRight = false
    }

    if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
      res.cookie('errPassword', '1')
      isRight = false
    }

    if (repassword != password) {
      res.cookie('errPasswordConfirm', '1')
      isRight = false
    }

    if (!isRight) {
      resolve(false)
      return
    }

    // hashing e salt of password
    var passwordHashed = hash.hashPassword(password)

    // Create external tutor object
    var tutorEsterno = new ExternalTutorModel()
    tutorEsterno.setSurname(surname)
    tutorEsterno.setName(name)
    tutorEsterno.setOrganization(organization)
    tutorEsterno.setEmail(email)
    tutorEsterno.setPassword(passwordHashed)

    var checkE = ExternalTutorModel.findByEmailA(email)
    checkE.then(function (result) {
      if (!result) {
        resolve(false)
        return
      }
      if (result) {
        // Save tutor in database
        ExternalTutorModel.addExtTutor(tutorEsterno)
        resolve(true)
      }
    })
  })
}

exports.deleteHostOrg = function (erasmuscode, res) {
  return new Promise(function (resolve, reject) {
    var delHost = OrganizationModel.deleteHostOrg(erasmuscode)
    delHost.then(function (result) {
      if (!result) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

exports.deleteExTutor = function (email, res) {
  return new Promise(function (resolve, reject) {
    var delExTutor = ExternalTutorModel.deleteExTutor(email)
    delExTutor.then(function (result) {
      if (!result) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

exports.getHostOrganization = function (id) {
  return new Promise(function (resolve, reject) {
    var get = OrganizationModel.retrieveOne(id)
    get.then(function (result) {
      resolve({ ErasmusCode: result.getErasmusCode(), Faculty: result.getFaculty(), Address: result.getAddress(), Size: result.getOrgSize(), Country: result.getCountry(), Contacts: result.getContacts(), Name: result.getName() })
    })
  })
}
