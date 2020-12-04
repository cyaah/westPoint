var mysql = require('mysql');
var dbconn = mysql.createConnection({
  host: 'westpoint_db_1',
  user: 'root',
  password: 'root',
  database: 'westPoint',
  port: '3306'
});

dbconn.connect((err) => {
  if (err) {
    console.log('Not Connected!')
    console.log(err);
    throw err;
  }
  console.log('connected to db')
});


module.exports = dbconn;