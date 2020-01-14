var hash = require('./hash.js')
var ExternalTutorModel = require('../models/externaltutor.js')

exports.update = function (req, res) {
  return new Promise(function (resolve, reject) {
    var name = req.body.inputNameE
    var surname = req.body.inputSurnameE
    var organization = req.body.inputOrganization

    var externalTutor = new ExternalTutorModel()

    // Form validation
    var isRight = true
    if (name.length != 0) {
      if (!(/^[A-Za-z]+$/.test(name)) || name.length <= 2) {
        res.cookie('errexternalTutorName', '1')
        isRight = false
      } else {
        externalTutor.setName(name)
      }
    }

    if (surname.length != 0) {
      if (!(/^[A-Za-z]+$/.test(surname)) || surname.length <= 2) {
        res.cookie('errexternalTutorSurname', '1')
        isRight = false
      } else {
        externalTutor.setSurname(surname)
      }
    }

    if (organization.length != 0) {
      if (!(/^[A-Za-z]+$/.test(organization)) || organization.length <= 2) {
        res.cookie('errOrganizationName', '1')
        isRight = false
      } else {
        externalTutor.setOrganization(organization)
      }
    }

    if (!isRight) {
      resolve(false)
      return
    }

    var checkS = ExternalTutorModel.updateExternalTutor(externalTutor, req.session.utente.utente.E_mail)
    /**
        * It checks the result of updateExternalTutor function and updates the external tutor session
        * @param  {Object} result - The result of updateExternalTutor function
        * @returns {Boolean} - It returns true and generates an "edit complete" cookie if result != null, else it returns a reject
        */
    checkS.then(function (result) {
      if (result != null) {
        req.session.utente.utente = result
        res.cookie('updateEff', '1')
        resolve(true)
      } else { resolve() }
    })
  })
}

exports.updatePassword = function (req, res) {
  return new Promise(function (resolve, reject) {
    var oldPassword = req.body.inputOldPassword
    var password = req.body.inputPassword
    var passwordConfirm = req.body.inputConfirmPassword

    // Form Validation
    var isRight = true

    if ((oldPassword == null) || (oldPassword.length <= 7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))) {
      res.cookie('errOldPassword', '1')
      isRight = false
    }

    if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
      res.cookie('errPassword', '1')

      isRight = false
    }

    if (passwordConfirm != password) {
      res.cookie('errPasswordConfirm', '1')

      isRight = false
    }

    if (!isRight) {
      resolve(false)
      return
    }

    if (hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)) {
      var passwordHashed = hash.hashPassword(password)

      var checkS = ExternalTutorModel.updatePassword(passwordHashed, req.session.utente.utente.E_mail)

      /**
        * It checks the result of updatePassword function and updates the external tutor session
        * @param  {Object} result - The result of updatePassword function (about External Tutor)
        * @returns {Boolean} - It returns true and generates an "edit password complete" cookie if result != null, else it returns a reject
        */
      checkS.then(function (result) {
        if (result != null) {
          req.session.utente.utente = result
          res.cookie('updatePassEff', '1')
          resolve(true)
        } else { resolve() }
      })
    } else {
      res.cookie('errPassword', '1')
      resolve(false)
    }
  })
}

exports.getByEmail = function (email) {
  return new Promise(function (resolve, reject) {
    var get = ExternalTutorModel.findByEmail(email)
    get.then(function (result) {
      resolve({ E_mail: result.getEmail(), Surname: result.getSurname(), Name: result.getName(), Organization: result.getOrganization() })
    })
  })
}
