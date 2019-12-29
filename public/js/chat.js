//contatti e messaggi ajax, da vedere come ordinare manca data, da fare modifica e rimozione messaggio
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


$('body').append(['<div class="outerContainer chatbox--tray" style="display: none;">',
  '<div class="container">',
      '<a href="javascript:void(0)">',
          '<div class="infoBar">',
              '<div class="leftInnerContainer">',
                  '<form class="form-chat" id="search-form-chat">',
                      '<input type="text" class="input-chat" id="input-search-chat", placeholder="Search...">',
                      '<button class="sendButton" id="search-chat-button" type="submit" id="search-button"><img id="icon-search-chat" src="/img/icon-search-chat.png" alt="search"/></button>',
                  '</form>',
                  '<a href="javascript:void(0)" id="back-chat" style="display:none;""><img id="back-icon-chat" src="/img/icon-back-chat.png" alt="close"/></a>',
                  '<p id="name-of-user" style="display:none;"></p>',
              '</div>',
              '<div class="rightInnerContainer">',
                  '<a href="javascript:void(0)" id="minimize-a"><p id="minimize">-</p></a>',
                  '<a href="javascript:void(0)"><img id="close-chat" src="/img/closeIcon.png" alt="close" /></a>',
              '</div>',
      '</a>',
      '</div>',
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

//caricare i contatti con ajax a seconda dell'utente
/*$.ajax({
  type:"POST",
  url:"/getContacts",
  data: {user:el},
  async:false,
  success:function(bool){
    if(bool=="si")	b=true;
  }
});*/

//console.log("JSON.stringify(session.utente.type)");

const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('form-chat')
const messageInput = document.getElementById('input-chat')
var receivers=null;

socket.on('chat-message', data => {
  appendMessage(`${data.message}`)
})

if(messageForm!=null){
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    if(message.length==0) return; 
    appendSentMessage(message);
    socket.emit('send-chat-message', message)
    messageInput.value = ''
  })
}

function appendMessage(message) {
  var div= document.createElement('div');
  div.className="messageContainer justifyStart";
  var div1= document.createElement('div');
  div1.className="messageBox backgroundLight";
  var pI= document.createElement('p');
  pI.className="messageText colorDark";
  var text1= document.createTextNode(message);
  pI.appendChild(text1);
  div1.appendChild(pI);
  div.appendChild(div1);
  messageContainer.appendChild(div);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function appendSentMessage(message){
  var div= document.createElement('div');
  div.className="messageContainer justifyEnd";
  var div1= document.createElement('div');
  div1.className="messageBox backgroundBlue";
  var pI= document.createElement('p');
  pI.className="messageText colorWhite";
  var text1= document.createTextNode(message);
  var img= document.createElement('img');
  img.className="chat-menu";
  img.src="../img/icon-menu-chat.png";
  img.alt="info";
  var href= document.createElement('a');
  href.href="javascript:void(0)";
  href.appendChild(img);
  href.setAttribute('onclick', 'showPopup(event)');
  pI.appendChild(text1);
  div1.appendChild(pI);
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
        $('.leftInnerContainer').css('display', 'none');
        $('.rightInnerContainer').css('display', 'none');
        e.stopImmediatePropagation();
      });


      $('.infoBar').on('click', function(){
        if($chatbox.hasClass("chatbox--tray")){
          $chatbox.removeClass("chatbox--tray");
          $('.leftInnerContainer').css('display', 'flex');
          $('.rightInnerContainer').css('display', 'flex');
        }
      });

      $chatboxTitleClose.on('click', function(e) {
          e.stopPropagation();
          $chatbox.css('display', 'none')
      });

      $chatboxBack.on('click', function(e){
        e.stopPropagation();
        $('#search-form-chat').css('display', 'flex');
        $('.contacts').css('display', 'flex');
        $('.choice-user').css('display', 'flex');
        $('#name-of-user').css('display', 'none');
        $('.messages').css('display', 'none');
        $('.send-form').css('display', 'none');
        $('#back-chat').css('display', 'none');
      });

      $chatOpen.on('click', function(){
        $chatbox.css('display', 'flex');
      });

      $textarea.keydown(function(e){
        if (e.keyCode == 13 && !e.shiftKey)
        {
            e.preventDefault();
            $sendButton.click();
        }
      });

      $('#input-search-chat').keydown(function(e){
        if (e.keyCode == 13 && !e.shiftKey)
        {
            e.preventDefault();
            $('#searh-chat-button').click();
        }
      });

      $('body').on('click', function(){
        if($('.popup-chat-menu').hasClass("Removable"))  $('.popup-chat-menu').remove();
      });

      $('body').on('click', function(){
        $('.popup-chat-menu').addClass("Removable");
      });

      $('.contact').on('click', function(){
        var name=$('.user-info-name').text();
        var email=$('.user-info-email').text();
        $('#search-form-chat').css('display', 'none');
        $('.contacts').css('display', 'none');
        $('.choice-user').css('display', 'none');
        $('#name-of-user').css('display', 'block');
        $('.messages').css('display', 'block');
        $('.send-form').css('display', 'block');
        $('#back-chat').css('display', 'block');
        $('#name-of-user').append(name);
        //caricare messaggi con email e appenderli tramite le funzioni append
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
        getReceivers('academic');
      }
      else if(connectedUser.type=="academic"){
        $('#academicButtonChat').css('display', 'none');
        $('#externalButtonChat').css('border-radius', '24px 0 0 24px');
        $('#studentButtonChat').css('border-radius', '0 24px 24px 0');
        getReceivers('external');
      }
      else if(connectedUser.type=="external"){
        $('#externalButtonChat').css('display', 'none');
        $('#academicButtonChat').css('border-radius', '24px 0 0 24px');
        $('#studentButtonChat').css('border-radius', '0 24px 24px 0');
        getReceivers('academic');
      }

      $('#studentButtonChat').on('click', function(){
        getReceivers('student');
      });

      $('#academicButtonChat').on('click', function(){
        getReceivers('academic');
      });

      $('#externalButtonChat').on('click', function(){
        getReceivers('external');
      });
      
  });



  function showPopup(e){
    $('.popup-chat-menu').remove();
        $('body').append(['<div tabindex="-1" class="popup-chat-menu" style="transform-origin: top right; top:'+(e.pageY)+'px; right:'+(-(e.pageX -$(window).width()))+'px; transform: scale(1); opacity:1;">',
                            '<ul class="ul-chat-menu">',
                              '<li tabindex="-1" class="update-message" data-animate-dropdown-item="true">',
                                '<div class="button-menu" role="button" title="Modifica messaggio">Modifica messaggio</div>',
                              '</li>',
                              '<li tabindex="-1" class="remove-message" data-animate-dropdown-item="true">', 
                                '<div class="button-menu" role="button" title="Elimina messaggio">Elimina messaggio</div>',
                              '</li>',
                            '</ul>',
                          '</div>'].join('\n'));
  }

  function appendStudent(student){
    $('.contacts').append(['<div class="contact-container">',
    '<div class="contact">',
        '<p class="user-info-name">'+student.Name+'</p>',
        '<p class="user-info-email">'+student.Email+'</p>',
    '</div>',
'</div>',].join('\n'));
  }

  function appendAcademic(academic){
    console.log(academic);
    $('.contacts').append(['<div class="contact-container">',
    '<div class="contact">',
        '<p class="user-info-name">'+academic.Name+'</p>',
        '<p class="user-info-email">'+academic.E_mail+'</p>',
    '</div>',
'</div>',].join('\n'));
  }

  function appendExternal(external){
    $('.contacts').append(['<div class="contact-container">',
    '<div class="contact">',
        '<p class="user-info-name">'+external.name+'</p>',
        '<p class="user-info-email">'+external.email+'</p>',
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
        else if(typeOfUser=="academic"){
          console.log(users);
          while(users[i]!=null){
            console.log("we");
            appendAcademic(users[i]);
            i++;
          }
        }
        else if(typeOfUser=="external"){
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