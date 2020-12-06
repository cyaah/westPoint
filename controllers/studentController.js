var studentModel = require('../model/studentModel');
var moment = require('moment');

exports.getStudents = async (req, res, next) => {
  let error = {
    reason: ''
  }
  let fullName = '';
  let student = {};

  //Filters
  if (req.query.name) {
    //Preparing student name for query
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
};


exports.getStudentsByClass = async (req, res, next) => {
  let Class = req.query.class;
  let section = req.query.section;
  let student = {};
  let error = {
    reason: ''
  };
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

};