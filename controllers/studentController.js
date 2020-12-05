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
  };
  if (req.query.class) {
    student.class = req.query.class;
  }
  if (req.query.section) {
    student.section = req.query.section;
  }



  var students = await studentModel.getStudents(student);



  students.forEach(student => {
    //Cleaning the data 
    student.birth_date = moment(student.birth_date).format('DD/MM/YYYY');
    student.address = student.address.replace(/\n/g, '');

  });
  res.status(200).json(students);
};