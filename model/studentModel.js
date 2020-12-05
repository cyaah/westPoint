const sql = require('./db');

exports.getStudents = (student) => {
  console.log('Fetching student from DB getStudents')
  return new Promise((resolve, reject) => {
    try {
      query = `SELECT * FROM westPoint.students`
      let select = false;

      if (student.name) {
        if (select) {
          query = query + 'and';
        };
        query = query + ` WHERE CONCAT( first_name,  ' ', last_name ) LIKE '${student.name}'`;
        select = true;
      }

      console.log(query);
      sql.query(`${query} LIMIT 10`, (err, result) => {
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

exports.getStudentsByClass = (student) => {
  console.log('Fetching student from DB getStudentsByClass')
  return new Promise((resolve, reject) => {
    try {
      query = `SELECT * FROM westPoint.students`
      let select = false;

      if (student.class) {
        query = query + ` WHERE class = ${student.class}`
        select = true;
      }

      if (student.section) {
        if (select) {
          query = query + ' and';
        }; {
          query = query + ` section = '${student.section}'`;
          select = true;
        }

      }
      sql.query(`${query} LIMIT 10`, (err, result) => {
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