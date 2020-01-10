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
        var check= documentControl.idHandler("f.califano@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            var check= documentControl.viewID("f.califano@studenti.unisa.it");
            check.then(function(result){
                expect(result).to.not.be.null;
                done();
            });
        });
    });

    it('Testing viewCV', function(done){
        var check= documentControl.cvHandler("f.califano@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            var check= documentControl.viewCV("f.califano@studenti.unisa.it");
            check.then(function(result){
                expect(result).to.not.be.null;
                done();
            });
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
        var check= documentControl.idHandler("d.marino@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            var check= documentControl.IDEraser("d.marino@studenti.unisa.it");
            check.then(function(result){
                expect(result).to.not.be.null;
                done();
            });
        });
    });

    it('Testing deleteCV', function(done){
        var check= documentControl.cvHandler("d.marino@studenti.unisa.it");
        check.then(function(result){
            expect(result).to.not.be.null;
            var check= documentControl.CVEraser("d.marino@studenti.unisa.it");
            check.then(function(result){
                expect(result).to.not.be.null;
                done();
            });
        });
    });
});