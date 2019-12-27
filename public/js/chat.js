$('body').append(['<div class="outerContainer chatbox--tray" style="display: none;">',
  '<div class="container">',
      '<a href="javascript:void(0)">',
          '<div class="infoBar">',
              '<div class="leftInnerContainer">',
                  '<p id="name-of-user"></p>>',
              '</div>',
              '<div class="rightInnerContainer">',
                  '<a href="javascript:void(0)"><img id="close-chat" src="/img/closeIcon.png" alt="close" /></a>',
              '</div>',
      '</a>',
      '</div>',
      '<div class="messages" id="messages">',
      '</div>',
      '<div class="send-form">',
          '<form class="form-chat" id="form-chat">',
              '<textarea class="input-chat" id="input-chat" type="text" placeholder="Type a message..."></textarea>',
              '<button class="sendButton" type="submit">Send</button>',
          '</form>',
      '</div>',
  '</div>',
'</div>'].join('\n'));


const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('form-chat')
const messageInput = document.getElementById('input-chat')


socket.on('chat-message', data => {
  appendMessage(`${data.message}`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  if(message.length==0) return; 
  appendSentMessage(message);
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

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
  pI.appendChild(text1);
  div1.appendChild(pI);
  div.appendChild(div1);
  messageContainer.appendChild(div);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

(function($) {
  $(document).ready(function() {
      var $chatbox = $('.outerContainer'),
          $chatboxTitle = $('.infoBar'),
          $chatOpen = $('#open-chat'),
          $chatboxTitleClose = $('#close-chat');
          $textarea=$('.input-chat');
          $sendButton= $('.sendButton');

      $chatboxTitle.on('click', function() {
          $chatbox.toggleClass('chatbox--tray');
      });
      $chatboxTitleClose.on('click', function(e) {
          e.stopPropagation();
          $chatbox.css('display', 'none')
      });
      $chatOpen.on('click', function(){
        $chatbox.css('display', 'flex');
      })
      $textarea.keydown(function(e){
        if (e.keyCode == 13 && !e.shiftKey)
        {
            e.preventDefault();
            $sendButton.click();
        }
      });
      
  });
})(jQuery);