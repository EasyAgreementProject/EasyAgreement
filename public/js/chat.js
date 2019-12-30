var connectedUser=null;

$.ajax({
  type:'POST',
  url:'http://localhost:8080/getConnectedUser',
  contentType: 'application/json',
  async:false,
  success:function(user){
    connectedUser=user;
  },
  error: function(){
    console.log("error");
  }
});

$('head').append('<link href="css/chat.css" rel="stylesheet"></link>');

$('#open-chat').append('<img class="chat-notification" src="/img/cerchio-notifica.png" style="display:none;">');

$('body').append(['<div class="outerContainer chatbox--tray" style="display: none;">',
  '<div class="container">',
      '<a href="javascript:void(0)">',
          '<div class="infoBar">',
              '<div class="leftInnerContainer">',
                  '<form class="form-chat" id="search-form-chat">',
                      '<input type="text" class="input-chat" id="input-search-chat", placeholder="Search..." onfocus="selectThisForm(true)" onblur="selectThisForm(false)">',
                      '<button class="sendButton" id="search-chat-button" type="submit" id="search-button"><img id="icon-search-chat" src="/img/icon-search-chat.png" alt="search"/></button>',
                  '</form>',
                  '<a href="javascript:void(0)" id="back-chat" style="display:none;""><img id="back-icon-chat" src="/img/icon-back-chat.png" alt="close"/></a>',
                  '<p id="name-of-user" style="display:none;"></p>',
              '</div>',
              '<div class="rightInnerContainer">',
                  '<a href="javascript:void(0)" id="minimize-a"><p id="minimize">-</p></a>',
                  '<a href="javascript:void(0)"><img id="close-chat" src="/img/closeIcon.png" alt="close" /></a>',
              '</div>',
              '<p id="label-chat" style="display:none;">Chat</p>',
          '</div>',
      '</a>',
      '<div class="contacts" id="contacts">',
      '</div>',
      '<div class="messages" id="messages" style="display:none;">',
      '</div>',
      '<div class="choice-user">',
          '<button class="choice-user-button" id="academicButtonChat" >Tutor accademici</button>',
          '<button class="choice-user-button" id="externalButtonChat" >Tutor esterni</button>',
          '<button class="choice-user-button" id="studentButtonChat" >Studenti</button>',
      '</div>',
      '<div class="send-form" style="display:none;">',
            '<form class="form-chat" id="form-chat">',
                '<textarea class="input-chat" id="input-chat" type="text" placeholder="Type a message..."></textarea>',
                '<button class="sendButton" type="submit">Send</button>',
            '</form>',
      '</div>',
  '</div>',
'</div>'].join('\n'));

const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('messages');
const messageForm = document.getElementById('form-chat');
const searchForm = document.getElementById('search-form-chat');
const messageInput = document.getElementById('input-chat');
const searchInput = document.getElementById('input-search-chat');
var receivers=null;
var emailReceiver=null;
var senderID=null;
var element=null;
var id=null;
var allowSubmit=true;
var isSelectedSearch=false;


if(connectedUser.type=="student"){
  senderID=connectedUser.utente.Email;
}
else if(connectedUser.type=="academicTutor"){
  senderID=connectedUser.utente.E_mail;
}
else if( connectedUser.type=="externalTutor"){
  senderID=connectedUser.utente.E_mail;
}

socket.emit('subscribe', senderID);

socket.on('chat-message', function(user, message){
  if($('.outerContainer').hasClass('chatbox--tray')){
    $('.chat-notification').css('display', 'block');
  }
  appendMessage(message);
});

if(messageForm!=null){
  messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(messageForm.classList.contains('modificable')){
      if(messageInput.value.length==0) return;
      changeMessageText(messageInput.value);
      messageForm.classList.remove('modificable');
      messageInput.value = '';
      allowSubmit=true;
    }
    else{
      var d= new Date();
      var data={hour: d.getHours().toString().padStart(2,0), minutes: d.getMinutes().toString().padStart(2,0), seconds: d.getSeconds().toString().padStart(2,0), day: d.getDate().toString().padStart(2,0), month: ((d.getMonth())+1).toString().padStart(2,0), year: d.getFullYear().toString()};
      var messageID= saveMessage({senderID: senderID ,recipientID: emailReceiver ,text: messageInput.value, date: data});
      const message = {_id: messageID, senderID: senderID ,recipientID: emailReceiver ,text: messageInput.value, date: data};
      if(messageInput.value.length==0) return; 
      appendSentMessage(message);
      socket.emit('send-chat-message', message);
      messageInput.value = '';
      allowSubmit=true;
    }
  });
}

searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  if(searchInput.value.length==0)  return;
  $('.contacts').empty();
  $.ajax({
    type:"POST",
    url:"/searchUser",
    data:{type: connectedUser.type, search: searchInput.value},
    success: function(users){
      var i=0;
      if(users.hasOwnProperty('academic')){
        if(!users.academic.length==0){
          while(users.academic[i]!=null){
            appendAcademic(users.academic[i]);
            i++;
          }
        }
      }
      i=0;
      if(users.hasOwnProperty('external')){
        if(!users.external.length==0){
          while(users.external[i]!=null){
            appendExternal(users.external[i]);
            i++
          }
        }
      }
      i=0;
      if(users.hasOwnProperty('student')){
        if(!users.student.length==0){
          while(users.student[i]!=null){
            appendStudent(users.student[i]);
            i++;
          }
        }
      }
    }
  });
  searchInput.value="";
})


function appendMessage(message) {
  if(emailReceiver===message.senderID){
    var div= document.createElement('div');
    div.className="messageContainer justifyStart";
    var div1= document.createElement('div');
    div1.className="messageBox backgroundLight";
    var pI= document.createElement('p');
    pI.className="messageText colorDark";
    var text1= document.createTextNode(message.text);
    var span= document.createElement('p');
    span.className="chat-data ongrey";
    span.innerHTML=message.date.hour+":"+message.date.minutes+", "+message.date.day+"/"+message.date.month+"/"+message.date.year;
    pI.appendChild(text1);
    div1.appendChild(pI);
    div1.appendChild(span);
    div.appendChild(div1);
    messageContainer.appendChild(div);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

function appendSentMessage(message){
  var div= document.createElement('div');
  div.className="messageContainer justifyEnd";
  var div1= document.createElement('div');
  div1.className="messageBox backgroundBlue";
  var pI= document.createElement('p');
  pI.className="messageText colorWhite";
  var idMessage=document.createElement('span');
  idMessage.className="id-message";
  idMessage.style.display="none";
  idMessage.innerHTML=message._id;
  var text1= document.createTextNode(message.text);
  var img= document.createElement('img');
  img.className="chat-menu";
  img.src="../img/icon-menu-chat.png";
  img.alt="info";
  var href= document.createElement('a');
  href.href="javascript:void(0)";
  href.appendChild(img);
  href.setAttribute('onclick', 'showPopup(event, this)');
  var span= document.createElement('p');
  span.className="chat-data";
  span.innerHTML=message.date.hour+":"+message.date.minutes+", "+message.date.day+"/"+message.date.month+"/"+message.date.year;
  pI.appendChild(text1);
  div1.appendChild(pI);
  div1.appendChild(span);
  div1.appendChild(idMessage);
  div.appendChild(div1);
  div.appendChild(href);
  messageContainer.appendChild(div);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}


  $(document).ready(function() {
      var $chatbox = $('.outerContainer'),
          $chatOpen = $('#open-chat'),
          $chatboxTitleClose = $('#close-chat');
          $textarea=$('.input-chat');
          $sendButton= $('.sendButton');
          $infoMessage= $('.chat-menu');
          $chatboxTitleMinimize = $('#minimize-a');
          $chatboxBack= $('#back-chat');

      if($chatbox.hasClass("chatbox--tray")){
        $('.leftInnerContainer').css('display', 'none');
        $('.rightInnerContainer').css('display', 'none');
      }

      $chatboxTitleMinimize.on('click', function(e){
        $chatbox.addClass("chatbox--tray");
        $('.infoBar').css('border-radius', '0 0 0 0');
        $chatbox.css('border-radius', '0 0 0 0');
        $('#label-chat').css('display', ' block');
        $('.leftInnerContainer').css('display', 'none');
        $('.rightInnerContainer').css('display', 'none');
        e.stopImmediatePropagation();
      });


      $('.infoBar').on('click', function(){
        if($chatbox.hasClass("chatbox--tray")){
          $chatbox.removeClass("chatbox--tray");
          $('.infoBar').css('border-radius', '20px 20px 0 0');
          $chatbox.css('border-radius', '20px 20px 0 0');
          $('.chat-notification').css('display', 'none');
          $('#label-chat').css('display', ' none');
          $('.leftInnerContainer').css('display', 'flex');
          $('.rightInnerContainer').css('display', 'flex');
        }
      });

      $chatboxTitleClose.on('click', function(e) {
          e.stopPropagation();
          $chatbox.addClass("chatbox--tray");
          $chatbox.css('display', 'none')
      });

      $chatboxBack.on('click', function(e){
        e.stopPropagation();
        $('#search-form-chat').css('display', 'flex');
        $('.contacts').css('display', 'block');
        $('.choice-user').css('display', 'flex');
        $('#name-of-user').css('display', 'none');
        $('.messages').css('display', 'none');
        $('.send-form').css('display', 'none');
        $('#back-chat').css('display', 'none');
        $('.messages').empty();
        emailReceiver=null;
      });

      $chatOpen.on('click', function(){
        $chatbox.css('display', 'flex');
        if($chatbox.hasClass("chatbox--tray")){
          $chatbox.removeClass("chatbox--tray");
          $('.infoBar').css('border-radius', '20px 20px 0 0');
          $chatbox.css('border-radius', '20px 20px 0 0');
          $('.chat-notification').css('display', 'none');
          $('#label-chat').css('display', ' none');
          $('.leftInnerContainer').css('display', 'flex');
          $('.rightInnerContainer').css('display', 'flex');
        }
      });

      $textarea.keydown(function(e){
        if (e.keyCode == 13 && !e.shiftKey)
        {
          if(allowSubmit){
            if(!messageInput.value.length==0){
              if(!isSelectedSearch){
                e.preventDefault();
                allowSubmit=false;
                $sendButton.click();
              }
            }
          }
        }
      });

      $('body').on('click', function(){
        if($('.popup-chat-menu').hasClass("Removable")){
          $('.popup-chat-menu').remove();
          element=null;
        }  
      });

      $('body').on('click', function(){
        $('.popup-chat-menu').addClass("Removable");
      });

      

      $('#form-chat').submit(function(){
        return false;
      });

      $('#search-form-chat').submit(function(){
        return false;
      });

      if(connectedUser.type=="student"){
        $('#studentButtonChat').css('display', 'none');
        $('#academicButtonChat').css('border-radius', '24px 0 0 24px');
        $('#externalButtonChat').css('border-radius', '0 24px 24px 0');
        getReceivers('academicTutor');
      }
      else if(connectedUser.type=="academicTutor"){
        $('#academicButtonChat').css('display', 'none');
        $('#externalButtonChat').css('border-radius', '24px 0 0 24px');
        $('#studentButtonChat').css('border-radius', '0 24px 24px 0');
        getReceivers('externalTutor');
      }
      else if(connectedUser.type=="externalTutor"){
        $('#externalButtonChat').css('display', 'none');
        $('#academicButtonChat').css('border-radius', '24px 0 0 24px');
        $('#studentButtonChat').css('border-radius', '0 24px 24px 0');
        getReceivers('accademicTutor');
      }

      $('#studentButtonChat').on('click', function(){
        $('.contacts').empty();
        getReceivers('student');
      });

      $('#academicButtonChat').on('click', function(){
        $('.contacts').empty();
        getReceivers('academicTutor');
      });

      $('#externalButtonChat').on('click', function(){
        $('.contacts').empty();
        getReceivers('externalTutor');
      });

  });



  function showPopup(e, el){
    element=el;
    $('.popup-chat-menu').remove();
        $('body').append(['<div tabindex="-1" class="popup-chat-menu" style="transform-origin: top right; top:'+(e.pageY)+'px; right:'+(-(e.pageX -$(window).width()))+'px; transform: scale(1); opacity:1;">',
                            '<ul class="ul-chat-menu">',
                              '<li tabindex="-1" class="update-message" data-animate-dropdown-item="true">',
                                '<div class="button-menu" role="button" title="Modifica messaggio" onclick="updateMessage()">Modifica messaggio</div>',
                              '</li>',
                              '<li tabindex="-1" class="remove-message" data-animate-dropdown-item="true">', 
                                '<div class="button-menu" role="button" title="Elimina messaggio" onclick="removeMessage()">Elimina messaggio</div>',
                              '</li>',
                            '</ul>',
                          '</div>'].join('\n'));
  }

  function appendStudent(student){
    $('.contacts').append(['<div class="contact-container">',
    '<div class="contact" onclick="accessChat(this)">',
        '<p class="user-info-name">'+student.Name+'</p>',
        '<p class="user-info-email">'+student.Email+'</p>',
    '</div>',
'</div>',].join('\n'));
  }

  function appendAcademic(academic){
    $('.contacts').append(['<div class="contact-container">',
    '<div class="contact" onclick="accessChat(this)">',
        '<p class="user-info-name">'+academic.Name+'</p>',
        '<p class="user-info-email">'+academic.E_mail+'</p>',
    '</div>',
'</div>',].join('\n'));
  }

  function appendExternal(external){
    $('.contacts').append(['<div class="contact-container">',
    '<div class="contact" onclick="accessChat(this)">',
        '<p class="user-info-name">'+external.Name+'</p>',
        '<p class="user-info-email">'+external.E_mail+'</p>',
    '</div>',
'</div>',].join('\n'));
  }

  function getReceivers(typeOfUser){
    $.ajax({
      type:"POST",
      url:"/getContacts",
      data:{type: typeOfUser},
      success:function(users){
        var i=0;
        if(typeOfUser=="student"){
          while(users[i]!=null){
            appendStudent(users[i]);
            i++;
          }
        }
        else if(typeOfUser=="academicTutor"){
          while(users[i]!=null){
            appendAcademic(users[i]);
            i++;
          }
        }
        else if(typeOfUser=="externalTutor"){
          while(users[i]!=null){
            appendExternal(users[i]);
            i++;
          }
        }
      },
      error: function(){
        console.log("error");
      }
    });
  }

  function accessChat(item){
    var name=$(item).children('.user-info-name').text();
    emailReceiver=$(item).children('.user-info-email').text();
    $('#search-form-chat').css('display', 'none');
    $('.contacts').css('display', 'none');
    $('.choice-user').css('display', 'none');
    $('#name-of-user').css('display', 'block');
    $('.messages').css('display', 'block');
    $('.send-form').css('display', 'block');
    $('#back-chat').css('display', 'block');
    $('#name-of-user').text(name);
    getMessages(emailReceiver);
  }
  
  function getMessages(emailReceiver)  {
    $.ajax({
      type: "POST",
      url:"/getMessages",
      data:{sender: senderID, recipient: emailReceiver},
      success: function(messages){
        var i=0;
        var arrayOfMessages=[];

        if(messages.sender.length==0){
          if(messages.recipient.length==0)  return null;
          else{
            for(i=0; messages.recipient[i]!=null; i++)  appendMessage(messages.recipient[i]);
            return;
          }
        }

        if(messages.recipient.length==0){
          if(messages.sender.length==0) return null;
          else{
            for(i=0; messages.sender[i]!=null;i++)  appendSentMessage(messages.sender[i]);
            return;
          }
        }

        for(i=0; messages.sender[i]!=null; i++){
          messages.sender[i].compareData= new Date(messages.sender[i].date.year, messages.sender[i].date.month-1, messages.sender[i].date.day, messages.sender[i].date.hour, messages.sender[i].date.minutes, messages.sender[i].date.seconds);
          arrayOfMessages.push(messages.sender[i]);
        }

        for(i=0; messages.recipient[i]!=null; i++){
          messages.recipient[i].compareData= new Date(messages.recipient[i].date.year, messages.recipient[i].date.month-1, messages.recipient[i].date.day, messages.recipient[i].date.hour, messages.recipient[i].date.minutes, messages.recipient[i].date.seconds);
          arrayOfMessages.push(messages.recipient[i]);
        }

        arrayOfMessages.sort(function(a,b){
          if(a.compareData<b.compareData) return -1;
          if(a.compareData>b.compareData) return 1;
          return 0;
        });

        for(i=0; arrayOfMessages[i]!=null; i++){
          delete arrayOfMessages[i].compareData;
          if(emailReceiver==arrayOfMessages[i].recipientID)  appendSentMessage(arrayOfMessages[i]);
          else if(emailReceiver==arrayOfMessages[i].senderID) appendMessage(arrayOfMessages[i]);
        }
      }
    });
  }

  function saveMessage(message){
    var id=null;
    $.ajax({
      type:"POST",
      url:"/saveMessage",
      data:{message: message},
      async:false,
      success: function(result){
        id=result;
      }
    });
    return id;
  }

  function removeMessage(){
    var id=$(element.parentNode).children('.messageBox').children('.id-message').text();
    var parentNode=$(element.parentNode);
    swal({
      title: 'Sei sicuro?',
      text: "Non potrai più tornare indietro!",
      icon: 'warning',
      showCancelButton: true,
      buttons: true,
      dangerMode: true
    })
    .then(function(resul){
      if(resul){
        parentNode.remove();
        $.ajax({
          type:"POST",
          url:"/removeMessage",
          data:{messageID: id},
          success: function(result){
            swal(
              'Cancellato!',
              'Il tuo messaggio è stato cancellato.',
              'success'
            );
          }
        });
      }
    });
  }

  function updateMessage(){
    id=$(element.parentNode).children('.messageBox').children('.id-message').text();
    $('.form-chat').addClass("modificable");
    messageInput.value=$(element.parentNode).children('.messageBox').children('.messageText').text();
  }

  function changeMessageText(text){
    $('.messages').empty();
    $.ajax({
      type:"POST",
      url:"/updateMessage",
      data:{messageID:id, text: text},
      async: false,
      success: function(result){
      }
    });
    getMessages(emailReceiver);
  }

  function selectThisForm(boolean){
    isSelectedSearch=boolean;
  }