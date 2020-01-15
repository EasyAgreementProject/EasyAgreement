var pdfFiller = require('pdffiller')
var fs = require('fs')
var LA = require('../models/learningAgreement.js')
var requestControl = require('./requestControl.js')
var learningAgreement = new LA()
var io = require('socket.io-client')
var socket = io.connect('http://localhost:3000')

/**
 * This method sends the student's Learning Agreement compilation and generates a new request
 * @param {Array} input - The inputs of the form
 * @param {Object} res - The HTTP response
 * @returns {ReadStream} download - If the compilation was successful returns the downloadable pdf to send in the response, else returns null
 */
exports.sendLaStudent = function (input, res) {
  const random = parseInt(Math.random() * 10000)
  const sourcePDF = 'pdf/Template_LA.pdf'
  const destinationPDF = 'pdf/Filled_LA_' + random + '.pdf'
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  today = dd + '/' + mm + '/' + yyyy
  var data = {
    'Header name': input[0] + ' ' + input[1],
    'Last name (s)': input[1],
    'First name (s)': input[0],
    'Date of birth': input[2],
    Nationality: input[5],
    'Sex [M/F]': input[4],
    'Academic year1': input[7],
    'Academic year2': input[8],
    'Study cycle': input[6],
    'Subject area, Code': input[9],
    Phone: input[3],
    'E-mail': input[10],
    'Sending Departement': input[11],
    'Contact person name': input[12],
    'Contact person Email / Phone': input[13],
    'Contact person name / position': input[19],
    'Receiving contact person e-mail phone': input[13],
    'Name Sector': input[14],
    'Receiving Department': input[15],
    'Address, website': input[16],
    Country: input[17],
    'Size of enterprise': input[18],
    'Mentor name / position': input[20],
    'Mentor e-mail / phone': input[21],
    from: input[22],
    till: input[23],
    'Number of working hours for week': input[24],
    'Traineeship title': input[25],
    'Detailed programme of the traineeship period': input[26],
    'Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship': input[27],
    'Monitoring plan': input[28],
    'Evaluation plan': input[29],
    'language competence': input[30],
    'The trainee signature': input[0] + ' ' + input[1],
    'The trainee date': today
  }

  data.A1 = null
  data.A2 = null
  data.B1 = null
  data.B2 = null
  data.C1 = null
  data.C2 = null
  switch (input[31]) {
    case 'A1':
      data.A1 = 'X'
      break
    case 'A2':
      data.A2 = 'X'
      break
    case 'B1':
      data.B1 = 'X'
      break
    case 'B2':
      data.B2 = 'X'
      break
    case 'C1':
      data.C1 = 'X'
      break
    case 'C2':
      data.C2 = 'X'
      break
    default:
      break
  }

  return new Promise(function (resolve, reject) {
    const validatePr = exports.validateDataStudent(data, res)
    validatePr.then(function (result) {
      if (result) {
        if (!data.A1) data.A1 = ''
        if (!data.A2) data.A2 = ''
        if (!data.B1) data.B1 = ''
        if (!data.B2) data.B2 = ''
        if (!data.C1) data.C1 = ''
        if (!data.C2) data.C2 = ''
        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
          if (err) { throw err } else {
            // send Filled PDF to Client side
            var file = fs.readFileSync('pdf/Filled_LA_' + random + '.pdf')
            var download = fs.createReadStream('pdf/Filled_LA_' + random + '.pdf')
            fs.unlink('pdf/Filled_LA_' + random + '.pdf', function (err) {
              if (err) throw err
            })

            var pos = data['Contact person Email / Phone'].indexOf(' ')
            var email = data['Contact person Email / Phone'].substring(0, pos)

            var generateRequestPr = requestControl.generateRequest(data['E-mail'], email)
            generateRequestPr.then(function (result, err) {
              if (err) throw err
              if (result) {
                learningAgreement.setFilling(data)
                learningAgreement.setDocument(file)
                learningAgreement.setStudentID(data['E-mail'])
                learningAgreement.setState('Inviato')
                learningAgreement.setDate(data['The trainee date'])

                var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
                insertLearningAgreementPr.then(function () {
                  var d = new Date()
                  var date = { hour: d.getHours().toString().padStart(2, 0), minutes: d.getMinutes().toString().padStart(2, 0), seconds: d.getSeconds().toString().padStart(2, 0), day: d.getDate().toString().padStart(2, 0), month: ((d.getMonth()) + 1).toString().padStart(2, 0), year: d.getFullYear().toString() }
                  socket.emit('send-notification', { associatedID: email, text: { title: 'Nuova richiesta ricevuta', text: 'Lo studente ' + data['Header name'] + ' ha compilato il Learning Agreement' }, date: date })
                  if (res) res.cookie('succRequest', '1')
                  resolve(download)
                })
              } else {
                if (res) res.cookie('errRequest', '1')
                resolve()
              }
            })
          }
        })
      } else {
        resolve(null)
      }
    })
  })
}

/**
 * This method saves the student's Learning Agreement compilation
 * @param {Array} input - The inputs of the form
 * @param {Object} res - The HTTP response
 */
exports.saveLaStudent = function (input, res) {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  today = dd + '/' + mm + '/' + yyyy
  var data = {
    'Header name': input[0] + ' ' + input[1],
    'Last name (s)': input[1],
    'First name (s)': input[0],
    'Date of birth': input[2],
    Nationality: input[5],
    'Sex [M/F]': input[4],
    'Academic year1': input[7],
    'Academic year2': input[8],
    'Study cycle': input[6],
    'Subject area, Code': input[9],
    Phone: input[3],
    'E-mail': input[10],
    'Sending Departement': input[11],
    'Contact person name': input[12],
    'Contact person Email / Phone': input[13],
    'Contact person name / position': input[19],
    'Receiving contact person e-mail phone': input[13],
    'Name Sector': input[14],
    'Receiving Department': input[15],
    'Address, website': input[16],
    Country: input[17],
    'Size of enterprise': input[18],
    'Mentor name / position': input[20],
    'Mentor e-mail / phone': input[21],
    from: input[22],
    till: input[23],
    'Number of working hours for week': input[24],
    'Traineeship title': input[25],
    'Detailed programme of the traineeship period': input[26],
    'Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship': input[27],
    'Monitoring plan': input[28],
    'Evaluation plan': input[29],
    'language competence': input[30],
    'The trainee signature': input[0] + ' ' + input[1],
    'The trainee date': today
  }

  data.A1 = null
  data.A2 = null
  data.B1 = null
  data.B2 = null
  data.C1 = null
  data.C2 = null
  switch (input[31]) {
    case 'A1':
      data.A1 = 'X'
      break
    case 'A2':
      data.A2 = 'X'
      break
    case 'B1':
      data.B1 = 'X'
      break
    case 'B2':
      data.B2 = 'X'
      break
    case 'C1':
      data.C1 = 'X'
      break
    case 'C2':
      data.C2 = 'X'
      break
    default:
      break
  }

  return new Promise(function (resolve, reject) {
    var getLearningAgreementPr = LA.getLearningAgreement(data['E-mail'])
    getLearningAgreementPr.then(function (result) {
      if (result) {
        var getStatusPr = exports.getStatus(data['E-mail'])
        getStatusPr.then(function (result) {
          if (!result || result.startsWith('Disapprovato') || result.startsWith('Salvato')) {
            learningAgreement.setFilling(data)
            learningAgreement.setDocument(null)
            learningAgreement.setState('Salvato')
            learningAgreement.setStudentID(input[10])

            const insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
            insertLearningAgreementPr.then(function () {
              if (res) res.cookie('saveSuccess', '1')
              resolve()
            })
          } else {
            if (res) res.cookie('errRequest', '1')
            resolve()
          }
        })
      } else {
        learningAgreement.setFilling(data)
        learningAgreement.setDocument(null)
        learningAgreement.setState('Salvato')
        learningAgreement.setStudentID(input[10])

        const insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
        insertLearningAgreementPr.then(function () {
          if (res) res.cookie('saveSuccess', '1')
          resolve()
        })
      }
    })
  })
}

/**
 * This method sends the academic tutors's Learning Agreement compilation
 * @param {Array} input - The inputs of the form
 * @param {Object} res - The HTTP response
 * @returns {ReadStream} download - If the compilation was successful returns the downloadable pdf to send in the response, else returns null
 */
exports.sendLaAcademicTutor = function (input, res) {
  const random = parseInt(Math.random() * 10000)
  const sourcePDF = 'pdf/Template_LA.pdf'
  const destinationPDF = 'pdf/Filled_LA_' + random + '.pdf'
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  today = dd + '/' + mm + '/' + yyyy

  return new Promise(function (resolve, reject) {
    var email
    if (!input[9]) email = 'v.volpicelli4@studenti.unisa.it'
    else email = input[9]
    var getDataPr = exports.getData(email)
    getDataPr.then(function (data) {
      // Traineeship embedded in the curriculum
      data.Award = input[0]
      data['Traineeship certificate'] = null
      data['Final report'] = null
      data.Interview = null
      switch (input[1]) {
        case 'certificate':
          data['Traineeship certificate'] = 'X'
          break
        case 'report':
          data['Final report'] = 'X'
          break
        case 'interview':
          data.Interview = 'X'
          break
      }
      data['Europass Mobility Document Yes'] = null
      data['Europass Mobility Document No'] = null
      switch (input[2]) {
        case 'Si':
          data['Europass Mobility Document Yes'] = 'X'
          break
        case 'No':
          data['Europass Mobility Document No'] = 'X'
          break
      }
      // Traineeship voluntary
      data['Award ECTS credits Yes'] = null
      data['Award ECTS credits No'] = null
      switch (input[3]) {
        case 'Si':
          data['Award ECTS credits Yes'] = 'X'
          break
        case 'No':
          data['Award ECTS credits No'] = 'X'
          break
      }

      data['If yes, please indicate the number of ECTS credits'] = input[4]
      data['Give a grade Yes'] = null
      data['Give a grade No'] = null
      switch (input[5]) {
        case 'Si':
          data['Give a grade Yes'] = 'X'
          break
        case 'No':
          data['Give a grade No'] = 'X'
          break
      }
      data['Traineeship certificate1'] = null
      data['Final report1'] = null
      data.Interview1 = null
      switch (input[6]) {
        case 'certificate':
          data['Traineeship certificate1'] = 'X'
          break
        case 'report':
          data['Final report1'] = 'X'
          break
        case 'interview':
          data.Interview1 = 'X'
          break
      }
      data["Record the traineeship in the trainee's Transcript of Records Yes"] = null
      data["Record the traineeship in the trainee's Transcript of Records No"] = null
      switch (input[7]) {
        case 'Si':
          data["Record the traineeship in the trainee's Transcript of Records Yes"] = 'X'
          break
        case 'No':
          data["Record the traineeship in the trainee's Transcript of Records No"] = 'X'
          break
      }

      data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = null
      data["Record the traineeship in the trainee's Europass Mobility Document No"] = null
      switch (input[8]) {
        case 'Si':
          data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = 'X'
          break
        case 'No':
          data["Record the traineeship in the trainee's Europass Mobility Document No"] = 'X'
          break
      }

      data['Academic Tutor sign'] = data['Contact person name']
      data['Academic Tutor date'] = today
      data['International Departemental Coordinator sign'] = data['Contact person name']
      data['International Departemental Coordinator date'] = today

      const validatePr = exports.validateDataAcademicTutor(data, res)
      validatePr.then(function (result) {
        if (result) {
          if (!data.Award) data.Award = ''
          if (!data['Traineeship certificate']) data['Traineeship certificate'] = ''
          if (!data['Final report']) data['Final report'] = ''
          if (!data.Interview) data.Interview = ''
          if (!data['Europass Mobility Document Yes']) data['Europass Mobility Document Yes'] = ''
          if (!data['Europass Mobility Document No']) data['Europass Mobility Document No'] = ''
          if (!data['Award ECTS credits Yes']) data['Award ECTS credits Yes'] = ''
          if (!data['Award ECTS credits No']) data['Award ECTS credits No'] = ''
          if (!data['If yes, please indicate the number of ECTS credits']) data['If yes, please indicate the number of ECTS credits'] = ''
          if (!data['Give a grade Yes']) data['Give a grade Yes'] = ''
          if (!data['Give a grade No']) data['Give a grade No'] = ''
          if (!data['Traineeship certificate1']) data['Traineeship certificate1'] = ''
          if (!data['Final report1']) data['Final report1'] = ''
          if (!data.Interview1) data.Interview1 = ''
          if (!data["Record the traineeship in the trainee's Transcript of Records Yes"]) data["Record the traineeship in the trainee's Transcript of Records Yes"] = ''
          if (!data["Record the traineeship in the trainee's Transcript of Records No"]) data["Record the traineeship in the trainee's Transcript of Records No"] = ''
          if (!data["Record the traineeship in the trainee's Europass Mobility Document Yes"]) data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = ''
          if (!data["Record the traineeship in the trainee's Europass Mobility Document No"]) data["Record the traineeship in the trainee's Europass Mobility Document No"] = ''

          pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
            if (err) { throw err } else {
              // send Filled PDF to Client side
              var file = fs.readFileSync('pdf/Filled_LA_' + random + '.pdf')
              var download = fs.createReadStream('pdf/Filled_LA_' + random + '.pdf')
              fs.unlink('pdf/Filled_LA_' + random + '.pdf', function (err) {
                if (err) throw err
              })

              var pos = data['Mentor e-mail / phone'].indexOf(' ')
              var email2 = data['Mentor e-mail / phone'].substring(0, pos)

              var updateTutorPr = requestControl.updateExternalTutor(email, email2)
              updateTutorPr.then(function (result) {
                if (result) {
                  learningAgreement.setFilling(data)
                  learningAgreement.setDocument(file)
                  learningAgreement.setStudentID(data['E-mail'])
                  learningAgreement.setState('Approvato dal Tutor Accademico')
                  learningAgreement.setDate(data['Academic Tutor date'])

                  var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
                  insertLearningAgreementPr.then(function () {
                    var d = new Date()
                    var date = { hour: d.getHours().toString().padStart(2, 0), minutes: d.getMinutes().toString().padStart(2, 0), seconds: d.getSeconds().toString().padStart(2, 0), day: d.getDate().toString().padStart(2, 0), month: ((d.getMonth()) + 1).toString().padStart(2, 0), year: d.getFullYear().toString() }
                    socket.emit('send-notification', { associatedID: email2, text: { title: 'Nuova richiesta ricevuta', text: 'Lo studente ' + data['Header name'] + ' ha compilato il Learning Agreement' }, date: date })
                    socket.emit('send-notification', { associatedID: email, text: { title: 'Richiesta approvata', text: 'Il Tutor Accademico ha approvato la tua richiesta.' }, date: date })
                    if (res) res.cookie('succRequest', '1')
                    resolve(download)
                  })
                } else {
                  if (res) res.cookie('errRequest', '1')
                  resolve()
                }
              })
            }
          })
        } else {
          resolve(null)
        }
      })
    })
  })
}

/**
 * This method saves the academic tutors's Learning Agreement compilation
 * @param {Array} input - The inputs of the form
 * @param {Object} res - The HTTP response
 */
exports.saveLaAcademicTutor = function (input, res) {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  today = dd + '/' + mm + '/' + yyyy

  return new Promise(function (resolve, reject) {
    var email
    if (!input[9]) email = 'v.volpicelli4@studenti.unisa.it'
    else email = input[9]
    var getDataPr = exports.getData(email) // input9
    getDataPr.then(function (data) {
      // Traineeship embedded in the curriculum
      data.Award = input[0]
      data['Traineeship certificate'] = null
      data['Final report'] = null
      data.Interview = null
      switch (input[1]) {
        case 'certificate':
          data['Traineeship certificate'] = 'X'
          break
        case 'report':
          data['Final report'] = 'X'
          break
        case 'interview':
          data.Interview = 'X'
          break
      }
      switch (input[2]) {
        case 'Si':
          data['Europass Mobility Document Yes'] = 'X'
          break
        case 'No':
          data['Europass Mobility Document No'] = 'X'
          break
      }
      // Traineeship voluntary
      data['Award ECTS credits Yes'] = null
      data['Award ECTS credits No'] = null
      switch (input[3]) {
        case 'Si':
          data['Award ECTS credits Yes'] = 'X'
          break
        case 'No':
          data['Award ECTS credits No'] = 'X'
          break
      }

      data['If yes, please indicate the number of ECTS credits'] = input[4]
      data['Give a grade Yes'] = null
      data['Give a grade No'] = null
      switch (input[5]) {
        case 'Si':
          data['Give a grade Yes'] = 'X'
          break
        case 'No':
          data['Give a grade No'] = 'X'
          break
      }
      data['Traineeship certificate1'] = null
      data['Final report1'] = null
      data.Interview1 = null
      switch (input[6]) {
        case 'certificate':
          data['Traineeship certificate1'] = 'X'
          break
        case 'report':
          data['Final report1'] = 'X'
          break
        case 'interview':
          data.Interview1 = 'X'
          break
      }
      data["Record the traineeship in the trainee's Transcript of Records Yes"] = null
      data["Record the traineeship in the trainee's Transcript of Records No"] = null
      switch (input[7]) {
        case 'Si':
          data["Record the traineeship in the trainee's Transcript of Records Yes"] = 'X'
          break
        case 'No':
          data["Record the traineeship in the trainee's Transcript of Records No"] = 'X'
          break
      }

      data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = null
      data["Record the traineeship in the trainee's Europass Mobility Document No"] = null
      switch (input[8]) {
        case 'Si':
          data["Record the traineeship in the trainee's Europass Mobility Document Yes"] = 'X'
          break
        case 'No':
          data["Record the traineeship in the trainee's Europass Mobility Document No"] = 'X'
          break
      }

      data['Academic Tutor sign'] = data['Contact person name']
      data['Academic Tutor date'] = today
      data['International Departemental Coordinator sign'] = data['Contact person name']
      data['International Departemental Coordinator date'] = today

      var getStatusPr = exports.getStatus(data['E-mail'])
      getStatusPr.then(function (result) {
        if (result.startsWith('Inviato') || result.startsWith('Disapprovato dal Tutor Accademico')) {
          learningAgreement.setFilling(data)
          learningAgreement.setState('In valutazione dal Tutor Accademico')
          learningAgreement.setStudentID(data['E-mail'])

          var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
          insertLearningAgreementPr.then(function () {
            if (res) res.cookie('saveSuccess', '1')
            resolve()
          })
        } else {
          if (res) res.cookie('errRequest', '1')
          resolve()
        }
      })
    })
  })
}

/**
 * This method sends the external tutors's Learning Agreement compilation
 * @param {Array} input - The inputs of the form
 * @param {Object} res - The HTTP response
 * @returns {ReadStream} download - If the compilation was successful returns the downloadable pdf to send in the response, else returns null
 */
exports.sendLaExternalTutor = function (input, res) {
  const random = parseInt(Math.random() * 10000)
  const sourcePDF = 'pdf/Template_LA.pdf'
  const destinationPDF = 'pdf/Filled_LA_' + random + '.pdf'
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  today = dd + '/' + mm + '/' + yyyy

  return new Promise(function (resolve, reject) {
    var email
    if (!input[6]) email = 'v.volpicelli4@studenti.unisa.it'
    else email = input[6]
    var getDataPr = exports.getData(email) // input[6]
    getDataPr.then(function (data) {
      data['financial support Yes'] = null
      data['financial support No'] = null
      switch (input[0]) {
        case 'Si':
          data['financial support Yes'] = 'X'
          break
        case 'No':
          data['financial support No'] = 'X'
      }

      data['if financial support Yes'] = input[1]
      data['The trainee will receive a contribution in kind for his/her traineeship Yes'] = null
      data['The trainee will receive a contribution in kind for his/her traineeship No'] = null
      switch (input[2]) {
        case 'Si':
          data['The trainee will receive a contribution in kind for his/her traineeship Yes'] = 'X'
          break
        case 'No':
          data['The trainee will receive a contribution in kind for his/her traineeship No'] = 'X'
      }

      data['If yes, please specify'] = input[3]
      data['Traineeship Certificate by'] = input[4]
      data['Is the trainee covered by the accident insurance Yes'] = null
      data['Is the trainee covered by the accident insurance No'] = null

      switch (input[5]) {
        case 'Si':
          data['Is the trainee covered by the accident insurance Yes'] = 'X'
          break
        case 'No':
          data['Is the trainee covered by the accident insurance No'] = 'X'
      }

      var pos = data['Contact person name / position'].indexOf('-')
      var name = data['Contact person name / position'].substring(0, pos - 1)
      var position = data['Contact person name / position'].substring(pos + 2)

      pos = data['Contact person Email / Phone'].indexOf(' ')
      var email2 = data['Contact person Email / Phone'].substring(0, pos)
      var phone = data['Contact person Email / Phone'].substring(pos)

      data['Responsible person sending Name'] = name
      data['Responsible person sending Phone number'] = phone
      data['Responsible person sending Function'] = position
      data['Responsible person sending E-mail'] = email2

      pos = data['Mentor name / position'].indexOf('-')
      name = data['Mentor name / position'].substring(0, pos - 1)
      position = data['Mentor name / position'].substring(pos + 2)

      pos = data['Mentor e-mail / phone'].indexOf(' ')
      var email3 = data['Mentor e-mail / phone'].substring(0, pos)
      phone = data['Mentor e-mail / phone'].substring(pos)

      data['Responsible person receiving Name'] = name
      data['Responsible person receiving Phone number'] = phone
      data['Responsible person receiving Function'] = position
      data['Responsible person receiving E-mail'] = email3
      data['The receiving organization sign'] = name
      data['The receiving organization date'] = today

      const validatePr = exports.validateDataExternalTutor(data, res)
      validatePr.then(function (result) {
        if (result) {
          if (!data['financial support Yes']) data['financial support Yes'] = ''
          if (!data['financial support No']) data['financial support No'] = ''
          if (!data['if financial support Yes']) data['if financial support Yes'] = ''
          if (!data['The trainee will receive a contribution in kind for his/her traineeship Yes']) data['The trainee will receive a contribution in kind for his/her traineeship Yes'] = ''
          if (!data['The trainee will receive a contribution in kind for his/her traineeship No']) data['The trainee will receive a contribution in kind for his/her traineeship No'] = ''
          if (!data['If yes, please specify']) data['If yes, please specify'] = ''
          if (!data['Traineeship Certificate by']) data['Traineeship Certificate by'] = ''
          if (!data['Is the trainee covered by the accident insurance Yes']) data['Is the trainee covered by the accident insurance Yes'] = ''
          if (!data['Is the trainee covered by the accident insurance No']) data['Is the trainee covered by the accident insurance No'] = ''

          pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
            if (err) { throw err } else {
              // send Filled PDF to Client side
              var file = fs.readFileSync('pdf/Filled_LA_' + random + '.pdf')
              var download = fs.createReadStream('pdf/Filled_LA_' + random + '.pdf')
              fs.unlink('pdf/Filled_LA_' + random + '.pdf', function (err) {
                if (err) throw err
              })
              learningAgreement.setFilling(data)
              learningAgreement.setDocument(file)
              learningAgreement.setStudentID(data['E-mail'])
              learningAgreement.setState('Approvato dal Tutor Esterno')
              learningAgreement.setDate(data['The receiving organization date'])

              var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
              insertLearningAgreementPr.then(function () {
                var d = new Date()
                var date = { hour: d.getHours().toString().padStart(2, 0), minutes: d.getMinutes().toString().padStart(2, 0), seconds: d.getSeconds().toString().padStart(2, 0), day: d.getDate().toString().padStart(2, 0), month: ((d.getMonth()) + 1).toString().padStart(2, 0), year: d.getFullYear().toString() }
                socket.emit('send-notification', { associatedID: email3, text: { title: 'Richiesta approvata', text: 'Il Tutor Esterno ha approvato la richiesta di ' + data['Header name'] + '.' }, date: date })
                socket.emit('send-notification', { associatedID: email, text: { title: 'Richiesta approvata', text: 'Il Tutor Esterno ha approvato la tua richiesta.' }, date: date })
                if (res) res.cookie('succRequest', '1')
                resolve(download)
              })
            }
          })
        } else {
          resolve(null)
        }
      })
    })
  })
}

/**
 * This method saves the external tutors's Learning Agreement compilation
 * @param {Array} input - The inputs of the form
 * @param {Object} res - The HTTP response
 */
exports.saveLaExternalTutor = function (input, res) {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  today = dd + '/' + mm + '/' + yyyy

  return new Promise(function (resolve, reject) {
    var email
    if (!input[6]) email = 'v.volpicelli4@studenti.unisa.it'
    else email = input[6]
    var getDataPr = exports.getData(email)
    getDataPr.then(function (data) {
      switch (input[0]) {
        case 'Si':
          data['financial support Yes'] = 'X'
          break
        case 'No':
          data['financial support No'] = 'X'
      }

      data['if financial support Yes'] = input[1]

      switch (input[2]) {
        case 'Si':
          data['The trainee will receive a contribution in kind for his/her traineeship Yes'] = 'X'
          break
        case 'No':
          data['The trainee will receive a contribution in kind for his/her traineeship No'] = 'X'
      }

      data['If yes, please specify'] = input[3]
      data['Traineeship Certificate by'] = input[4]

      switch (input[5]) {
        case 'Si':
          data['Is the trainee covered by the accident insurance Yes'] = 'X'
          break
        case 'No':
          data['Is the trainee covered by the accident insurance No'] = 'X'
      }

      var getStatusPr = exports.getStatus(data['E-mail'])
      getStatusPr.then(function (result) {
        if (result.startsWith('Approvato dal Tutor Accademico') || result.startsWith('Disapprovato dal Tutor Esterno')) {
          learningAgreement.setFilling(data)
          learningAgreement.setState('In valutazione dal Tutor Esterno')
          learningAgreement.setStudentID(data['E-mail'])

          var insertLearningAgreementPr = LA.insertLearningAgreement(learningAgreement)
          insertLearningAgreementPr.then(function () {
            if (res) res.cookie('saveSuccess', '1')
            resolve()
          })
        } else {
          if (res) res.cookie('errRequest', '1')
          resolve()
        }
      })
    })
  })
}

/**
 * This method disapproves the current Learning Agreement compilation by the Academic Tutor
 * @param {String} student - The student's email
 * @param {String} msg - The motivation of the disapproval
 */
exports.disapproveAcademicTutor = function (student, msg) {
  return new Promise(function (resolve, reject) {
    var email
    if (!student) email = 'v.volpicelli4@studenti.unisa.it'
    else email = student
    var getLearningAgreementPr = LA.getLearningAgreement(email)
    getLearningAgreementPr.then(function (result, err) {
      if (err) throw err
      if (result) {
        var state = 'Disapprovato dal Tutor Accademico per il motivo: ' + msg
        var updateStatePr = LA.updateState(student, state)
        updateStatePr.then(function () {
          var d = new Date()
          var date = { hour: d.getHours().toString().padStart(2, 0), minutes: d.getMinutes().toString().padStart(2, 0), seconds: d.getSeconds().toString().padStart(2, 0), day: d.getDate().toString().padStart(2, 0), month: ((d.getMonth()) + 1).toString().padStart(2, 0), year: d.getFullYear().toString() }
          socket.emit('send-notification', { associatedID: email, text: { title: 'Richiesta non approvata', text: 'Il Tutor Accademico ha disapprovato la tua richiesta.' }, date: date })

          resolve()
        })
      }
    })
  })
}

/**
 * This method disapproves the current Learning Agreement compilation by the External Tutor
 * @param {String} student - The student's email
 * @param {String} msg - The motivation of the disapproval
 */
exports.disapproveExternalTutor = function (student, msg) {
  return new Promise(function (resolve, reject) {
    var email
    if (!student) email = 'v.volpicelli4@studenti.unisa.it'
    else email = student
    var getLearningAgreementPr = LA.getLearningAgreement(email)
    getLearningAgreementPr.then(function (result, err) {
      if (err) throw err
      if (result) {
        var state = 'Disapprovato dal Tutor Esterno per il motivo: ' + msg
        var updateStatePr = LA.updateState(student, state)
        updateStatePr.then(function () {
          var d = new Date()
          var date = { hour: d.getHours().toString().padStart(2, 0), minutes: d.getMinutes().toString().padStart(2, 0), seconds: d.getSeconds().toString().padStart(2, 0), day: d.getDate().toString().padStart(2, 0), month: ((d.getMonth()) + 1).toString().padStart(2, 0), year: d.getFullYear().toString() }
          socket.emit('send-notification', { associatedID: result.filling['Responsible person sending E-mail'], text: { title: 'Richiesta non approvata', text: 'Il Tutor Esterno ha disapprovato la richiesta di ' + result.filling['Header name'] + '.' }, date: date })
          socket.emit('send-notification', { associatedID: email, text: { title: 'Richiesta non approvata', text: 'Il Tutor Esterno ha disapprovato la tua richiesta.' }, date: date })

          resolve()
        })
      }
    })
  })
}

/**
 * This method returns the filling of the current Learning Agreement compilation
 * @param {String} student - The student's email
 * @returns {JSON} - The JSON containing the compilation's data
 */
exports.getData = function (student) {
  return new Promise(function (resolve, reject) {
    var getLearningAgreementPr = LA.getLearningAgreement(student)
    getLearningAgreementPr.then(function (result, err) {
      if (err) throw err
      if (result) { resolve(result.filling) }
    })
  })
}

/**
 * This method returns the current Learning Agreement's state
 * @param {String} student - The student's email
 * @returns {String} - The state of the Learning Agreement
 */
exports.getStatus = function (student) {
  return new Promise(function (resolve, reject) {
    var getLearningAgreementPr = LA.getLearningAgreement(student)
    getLearningAgreementPr.then(function (result, err) {
      if (err) throw err
      if (result) { resolve(result.state) }
    })
  })
}

/**
 * This method returns the requested Learning Agreement's version
 * @param {String} id - The version's number
 * @param {String} email - The student's email
 * @returns {ReadStream} The downloadable pdf of the selected version to send in the response
 */
exports.getVersion = function (id, email) {
  const random = parseInt(Math.random() * 10000)
  return new Promise(function (resolve, reject) {
    if (!/^\d$/.test(id)) resolve(null)
    var getPdfPr = LA.getPdf(id, email)
    getPdfPr.then(function (result, err) {
      if (err) throw err
      fs.writeFile('pdf/Old_LA_' + random + '.pdf', result.document.file_data.buffer, function (err) {
        if (err) throw err
        var file = fs.createReadStream('pdf/Old_LA_' + random + '.pdf')
        fs.unlink('pdf/Old_LA_' + random + '.pdf', function (err) {
          if (err) throw err
        })
        resolve(file)
      })
    })
  })
}

/**
 * This method returns all the Learning Agreement's version
 * @param {String} student - The student's email
 * @returns {Array} The list of the Learning Agreement's version of the requested student
 */
exports.getAllVersions = function (student) {
  return new Promise(function (resolve, reject) {
    var getAllVersionsPr = LA.getOldVersions(student)
    getAllVersionsPr.then(function (result, err) {
      if (err) throw err
      if (result) {
        var getLearningAgreementPr = LA.getLearningAgreement(student)
        getLearningAgreementPr.then(function (la, err) {
          if (err) throw err
          if (la) {
            result.push(la)
            result.sort((a, b) => b.version - a.version)
            resolve(result)
          }
        })
      }
    })
  })
}

/**
 * This method validates the inputs of the student's Learning Agreement compilation
 * @param {JSON} data - The JSON containing the compilation's input
 * @param {Object} res - The HTTP response
 * @returns {Boolean} - It returns true if the validation passed, else false
 */
exports.validateDataStudent = function (data, res) {
  return new Promise(function (resolve, reject) {
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Header name']))) {
      if (res) {
        res.cookie('errName', '1')
        res.cookie('errSurname', '1')
      }
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Last name (s)']))) {
      if (res) res.cookie('errSurname', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['First name (s)']))) {
      if (res) res.cookie('errName', '1')
      resolve(false)
    }
    if (!(/^(\d{4}(-|\/)((0)?[0-9]|(1)?[0-2]){1}(-|\/)([0-2]?[0-9]|(3)?[0-1]){1}|([0-2]?[0-9]|(3)?[0-1]){1}(-|\/){1}((0)?[0-9]|(1)?[0-2]){1}(-|\/){1}\d{4})$/.test(data['Date of birth']))) {
      if (res) res.cookie('errDate', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+ *$/.test(data.Nationality))) {
      if (res) res.cookie('errNationality', '1')
      resolve(false)
    }
    if (!(/^(M|F)/.test(data['Sex [M/F]']))) {
      if (res) res.cookie('errSex', '1')
      resolve(false)
    }
    if (!(/^\d{2} *$/.test(data['Academic year1']))) {
      if (res) res.cookie('errAcademicYear1', '1')
      resolve(false)
    }
    if (!(/^\d{2} *$/.test(data['Academic year2']))) {
      resolve(false)
    }
    if (!(/^(1st (C|c){1}ycle|2nd (C|c){1}ycle)$/.test(data['Study cycle']))) {
      if (res) res.cookie('errStudyCicle', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+\,{1} ?\d+ *$/.test(data['Subject area, Code']))) {
      if (res) res.cookie('errSubjectCode', '1')
      resolve(false)
    }
    if (!(/^\d{1,10} *$/.test(data.Phone))) {
      if (res) res.cookie('errTelephone', '1')
      resolve(false)
    }
    if (!(/^[a-z]{1}\.{1}[a-z]{2,}\d{0,}@{1}(studenti.unisa.it){1} *$/.test(data['E-mail']))) {
      if (res) res.cookie('errEmail', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù\.,';à-ù0-9]+( [A-za-zà-ù\.,';à-ù0-9]+)* *$/.test(data['Sending Departement']))) {
      if (res) res.cookie('errDepartmentSending', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Contact person name']))) {
      if (res) res.cookie('errContactName', '1')
      resolve(false)
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10} *$/.test(data['Contact person Email / Phone']))) {
      if (res) res.cookie('errContactSending', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* * - [A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Contact person name / position']))) {
      if (res) res.cookie('errContactReciving', '1')
      resolve(false)
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10} *$/.test(data['Receiving contact person e-mail phone']))) {
      if (res) res.cookie('errContactSending', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Name Sector']))) {
      if (res) res.cookie('errNameSector', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Receiving Department']))) {
      if (res) res.cookie('errDepartmentReciving', '1')
      resolve(false)
    }
    if (!(/^[\w ,\.()']+ ?(,|\/)? (http(s)?:\\\\)?www\.\w+\.(\w+\.)*\w{2,3} *$/.test(data['Address, website']))) {
      if (res) res.cookie('errAddressWebSite', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data.Country))) {
      if (res) res.cookie('Country wrong', '1')
      resolve(false)
    }
    if (!(/^\d+( ?[- \/] ?\d+)? *$/.test(data['Size of enterprise']))) {
      if (res) res.cookie('SerrSizeEnterprise', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+( [A-za-zà-ù]+)* * - [A-za-zà-ù]+( [A-za-zà-ù]+)* *$/.test(data['Mentor name / position']))) {
      if (res) res.cookie('errMentor', '1')
      resolve(false)
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ {1}\/? ?\d{9,10} *$/.test(data['Mentor e-mail / phone']))) {
      if (res) res.cookie('errMentorInfo', '1')
      resolve(false)
    }
    if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4} *$/.test(data.from))) {
      if (res) res.cookie('errDateFrom', '1')
      resolve(false)
    }
    if (!(/^((0)[0-9]|(1)[0-2]){1}\/{1}\d{4} *$/.test(data.till))) {
      if (res) res.cookie('errDateTo', '1')
      resolve(false)
    }
    if (!(/^\d{1,2}$/.test(data['Number of working hours for week']))) {
      if (res) res.cookie('errHourWork', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù,'à-ù0-9]+( [A-za-zà-ù,'à-ù0-9]+)* *$/.test(data['Traineeship title']))) {
      if (res) res.cookie('errTitle', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data['Detailed programme of the traineeship period']))) {
      if (res) res.cookie('errDetailed', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data['Knowledge, skill and competences to be acquired by the trainee at the end of the traineeship']))) {
      if (res) res.cookie('errKnowledge', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data['Monitoring plan']))) {
      if (res) res.cookie('errMonitoring', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù\.,"';à-ù0-9]+( [A-za-zà-ù\.",';à-ù0-9]+)* *$/.test(data['Evaluation plan']))) {
      if (res) res.cookie('errEvaluation', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+ *$/.test(data['language competence']))) {
      if (res) res.cookie('errLenguage', '1')
      resolve(false)
    }
    if (!data.A1 && !data.A2 && !data.B1 && !data.B2 && !data.C1 && !data.C2) {
      if (res) res.cookie('errLenguage', '1')
      resolve(false)
    }
    if (!(/^[A-za-zà-ù]+ {1}[A-za-zà-ù]+( {1}[A-za-zà-ù]+)? *$/.test(data['The trainee signature']))) {
      if (res) res.cookie('errName', '1')
      resolve(false)
    }
    if (!(/^(\d{4}(-|\/)((0)?[0-9]|(1)?[0-2]){1}(-|\/)([0-2]?[0-9]|(3)?[0-1]){1}|([0-2]?[0-9]|(3)?[0-1]){1}(-|\/){1}((0)?[0-9]|(1)?[0-2]){1}(-|\/){1}\d{4})$/.test(data['The trainee date']))) {
      if (res) res.cookie('errDate', '1')
      resolve(false)
    } else {
      resolve(true)
    }
  })
}

/**
 * This method validates the inputs of the academic tutor's Learning Agreement compilation
 * @param {JSON} data - The JSON containing the compilation's input
 * @param {Object} res - The HTTP response
 * @returns {Boolean} - It returns true if the validation passed, else false
 */
exports.validateDataAcademicTutor = function (data, res) {
  return new Promise(function (resolve, reject) {
    if (data.Award && (data['Traineeship certificate'] || data['Final report'] || data.Interview) && (data['Europass Mobility Document Yes'] || data['Europass Mobility Document No'])) {
      if (data['Award ECTS credits Yes'] || data['Award ECTS credits No'] || data['If yes, please indicate the number of ECTS credits'] || data['Give a grade Yes'] || data['Give a grade No'] ||
            data['Traineeship certificate1'] || data['Final report1'] || data.Interview1 || data["Record the traineeship in the trainee's Transcript of Records Yes"] ||
            data["Record the traineeship in the trainee's Transcript of Records No"] || data["Record the traineeship in the trainee's Europass Mobility Document Yes"] || data["Record the traineeship in the trainee's Europass Mobility Document No"]) {
        if (res) res.cookie('errCompileOnlyOne', '1')
        if (!(/^\d{1,2}$/.test(data.Award))) {
          if (res) res.cookie('errAward', '1')
          resolve(false)
        }
        resolve(false)
      }
      resolve(true)
    } else if ((data['Award ECTS credits Yes'] || data['Award ECTS credits No']) && data['If yes, please indicate the number of ECTS credits'] && (data['Give a grade Yes'] || data['Give a grade No']) &&
        (data['Traineeship certificate1'] || data['Final report1'] || data.Interview1) && (data["Record the traineeship in the trainee's Transcript of Records Yes"] ||
        data["Record the traineeship in the trainee's Transcript of Records No"]) && (data["Record the traineeship in the trainee's Europass Mobility Document Yes"] || data["Record the traineeship in the trainee's Europass Mobility Document No"])) {
      if (data.Award || data['Traineeship certificate'] || data['Final report'] || data.Interview || data['Europass Mobility Document Yes'] || data['Europass Mobility Document No']) {
        if (res) res.cookie('errCompileOnlyOne', '1')
        if (data['Award ECTS credits Yes'] && !(/^\d{1,2}$/.test(data['If yes, please indicate the number of ECTS credits']))) {
          if (res) res.cookie('errNumberCredits', '1')
          resolve(false)
        }
        if (data['Give a grade Yes'] && (!data['Traineeship certificate1'] && !data['Final report1'] && !data.Interview1)) {
          if (res) res.cookie('errMissingFields', '1')
          resolve(false)
        }
        resolve(false)
      }
      resolve(true)
    } else if (data['Award ECTS credits No'] && !data['If yes, please indicate the number of ECTS credits']) {
      resolve(true)
    } else if (data['Give a grade No'] && (!data['Traineeship certificate1'] && !data['Final report1'] && !data.Interview1)) {
      resolve(true)
    } else {
      if (res) res.cookie('errMissingFields', '1')
      resolve(false)
    }
  })
}

/**
 * This method validates the inputs of the external tutor's Learning Agreement compilation
 * @param {JSON} data - The JSON containing the compilation's input
 * @param {Object} res - The HTTP response
 * @returns {Boolean} - It returns true if the validation passed, else false
 */
exports.validateDataExternalTutor = function (data, res) {
  return new Promise(function (resolve, reject) {
    if (data['financial support Yes'] == 'X' && !data['if financial support Yes']) {
      if (res) res.cookie('errFinancialSupport', '1')
      resolve(false)
    }

    if (data['The trainee will receive a contribution in kind for his/her traineeship Yes'] == 'X' && !data['If yes, please specify']) {
      if (res) res.cookie('errContribution', '1')
      resolve(false)
    }

    if ((!data['financial support Yes'] && !data['financial support No']) || (!data['The trainee will receive a contribution in kind for his/her traineeship Yes'] && !data['The trainee will receive a contribution in kind for his/her traineeship No']) || (!data['Is the trainee covered by the accident insurance Yes'] && !data['Is the trainee covered by the accident insurance No'])) {
      if (res) res.cookie('errMissingFields', '1')
      resolve(false)
    }

    if (data['financial support Yes'] == 'X' && !(/^\d*(,\d+)?€? *$/.test(data['if financial support Yes']))) {
      if (res) res.cookie('errFinancialSupport', '1')
      resolve(false)
    }

    if (data['The trainee will receive a contribution in kind for his/her traineeship Yes'] == 'X' && !(/^[\wà-ù\.,"' ]* *$/.test(data['If yes, please specify']))) {
      if (res) res.cookie('errContribution', '1')
      resolve(false)
    }

    if (!(/^[0-5]{1} *$/.test(data['Traineeship Certificate by']))) {
      if (res) res.cookie('errWeeks', '1')
      resolve(false)
    } else {
      resolve(true)
    }
  })
}
