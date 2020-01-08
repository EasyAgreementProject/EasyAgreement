var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var notificationControl=require('../app/controllers/notificationControl');

describe('Field test for notificationControl', function() {

    var idNotifica=null;
    
    it('Testing insertNotification', function(done) {
        var notifica={associatedID: "d.devito@studenti.unisa.it", text: {title: "test", text: "Questo è il testing"}, date:{hour:"12", minutes:"20", seconds:"10", day:"24", months:"12", year:"2019"}};
        var save=notificationControl.insertNotification(notifica);
        save.then(function(result){
            expect(result).to.not.be.null;
            idNotifica=result;
            done();
        });
    });

    it('Testing getAllNotifications', function(done) {
        var res = mockHttp.createResponse();
        var id="d.devito@studenti.unisa.it";
        var get=notificationControl.getAllNotification(id, res)
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing removeNotification', function(done) {
        var res = mockHttp.createResponse();
        var get=notificationControl.removeNotification(idNotifica, res)
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing setReceivedNotification', function(done){
        var associated="d.devito@studenti.unisa.it";
        var set=notificationControl.refreshNotificationCache(associated, false);
        set.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getReceivedNotification', function(done) {
        var associated= "d.devito@studenti.unisa.it";
        var get=notificationControl.getNotificationCacheState(associated);
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
});
