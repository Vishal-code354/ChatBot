const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const bodyParser=require('body-parser')
const apiRoutes = require('./routes/api');
const viewRoutes = require('./routes/views');
const login = require('./middleware/login')
const register = require('./middleware/Register')
const googleAuthMiddleware = require('./Passport')
const session = require('express-session')


const app = express();
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
// Enable CORS for all origins
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(session({
  secret: 'your_secret_key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', apiRoutes);
app.use('/', viewRoutes);


app.post('/login',login);
app.post('/register', register);
app.post('/auth/google', googleAuthMiddleware);


app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
