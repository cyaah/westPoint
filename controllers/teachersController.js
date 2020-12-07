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

    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }

    var teachers = await teachersModel.getTeachers(teacher);


    teachers.forEach(teacher => {
      //Cleaning the data 
      teacher.birth_date = moment(teacher.birth_date).format('DD/MM/YYYY');
      teacher.start_date = moment(teacher.start_date).format('DD/MM/YYYY');
      teacher.address = teacher.address.replace(/\n/g, '');

    });
    res.status(200).json(teachers);
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
    if (req.body.first_name) {
      var teachers = await teachersModel.postTeachers(teacher);
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }


    res.status(200).json({
      success: true
    });
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
    if (details) {
      var teacher = await teachersModel.putTeacher(details);
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }
    res.status(200).json({
      success: true
    });
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
    } else {
      error.reason = 'No ID provided';
      res.status(500).json(error)
    }
    res.status(200).json({
      success: true
    });
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