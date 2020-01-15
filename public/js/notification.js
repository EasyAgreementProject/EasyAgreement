var connectedUser = null
var senderID = null
/*
var d=new Date();
var data={hour: d.getHours().toString().padStart(2,0), minutes: d.getMinutes().toString().padStart(2,0), seconds: d.getSeconds().toString().padStart(2,0), day: d.getDate().toString().padStart(2,0), month: ((d.getMonth())+1).toString().padStart(2,0), year: d.getFullYear().toString()};
socket.emit('send-notification', {associatedID: "a.ambruoso1@studenti.unisa.it", text: {title: "esempio emit", text: "bro alla fine è tutto apposto"}, date: data})
*/

$.ajax({
  type: 'POST',
  url: '/getConnectedUser',
  contentType: 'application/json',
  async: false,
  success: function (user) {
    connectedUser = user
  },
  error: function () {
    console.log('error')
  }
})

if (connectedUser.type == 'student') {
  senderID = connectedUser.utente.Email
} else if (connectedUser.type == 'academicTutor') {
  senderID = connectedUser.utente.E_mail
} else if (connectedUser.type == 'externalTutor') {
  senderID = connectedUser.utente.E_mail
}

$('head').append('<link href="css/notification.css" rel="stylesheet"></link>')

$('#open-notification').append('<img class="red-notification" src="/img/cerchio-notifica.png" style="display:none;">')

$('#open-notification').append(['<div class="speech-bubble speech-bubble-top notification--tray" style="display:none">',
  '<div class="notifications">',
  '</div>',
  '</div>'].join('\n'))

$.ajax({
  type: 'POST',
  url: 'http://localhost:8080/getReceivedNotification',
  data: { sender: senderID },
  success: function (result) {
    if (result) {
      if ($('.speech-bubble').hasClass('notification--tray')) {
        $('.red-notification').css('display', 'block')
      }
    }
  }
})

socket.emit('subscribe-notification', senderID)

socket.on('receive-notification', function (user, notification) {
  if ($('.speech-bubble').hasClass('notification--tray')) {
    $('.red-notification').css('display', 'block')
  }
  appendNotification(notification)
})

$(document).ready(function () {
  if ($('.speech-bubble').hasClass('notification--tray')) {
    $('.speech-bubble').css('display', 'none')
  }

  $('#open-notification').on('click', function () {
    if ($('.speech-bubble').hasClass('notification--tray')) {
      setReadNotification(senderID)
      $('.speech-bubble').css('display', 'block')
      $('.speech-bubble').removeClass('notification--tray')
      $('.red-notification').css('display', 'none')
      getAllNotification()
    } else {
      $('.speech-bubble').css('display', 'none')
      $('.speech-bubble').addClass('notification--tray')
      $('.notifications').empty()
    }
  })
})

function appendNotification (notifica) {
  if (senderID == notifica.associatedID) {
    var date = notifica.date.hour + ':' + notifica.date.minutes + ', ' + notifica.date.day + '/' + notifica.date.month + '/' + notifica.date.year
    $('.notifications').prepend(['<div class="notification-div">',
      '<a href="javascript:void(0)"><img id="delete-notification" src="/img/delete-notification-icon.png" alt="delete" onclick="deleteNotification(this)"/></a>',
      '<h5 class="notification-title">' + notifica.text.title + '</h5>',
      '<p class="notification-text">' + notifica.text.text + '</p>',
      '<p class="notification-id" style="display:none;">' + notifica._id + '</p>',
      '<p class="notification-date">' + date + '</p>',
      '</div>'].join('\n'))
  }
}

function getAllNotification () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/getAllNotifications',
    data: { email: senderID },
    success: function (notifications) {
      if (notifications != null) {
        for (var i = 0; notifications[i] != null; i++) {
          appendNotification(notifications[i])
        }
      } else {
        appendNothing()
      }
    }
  })
}

function deleteNotification (el) {
  var element = $(el.parentNode.parentNode)
  var id = $(element).children('.notification-id').text()
  swal({
    title: 'Sei sicuro?',
    text: 'Non potrai più tornare indietro!',
    icon: 'warning',
    buttons: true,
    dangerMode: true
  })
    .then(function (resul) {
      if (resul) {
        element.remove()
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/removeNotification',
          data: { notificationID: id },
          success: function (result) {
            swal(
              'Cancellata!',
              'La notifica è stata cancellata.',
              'success'
            )
          }
        })
      }
    })
}

function appendNothing () {
  $('.notifications').prepend(['<div class="notification-none">',
    '<p> Al momento non sono presenti notifiche da visualizzare</p>',
    '</div>'].join('\n'))
}

function setReadNotification (sender) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/setReceivedNotification',
    data: { sender: sender }
  })
}
