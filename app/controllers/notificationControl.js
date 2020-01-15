const NotificationModel = require('../models/notification')

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

exports.removeNotification = function (id, res) {
  return new Promise(function (resolve, reject) {
    var deleted = NotificationModel.removeNotification(id)
    deleted.then(function (result) {
      resolve(true)
    })
  })
}

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

exports.refreshNotificationCache = function (associatedId, value) {
  return new Promise(function (resolve, reject) {
    var refresh = NotificationModel.changeStateCache(associatedId, value)
    refresh.then(function (result) {
      resolve(result)
    })
  })
}

exports.getNotificationCacheState = function (associatedID) {
  return new Promise(function (resolve, reject) {
    var get = NotificationModel.getStateCache(associatedID)
    get.then(function (result) {
      resolve(result)
    })
  })
}
