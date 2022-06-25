var teachersModel = require('../model/teachersModel');
var moment = require('moment');



/* GET Teachers */
exports.getTeachers = async (req, res, next) => {
  console.log('entering teachers controller');
  let error = {
    reason: ''
  }
  try {
    let fullName = '';
    let teacher = {};

    //Filters
    if (req.query.name) {
      console.log('entered')
      //Preparing teacher name for query
      teacher.name = req.query.name.split(' ').forEach(name => {
        fullName += `%${name}%`;
      });
      teacher.name = fullName;
      var teachers = await teachersModel.getTeachers(teacher);

      teachers.forEach(teacher => {
        //Cleaning the data 
        teacher.birth_date = moment(teacher.birth_date).format('DD/MM/YYYY');
        teacher.start_date = moment(teacher.start_date).format('DD/MM/YYYY');
        teacher.address = teacher.address.replace(/\n/g, '');
      });

      res.status(200).json(teachers);

    } else if (typeof (req.query.name)) {

    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }


  } catch (e) {
    console.log(e);
    error.reason = 'Service Error';
    res.status(500).json(error);
  }

};


/* POST Teacher */
exports.postTeachers = async (req, res, next) => {
  console.log('Posting new teachers controller');
  let error = {};
  try {
    let teacher = req.body;

    //Check
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      var teachers = await teachersModel.postTeachers(teacher);
      res.status(200).json({
        success: true
      });
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }



  } catch (e) {
    if (e.error) {
      error.reason = e.error
    } else {
      error.reason = 'Service Error';
    }
    res.status(500).json(error);
  }

};


/* EDIT Teacher */
exports.editTeachersById = async (req, res, next) => {
  console.log('EDITING Teachers controller');
  let error = {};
  try {
    let details = req.body;

    //Check
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      var teacher = await teachersModel.putTeacher(details);
      res.status(200).json({
        success: true
      });
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }

  } catch (e) {
    console.log(e);
    if (e.error) {
      error.reason = e.error
    } else {
      error.reason = 'Service Error';
    }
    res.status(500).json(error);
  }
};


/* DEL Student By Teacher */
exports.deleteTeacherById = async (req, res, next) => {
  console.log('DELETE Students controller');
  let error = {};
  try {
    let teacherId = req.query.teacherId;

    //Check
    if (teacherId) {
      var teacher = await teachersModel.delTeacher(teacherId);
      res.status(200).json({
        success: true
      });
    } else {
      error.reason = 'No ID provided';
      res.status(500).json(error)
    }
  } catch (e) {
    console.log(e);
    if (e.error) {
      error.reason = e.error
    } else {
      error.reason = 'Service Error';
    }
    res.status(500).json(error);
  }

};