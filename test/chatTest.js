var chai= require('chai');
var expect=chai.expect;
var mockHttp=require('node-mocks-http');
var messageControl=require('../app/controllers/messageControl');

var messID;

describe('Field test for messageControl', function() {
    

    it('Testing saveMessage', function(done) {
        var res = mockHttp.createResponse();
        var message={senderID: "d.devito@studenti.unisa.it", recipientID: "g.musso@unisa.it", text: "fratmmoo", date:{hour:"12", minutes:"20", seconds:"10", day:"25", months:"12", year:"2019"}};
        var save=messageControl.saveMessage(message, res);
        save.then(function(result){
            expect(result).to.not.be.null;
            messID=result;
            done();
        });
    });

    it('Testing getMessages', function(done) {
        var res = mockHttp.createResponse();
        var sender="d.devito@studenti.unisa.it";
        var receiver="g.musso@unisa.it";
        var get=messageControl.getAllMessages(sender, receiver, res);
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getContacts 1.1', function(done) {
        var res = mockHttp.createResponse();
        var type= "academicTutor";
        var get=messageControl.getAllContacts(type, res);
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getContacts 1.2', function(done) {
        var res = mockHttp.createResponse();
        var type= "student";
        var get=messageControl.getAllContacts(type, res);
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getContacts 1.3', function(done) {
        var res = mockHttp.createResponse();
        var type= "externalTutor";
        var get=messageControl.getAllContacts(type, res);
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing searchUser 1.1', function(done) {
        var res = mockHttp.createResponse();
        var type= "externalTutor";
        var string="Francesco";
        var search=messageControl.searchUser(type, string, res);
        search.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing searchUser 1.2', function(done) {
        var res = mockHttp.createResponse();
        var type= "academicTutor";
        var string="Sara";
        var search=messageControl.searchUser(type, string, res);
        search.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing searchUser 1.3', function(done) {
        var res = mockHttp.createResponse();
        var type= "student";
        var string="Sara";
        var search=messageControl.searchUser(type, string, res);
        search.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing updateMessage', function(done){
        var res = mockHttp.createResponse();
        var text="wewe come stai bro";
        var update= messageControl.updateMessage(messID, text, res);
        update.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    })

    it('Testing removeMessage', function(done) {
        var res = mockHttp.createResponse();
        var remove=messageControl.removeMessage(messID, res);
        remove.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing setReceivedMessage', function(done){
        var sender="d.devito@studenti.unisa.it";
        var receiver="g.musso@unisa.it";
        var set=messageControl.refreshMessageCache(receiver, sender, false)
        set.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getReceivedMessage', function(done) {
        var sender="d.devito@studenti.unisa.it";
        var get=messageControl.getAllCache(sender);
        get.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
    
});
