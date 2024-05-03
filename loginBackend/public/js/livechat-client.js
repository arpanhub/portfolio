// Get the necessary elements from the DOM
const messagesContainer = document.querySelector('.messages');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');


// Send message
sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    const sentMessage = createMessageElement('sent', message);
    messagesContainer.appendChild(sentMessage);
    messageInput.value = '';
    scrollToBottom();

    // Send the message to the server
    socket.send(message);
  }
}

function createMessageElement(type, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.textContent = text;
  return messageElement;
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}