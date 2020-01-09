var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var academicTutorControl = require('../app/controllers/academicTutorControl')
var academicTutorModel = require('../app/models/academicTutor')

describe('Field test for profileControl', function () {
  it('testing method academicTutorControl - TC_PM_1.2.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: 'M', inputSurnameAc: '', inputDepartmentT: '' } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: 'Ma%o', inputSurnameAc: '', inputDepartmentT: '' } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: 'Giuseppe', inputSurnameAc: '', inputDepartmentT: '' }, session: { utente: { utente: { E_mail: 'g.musso@unisa.it' } } } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(10000);

  it('testing method academicTutorControl - TC_PM_1.2.4', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: '', inputSurnameAc: 'B', inputDepartmentT: '' } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.5', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: '', inputSurnameAc: 'B*o&', inputDepartmentT: '' } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.6', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: '', inputSurnameAc: 'Risso', inputDepartmentT: '' }, session: { utente: { utente: { E_mail: 's.risso@unisa.it' } } } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.10', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: '', inputSurnameAc: '', inputDepartmentT: 'N' } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.11', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: '', inputSurnameAc: '', inputDepartmentT: '128' } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.12', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameAc: '', inputSurnameAc: '', inputDepartmentT: 'Lettere' }, session: { utente: { utente: { E_mail: 's.risso@unisa.it' } } } }
    var updateA = academicTutorControl.update(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.13', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'A', inputPassword: '', inputConfirmPassword: '' } }
    var updateA = academicTutorControl.updatePassword(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.14', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Alessi%%', inputPassword: '', inputConfirmPassword: '' } }
    var updateA = academicTutorControl.updatePassword(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.15', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Risso9797', inputPassword: '', inputConfirmPassword: '' } }
    var updateA = academicTutorControl.updatePassword(req, res)
    updateA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.16', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Ma', inputConfirmPassword: '' } }
    var updateS = academicTutorControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - TC_PM_1.2.17', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '', inputPassword: 'Mat%', inputConfirmPassword: '' } }
    var updateS = academicTutorControl.updatePassword(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000);

  it('testing method academicTutorControl - change passw', function (done) {
    var res = mockHttp.createResponse()
    var find = academicTutorModel.RetrieveByEmail('s.risso@unisa.it')
    find.then(function (result) {
      expect(result).to.not.be.null
      var req = { body: { inputOldPassword: 'RisSimone1', inputPassword: 'simone97977', inputConfirmPassword: 'simone97977' }, session: { utente: { utente: { E_mail: 's.risso@unisa.it', Password: { hash: result.getPassword().hash, salt: result.getPassword().salt } } } } }
      var updateS = academicTutorControl.updatePassword(req, res)
      updateS.then(function (result1) {
        expect(result1).to.not.be.null
        done()
      })
    })
  }).timeout(4000);
})
