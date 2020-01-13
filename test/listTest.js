var chai = require('chai')
var expect = chai.expect
var viewListControl = require('../app/controllers/viewListControl')
var tutorControl = require('../app/controllers/tutorControl')
var academicTutorControl = require('../app/controllers/academicTutorControl')
var externalTutorControl = require('../app/controllers/externalTutorControl')

describe('Field test for viewListControl', function () {
  it('Testing retrieveAll academicTutor', function (done) {
    var getListA = viewListControl.retrieveAll('academicTutor')
    getListA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing retrieveAll externalTutor', function (done) {
    var getListE = viewListControl.retrieveAll('externalTutor')
    getListE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing retrieveAll hostOtganization', function (done) {
    var getListH = viewListControl.retrieveAll('host')
    getListH.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing getHost for info', function (done) {
    var getH = tutorControl.getHostOrganization('aman2019')
    getH.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing getAcademic for info', function (done) {
    var getA = academicTutorControl.getByEmail('p.penna@unisa.it')
    getA.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing getExternal for info', function (done) {
    var getE = externalTutorControl.getByEmail('a.gentile@yahoo.it')
    getE.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })
})
