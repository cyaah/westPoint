const sql = require('./db');


exports.getTeachers = (teacher) => {
  console.log('Fetching teacher from DB getTeachers')
  return new Promise((resolve, reject) => {
    try {
      query = `SELECT * FROM westPoint.teachers`
      let select = false;

      if (teacher.name) {
        if (select) {
          query = query + 'and';
        };
        query = query + ` WHERE CONCAT( first_name,  ' ', last_name ) LIKE '${teacher.name}'`;
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
      console.log('Error in db query get Teachers')
      throw e
    }
  });
};