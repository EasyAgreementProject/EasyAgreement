var academicTutorModel = require('../models/academicTutor')
var externalTutorModel = require('../models/externaltutor')
var hostOrganizationModel = require('../models/hostorganization')

exports.retrieveAll= function(type){
    return new Promise(function(fulfill, reject){
        if(type == "academicTutor"){
            var getA = academicTutorModel.RetrieveAll()
            getA.then(function(result){
                fulfill(result)
            })
        }
        else if(type == "externalTutor"){
            var getE = externalTutorModel.RetrieveAll()
            getE.then(function(result){
                fulfill(result)
            })
        }
        else if(type == "host"){
            var getH = hostOrganizationModel.retrieveAll()
            getH.then(function(result){
                fulfill(result)
            })
        }
    })
}