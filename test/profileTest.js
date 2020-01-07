var chai= require('chai');
var chaiHttp = require('chai-http');
var app = require('../app/controllers/studentControl');
var express = require('express');

var appz = express();
chai.use(chaiHttp);
var expect=chai.expect;

describe('Field test for profileControl', function(){

    it.only('Testin method profileControl - TC_PM_1.1.1', function(done){ 
        
        chai
            .request('http://localhost:8080')
            .get('/updateProfile')
            .send({inputNameS: "M"})
            
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.redirectTo('http://localhost:8080/');
                done();
            });
    });

    /* it('Testin method profileControl - TC_PM_1.1.2', function(done){
        chai
            .request('http://localhost:8080')
            .post('/profile')
            .send({inputNameS: "Ma%*o"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.have.cookie('errNameS');
                done();
            });
    });*/

    it('Testin method profileControl - TC_PM_1.1.4', function(done){
        chai
            .request('http://localhost:8080')
            .post('/profile')
            .send({inputSurnameS: "B"})
            .end(function(err, res){
                if(err)   return done(err);
                expect(res).to.have.cookie('errSurnameS');
                done();
            });
    }); 
})