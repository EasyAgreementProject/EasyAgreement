var chai= require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect=chai.expect;

describe('Field test for messageControl', function() {
    
    it('Testing getMessages', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/getMessages')
            .send({sender: "d.devito@studenti.unisa.it", recipient:"g.musso@unisa.it" })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing updateMessage', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/updateMessage')
            .send({messageID: "5e09f2b0de2932303ad5078d", text:"ciao"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing removeMessage', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/removeMessage')
            .send({messageID: "5e09f2b0de2932303ad5078d" })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing saveMessage', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/saveMessage')
            .send({message:{senderID: "d.devito@studenti.unisa.it", recipientID: "g.musso@unisa.it", text: "fratmmm", date:{hour:"12", minutes:"20", seconds:"10", day:"24", months:"12", year:"2019"}} })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing getContacts 1.1', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/getContacts')
            .send({ type: "academicTutor" })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing getContacts 1.2', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/getContacts')
            .send({ type: "student" })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing getContacts 1.3', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/getContacts')
            .send({ type: "externalTutor" })
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });

    it('Testing searchUser', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/searchUser')
            .send({ type: "externalTutor" , search: "Marco"})
            .end(function(err,res) {
                if (err) return done(err);
                expect(res).to.be.json;
                done();
            });
    
    });
});
