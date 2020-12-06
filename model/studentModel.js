const sql = require('./db');


//GET Student
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


//GET Student by class
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


//POST Student
exports.postStudents = (student) => {
  console.log('Inserting Student from DB getStudents')
  return new Promise((resolve, reject) => {
    try {
      query = `INSERT INTO westPoint.students (first_name, last_name, class, birth_date, section, sex, address) VALUES 
      ('${student.first_name}','${student.last_name}','${student.class}','${student.birth_date}','${student.section}','${student.sex}','${student.address}')`
      let select = false;
      sql.query(`${query}`, (err, result) => {

        if (err) {
          if (err.code) {
            return reject({
              error: err.sqlMessage
            })
          } else {
            return reject(err)
          }
        }
        return resolve(result);
      });
    } catch (e) {
      console.log('Error in db query POST student')
      throw e
    }
  });
};