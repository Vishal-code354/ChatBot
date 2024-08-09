document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const chatContainer = document.getElementById('chatContainer');
    const homeSection = document.getElementById('home-section');
    const chatBox = document.getElementById('chat-box');

    // Function to type out text gradually
    function typeEffect(element, text, speed) {
        let index = 0;
        element.textContent = '';
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Function to create a chat message
    function createChatMessage(text, isUser) {
        const messageClass = isUser ? 'message-text-user' : 'message-text-bot';
        const messageContainer = document.createElement('div');
        const messageType = isUser ? 'user' : 'bot';

        messageContainer.classList.add('chat-message', messageType);

        const messageText = document.createElement('div');
        messageText.classList.add(messageClass);
        messageText.textContent = text;

        messageContainer.appendChild(messageText);
        return messageContainer;
    }

    // Function to send a message and handle the response using XMLHttpRequest
    function sendQuery() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return; // Prevent sending empty messages

        // Create user message element
        const userMessage = createChatMessage(messageText, true);
        chatContainer.appendChild(userMessage);

        // Clear input after sending message
        messageInput.value = '';

        // Create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/sendMessage', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // Define what happens on successful data submission
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Response Data:', data);

                    // Create bot message container and append to chat
                    const botMessageContainer = createChatMessage('', false);
                    chatContainer.appendChild(botMessageContainer);

                    // Apply typing effect
                    const botMessageText = botMessageContainer.querySelector('.message-text-bot');
                    typeEffect(botMessageText, data.reply, 25); // Adjust typing speed here

                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                    const errorMessage = createChatMessage('Sorry, there was an error with the response.', false);
                    chatContainer.appendChild(errorMessage);
                }
            } else {
                console.error('Request failed with status:', xhr.status);
                const errorMessage = createChatMessage('Sorry, there was an error sending your message.', false);
                chatContainer.appendChild(errorMessage);
            }

            // Scroll chat container to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        };

        // Define what happens in case of an error
        xhr.onerror = function () {
            console.error('There was a problem with the request.');
            const errorMessage = createChatMessage('Sorry, there was an error sending your message.', false);
            chatContainer.appendChild(errorMessage);

            // Scroll chat container to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        };

        // Send the request with the message data
        xhr.send(JSON.stringify({ message: messageText }));
    }

    // Event listener for clicking the send button
    sendButton.addEventListener('click', function () {
        sendQuery();
        toggleSections();
    });

    // Event listener for pressing Enter key in the message input
    messageInput.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) { // 13 is the Enter key code
            event.preventDefault(); // Prevent default behavior (e.g., newline in textarea)
            sendQuery();
            toggleSections();
        }
    });

    // Function to toggle between home section and chat box
    function toggleSections() {
        homeSection.style.setProperty('display', 'none', 'important');
        chatBox.style.setProperty('display', 'block', 'important');
    }


});


