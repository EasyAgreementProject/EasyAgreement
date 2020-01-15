var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var notificationControl = require('../app/controllers/notificationControl')

describe('Field test for notificationControl', function () {
  it('Testing insertNotification', function (done) {
    var notifica = { associatedID: 'p.penna@unisa.it', text: { title: 'test', text: 'Questo è il testing 1' }, date: { hour: '12', minutes: '20', seconds: '10', day: '24', months: '12', year: '2019' } }
    var save = notificationControl.insertNotification(notifica)
    save.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  /* it('Testing insertNotification', function (done) {
    var notifica = { associatedID: 'p.penna@unisa.it', text: { title: 'test', text: 'Questo è il testing 1' }, date: { hour: '13', minutes: '20', seconds: '10', day: '24', months: '12', year: '2019' } }
    var save = notificationControl.insertNotification(notifica)
    save.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }) */

  it('Testing getAllNotifications', function (done) {
    var res = mockHttp.createResponse()
    var notifica = { associatedID: 'p.penna@unisa.it', text: { title: 'test', text: 'Questo è il testing 2' }, date: { hour: '12', minutes: '10', seconds: '20', day: '24', months: '12', year: '2019' } }
    var save = notificationControl.insertNotification(notifica)
    save.then(function (result) {
      expect(result).to.not.be.null
      var id = 'p.penna@unisa.it'
      var get = notificationControl.getAllNotification(id, res)
      get.then(function (result) {
        expect(result).to.not.be.null
        done()
      })
    })
  })

  it('Testing getAllNotifications of null', function (done) {
    var res = mockHttp.createResponse()
    var id = ''
    var get = notificationControl.getAllNotification(id, res)
    get.then(function (result) {
      expect(result).to.be.null
      done()
    })
  })

  it('Testing removeNotification', function (done) {
    var res = mockHttp.createResponse()
    var notifica = { associatedID: 'g.musso@unisa.i', text: { title: 'test', text: 'Questo è il testing' }, date: { hour: '12', minutes: '20', seconds: '10', day: '24', months: '12', year: '2019' } }
    var save = notificationControl.insertNotification(notifica)
    save.then(function (result) {
      expect(result).to.not.be.null
      var idNotifica = result
      var rem = notificationControl.removeNotification(idNotifica, res)
      rem.then(function (result) {
        expect(result).to.not.be.null
        done()
      })
    })
  })

  it('Testing setReceivedNotification true', function (done) {
    var associated = 'd.devito@studenti.unisa.it'
    var set = notificationControl.refreshNotificationCache(associated, true)
    set.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing getReceivedNotification', function (done) {
    var associated = 'd.devito@studenti.unisa.it'
    var get = notificationControl.getNotificationCacheState(associated)
    get.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Testing setReceivedNotification false', function (done) {
    var associated = 'd.devito@studenti.unisa.it'
    var set = notificationControl.refreshNotificationCache(associated, false)
    set.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })
})
