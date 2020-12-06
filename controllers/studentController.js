var studentModel = require('../model/studentModel');
var moment = require('moment');




exports.getStudents = async (req, res, next) => {
  try {
    let error = {
      reason: ''
    }
    let fullName = '';
    let student = {};

    //Filters
    if (req.query.name) {

      /* Preparing joint name. (Check optimize) */
      student.name = req.query.name.split(' ').forEach(name => {
        fullName += `%${name}%`;
      });
      student.name = fullName;
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    };

    var students = await studentModel.getStudents(student);


    //Modulerize***
    students.forEach(student => {
      //Cleaning the data 
      student.birth_date = moment(student.birth_date).format('DD/MM/YYYY');
      student.address = student.address.replace(/\n/g, '');

    });
    res.status(200).json(students);
  } catch (e) {
    console.log(e);

    error.reason = 'Service Error';
    res.status(500).json(error);
    throw e;

  }

};


exports.getStudentsByClass = async (req, res, next) => {
  try {
    let Class = req.query.class;
    let section = req.query.section;
    let student = {};
    let error = {};
    if (Class) {
      student.class = Class;
    }
    if (section) {
      student.section = section;
    }
    if (!Class && !section) {
      error.reason = 'No section or class provided';
      res.status(500).json(error);
    }

    var students = await studentModel.getStudentsByClass(student);

    //Modulerize***
    students.forEach(student => {
      //Cleaning the data 
      student.birth_date = moment(student.birth_date).format('DD/MM/YYYY');
      student.address = student.address.replace(/\n/g, '');

    });
    res.status(200).json(students);

  } catch (e) {
    console.log(e);
    error.reason = 'Service Error';
    res.status(500).json(error);
    throw e;
  }

};


exports.postStudents = async (req, res, next) => {
  console.log('Posting new Students controller');
  let error = {};
  try {
    let student = req.body;

    //Check
    if (req.body.first_name) {

      var students = await studentModel.postStudents(student);
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


exports.editStudentsById = async (req, res, next) => {
  console.log('EDITING Students controller');
  let error = {};
  try {
    let details = req.body;

    //Check
    if (details) {
      var student = await studentModel.putStudent(details);
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