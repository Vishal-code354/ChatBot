const express = require('express');
const path = require('path');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

// Route to serve index.html (login page)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html')); // Adjust path
});

// Route to serve register.html
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/register.html')); // Adjust path
});

// Route to serve home.html
router.get('/home', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/home.html')); // Adjust path
});

// Route to serve voice.html
router.get('/voice', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/voice.html')); // Adjust path
});

// Route to serve voice-action.html
router.get('/voice-action', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/voice-action.html')); // Adjust path
});

module.exports = router;
