var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var tutorControl = require('../app/controllers/tutorControl')

describe('Field test for tutorControl', function () {
    it('Testin method tutorControl - TC_TM_1.1', function (done) {
      var res = mockHttp.createResponse()
      var req = { body: { inputNameEx: '', inputSurnameEx: '' , inputEmailEx:'a@b.i', inputOrganizationEx:'', inputPassword:'', inputRePassword:'', } }
      var tutor = tutorControl.addExtTutor(req, res)
      tutor.then(function (result) {
        expect(result).to.not.be.null
        done()
      })
    })

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.2', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: '', inputSurnameEx: '' , inputEmailEx:'rossiMario@email.fasulla',inputOrganizationEx:'', inputPassword:'', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.3', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: '', inputSurnameEx: '' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'', inputPassword:'cia', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.4', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: '', inputSurnameEx: '' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'', inputPassword:'cia%%%', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.5', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: '', inputSurnameEx: 'a' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'', inputPassword:'ciaociaociao1', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.6', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: '', inputSurnameEx: 'ros1' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'', inputPassword:'ciaociaociao1', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.7', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: 'M', inputSurnameEx: 'Rossi' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'', inputPassword:'ciaociaociao1', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.8', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: 'Mario122', inputSurnameEx: 'Rossi' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'', inputPassword:'ciaociaociao1', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.9', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: 'Mario', inputSurnameEx: 'Rossi' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'T', inputPassword:'ciaociaociao1', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })


    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_1.10', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: 'Mario', inputSurnameEx: 'Rossi' , inputEmailEx:'rossimario@gmail.com',inputOrganizationEx:'T%%%', inputPassword:'ciaociaociao1', inputRePassword:'', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - already reg', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: 'Mario', inputSurnameEx: 'Rossi' , inputEmailEx:'s.cotto@gmail.com',inputOrganizationEx:'Tvc', inputPassword:'ciaociaociao1', inputRePassword:'ciaociaociao1', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })
    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - reg', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputNameEx: 'Mario', inputSurnameEx: 'Rossi' , inputEmailEx:'peppino9@outlook.com',inputOrganizationEx:'Tvc', inputPassword:'ciaociaociao1', inputRePassword:'ciaociaociao1', } }
          var tutor = tutorControl.addExtTutor(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.1', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: '0', inputFacolta: '' , inputAddress:'',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.2', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: '&0', inputFacolta: '' , inputAddress:'',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.3', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: '' , inputAddress:'',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.4', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'C' , inputAddress:'',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.5', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'C%' , inputAddress:'',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.6', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'t',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.7', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'hg%',inputSize:'', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.7', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'0', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.8', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'0a', inputCountry:'', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.9', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'124', inputCountry:'p', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.10', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'124', inputCountry:'g%%', inputContacts:'', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.11', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'124', inputCountry:'Germania', inputContacts:'t', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.12', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'124', inputCountry:'Germania', inputContacts:'t&%', inputNameT:''} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.14', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'124', inputCountry:'Germania', inputContacts:'t&%', inputNameT:'a'} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.15', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'Tc56', inputFacolta: 'ComputerScience' , inputAddress:'Firence 34',inputSize:'124', inputCountry:'Germania', inputContacts:'t&%', inputNameT:'tt&'} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - TC_TM_2.16', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'TC98', inputFacolta: 'ComputerScience' , inputAddress:'via firenze 4',inputSize:'124', inputCountry:'Germania', inputContacts:'0818933344', inputNameT:'CsnMobile'} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - already reg', function (done) {
          var res = mockHttp.createResponse()
          var req = { body: { inputErasmusCode: 'appl2020', inputFacolta: 'ComputerScience' , inputAddress:'via firenze 4',inputSize:'124', inputCountry:'Germania', inputContacts:'0818933344', inputNameT:'CsnMobile'} }
          var tutor = tutorControl.addHostOrg(req, res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })


    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - deleteHostOrg', function (done) {
          var res = mockHttp.createResponse()
          var tutor = tutorControl.deleteHostOrg("sams9797", res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - deleteHostOrg', function (done) {
          var res = mockHttp.createResponse()
          var tutor = tutorControl.deleteHostOrg("Tc56", res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - deleteExt', function (done) {
          var res = mockHttp.createResponse()
          var tutor = tutorControl.deleteExTutor("a.lombardo@libero.it", res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })

    describe('Field test for tutorControl', function () {
        it('Testin method tutorControl - deleteExt', function (done) {
          var res = mockHttp.createResponse()
          var tutor = tutorControl.deleteExTutor("a.borreaaaaaaa9@unisa.it", res)
          tutor.then(function (result) {
            expect(result).to.not.be.null
            done()
          })
        })
    })


})