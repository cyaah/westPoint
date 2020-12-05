const sql = require('./db');

exports.getStudents = (student) => {
  console.log('Fetching student from DB')
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
      if (student.class) {
        if (select) {
          query = query + 'and';
        };
        query = query + ` WHERE class LIKE ${student.class}`
        select = true;
      }

      if (student.section) {
        if (select) {
          query = query + 'and';
        }; {
          query = query + ` WHERE class LIKE ${student.section}`;
          select = true;
        }

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