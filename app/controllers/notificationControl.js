const NotificationModel = require('../models/notification')
/**
 * This method retrieves all the notification 
 * @param {String} id - The notification's id by id
 * @param {Object} res - The HTTP response
 * @returns {Int} - 
 */
exports.getAllNotification = function (id, res) {
  return new Promise(function (resolve, reject) {
    var notifications = NotificationModel.retrieveAll(id)
    notifications.then(function (result) {
      if (result != null) {
        for (var i = 0; result[i] != null; i++) {
          result[i].compareData = new Date(result[i].date.year, result[i].date.month - 1, result[i].date.day, result[i].date.hour, result[i].date.minutes, result[i].date.seconds)
        }
        result.sort(function (a, b) {
          if (a.compareData < b.compareData) return -1
          if (a.compareData > b.compareData) return 1
          return 0
        })
        for (i = 0; result[i] != null; i++) {
          delete result[i].compareData
        }
      }
      resolve(result)
    })
  })
}

/**
 * This method remove a specific notification
 * @param {String} id - the id of notification to remove
 * @param {Object} res - the HTTP response 
 * @returns {Boolean} - It returns true if the notification was removed successfull, else false
 */
exports.removeNotification = function (id, res) {
  return new Promise(function (resolve, reject) {
    var deleted = NotificationModel.removeNotification(id)
    deleted.then(function (result) {
      resolve(true)
    })
  })
}

/**
 * This method remove a specific notification
 * @param {Notification} notifica - the notification to insert
 * @returns {Boolean} - It returns true if the notification was inserted successfull, else false
 */
exports.insertNotification = function (notifica) {
  return new Promise(function (resolve, reject) {
    var notification = new NotificationModel()
    notification.setAssociatedID(notifica.associatedID)
    notification.setText(notifica.text)
    notification.setDate(notifica.date)
    var inserted = NotificationModel.insertNotification(notification)
    inserted.then(function (result) {
      resolve(result)
    })
  })
}

/**
 * This method refreshes the message cache
 * @param {String} associatedID - The notification's id
 * @param {Boolean} value - The state cache value
 * @returns {Object} - The update result
  */
exports.refreshNotificationCache = function (associatedId, value) {
  return new Promise(function (resolve, reject) {
    var refresh = NotificationModel.changeStateCache(associatedId, value)
    refresh.then(function (result) {
      resolve(result)
    })
  })
}

/**
 * This method gets all cache of message
 * @param {String} associatedID - The notification's id
 * @returns {Array} - The notification cache
 */
exports.getNotificationCacheState = function (associatedID) {
  return new Promise(function (resolve, reject) {
    var get = NotificationModel.getStateCache(associatedID)
    get.then(function (result) {
      resolve(result)
    })
  })
}
