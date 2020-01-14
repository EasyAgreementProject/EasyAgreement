var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
  if (err) throw err
  console.log('Connected successfully to server!')
  var dbo = db.db(dbName)

  dbo.collection('Student').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' students')
  })

  dbo.collection('HostOrganization').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' host organizations')
  })

  dbo.collection('Administrator').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' administrators')
  })

  dbo.collection('ExternalTutor').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' external tutors')
  })

  dbo.collection('AcademicTutor').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' academic tutors')
  })

  dbo.collection('current_LearningAgreement').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' current Learning Agreements')
  })

  dbo.collection('current_LearningAgreement').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' current Learning Agreements')
  })

  dbo.collection('LearningAgreement_revision').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' versions of Learning Agreements')
  })

  dbo.collection('Request').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' requests')
  })

  dbo.collection('Notification').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' notifications')
  })

  dbo.collection('Message').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' messages')
  })

  dbo.collection('Documents.files').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' files')
  })

  dbo.collection('Documents.chunks').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' chunks')
  })

  dbo.collection('Cache').deleteMany({}, function (err, result) {
    if (err) throw err
    console.log('Succesfully deleted ' + result.deletedCount + ' cache')
  })
})
