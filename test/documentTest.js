var chai= require('chai');
var expect=chai.expect;
var documentControl=require('../app/controllers/documentControl');

describe('Field test for documentControl', function(){

    it('Testing insertIDCard', function(done){
        var check= documentControl.idHandler("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing insertCV', function(done){
        var check= documentControl.cvHandler("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing viewIDCard', function(done){
        var check= documentControl.viewID("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing viewCV', function(done){
        var check= documentControl.viewCV("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getIDCard', function(done){
        var check= documentControl.getIDState("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing getCV', function(done){
        var check= documentControl.getCVState("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing deleteIDCard', function(done){
        var check= documentControl.IDEraser("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });

    it('Testing deleteCV', function(done){
        var check= documentControl.CVEraser("d.devito@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            done();
        });
    });
});