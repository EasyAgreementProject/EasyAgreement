var academicModel = require('../models/academicTutor')
var externalModel = require('../models/externaltutor')
var studentModel = require('../models/student')
var MessageModel = require('../models/message')

/**
 * This method retrieves all the contactable users depending on the current logged user type
 * @param {String} - The type of the logged user
 * @param {res} - The HTTP response
 * @returns {Array} - The list of the contactable users
 */
exports.getAllContacts = function (type, res) {
  return new Promise(function (resolve, reject) {
    var users = null
    if (type == 'academicTutor') {
      users = academicModel.RetrieveAll()
    } else if (type == 'student') {
      users = studentModel.RetrieveAll()
    } else if (type == 'externalTutor') {
      users = externalModel.RetrieveAll()
    } else {
      reject('not found')
    }
    users.then(function (result) {
      resolve(result)
    })
  })
}

/**
 * This method retrieves all messagess between two users
 * @param {String} sender - The sender's email
 * @param {String} receiver - The receiver's email
 * @param {Object} res - The HTTP response
 * @returns {Array} - The list of messages
 */
exports.getAllMessages = function (sender, receiver, res) {
  return new Promise(function (resolve, reject) {
    var chat = MessageModel.getTextChat(sender, receiver)
    chat.then(function (result) {
      var senderArray = result.sender
      var recipientArray = result.recipient
      var i = 0

      for (i = 0; senderArray[i] != null; i++) {
        senderArray[i].compareData = new Date(senderArray[i].date.year, senderArray[i].date.month - 1, senderArray[i].date.day, senderArray[i].date.hour, senderArray[i].date.minutes, senderArray[i].date.seconds)
      }

      senderArray.sort(function (a, b) {
        if (a.compareData < b.compareData) return -1
        if (a.compareData > b.compareData) return 1
        return 0
      })

      for (i = 0; senderArray[i] != null; i++) {
        delete senderArray[i].compareData
      }

      for (i = 0; recipientArray[i] != null; i++) {
        recipientArray[i].compareData = new Date(recipientArray[i].date.year, recipientArray[i].date.month - 1, recipientArray[i].date.day, recipientArray[i].date.hour, recipientArray[i].date.minutes, recipientArray[i].date.seconds)
      }

      recipientArray.sort(function (a, b) {
        if (a.compareData < b.compareData) return -1
        if (a.compareData > b.compareData) return 1
        return 0
      })

      for (i = 0; recipientArray[i] != null; i++) {
        delete recipientArray[i].compareData
      }

      var array = { sender: senderArray, recipient: recipientArray }
      resolve(array)
    })
  })
}

/**
 * This method sends a new message between two users
 * @param {Message} message - The Message object to save
 * @param {Object} res - The HTTP request
 * @returns {Message} - The sent message
 */
exports.saveMessage = function (message, res) {
  return new Promise(function (resolve, reject) {
    var messaggio = new MessageModel()
    messaggio.setSenderID(message.senderID)
    messaggio.setRecipientID(message.recipientID)
    messaggio.setText(message.text)
    messaggio.setDate(message.date)
    var save = MessageModel.insertMessage(messaggio)
    save.then(function (result) {
      resolve(result)
    })
  })
}
/**
 * This method updates a specific message
 * @param {String} id - The id of the message to change
 * @param {String} text- The text of the message
 * @param {Object} res - The HTTP response
 * @returns {JSON} - The JSON object containing the boolean result, true if the update was successfull, else false  
 */
exports.updateMessage = function (id, text, res) {
  return new Promise(function (resolve, reject) {
    var update = MessageModel.updateMessage(id, text)
    update.then(function (result) {
      if(result>0)  resolve({ boolean: true })
      else  reject('not modified')
    })
  })
}

/**
 * This method removes a specific message
 * @param {String} messageID - The id of the message to remove
 * @param {Object} res - The HTTP response
 * @returns {JSON} - The JSON object containing the boolean result, true if the remove was successfull, else false  
 */
exports.removeMessage = function (messageID, res) {
  return new Promise(function (resolve, reject) {
    var remove = MessageModel.removeMessage(messageID)
    remove.then(function (result) {
      if(result > 0)  resolve({ boolean: true })
      else  reject('not deleted')
    })
  })
}

/**
 * This method searches an user to chat with
 * @param {String} type - The type of the logged user
 * @param {String} search - The name of the user to search
 * @param {Object} res - The HTTP response
 * @returns {JSON} - The JSON object containing the list of the users found
 */
exports.searchUser = function (type, search, res) {
  return new Promise(function (resolve, reject) {
    var name = null
    var surname = null
    var users1 = []
    var users2 = []
    if (search.indexOf(' ') <=0) {
      name = search
    } else {
      name = search.substring(0, search.indexOf(' '))
      surname = search.substring(search.indexOf(' ') + 1)
    }
    if (type == 'academicTutor') {
      var students = studentModel.RetrieveAll()
      students.then(function (result) {
        if (!result.length == 0) {
          for (var i = 0; result[i] != null; i++) {
            if (surname == null) {
              if (result[i].Name.toUpperCase() == name.toUpperCase()) users1.push(result[i])
              if (result[i].Surname.toUpperCase() == name.toUpperCase()) users1.push(result[i])
            } else {
              if (result[i].Name.toUpperCase() == name.toUpperCase() && result[i].Surname.toUpperCase() == surname.toUpperCase()) users1.push(result[i])
              if (result[i].Name.toUpperCase() == surname.toUpperCase() && result[i].Surname.toUpperCase() == name.toUpperCase()) users1.push(result[i])
            }
          }
        }
        var externals = externalModel.RetrieveAll()
        externals.then(function (result) {
          if (!result.length == 0) {
            for (var i = 0; result[i] != null; i++) {
              if (surname == null) {
                if (result[i].Name.toUpperCase() == name.toUpperCase()) users2.push(result[i])
                if (result[i].Surname.toUpperCase() == name.toUpperCase()) users2.push(result[i])
              } else {
                if (result[i].Name.toUpperCase() == name.toUpperCase() && result[i].Surname.toUpperCase() == surname.toUpperCase()) users2.push(result[i])
                if (result[i].Name.toUpperCase() == surname.toUpperCase() && result[i].Surname.toUpperCase() == name.toUpperCase()) users2.push(result[i])
              }
            }
          }
          resolve({ student: users1, external: users2, type: 'academicTutor' })
        })
      })
    } else if (type == 'student') {
      var academics = academicModel.RetrieveAll()
      academics.then(function (result) {
        if (!result.length == 0) {
          for (var i = 0; result[i] != null; i++) {
            if (surname == null) {
              if (result[i].Name.toUpperCase() == name.toUpperCase()) users1.push(result[i])
              if (result[i].Surname.toUpperCase() == name.toUpperCase()) users1.push(result[i])
            } else {
              if (result[i].Name.toUpperCase() == name.toUpperCase() && result[i].Surname.toUpperCase() == surname.toUpperCase()) users1.push(result[i])
              if (result[i].Name.toUpperCase() == surname.toUpperCase() && result[i].Surname.toUpperCase() == name.toUpperCase()) users1.push(result[i])
            }
          }
        }
        var externals = externalModel.RetrieveAll()
        externals.then(function (result) {
          if (!result.length == 0) {
            for (var i = 0; result[i] != null; i++) {
              if (surname == null) {
                if (result[i].Name.toUpperCase() == name.toUpperCase()) users2.push(result[i])
                if (result[i].Surname.toUpperCase() == name.toUpperCase()) users2.push(result[i])
              } else {
                if (result[i].Name.toUpperCase() == name.toUpperCase() && result[i].Surname.toUpperCase() == surname.toUpperCase()) users2.push(result[i])
                if (result[i].Name.toUpperCase() == surname.toUpperCase() && result[i].Surname.toUpperCase() == name.toUpperCase()) users2.push(result[i])
              }
            }
          }
          resolve({ academic: users1, external: users2, type: 'student' })
        })
      })
    } else if (type == 'externalTutor') {
      var students1 = studentModel.RetrieveAll()
      students1.then(function (result) {
        if (!result.length == 0) {
          for (var i = 0; result[i] != null; i++) {
            if (surname == null) {
              if (result[i].Name.toUpperCase() == name.toUpperCase()) users1.push(result[i])
              if (result[i].Surname.toUpperCase() == name.toUpperCase()) users1.push(result[i])
            } else {
              if (result[i].Name.toUpperCase() == name.toUpperCase() && result[i].Surname.toUpperCase() == surname.toUpperCase()) users1.push(result[i])
              if (result[i].Name.toUpperCase() == surname.toUpperCase() && result[i].Surname.toUpperCase() == name.toUpperCase()) users1.push(result[i])
            }
          }
        }
        var academics = academicModel.RetrieveAll()
        academics.then(function (result) {
          if (!result.length == 0) {
            for (var i = 0; result[i] != null; i++) {
              if (surname == null) {
                if (result[i].Name.toUpperCase() == name.toUpperCase()) users2.push(result[i])
                if (result[i].Surname.toUpperCase() == name.toUpperCase()) users2.push(result[i])
              } else {
                if (result[i].Name.toUpperCase() == name.toUpperCase() && result[i].Surname.toUpperCase() == surname.toUpperCase()) users2.push(result[i])
                if (result[i].Name.toUpperCase() == surname.toUpperCase() && result[i].Surname.toUpperCase() == name.toUpperCase()) users2.push(result[i])
              }
            }
          }
          resolve({ student: users1, academic: users2, type: 'externalTutor' })
        })
      })
    }
  })
}

/**
 * This method refreshes the message cache
 * @param {String} receiverID - The receiver's id
 * @param {String} senderID - The sender's id
 * @param {Boolean} value - The state cache value
 * @returns {Object} - The update result
  */
exports.refreshMessageCache = function (receiverID, senderID, value) {
  return new Promise(function (resolve, reject) {
    var refresh = MessageModel.changeStateCache(receiverID, senderID, value)
    refresh.then(function (result) {
      resolve(result)
    })
  })
}

/**
 * This method gest all cache of message
 * @param {String} receiverID - The receiver's email
 * @returns {Array} - The message cache
 */
exports.getAllCache = function (receiverID) {
  return new Promise(function (resolve, reject) {
    var get = MessageModel.getAllCache(receiverID)
    get.then(function (result) {
      resolve(result)
    })
  })
}
