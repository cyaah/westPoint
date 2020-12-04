const sql = require('./db');

exports.getStudents = (student) => {
  console.log('Fetching student from DB')
  return new Promise((resolve, reject) => {
    try {
      sql.query(`SELECT * FROM westPoint.students LIMIT 10`, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result);
      });

    } catch (e) {
      console.log('Error in db query get Students')
      throw e
    }
  });
};