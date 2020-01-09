const assert = require('chai').assert;
var requestControl = require('../app/controllers/requestControl');

describe('Field test for requestControl', function(){

    it('Test method getAllRequests', function(done){
        var get = requestControl.getAllRequests('f.ferrucci@unisa.it');
        get.then(function(result){
            assert.isNotNull(result);
            done();
        })
    });

    it('Test method getRequest', function(done){
        var get = requestControl.getRequest('v.volpicelli4@studenti.unisa.it');
        get.then(function(result){
            assert.isNotNull(result);
            done();
        })
    });

    it('Test method getRequestDetails', function(done){
        var get = requestControl.getRequestDetails('v.volpicelli4@studenti.unisa.it');
        get.then(function(result){
            assert.isNotNull(result);
            done();
        })
    });

});