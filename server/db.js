const mysql = require('mysql');

//configuration
let connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306
 });


const db=async()=>{
 connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
     
      console.log('Connected');
    }
  });

 let query='USE TEST'
  connection.query(query)
 
}

module.exports = {db,connection}