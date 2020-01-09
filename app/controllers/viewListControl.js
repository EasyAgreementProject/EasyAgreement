var externalTutorModel = require('../models/externaltutor.js');
var hostOrganizationModel = require ('../models/hostorganization.js');

exports.retrieveAllTutor=function(r) {

    return new Promise(function (fulfill, reject) {

        var myRet= externalTutorModel.RetrieveAll();
        myRet.then( function(result) {
            fulfill(result);

        })



    })

}

exports.retrieveAllHostOrg=function(req,res) {

    return new Promise(function (fulfill, reject) {

        var myRet= hostOrganizationModel.retrieveAll;
        myRet.then( function(result) {

            fulfill(result);

        })



    })

}