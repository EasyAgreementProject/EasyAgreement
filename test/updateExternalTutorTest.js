var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var externalTutorControl = require('../app/controllers/externalTutorControl')
var externalTutorModel = require('../app/models/externaltutor')

describe('Field test for profileControl', function () {
  it('testing method externalTutorControl - TC_PM_1.3.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: 'M', inputSurnameE: '', inputOrganization: '' } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: 'Ma%o', inputSurnameE: '', inputOrganization: '' } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: 'Silvia', inputSurnameE: '', inputOrganization: '' }, session: { utente: { utente: { E_mail: 's.brignolo@gmail.com' } } } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.4', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: 'B', inputOrganization: '' } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.5', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: 'B*o&', inputOrganization: '' } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.6', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: 'Brignolo', inputOrganization: '' }, session: { utente: { utente: { E_mail: 's.brignolo@gmail.com' } } } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.10', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: '', inputOrganization: 'N' } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.11', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: '', inputOrganization: '128' } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.12', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: '', inputOrganization: 'Amazon' }, session: { utente: { utente: { E_mail: 's.brignolo@gmail.com' } } } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl not exist', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameE: '', inputSurnameE: '', inputOrganization: 'Amazon' }, session: { utente: { utente: { E_mail: 's.rignolo@gmail.com' } } } }
    var updateE = externalTutorControl.update(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.13', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'A', inputPassword: '', inputConfirmPassword: '' } }
    var updateE = externalTutorControl.updatePassword(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.14', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Alessi%%', inputPassword: '', inputConfirmPassword: '' } }
    var updateE = externalTutorControl.updatePassword(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.15', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Sara111', inputPassword: '', inputConfirmPassword: '' } }
    var updateE = externalTutorControl.updatePassword(req, res)
    updateE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.16', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Ma', inputConfirmPassword: '' } }
    var updateS = externalTutorControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - TC_PM_1.3.17', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Mat%', inputConfirmPassword: '' } }
    var updateS = externalTutorControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method externalTutorControl - change passw', function (done) {
    var res = mockHttp.createResponse()
    var findByEmail = externalTutorModel.findByEmail('s.brignolo@gmail.com')
    findByEmail.then(function (result1) {
      var req = { body: { inputOldPassword: 'silvia345', inputPassword: 'silvia97977', inputConfirmPassword: 'silvia97977' }, session: { utente: { utente: { E_mail: 's.brignolo@gmail.com', Password: { salt: result1.getPassword().salt, hash: result1.getPassword().hash } } } } }
      var updateS = externalTutorControl.updatePassword(req, res)
      updateS.then(function (result) {
        expect(result).to.not.be.null
        done()
      })
    })
  }).timeout(4000)
})
