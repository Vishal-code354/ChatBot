
const bcrypt = require('bcryptjs');
const sql = require('msnodesqlv8');
const config = 'server=DESKTOP-91R68JV\\SQLEXPRESS;Database=ChatBot_DB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}';

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    sql.open(config, (err, conn) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({ message: 'Error connecting to database' });
      }

      const query = 'SELECT * FROM Users WHERE Email = ?';
      conn.query(query, [email], async (err, result) => {
        if (err) {
          console.error('Error querying database:', err);
          return res.status(500).json({ message: 'Error querying database' });
        }

        // Log the result object to inspect its structure
        console.log('Query result:', result);

        // Check for different possible structures
        let user;
        if (Array.isArray(result)) {
          if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
          user = result[0];
        } else if (result.recordset) {
          if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
          user = result.recordset[0];
        } else {
          console.error('Unexpected result structure:', result);
          return res.status(500).json({ message: 'Unexpected result structure' });
        }

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.Password);

        if (!match) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Set user session
        req.session.user = { id: user.User_ID, email: user.Email, fullname: user.Full_Name };
        console.log(`User logged in: ${user.Full_Name}`);
        res.status(200).json({ message: 'Login successful' });

        // Close the database connection
        conn.close();
      });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
};
