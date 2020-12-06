var teachersModel = require('../model/teachersModel');
var moment = require('moment');

exports.getTeachers = async (req, res, next) => {
  console.log('entering teachers controller');
  let error = {
    reason: ''
  }
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


  //Modulerize***
  teachers.forEach(teacher => {
    //Cleaning the data 
    teacher.birth_date = moment(teacher.birth_date).format('DD/MM/YYYY');
    teacher.address = teacher.address.replace(/\n/g, '');

  });
  res.status(200).json(teachers);
};