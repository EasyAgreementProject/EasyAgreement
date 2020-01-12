var hash = require('./hash.js')
var adminModel = require('../models/administrator.js')

exports.update = function (req, res) {
  return new Promise(function (resolve, reject) {
    var oldPassword = req.body.inputOldPassword
    var password = req.body.inputPassword
    var passwordConfirm = req.body.inputConfirmPassword
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
    if (hash.checkPassword(req.session.utente.utente.password.hash, req.session.utente.utente.password.salt, oldPassword)) {
      var passwordHashed = hash.hashPassword(password)
      var checkPass = adminModel.updatePassword(passwordHashed, req.session.utente.utente.email)
      /**
          * It checks the result of updatePassword function and updates the administrator session
          * @param  {Object} result - The result of updatePassword function (about Administrator)
          * @returns {Boolean} - It returns true and generates an "edit password complete" cookie if result != null, else it returns a reject
          */
      checkPass.then(function (result) {
        if (result != null) {
          req.session.utente.utente = result
          res.cookie('updatePassEff', '1')
          resolve(true)
        } else { resolve() }
      })
    } else {
      res.cookie('errOldPassword', '1')
      resolve(false)
    }
  })
}
