
// src/middleware/groqMiddleware.js
const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

// Initialize Groq SDK with API key
const groq = new Groq({ apiKey: "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" });

// Function to call Groq API
async function sendMessageToGroq(message) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'llama3-8b-8192', // Make sure to use the correct model name
    });

    return chatCompletion.choices[0].message;
}

// Middleware to handle POST requests to /sendMessage
router.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage);

    try {
        let reply;
        if (userMessage.toLowerCase().includes('name')) {
            reply = 'Hii, I am Rashmika, Your chatbot assistant. You can ask me anything. How can I help you?';
        } else {
            const chatCompletion = await sendMessageToGroq(`${userMessage} in 50 words and dont include '50 words' in response`);
            reply = chatCompletion.content; // Adjust based on Groq's response structure
        }

        // Send response back to client
        res.json({ reply: reply });
    } catch (error) {
        console.error('Error making request to Groq API:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;
