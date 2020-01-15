var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var studentControl = require('../app/controllers/studentControl')
var studentModel = require('../app/models/student')

describe('Field test for profileControl', function () {
  it('testing method studentControl - TC_PM_1.1.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: 'M', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: 'Ma%o', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: 'Francesco', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: '' }, session: { utente: { utente: { Email: 'f.califano@studenti.unisa.it' } } } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.4', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: 'B', inputCity: '', inputAddress: '', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.5', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: 'B*o&', inputCity: '', inputAddress: '', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.6', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: 'Califano', inputCity: '', inputAddress: '', inputDegree: '' }, session: { utente: { utente: { Email: 'f.califano@studenti.unisa.it' } } } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.10', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: 'N', inputAddress: '', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.11', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '198', inputAddress: '', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.12', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: 'Salerno', inputAddress: '', inputDegree: '' }, session: { utente: { utente: { Email: 'f.califano@studenti.unisa.it' } } } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.13', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: 'V', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.14', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: 'V198&2', inputDegree: '' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.15', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: 'Via delle Vie 122', inputDegree: '' }, session: { utente: { utente: { Email: 'f.califano@studenti.unisa.it' } } } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.16', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: 'l' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.17', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: 'Inf%*' } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.18', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: 'Computer Science' }, session: { utente: { utente: { Email: 'f.califano@studenti.unisa.it' } } } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl not exist', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameS: '', inputSurnameS: '', inputCity: '', inputAddress: '', inputDegree: 'Computer Science' }, session: { utente: { utente: { Email: 'f.calfano@studenti.unisa.it' } } } }
    var updateS = studentControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.19', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'mbar', inputPassword: '', inputConfirmPassword: '' } }
    var updateS = studentControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.20', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Mborrelli$$', inputPassword: '', inputConfirmPassword: '' } }
    var updateS = studentControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.21 ', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Marcolino99', inputPassword: '', inputConfirmPassword: '' } }
    var updateS = studentControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.22', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Ma', inputConfirmPassword: '' } }
    var updateS = studentControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - TC_PM_1.1.23', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Marcob%&$!!”', inputConfirmPassword: '' } }
    var updateS = studentControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - password do not match', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Marco1997', inputConfirmPassword: 'Marco1998' } }
    var updateS = studentControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method studentControl - change passw', function (done) {
    var res = mockHttp.createResponse()
    var find = studentModel.findByEmail('f.califano@studenti.unisa.it')
    find.then(function (result) {
      var req = { body: { inputOldPassword: 'FraCalifano1', inputPassword: 'marco97977', inputConfirmPassword: 'marco97977' }, session: { utente: { utente: { Email: 'f.califano@studenti.unisa.it', Password: { hash: result.getPassword().hash, salt: result.getPassword().salt } } } } }
      var updateS = studentControl.updatePassword(req, res)
      updateS.then(function (result1) {
        expect(result1).to.not.be.null
        done()
      })
    })
  }).timeout(4000)
})
