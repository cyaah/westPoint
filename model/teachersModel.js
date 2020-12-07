const sql = require('./db');

/* GET Teacher */
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



/* CREATE Teacher */
exports.postTeachers = (teacher) => {
  console.log('Inserting teacher from DB getTeachers')
  return new Promise((resolve, reject) => {
    try {
      query = `INSERT INTO westPoint.teachers (first_name, last_name, start_date, birth_date, job_title, education, address, phone_number, email, pan_card, emergency_contact) VALUES 
      ('${teacher.first_name}','${teacher.last_name}','${teacher.start_date}','${teacher.birth_date}','${teacher.job_title}','${teacher.education}','${teacher.address}',${teacher.phone_number}, 
      '${teacher.email}', '${teacher.pan_card}',${teacher.emergency_contact})`
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
      console.log('Error in db query POST Teachers')
      throw e
    }
  });
};


/* EDIT Teacher */
exports.putTeacher = (teacher) => {
  console.log('Editing Student from DB putStudents')
  return new Promise((resolve, reject) => {
    try {

      query = `UPDATE westPoint.teachers SET id = ${teacher.id}, first_name='${teacher.first_name}', last_name='${teacher.last_name}', 
      start_date='${teacher.start_date}', birth_date='${teacher.birth_date}', job_title='${teacher.job_title}', education='${teacher.education}', phone_number='${teacher.phone_number}', email='${teacher.email}' WHERE id=${teacher.id}`;
      console.log(query);
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


/* DEL Student */
exports.delTeacher = (teacherId) => {
  console.log('Deleting teacher from DB delTeacher')
  return new Promise((resolve, reject) => {
    try {

      //Delete parent first

      query = `DELETE FROM westPoint.teachers WHERE id=${teacherId}`;
      console.log(query)
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
      console.log('Error in db query dele student')
      throw e
    }
  });
};