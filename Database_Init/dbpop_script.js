var MongoClient = require('mongodb').MongoClient
var hash = require('../app/controllers/hash')

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

var ins = insert()
ins.then(function (result) {
  process.exit()
})

function insert () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) reject(err)
      console.log('Connected successfully to server!')
      var dbo = db.db(dbName)

      const fs = require('fs')
      const studentData = fs.readFileSync('Database_Init/JSON/dbpop_student.json')
      const adminData = fs.readFileSync('Database_Init/JSON/dbpop_admin.json')
      const actutorData = fs.readFileSync('Database_Init/JSON/dbpop_actutor.json')
      const extTutorData = fs.readFileSync('Database_Init/JSON/dbpop_exttutor.json')
      const hostOrgData = fs.readFileSync('Database_Init/JSON/dbpop_hostorg.json')

      const students = JSON.parse(studentData)
      const admin = JSON.parse(adminData)
      const actutor = JSON.parse(actutorData)
      const exttutor = JSON.parse(extTutorData)
      const hostorg = JSON.parse(hostOrgData)

      for (var i = 0; students[i] != null; i++) {
        students[i].Password = hash.hashPassword(students[i].Password)
      }
      for (var i = 0; admin[i] != null; i++) {
        admin[i].Password = hash.hashPassword(admin[i].Password)
      }
      for (var i = 0; actutor[i] != null; i++) {
        actutor[i].Password = hash.hashPassword(actutor[i].Password)
      }
      for (var i = 0; exttutor[i] != null; i++) {
        exttutor[i].Password = hash.hashPassword(exttutor[i].Password)
      }

      dbo.collection('Student').insertMany(students, function (err, result) {
        if (err) throw err
        console.log('Succesfully inserted into database ' + result.insertedCount + ' students')
        dbo.collection('Administrator').insertMany(admin, function (err, result) {
          if (err) throw err
          console.log('Succesfully inserted into database ' + result.insertedCount + ' admins')
          dbo.collection('AcademicTutor').insertMany(actutor, function (err, result) {
            if (err) throw err
            console.log('Succesfully inserted into database ' + result.insertedCount + ' academic tutors')
            dbo.collection('ExternalTutor').insertMany(exttutor, function (err, result) {
              if (err) throw err
              console.log('Succesfully inserted into database ' + result.insertedCount + ' external tutors')
              dbo.collection('HostOrganization').insertMany(hostorg, function (err, result) {
                if (err) throw err
                console.log('Succesfully inserted into database ' + result.insertedCount + ' host organizations')
                dbo.createCollection('current_LearningAgreement', function (err) {
                  if (err) throw err
                  console.log('Succesfully created the collection current_LearningAgreement')
                  dbo.createCollection('Request', function (err, result) {
                    if (err) throw err
                    console.log('Succesfully created the collection Request')
                    dbo.createCollection('LearningAgreement_revision', function (err) {
                      if (err) throw err
                      console.log('Succesfully created the collection LearningAgreement_revision.')
                      resolve()
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}
