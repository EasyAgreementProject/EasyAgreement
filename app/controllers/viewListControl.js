var academicTutorModel = require('../models/academicTutor')
var externalTutorModel = require('../models/externaltutor')
var hostOrganizationModel = require('../models/hostorganization')

/**
 * This method retrieves the user's informations
 * @param {String} type - the type of the user
 * @returns {JSON} - It returns an JSON array containing the informations  
 */
exports.retrieveAll = function (type) {
  return new Promise(function (resolve, reject) {
    if (type == 'academicTutor') {
      var getA = academicTutorModel.RetrieveAll()
      getA.then(function (result) {
        resolve(result)
      })
    } else if (type == 'externalTutor') {
      var getE = externalTutorModel.RetrieveAll()
      getE.then(function (result) {
        resolve(result)
      })
    } else if (type == 'host') {
      var getH = hostOrganizationModel.retrieveAll()
      getH.then(function (result) {
        resolve(result)
      })
    }
  })
}
