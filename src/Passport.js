const { OAuth2Client } = require('google-auth-library');
const sql = require('msnodesqlv8');
const bcrypt = require('bcryptjs');
const config = 'server=DESKTOP-91R68JV\\SQLEXPRESS;Database=ChatBot_DB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}';

const client = new OAuth2Client('575973842998-aqsff73ljev19r7l32eesashqudetv8t.apps.googleusercontent.com');

const googleAuthMiddleware = async (req, res) => {
  const { idToken, address, password } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: '575973842998-aqsff73ljev19r7l32eesashqudetv8t.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    sql.open(config, async (err, conn) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).send('Error connecting to database');
      }

      try {
        // Check if the user already exists
        const checkQuery = 'SELECT * FROM Users WHERE Email = ?';
        const checkResult = await new Promise((resolve, reject) => {
          conn.query(checkQuery, [email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });

        if (checkResult.recordset.length > 0) {
          // User exists, proceed with login
          const user = checkResult.recordset[0];

          // Compare password if it's provided
          if (password && user.Password) {
            const match = await bcrypt.compare(password, user.Password);
            if (!match) {
              return res.status(401).send('Invalid email or password');
            }
          }

          req.session.user = { fullname: user.Full_Name, email: user.Email };
          console.log(`User logged in: ${user.Full_Name}`);
          return res.status(200).send('Login successful');
        } else {
          // Register the new user and log them in
          const hashedPassword = await bcrypt.hash(password, 10);
          const insertQuery = 'INSERT INTO Users (Full_Name, Email, Address, Password) VALUES (?, ?, ?, ?)';

          await new Promise((resolve, reject) => {
            conn.query(insertQuery, [name, email, address, hashedPassword], (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          });

          req.session.user = { fullname: name, email: email };
          console.log(`User registered and logged in: ${name}`);
          return res.status(200).send('Registration and login successful');
        }
      } catch (queryErr) {
        console.error('Error querying database:', queryErr);
        res.status(500).send('Error querying database');
      } finally {
        conn.close();
      }
    });
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).send('Google authentication failed');
  }
};

module.exports = googleAuthMiddleware;
