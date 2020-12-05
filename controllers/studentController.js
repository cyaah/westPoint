var studentModel = require('../model/studentModel');
var moment = require('moment');

exports.getStudents = async (req, res, next) => {
  console.log('jeressss')
  let ping = {
    "success": 'got students'
  };
  let fullName = '';
  let student = {};
  
  //Preparing student name for query
  student.name = req.query.name.split(' ').forEach(name => {
    // console.log(name);
    fullName += `%${name}%`;
  });
  student.name = fullName;
  console.log(fullName);
  
  var students = await studentModel.getStudents(student);



  students.forEach(student => {
    //Cleaning the data 
    student.birth_date = moment(student.birth_date).format('DD/MM/YYYY');
    student.address = student.address.replace(/\n/g, '');
   
  });
  res.status(200).json(students);
};