var hash = require('./hash.js')
var externalTutorModel = require('../models/externaltutor.js')
var organizationModel = require('../models/hostorganization.js')


exports.deleteHostOrg = function (erasmuscode, res) {

    return new Promise(function(fulfill, reject){
    
      var delHost=organizationModel.deleteHostOrg(erasmuscode);
      delHost.then(function(result){
        if(!result){
    
          res.cookie('errDelHost','1')
          fulfill(false)
          return
    
        }else{
    
          res.cookie('delHostSucc','1')
          fulfill(true)
          }
        })
      })
    }

exports.deleteExTutor = function (email, res) {
    
      return new Promise(function(fulfill, reject){
      
        var delExTutor=externalTutorModel.deleteExTutor(email);
        delExTutor.then(function(result){
          if(!result){
      
            res.cookie('errDelHost','1')
            fulfill(false)
            return
            
          }else{
      
            res.cookie('delHostSucc','1')
            fulfill(true)
            }
          })
        })
      }