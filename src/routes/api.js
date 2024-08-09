const express = require('express');
const router = express.Router();
const sendMessageToGroq  = require('../middleware/groq')


// Route for sending a message to Groq
router.post('/sendMessage', sendMessageToGroq);
module.exports= router;