//contatti e messaggi ajax, da vedere come ordinare manca data, da fare modifica e rimozione messaggio


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
          '<div class="contact-container">',
              '<div class="contact">',
                  '<p class="user-info-name">Filomena Ferrucci</p>',
                  '<p class="user-info-email">f.ferrucci@unisa.it</p>',
              '</div>',
          '</div>',
      '</div>',
      '<div class="messages" id="messages" style="display:none;">',
      '</div>',
      '<div class="choice-user">',
          '<button class="choice-user-button" id="academicButtonChat" >Tutor accademici</button>',
          '<button class="choice-user-button" id="externalButtonChat">Tutor esterni</button>',
      '</div>',
      '<div class="send-form" style="display:none;">',
            '<form class="form-chat" id="form-chat">',
                '<textarea class="input-chat" id="input-chat" type="text" placeholder="Type a message..."></textarea>',
                '<button class="sendButton" type="submit">Send</button>',
            '</form>',
      '</div>',
  '</div>',
'</div>'].join('\n'));

//caricare i contatti con ajax


const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('form-chat')
const messageInput = document.getElementById('input-chat')


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