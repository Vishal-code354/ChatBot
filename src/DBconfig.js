// // const sql = require('msnodesqlv8');

// // var config={
// //   server :"DESKTOP-91R68JV\\SQLEXPRESS",
// //   database: "ChatBot_DB",
// //   driver: "msnodesqlv8",
// //   options :{
// //     trustedConnection: true,
// //   }
// // }
// // // module.exports=config;
// // sql.connect(config,function(err){
// //   if(err){
// //     console.log(err)
// //   }
// //   var requset= new sql.Request();
// //   requset.query("select * from Users",function(err,record){
// //     if(err){ console.log(err);}
// //     else{
// //         console.log(record);
// //     }
// //   })
// // const sql = require('msnodesqlv8');
// const connectionString = 'server=DESKTOP-91R68JV\\SQLEXPRESS;Database=ChatBot_DB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}';

// sql.open(connectionString, function(err, conn) {
//     if (err) {
//         console.error('Error connecting to database:', err);
//       } else {
//       console.log(conn)
//         console.log('Connected to database successfully.');
//         conn.query("SELECT * FROM Users", function(err, recordset) {
//             if (err) {
//                 console.error('Error querying database:', err);
//             } else {
//                 console.log('Query result:', recordset);
//             }
//         });
//     }
// });
