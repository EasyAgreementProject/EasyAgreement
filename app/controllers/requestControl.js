var Request = require('../models/request.js')
var learningAgreementControl = require('./learningAgreementControl.js')
var request = new Request()
var ObjectID = require('mongodb').ObjectID

/**
 * This method generates a new request from a student
 * @param {String} student - The student's email
 * @param {String} academicTutor - The Academic Tutor's email
 * @returns {Request} - The generated request
 */
exports.generateRequest = function (student, academicTutor) {
  return new Promise(function (resolve, reject) {
    request.setStudentID(student)
    request.setAcademicTutorID(academicTutor)
    request._id = new ObjectID()

    var getRequestPr = Request.getRequest(student)
    getRequestPr.then(function (result) {
      if (result) {
        var getStatusPr = learningAgreementControl.getStatus(student)
        getStatusPr.then(function (state) {
          if (state && state.startsWith('Disapprovato')) {
            var deleteRequestPr = Request.deleteRequest(student)
            deleteRequestPr.then(function () {
              var insertRequestPr = Request.insertRequest(request)
              insertRequestPr.then(function (err) {
                if (err) throw err
                resolve(request)
              })
            })
          } else resolve(null)
        })
      } else {
        var insertRequestPr = Request.insertRequest(request)
        insertRequestPr.then(function (err) {
          if (err) throw err
          resolve(request)
        })
      }
    })
  })
}

/**
 * This method retireves all the requests for a specific tutor
 * @param {String} tutor - The academic or external tutor's email
 * @returns {Array} - The list of the requests
 */
exports.getAllRequests = function (tutor) {
  return new Promise(function (resolve, reject) {
    var getRequestsPr = Request.getAllRequests(tutor)
    getRequestsPr.then(function (result) {
      var requests = []
      result.forEach(x => {
        var getDataPr = learningAgreementControl.getData(x.studentID)
        getDataPr.then(function (data) {
          x.nome = data['Header name']
          var getStatePr = learningAgreementControl.getStatus(x.studentID)
          getStatePr.then(function (state) {
            x.stato = state
            requests.push(x)
            if (result.length == requests.length) {
              resolve(requests)
            }
          })
        })
      })
    })
  })
}

/**
 * This method rerieves the details of a student's request
 * @param student - The student's email
 * @returns {Request} - The detailed request
 */
exports.getRequestDetails = function (student) {
  return new Promise(function (resolve, reject) {
    var getRequestPr = Request.getRequest(student)
    getRequestPr.then(function (request) {
      var getDataPr = learningAgreementControl.getData(student)
      getDataPr.then(function (data) {
        request.data = data
        var getStatusPr = learningAgreementControl.getStatus(student)
        getStatusPr.then(function (state) {
          request.status = state
          resolve(request)
        })
      })
    })
  })
}

/**
 * This method retrieves a student's request
 * @param {String} student - The student's email
 * @returns {Request} - The student's request
 */
exports.getRequest = function (student) {
  return new Promise(function (resolve, reject) {
    var getRequestPr = Request.getRequest(student)
    getRequestPr.then(function (result) {
      resolve(result)
    })
  })
}

/**
 * This method updates the external tutor of a request
 * @param {String} student - The student's email
 * @param {String} tutor - The external tutor's email
 * @returns {Boolean} Returns true if the update was successfull, else false
 */
exports.updateExternalTutor = function (student, tutor) {
  return new Promise(function (resolve, reject) {
    var getStatusPr = learningAgreementControl.getStatus(student)
    getStatusPr.then(function (result) {
      if (!result.startsWith('Approvato dal Tutor Accademico')) {
        var updateTutorPr = Request.updateExternalTutor(student, tutor)
        updateTutorPr.then(function () {
          resolve(true)
        })
      } else resolve(false)
    })
  })
}
