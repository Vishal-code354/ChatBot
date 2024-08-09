document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const chatContainer = document.getElementById('chatContainer');
    const homeSection = document.getElementById('home-section');
    const chatBox = document.getElementById('chat-box');

    // Function to create a chat message
    function createChatMessage(text, isUser) {
        const messageClass = isUser ? 'message-text-user' : 'message-text-bot';
        const messageContainer = document.createElement('div');
        const messageType= isUser ?  'user' : 'bot';


        messageContainer.classList.add('chat-message',messageType);
    
        const messageText = document.createElement('div');
        messageText.classList.add(messageClass);
        messageText.textContent = text;
    
        messageContainer.appendChild(messageText);
        return messageContainer;
    }
    

    // Function to generate a random bot response
    function generateBotResponse() {
        const responses = [
            "Sure thing! Let's get started.",
            "That's a great idea!",
            "I'm glad you asked that.",
            "Here's what I found for you."
        ];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const botMessage = responses[randomIndex];
        return createChatMessage(botMessage, false);
    }

    // Event listener for clicking the send button
    sendButton.addEventListener('click', function () {
        sendMessage();
        toggleSections();
    });

    // Event listener for pressing Enter key in the message input
    messageInput.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) { // 13 is the Enter key code
            event.preventDefault(); // Prevent default behavior (e.g., newline in textarea)
            sendMessage();
            toggleSections();
        }
    });

    // Function to send a message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return; // Prevent sending empty messages

        // Create user message element
        const userMessage = createChatMessage(messageText, true);
        chatContainer.appendChild(userMessage);

        // Clear input after sending message
        messageInput.value = '';

        // Simulate bot response after a short delay
        setTimeout(function () {
            const botResponse = generateBotResponse();
            chatContainer.appendChild(botResponse);

            // Scroll chat container to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 500); // Adjust delay as needed
    }

    // Function to toggle between home section and chat box
    function toggleSections() {
        homeSection.style.setProperty('display', 'none', 'important');
        chatBox.style.setProperty('display', 'block', 'important');
    }
});
