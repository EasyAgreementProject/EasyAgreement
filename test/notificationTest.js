var chai= require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect=chai.expect;
const io = require('socket.io-client');

describe('Field test for notificationControl', function() {

    var idNotifica=null;
    
    it('Testing insertNotification', function(done) {

        var socket = io.connect('http://localhost:3000');
        var socket1 = io.connect('http://localhost:3000');

        socket1.emit('subscribe-notification', "d.devito@studenti.unisa.it");

        socket.emit('send-notification', {associatedID: "d.devito@studenti.unisa.it", text: {title: "test", text: "Questo è il testing"}, date:{hour:"12", minutes:"20", seconds:"10", day:"24", months:"12", year:"2019"}});

        socket1.on('receive-notification', function(user, notification){
            idNotifica=notification._id;
            done();
        });
    });

    it('Testing getAllNotifications', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/getAllNotifications')
            .send({email:"d.devito@studenti.unisa.it"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing removeNotification', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/removeNotification')
            .send({notificationID: idNotifica })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing getReceivedNotification', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/getReceivedNotification')
            .send({sender: "d.devito@studenti.unisa.it"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing setReceivedNotification', function(done){
        chai
            .request('http://localhost:8080')
            .post('/setReceivedNotification')
            .send({sender: "d.devito@studenti.unisa.it"})
            .end(function(err, res){
                if(err) return done(err);
                expect(res).to.be.json;
                done();
            });
    });
});
