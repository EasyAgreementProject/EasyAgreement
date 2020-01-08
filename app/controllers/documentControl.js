var studentModel = require('../models/student.js')
var mongo = require('mongodb')
var fs = require('fs')
const url = 'mongodb://localhost:27017/easyagreement'

exports.idHandler = function (e) {
  return new Promise(function (fulfill, reject) {
    var id = null
    var email = e
    var exist = studentModel.retrieveStudentIDCard(email)
    exist.then(function (result) {
      if (result != null && result != '') {
        fulfill('2')
      } else {
        mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err) reject(err)
          var dbo = db.db('easyagreement')
          var bucket = new mongo.GridFSBucket(dbo, { bucketName: 'Documents' })
          if (fs.existsSync('uploads/')) {
            var thereIs = false
            var files = fs.readdirSync('uploads/')
            files.forEach(function (file) {
              if (file == 'filetoupload-id.pdf') thereIs = true
              else if (file == 'filetoupload-cv.pdf') {} else {
                fs.unlink('uploads/' + file, function (error) {
                  if (error) reject(error)
                })
              }
            })
            if (!thereIs) {
              fulfill('1')
              db.close()
              return
            }
          }
          var readStream = fs.createReadStream('uploads/filetoupload-id.pdf')

          var uploadStream = bucket.openUploadStream('file' + Date.now() + '.pdf')

          id = uploadStream.id
          studentModel.updateStudentIDCard(email, id)

          readStream.pipe(uploadStream).on('error', function (error) {
            if (error) reject(error)
          })
            .on('finish', function () {
              fulfill('0')
              db.close()
            })
        })
      }
    })
  })
}

exports.cvHandler = function (e) {
  return new Promise(function (fulfill, reject) {
    var id = null
    var email = e
    var exist = studentModel.retrieveStudentCV(email)
    exist.then(function (result) {
      if (result != null && result != '') {
        fulfill('2')
      }
    })
    mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) reject(err)
      var dbo = db.db('easyagreement')

      var bucket = new mongo.GridFSBucket(dbo, { bucketName: 'Documents' })
      if (fs.existsSync('uploads/')) {
        var thereIs = false
        var files = fs.readdirSync('uploads/')
        files.forEach(function (file) {
          if (file == 'filetoupload-cv.pdf') thereIs = true
          else if (file == 'filetoupload-id.pdf') {} else {
            fs.unlink('uploads/' + file, function (error) {
              if (error) reject(error)
            })
          }
        })
        if (!thereIs) {
          fulfill('1')
          db.close()
          return
        }
      }
      var readStream = fs.createReadStream('uploads/filetoupload-cv.pdf')

      var uploadStream = bucket.openUploadStream('file' + Date.now() + '.pdf')

      id = uploadStream.id
      studentModel.updateStudentCV(email, id)
      readStream.pipe(uploadStream).on('error', function (error) {
        if (error) reject(error)
      })
        .on('finish', function () {
          fulfill('0')
          db.close()
        })
    })
  })
}

exports.IDEraser = function (e) {
  return new Promise(function (fulfill, reject) {
    var email = e
    var getID = studentModel.retrieveStudentIDCard(email)
    getID.then(function (id) {
      if (id != null) {
        studentModel.deleteStudentID(email)
        mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err) reject(err)
          var dbo = db.db('easyagreement')
          var bucket = new mongo.GridFSBucket(dbo, { bucketName: 'Documents' })
          bucket.delete(id, function (err) {
            if (err) reject(err)
            fulfill(true)
          })
        })
      }
    })
  })
}

exports.CVEraser = function (e) {
  return new Promise(function (fulfill, reject) {
    var email = e
    var getCV = studentModel.retrieveStudentCV(email)
    getCV.then(function (id) {
      if (id != null) {
        studentModel.deleteStudentCV(email)
        mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err) reject(err)
          var dbo = db.db('easyagreement')
          var bucket = new mongo.GridFSBucket(dbo, { bucketName: 'Documents' })
          bucket.delete(id, function (err) {
            if (err) reject(err)
            fulfill(true)
          })
        })
      }
    })
  })
}

exports.viewID = function (e) {
  return new Promise(function (fulfill, reject) {
    var email = e
    var getID = studentModel.retrieveStudentIDCard(email)
    getID.then(function (result) {
      var idCard = result
      if (idCard != null) {
        mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err) reject(err)
          var dbo = db.db('easyagreement')
          var bucket = new mongo.GridFSBucket(dbo, { bucketName: 'Documents' })
          var downloadStream = bucket.openDownloadStream(idCard)
          fulfill(downloadStream)
        })
      }
    })
  })
}

exports.viewCV = function (e) {
  return new Promise(function (fulfill, reject) {
    var email = e
    var getID = studentModel.retrieveStudentCV(email)
    getID.then(function (result) {
      var cv = result
      if (cv != null) {
        mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err) reject(err)
          var dbo = db.db('easyagreement')
          var bucket = new mongo.GridFSBucket(dbo, { bucketName: 'Documents' })
          var downloadStream = bucket.openDownloadStream(cv)
          fulfill(downloadStream)
        })
      }
    })
  })
}

exports.getIDState = function (email) {
  return new Promise(function (fulfill, reject) {
    var checkID = studentModel.retrieveStudentIDCard(email)
    checkID.then(function (result) {
      if (result != null) fulfill(true)
      else fulfill(false)
    })
  })
}

exports.getCVState = function (email) {
  return new Promise(function (fulfill, reject) {
    var checkCV = studentModel.retrieveStudentCV(email)
    checkCV.then(function (result) {
      if (result != null) fulfill(true)
      else fulfill(false)
    })
  })
}
