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



exports.postTeachers = (teacher) => {
  console.log('Inserting teacher from DB getTeachers')
  return new Promise((resolve, reject) => {
    try {
      query = `INSERT INTO westPoint.teachers (first_name, last_name, start_date, birth_date, job_title, education, address, phone_number, email, pan_card, emergency_contact) VALUES 
      ('${teacher.first_name}','${teacher.last_name}','${teacher.start_date}','${teacher.birth_date}','${teacher.job_title}','${teacher.education}','${teacher.address}',${teacher.phone_number}, 
      '${teacher.email}', '${teacher.pan_card}',${teacher.emergency_contact})`
      let select = false;
      console.log(query);
      sql.query(`${query}`, (err, result) => {
        if (err) {
          return reject(err)
        }
        console.log(result);
        return resolve(result);
      });

    } catch (e) {
      console.log('Error in db query POST Teachers')
      throw e
    }
  });
};