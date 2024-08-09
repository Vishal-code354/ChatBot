// const bcrypt = require('bcryptjs');
// const sql = require('msnodesqlv8');
// const config = require('../dbConfig'); // Adjust path as necessary

// module.exports = async (req, res, next) => {
//   const { fullname, address, email, username, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
// console.log(req.body)
//     sql.open(config, (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error connecting to database');
//       }

//       const request = new sql.Request();
//       const queryCheck = `SELECT * FROM Users WHERE username = '${username}' OR email = '${email}'`;
//       const queryInsert = `INSERT INTO Users (fullname, address, email, username, password) VALUES ('${fullname}', '${address}', '${email}', '${username}', '${hashedPassword}')`;

//       request.query(queryCheck, (err, result) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send('Error querying database');
//         }

//         if (result.recordset.length > 0) {
//           return res.status(400).send('User with the same username or email already exists');
//         } else {
//           request.query(queryInsert, (err, result) => {
//             if (err) {
//               console.error(err);
//               return res.status(500).send('Error inserting user');
//             }

//             req.session.user = { id: result.recordset.insertId, username: username, fullname: fullname };
//             console.log(`User registered: ${fullname}`);
//             res.status(200).send('Registration successful');
//           });
//         }
//       });
//     });
//   } catch (err) {
//     res.status(500).send('Error registering user');
//   }
// };


const bcrypt = require('bcryptjs');
const sql = require('msnodesqlv8');


const config =  'server=DESKTOP-91R68JV\\SQLEXPRESS;Database=ChatBot_DB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}';
module.exports = async (req, res) => {
  const { fullname, address, email, password } = req.body;
console.log(req.body)

  try {
    sql.open(config, async (err, conn) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).send('Error connecting to database');
      }

      try {
        // Check if email already exists
        const queryCheck = `SELECT * FROM Users WHERE Email = ?`;
        const resultCheck = await new Promise((resolve, reject) => {
          conn.query(queryCheck, [email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });

        // Log the full result object to inspect its structure
        console.log('Full query result (check):', resultCheck);

        // Check if resultCheck is an array and its length
        if (Array.isArray(resultCheck) && resultCheck.length > 0) {
          return res.status(400).send('User with this email already exists');
        }

        // Proceed with inserting the new user if email is not taken
        const hashedPassword = await bcrypt.hash(password, 10);
        const queryInsert = `INSERT INTO Users (Full_Name, Addres, Email, Password) VALUES (?, ?, ?, ?)`;
        await new Promise((resolve, reject) => {
          conn.query(queryInsert, [fullname, address, email, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });

        req.session.user = { email, fullname }; // Adjust according to your user model
        console.log(`User registered: ${fullname}`);
        res.status(200).send('Registration successful');
      } catch (queryErr) {
        console.error('Error executing query:', queryErr);
        res.status(500).send('Error executing database query');
      } finally {
        conn.close();
      }
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error registering user');
  }
};
